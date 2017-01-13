const express        =  require ('express')
const sequelize      =  require('sequelize')
const session        =  require('express-session')
const router         =  express.Router()
const db         =  require('../models/database');
const passport       =  require('passport')
const LocalStrategy  =  require('passport-local').Strategy;
const local          =  require('../models/local')


router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 24*60*60*1000
	}
}));


router.route('/products')

 	.get((req,res) => {

 		let user = req.user
 		if (user === undefined) {
 			res.render('index')
 		} else {
 			db.product.findAll().then(products => {

 				res.render('products', {
 					user: req.user,
 					products: products
 				})
 			})
 		}
  	});


module.exports = router


