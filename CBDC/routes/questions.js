const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router     =  express.Router()
const db         =  require('../models/database');


router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

router.route('/questions')
 	.get((req,res) => {
 		res.render('questions')
  		}
	);


module.exports = router