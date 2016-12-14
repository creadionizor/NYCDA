const express        =  require ('express')
const sequelize      =  require('sequelize')
const session        =  require('express-session')
const router         =  express.Router()
const db             =  require('../models/database');
const passport       =  require('passport')
const LocalStrategy  =  require('passport-local').Strategy;
const local          =  require('../models/local')
const bodyParser     =  require('body-parser')

router.use(bodyParser.urlencoded({     
  extended: true
})); 

router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

router.route('/login')
	.post(local.authenticate('local', {
		successRedirect: '/models',
		failureRedirect: '/'
	}))

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router