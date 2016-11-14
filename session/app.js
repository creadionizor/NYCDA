// MODULES // 

// require the modules sequalize, express, the body-parser and the express-session
let sequelize = require('sequelize');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');

// APP AND VIEW ENGINE 

// initiate app
let app = express();
// make sure static is accesible 
app.use(express.static('./static'));
// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')
// Initiate body parser
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE


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
db.sync({force: true}).then(function () {
	Bulletin.create({
		title: "Un Romanzo Criminale",
		body: "Coltivava ancora il sogno di dare un ordine al caos. E invece, il gioco esigeva che si facesse l'opposto: dare un caos all'ordine"
	})
	User.create({
		name: "Arnold Schwarzenegger",
		email: "iwill@beback",
		password: "nomnomnom"
	}).then(function (user) {
		// Available: user
		user.createBulletin({
			title: "Ich Bin Strong YAAA",
			body: "My name is Arnie! How NICE to meet you!"
		}).then(function (bulletin){
			// Available: user + bulletin
			user.createComment({ // Create comment on behalf of user
				comment: "Can you zhe my 9 MILIMETER YAA? "
			}).then( comment => {
				// Available: user + bulletin + comment
				comment.setBulletin( bulletin ) // Set comment to belong to bulletin
			} )
		})
	});
}, function (error) {
	console.log('sync failed: ');
	console.log(error);
});

// Server listening on port 		
let server = app.listen(8000, () => {
	console.log('Server Pumping Irons On Port: ' + server.address().port);
});


// Initiate session 
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// ROOT

app.get('/', function(req,res) {
	let user = req.session.user;	
	if (user === undefined) {
		Bulletin.findAll({
			attributes: ['title', 'body'],
			include: [User]
		}).then(bulletin => {	
			res.render('index', {
				message: req.query.message,
				user: req.session.user,
				bulletin: bulletin,
				user: user
			}) 
		})
	} else {
		Bulletin.findAll({
			attributes: ['title', 'body'],
			include: [User, Comment]
		}).then(bulletin => {
			res.render('index', {
				bulletin: bulletin,
				user: user
			})
		})
	}
})

// BULLETIN BOARD

app.post('/createBulletin', (req,res)=> {
	let user = req.session.user
	if (user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	} else {
		User.findOne({
			where: {
				id: user.id
			}
		}).then((user) => {
			user.createBulletin({
				title: req.body.user_title,
				body: req.body.user_body
			})
		}). then(()=> {
			res.redirect('index')
		})
	}

})

// COMMENT 

app.post('/createComment', (req,res)=>{
	let user = req.session.user
	if(user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	} else {
		User.findOne({
			where: {
				id: user.id
			}
		}).then ((bulletin) => {
			user.createComment({
				comment: req.body.user_comment
			}).then((comment => {
				comment.setBulletin(bulletin)
			})).then(()=> {
				res.redirect('index')
			})
		})
	}
})

// // Post Board Page
// app.post('/', (req,res) => {
// 	let user = req.session.user
// 	if (user === undefined) {
// 		res.redirect('/?message=' +encodeURIComponent("Please log in"))
// 	} else {
// 		User.findOne({
// 			where: {
// 				id: user.id
// 			}
// 		}).then (function(bulletin) {
// 			user.createComment({
// 				comment: req.body.user_comment
// 			}).then(comment => {
// 				comment.setBulletin (bulletin)
// 			})
// 		}).then(function(){
// 			res.redirect('index')
// 		})
// 	}
// })


app.get('/index', (req,res) => {
	let user = req.session.user
	if (user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	} else {
		Bulletin.findAll({
			attributes: ['title', 'body'],
			include: [User, Comment]
		}).then(bulletin => {
			res.render('index', {
				bulletin: bulletin,
				user: user
			})
		}
		)} 
	})


// SIGN UP 

// Get Sign Up Page
app.get('/signup', (req,res) =>{
	res.render('signup')
})


app.post('/signup', (req,res) => {
	User.create({
		name: req.body.su_name,
		email: req.body.su_email,
		password: req.body.su_password
	}).then(function(){
		res.redirect('/?message=' +encodeURIComponent("Your Account Was Created Successfully, You can Now Log-In"))
	})
})

// PROFILE 

// Get profile 
app.get('/profile', function (req, res) {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		res.render('profile', {
			user: user
		});
	}
});

// Get users 
app.get('/users', (req,res) =>{
	User.findAll({
		attributes: ['name'],
	}).then(users =>{
		res.send(users)
	})
})


// Response messages 
app.post('/login', bodyParser.urlencoded({extended: true}), function (req, res) {
	if(req.body.email.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(req.body.password.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function (user) {
		if (user !== null && req.body.password === user.password) {
			req.session.user = user;
			res.redirect('/profile');
		} else {
			res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});

// LOGOUT

// logout session 
app.get('/logout', function (req, res) {
	req.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});













