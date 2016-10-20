let fs = require('fs'); // Require FS library

// The Awesome JSON File reader 
function jsonReader (filename, callback) {
	// read the json file
	fs.readFile(filename, 'utf8', function(err,data){
		// if cannot read error
		if (err) throw err;
		// parse the json file 
		let customers = JSON.parse(data);

		//loop though all the customer profiles
		for (var i = customers.length - 1; i >= 0; i--) {

			// Set end amount prop and calucate total duration
			customers[i].pension.endamount = {
				pessimistic: customers[i].finances.startcapital,
				average: customers[i].finances.startcapital,
				optimistic: customers[i].finances.startcapital
			};
			customers[i].pension.duration = (customers[i].pension.age - customers[i].age);

		}//end of customer profile loop 

	// callback json
	callback(customers);

	}) // end of readfile function
} // end of jsonreader function


// Exports the filereader function
module.exports = jsonReader







