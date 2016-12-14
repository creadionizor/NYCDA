const express         =  require('express')
const app             =  express()
const session         =  require('express-session')
const LocalStrategy   =  require('passport-local').Strategy;
const local           =  require('./models/local')
const bodyParser     =  require('body-parser')
const passport       =  require('passport')
const makemodels       =  require('./models/makemodels')
const makeproducts      =  require('./models/makeproducts')


app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(passport.initialize());
app.use(passport.session());

app.use (express.static(__dirname + '/static/'))
app.set('views', __dirname + '/views/')
app.set('view engine', 'pug')

let loginout      = require(__dirname  + '/routes/login')
let index 		  = require( __dirname + '/routes/index' )
let about 		  = require( __dirname + '/routes/about' )
let questions 	  = require( __dirname + '/routes/questions' )
let register 	  = require( __dirname + '/routes/register' )
let profile	      = require( __dirname + '/routes/profile' )
let models	      = require( __dirname + '/routes/models' )

app.use('/', loginout)
app.use('/', index )
app.use('/', about )
app.use('/', questions )
app.use('/', register )
app.use('/', profile )
app.use('/', models )


makeproducts()
makemodels()

app.listen(8000, function () {
	console.log('Server Running Like Usain Bolt')
})