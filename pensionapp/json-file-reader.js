let fs = require('fs'); // Require FS library

// The Awesome JSON File reader 
function jsonReader (filename, callback) {
	// read the json file
	fs.readFile(filename, 'utf8', function(err,data){
		// if cannot read error
		if (err) throw err;
		// parse the json file 
		let customer = JSON.parse(data);

		for (var i = customer.length - 1; i >= 0; i--) {

		// Set end amount prop and calucate total duration
			customer[i].pension.endamount = {
				pessimistic: customer[i].finances.startcapital,
				average: customer[i].finances.startcapital,
				optimistic: customer[i].finances.startcapital
			};
			customer[i].pension.duration = (customer[i].pension.age - customer[i].age);
		}	
		
		 // end 1st for loop

		// callback json
		callback(customer);
	})
} 

// Exports the filereader function
module.exports = jsonReader






