let fs = require('fs'); // Require FS library
let customerGenerator = require(__dirname + '/randomuser.js') // Require the random user generator
let reader = require(__dirname + '/json-file-reader'); // Require the Json reader
let calculate = require(__dirname + '/calculation'); // Require the calculator

// generate random users
customerGenerator(process.argv[2], function () {

	// call on reader 
	reader('/customers/', (customer) => {
		// call on calculator
		calculate(customer, (result)=>{
			// add results to projections file 
			fs.writeFile("customerprojections.json", JSON.stringify(result), (err, data) => {
			    if (err) throw err;
			    else {
			    	console.log("The file was saved!");
			    };    
			});//end writefile
		});//end calculate
	}); //end reader
});// end of customer generator 
