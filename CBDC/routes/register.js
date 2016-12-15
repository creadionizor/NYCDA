const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router     =  express.Router()
const db         =  require('../models/database');
const bcrypt 		= require('bcrypt-nodejs')


router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 24*60*60*1000
	}
}));


router.route('/register')
	.get((req,res)=> {
		res.render('register')
	})
	.post((req,res)=> {
		console.log(req.body)
		bcrypt.hash(req.body.password, null, null, (err,hash) =>{
			db.user.create({
				name: req.body.first_name,
				lastname: req.body.last_name,
				email:req.body.email,
				password: hash
			}).then(()=>{
				res.redirect('/?message=' +encodeURIComponent('Account created, you can now log-in'))
			})
		})
	})

module.exports = router