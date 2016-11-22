////////////////
///// APP /////
//////////////

// Require the modules
const sequelize = require('sequelize');
const express = require('express');
const session = require('express-session');
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
///// USER POSTS ///
///////////////////

// get post
router.get('/post', (req,res)=>{
	// check if user is logged-in
	let user = req.session.user
	// if user is not logged in redirect with message
	if(user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	// else find specific bulletin from the link
	} else {
		Bulletin.findOne({
			where: {
				id: req.query.id
			},
			// include user, comment and the user that created the comment
			include: [User, {model: Comment, include: [User]}]
		}).then((bulletin) => {
			// then render post and include bulletin and user
			res.render('post', {
				bulletin: bulletin, 
				user: req.session.user
			})
		})
	}
})

//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router

