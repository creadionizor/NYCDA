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



// Sync database 
// reset database after reload of app / session
db.sync({force: true}).then( () => {
	// encrypt password of test user 
	bcrypt.hash("nomnomnom", 8, (err,hash) =>{
		// create user
		User.create({
			name: "Arnold Schwarzenegger",
			email: "iwill@beback",
			password: hash		
	}).then( (user) => {
		// fetch user, user makes bulletin
		user.createBulletin({
			title: "Ich Bin Strong YAAA",
			body: "My name is Arnie! How NICE to meet you!"
		}).then( (bulletin) => {
			// fetch user and create a comment
			user.createComment({ // Create comment on behalf of user
				comment: "Can you zhe my 9 MILIMETER YAA? "
			// fetch comment and connect it to a bulletin
			}).then( comment => {
				comment.setBulletin( bulletin ) 
			} )
		})
	});
// if error log error message
}, (error) => {
	console.log('sync failed: ');
	console.log(error);
})});


/////////////////////
///// ROOT /////////
///////////////////

// get root 
router.get('/', (req,res) => {
	// check if user is logged-in
	let user = req.session.user;
	// if user is not logged in 
	if (user === undefined) {
		// find bulletins 
		Bulletin.findAll({
			// include atributes
			attributes: ['id', 'title', 'body'],
			// include user and comment and user profile that created comment
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {	
			// render the index
			res.render('index', {
				// include user, bulletins and message
				message: req.query.message,
				user: req.session.user,
				bulletins: bulletins
			}) 
		})
	// else find all bulletins 
	} else {
		Bulletin.findAll({
			// include attributes
			attributes: ['id', 'title', 'body'],
			// include user, comment and user that create comment
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {
			// render index 
			res.render('index', {
			// include bulletins and user
				bulletins: bulletins,
				user: req.session.user
			})

		})
	}
})

//////////////////////
////// INDEX ////////
////////////////////

// get root 
router.get('/index', (req,res) => {
	// check if user is logged-in
	let user = req.session.user;
	// if user is not logged in 
	if (user === undefined) {
		// find bulletins 
		Bulletin.findAll({
			// include atributes
			attributes: ['id', 'title', 'body'],
			// include user and comment and user profile that created comment
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {	
			// render the index
			res.render('index', {
				// include user, bulletins and message
				message: req.query.message,
				user: req.session.user,
				bulletins: bulletins
			}) 
		})
	// else find all bulletins 
	} else {
		Bulletin.findAll({
			// include attributes
			attributes: ['id', 'title', 'body'],
			// include user, comment and user that create comment
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {
			// render index 
			res.render('index', {
			// include bulletins and user
				bulletins: bulletins,
				user: req.session.user
			})

		})
	}
})


//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router