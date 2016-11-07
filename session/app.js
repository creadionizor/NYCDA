var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/sessions';

var sequelize = new Sequelize(connectionString, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
}); 

var User = sequelize.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

var app = express();

app.use(express.static('./static'));

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')

app.get('/', function (request, response) {
	response.render('index', {
		message: request.query.message,
		user: request.session.user
	});
});

app.get('/profile', function (request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		response.render('profile', {
			user: user
		});
	}
});

app.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}

	User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user) {
		if (user !== null && request.body.password === user.password) {
			request.session.user = user;
			response.redirect('/profile');
		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});

app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});

sequelize.sync({force: true}).then(function () {
	User.create({
		name: "Arnold Schwarzenegger",
		email: "iwill@beback",
		password: "nomnomnom"
	}).then(function () {
		var server = app.listen(8000, function () {
			console.log('Server Pumping Irons On Port: ' + server.address().port);
		});
	});
}, function (error) {
	console.log('sync failed: ');
	console.log(error);
});