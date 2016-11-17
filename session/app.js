// MODULES // 

// require the modules sequalize, express, the body-parser and the express-session
let sequelize = require('sequelize');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let bcrypt = require('bcrypt')

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
db.sync({force: true}).then( () => {
	bcrypt.hash("nomnomnom", 8, (err,hash) =>{
		User.create({
			name: "Arnold Schwarzenegger",
			email: "iwill@beback",
			password: hash
		
	}).then( (user) => {
		// Available: user
		user.createBulletin({
			title: "Ich Bin Strong YAAA",
			body: "My name is Arnie! How NICE to meet you!"
		}).then( (bulletin) => {
			// Available: user + bulletin
			user.createComment({ // Create comment on behalf of user
				comment: "Can you zhe my 9 MILIMETER YAA? "
			}).then( comment => {
				// Available: user + bulletin + comment
				comment.setBulletin( bulletin ) // Set comment to belong to bulletin
			} )
		})
	});
}, (error) => {
	console.log('sync failed: ');
	console.log(error);
})});

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

app.get('/', (req,res) => {
	let user = req.session.user;	
	if (user === undefined) {
		Bulletin.findAll({
			attributes: ['id', 'title', 'body'],
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {	
			console.log(bulletins)
			res.render('index', {
				message: req.query.message,
				user: req.session.user,
				bulletins: bulletins
			}) 
		})
	} else {
		Bulletin.findAll({
			attributes: ['id', 'title', 'body'],
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {
			res.render('index', {
				bulletins: bulletins,
				user: req.session.user
			})

		})
	}
})


app.get('/overview', (req,res) =>{
	Bulletin.findAll({
			attributes: ['title', 'body'],
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins =>{
		res.send(bulletins)
	})
})


app.get('/index', (req,res) => {
	let user = req.session.user;	
	if (user === undefined) {
		Bulletin.findAll({
			attributes: ['id', 'title', 'body'],
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {	
			res.render('index', {
				message: req.query.message,
				user: req.session.user,
				bulletins: bulletins
			}) 
		})
	} else {
		Bulletin.findAll({
			attributes: ['id', 'title', 'body'],
			include: [User, {model: Comment, include: [User]}]
		}).then(bulletins => {
			res.render('index', {
				bulletins: bulletins,
				user: req.session.user
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
		}).then(()=> {
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
		}).then((user) => {
			user.createComment({
				comment: req.body.user_comment,
				bulletinId: req.body.bulletin_id
			}).then(()=>{
				res.redirect('index')
			})
		})
	}
})

// DYNAMIC POST 

app.get('/post', (req,res)=>{
	let user = req.session.user
	if(user === undefined) {
		res.redirect('/?message=' +encodeURIComponent("Please log in"))
	} else {
		Bulletin.findOne({
			where: {
				id: req.query.id
			},
			include: [User, {model: Comment, include: [User]}]
		}).then((bulletin) => {
			res.render('post', {
				bulletin: bulletin, 
				user: req.session.user
			})
		})
	}
})


// Get users 
app.get('/fakepost', (req,res) =>{
		Bulletin.findOne({
			where: {
				id: req.query.id
			},
			include: [{model: Comment, include: [User]}]
		}).then((bulletin) => {
			res.send(bulletin)
		})
	}
)

// SIGN UP 

// Get Sign Up Page
app.get('/signup', (req,res) =>{
	res.render('signup')
})


app.post('/signup', (req,res) => {
	bcrypt.hash(req.body.su_password, 8, (err,hash) =>{
		User.create({
			name: req.body.su_name,
			email: req.body.su_email,
			password: hash

		}).then(function(){
			res.redirect('/?message=' +encodeURIComponent("Your Account Was Created Successfully, You can Now Log-In"))
		})
	})
})

// PROFILE 

// Get profile 
app.get('/profile', function (req, res) {
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
	bcrypt.compare(req.body.password, user.password, function(err, response) {
			if (user !== null && response === true) {
				console.log(user)
				req.session.user = user;
				res.redirect('/profile');
			} else {
				res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
			}
	}, (error) => {
		res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));

		})
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



