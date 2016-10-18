// route 1: renders a page that displays all your users.



// Step 7: Create a list in index pug and log all users into the html page 

// Require Express Package 
const express = require ('express');
// Require the FS Library
const fs = require ('fs');
// Initiate express App
const app = express()

// Initiate pug engine
app.set('view engine', 'pug')
// Initiate which folder the engine is going to view
app.set('views', __dirname + '/views')

// Render the index page 
app.get('/index', (req,res) => {
	// read the Json file
	fs.readFile(__dirname + "/users.json", (err,data) => {
		// if error throw an error
		if (err) throw err
		// parse the json file
		let parsedData = JSON.parse(data)
		// log the data in the terminal
		console.log(parsedData)
		// render the index and the data 
		res.render('index', {data: parsedData})
	})
})

// {data: parsedData}

// Server Response in Terminal 
app.listen(8000, () => {
	console.log("Server Running!")
})