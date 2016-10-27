// VERSION 3 

// Require Express Package 
const express = require ('express');
// Require the FS Library
const fs = require ('fs');
// Require the body parser
const bodyParser = require('body-parser');
// Initiate express App
const app = express();

app.use(express.static('static'));

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
		if (err) {
			res.send(err)
		}
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
app.post('/search', (req, res) => {
    // read the json file name 
    fs.readFile(__dirname + "/users.json", (err,data) => {
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)
		let searchData = []
		// loop though the parsedData
		for (let i = parsedData.length - 1; i >= 0; i--) {
			// if the username is exactly equal to the search query
			if (parsedData[i].userName.toLowerCase().indexOf(req.body.query.toLowerCase()) === 0) {	
				// store the username data
				// parsedData[i].userName.indexOf(req.body.query)
				searchData.push(parsedData[i])			
			}
		}   
		// render the result page
		res.send(searchData)

	})
});

// render the create username page
app.get('/create', (req,res) => {
	res.render('create')
})

// post data of create page to users page 
app.post('/users', (req, res) => {
    // read the json file name 
    fs.readFile(__dirname + "/users.json", (err,data) => {
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)
		// push data into parsedData
		parsedData.push(req.body)
		// re-write the json file
		fs.writeFile(__dirname + "/users.json", JSON.stringify(parsedData), (err,data) => {
    		if (err) throw err
    			else {
    				res.render('users', {data: parsedData})
    			}
   		 })
	})
});

// Server Response in Terminal 
app.listen(8000, () => {
	console.log("Server Running Like Usain Bolt!")
})


// -- PREVIOUS VERSIONS -- -- OWN REFERENCE -- -- PREVIOUS VERSIONS -- -- OWN REFERENCE -- 

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