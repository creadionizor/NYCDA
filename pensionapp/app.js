// Importing necessary modules
const fs = require('fs'); 

// Read the customer data json
fs.readFile(__dirname + '/customer.json', 'utf-8', (err, data) => {
	// Prase the file to a readable object
	let parsedData = JSON.parse(data); 
	calcCompound(parsedData)
} );

// Function to caculate compound interest from a customer object 
var calcCompound = (customer) => {
	console.log(customer)
	customer.pension.endamount = 0
}