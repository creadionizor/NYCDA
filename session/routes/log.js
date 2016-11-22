////////////////
///// APP /////
//////////////


// Require the modules
const sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')
const router = express.Router()

// Initiate body parser
router.use(bodyParser.urlencoded({ extended: true }));

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


//////////////////
///// LOGIN /////
////////////////

router.route('/login')
	.post(bodyParser.urlencoded({extended: true}), function (req, res) {
		// if email = 0 character redirect with message
		if(req.body.email.length === 0) {
			res.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
			return;
		}
		// if password = 0 character redirect with message
		if(req.body.password.length === 0) {
			res.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
			return;
		}
		// find a user 
		User.findOne({
		// with e-mail filled in by user
			where: {
				email: req.body.email
			}
		}).then(function (user) {
		// decrypt password hash 
		bcrypt.compare(req.body.password, user.password, function(err, response) {
				// if password = password hash 
				if (user !== null && response === true) {
				// initiate session with user and redirect to profile
					req.session.user = user;
					res.redirect('/profile');
				// else redirect with message
				} else {
					res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
				}
			// in case of error redirect with message 
		}, (error) => {
			res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
			})
		})
	})


//////////////////
///// LOGOUT ////
////////////////

router.route('/logout')
	.get((req,res) => {
		// end session
		req.session.destroy((error) => {
			if(error) {
				throw error;
			}
		// redirect with message	
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
		})
	})

//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router

