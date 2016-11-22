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
///// Bulletin /////
///////////////////

// create bulletin 
router.post('/createBulletin', (req,res)=> {
	// see if user is logged-in
	let user = req.session.user
	// if not logged-in redirect with message
	if (user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	// else find user where the user.id = id of user
	} else {
		User.findOne({
			where: {
				id: user.id
			}
		// then create bulletin with title and body imput
		}).then((user) => {
			user.createBulletin({
				title: req.body.user_title,
				body: req.body.user_body
			})
		// then redirect to index
		}).then(()=> {
			res.redirect('index')
		})
	}

})


/////////////////////
///// COMMENT //////
///////////////////

// create comment
router.post('/createComment', (req,res)=>{
	// see if user is logged-in
	let user = req.session.user
	// if not logged-in redirect with message
	if(user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	} else {
	// else find user where the user.id = id of user
		User.findOne({
			where: {
				id: user.id
			}
		// then create comment with comment imput and match it to bulletin ID 
		}).then((user) => {
			user.createComment({
				comment: req.body.user_comment,
				bulletinId: req.body.bulletin_id
		// then redirect to index
			}).then(()=>{
				res.redirect('index')
			})
		})
	}
})

//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router

