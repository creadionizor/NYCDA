let fs = require('fs'); // Require FS library
let reader = require(__dirname + '/json-file-reader'); // Require the Json reader
let calculate = require(__dirname + '/calculation'); // Require the calculator

// call on reader 
reader('/customers/', (customer) => {
	// call on calculator
	calculate(customer, (result)=>{
		// add results to projections file 
		fs.writeFile("customerprojections.json", JSON.stringify(result), (err, data) => {
		    if (err) throw err;
		    else {
		    	console.log("The file was saved!");
		    }    
		})//end writefile
	})//end calculate
}) //end reader