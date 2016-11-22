///////////////////
///// MODULES /////
//////////////////

const sequelize = require('sequelize');
const express = require('express');

////////////////
///// APP /////
//////////////

let app = express();
// require login/logout
let logInOut = require(__dirname + '/routes/log')
// require index and root
let indexRoot = require(__dirname + '/routes/index')
// require bulletin
let bulletin = require(__dirname + '/routes/bulletin')
// require post
let post = require(__dirname + '/routes/post')
// require profile
let profile = require(__dirname + '/routes/profile')
// require signup
let signup = require(__dirname + '/routes/signup')

// Initiate static
app.use(express.static('./static'));
// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')

// login / logout
app.use('/', logInOut)
// index and root
app.use('/', indexRoot)
// bulletin and comment
app.use('/', bulletin)
// users own posts
app.use('/', post)
// users profile
app.use('/', profile)
// user signup
app.use('/', signup)


/////////////////
///// PORT /////
///////////////

// Server listening on port 		
let server = app.listen(8000, () => {
	console.log('Server Pumping Irons On Port: ' + server.address().port);
});











