// Require Libraries 
const express = require('express')
const fs = require('fs')
const bayes = require('bayes')
const bodyParser = require('body-parser');

let app = express()
let classifier = bayes()

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));


// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')

// render the search page
app.get('/', (req,res) => {
	res.render('index')
})


// connect your AJAX 

// post data of create page to users page 
app.post('/index', (req, res) => {
	console.log(req.body)
	console.log('something is getting posted')
    // read the json file name 
    fs.readFile(__dirname + "/data.json", (err,data) => {
    	console.log('reading JSON file')
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)

		console.log(parsedData)
		// push data into parsedData
		parsedData.push(req.body.query + req.body.mood)
		// re-write the json file
		fs.writeFile(__dirname + "/data.json", JSON.stringify(parsedData), (err,data) => {
    		if (err) throw err
    			else {
    				res.render('index')
    			}
   		 })
	})
});


// Server Response in Terminal 
app.listen(8000, () => {
	console.log("Machine Learning Server Running Like Usain Bolt!")
})


// // search data submitted on search page
// app.post('/search', (req, res) => {
//     // read the json file name 
//     fs.readFile(__dirname + "/users.json", (err,data) => {
// 		// if error throw an error
// 		if (err) throw err
// 		// parse the json file
// 		let parsedData = JSON.parse(data)
// 		let searchData = []
// 		// loop though the parsedData
// 		for (let i = parsedData.length - 1; i >= 0; i--) {
// 			// if the username is exactly equal to the search query
// 			if (parsedData[i].userName.toLowerCase().indexOf(req.body.query.toLowerCase()) === 0) {	
// 				// store the username data
// 				// parsedData[i].userName.indexOf(req.body.query)
// 				searchData.push(parsedData[i])			
// 			}
// 		}   
// 		// render the result page
// 		res.send(searchData)

// 	})
// });