// Importing necessary modules
const fs = require('fs'); 

// Read the customer data json
fs.readFile(__dirname + '/customer.json', 'utf-8', (err, data) => {
	// Prase the file to a readable object
	let parsedData = JSON.parse(data) 
	console.log(parsedData)
} )