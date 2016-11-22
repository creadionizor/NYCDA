////////////////
///// APP /////
//////////////

// Require the modules
const sequelize = require('sequelize');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt')
const router = express.Router()

// Initiate session 
router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// connection string to database 
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/sessions';

// Initiate database 
let db = new sequelize(connectionString, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
}); 

/////////////////////
///// DATABASE /////
///////////////////

// Define user table and properties
let User = db.define('user', {
	name: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
});

let Bulletin = db.define('bulletin', {
	title: sequelize.STRING,
	body: sequelize.STRING
});

let Comment = db.define('comment', {
	comment: sequelize.STRING
})

// Define Database Relationship 
User.hasMany(Bulletin)
Bulletin.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Bulletin.hasMany(Comment)
Comment.belongsTo(Bulletin)

// Get Sign Up Page
router.get('/signup', (req,res) =>{
	res.render('signup')
})


router.post('/signup', (req,res) => {
	// encrypt password 
	bcrypt.hash(req.body.su_password, 8, (err,hash) =>{
		// create user
		User.create({
			name: req.body.su_name,
			email: req.body.su_email,
			password: hash
			// redirect with message
		}).then(function(){
			res.redirect('/?message=' +encodeURIComponent("Your Account Was Created Successfully, You can Now Log-In"))
		})
	})
})

/////////////////////
////// EXPORT ///////
////////////////////

module.exports = router
