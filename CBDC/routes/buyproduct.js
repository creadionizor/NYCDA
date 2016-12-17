const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router     =  express.Router()
const db         =  require('../models/database');


router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 24*60*60*1000
		store: 'Blablabla'
	}
}));


router.route('/buyproduct')
 	.post((req,res) => {
 		//req.session.cookie.store
 		res.render('product')
  		}
	);


module.exports = router