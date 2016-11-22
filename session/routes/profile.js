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


/////////////////////
///// PROFILE //////
///////////////////


router.get('/profile', function (req, res) {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		User.findOne({
			where: {
				id: user.id 
			},
			include: [Bulletin, Comment]
			}).then(user => {
					res.render('profile', {
					user: user
					});
				})
		}
});

//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router

