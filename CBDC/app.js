const express     = require('express')
const app         = express()
const session     = require('express-session')

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

app.use (express.static(__dirname + '/static/'))
app.set('views', __dirname + '/views/')
app.set('view engine', 'pug')


let index 		  = require( __dirname + '/routes/index' )
let about 		  = require( __dirname + '/routes/about' )
let register 	  = require( __dirname + '/routes/register' )

app.use('/', index )
app.use('/', about )
app.use('/', register )

app.listen(8000, function () {
	console.log('Server Running Like Usain Bolt')
})