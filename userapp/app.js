// Require Express Package 
const express = require ('express');
// Require the FS Library
const fs = require ('fs');
// Require the body parser
const bodyParser = require('body-parser');
// Initiate express App
const app = express();

// Use the body parser inside the app
app.use(bodyParser.urlencoded({ extended: true }));

// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')

// Render the users page 
app.get('/users', (req,res) => {
	// read the Json file
	fs.readFile(__dirname + "/users.json", (err,data) => {
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)
		// render the index and the data 
		res.render('users', {data: parsedData})
	})
})


// render the search page
app.get('/search', (req,res) => {
	res.render('search')
})

// search data submitted on search page
app.post('/result', (req, res) => {
    // read the json file name 
    fs.readFile(__dirname + "/users.json", (err,data) => {
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)
		// loop though the parsedData
		for (let i = parsedData.length - 1; i >= 0; i--) {
			// if the username is exactly equal to the search query
			if (parsedData[i].userName === req.body.query) {	
				// render result page
				res.render('result', {data: parsedData[i]})
			}
			else {
				//create else statment later
			}	
		}    
	})
});

// Server Response in Terminal 
app.listen(8000, () => {
	console.log("Server Running Like Usain Bolt!")
})














// VERSION 1 

// // Require Express Package 
// const express = require ('express');
// // Require the FS Library
// const fs = require ('fs');
// // Initiate express App
// const app = express()

// // Initiate pug engine
// app.set('view engine', 'pug')
// // Initiate which folder the engine is going to view
// app.set('views', __dirname + '/views')

// // Render the index page 
// app.get('/index', (req,res) => {
// 	// read the Json file
// 	fs.readFile(__dirname + "/users.json", (err,data) => {
// 		// if error throw an error
// 		if (err) throw err
// 		// parse the json file
// 		let parsedData = JSON.parse(data)
// 		// log the data in the terminal
// 		console.log(parsedData)
// 		// render the index and the data 
// 		res.render('index', {data: parsedData})
// 	})
// })

// // Server Response in Terminal 
// app.listen(8000, () => {
// 	console.log("Server Running!")
// })


// VERSION 2

// // Require Express Package 
// const express = require ('express');
// // Require the FS Library
// const fs = require ('fs');
// // Require the body parser
// const bodyParser = require('body-parser');
// // Initiate express App
// const app = express();

// // Use the body parser inside the app
// app.use(bodyParser.urlencoded({ extended: true }));

// // Initiate pug engine
// app.set('view engine', 'pug')
// // Initiate which folder the engine is going to view
// app.set('views', __dirname + '/views')

// // Render the users page 
// app.get('/users', (req,res) => {
// 	// read the Json file
// 	fs.readFile(__dirname + "/users.json", (err,data) => {
// 		// if error throw an error
// 		if (err) throw err
// 		// parse the json file
// 		let parsedData = JSON.parse(data)
// 		// render the index and the data 
// 		res.render('users', {data: parsedData})
// 	})
// })


// // render the search page
// app.get('/search', (req,res) => {
// 	res.render('search')
// })

// // search data submitted on search page
// app.post('/result', (req, res) => {
//     // read the json file name 
//     fs.readFile(__dirname + "/users.json", (err,data) => {
// 		// if error throw an error
// 		if (err) throw err
// 		// parse the json file
// 		let parsedData = JSON.parse(data)
// 		// loop though the parsedData
// 		for (let i = parsedData.length - 1; i >= 0; i--) {
// 			// if the username is exactly equal to the search query
// 			if (parsedData[i].userName === req.body.query) {	
// 				// render result page
// 				res.render('result', {data: parsedData[i]})
// 			}
// 			else {
// 				//create else statment later
// 			}	
// 		}    
// 	})
// });

// // Server Response in Terminal 
// app.listen(8000, () => {
// 	console.log("Server Running Like Usain Bolt!")
// })