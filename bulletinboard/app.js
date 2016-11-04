// LIBRARIES // 

// Require Express Package 
const express = require ('express');
// Require the FS Library
const fs = require ('fs');
//Require the postgres library
const pg = require('pg');
// Require the bodyParser
const bodyParser = require('body-parser')
// Initiate express App
const app = express();
// Connect to database string
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

// loading static
app.use(express.static('static'));
// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')
// Use the body parser inside the app
app.use(bodyParser.urlencoded({ extended: true }));

// RENDER // PAGES

// render the front page
app.get('/', (req,res) => {
  res.render('form')
})

// render the form page
app.get('/form', (req,res) => {
  res.render('form')
})

// DATABASE // 

// render the board page
app.get ('/board', (req,res) => {
  pg.connect(connectionString, function(err, client, done) {
    client.query('select title,body from messages', function (err, result) {
      res.render('board', {result: result.rows})
        done();
        pg.end();
    }) 
  })
})

app.post('/board', (req,res) => {

  //connect to a database
  pg.connect(connectionString, function(err, client, done) {
    // add query to database 
    client.query(
      'insert into messages (title, body) values ($1, $2)', 
      [req.body.user_title, req.body.user_body], 
      function(err, result) {
        done();
     });
  });
  res.redirect('board')
})


// SERVER // 

// Server Response in Terminal 
app.listen(8000, () => {
  console.log("Server attempting to moonwalk")
})
