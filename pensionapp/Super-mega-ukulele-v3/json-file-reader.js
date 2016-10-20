let fs = require('fs'); // Require FS library

// The Awesome JSON File and Directory reader 

function jsonReader (dirname, callback) {
	// read directory
	fs.readdir(__dirname + dirname , 'utf8', (err,data) => {
		let customersResults = []
		// if cannot read directory 
		if (err) throw err;
		// loop though the files in directory
		data.forEach( (filename) =>{
			// read file
			fs.readFile(__dirname + dirname + filename, 'utf8', (err,filename) =>{
				// if cannot read error
				if (err) throw err;
				// parse the json file 
				let customers = JSON.parse(filename);

				// store customers in an array
				customersResults.push(customers)

				//loop though all the customer profiles
				for (let i = customersResults.length - 1; i >= 0; i--) {
					
					// Set end amount prop and calucate total duration
					customersResults[i].pension.endamount = {
						pessimistic: customersResults[i].finances.startcapital,
						average: customersResults[i].finances.startcapital,
						optimistic: customersResults[i].finances.startcapital
					};
					customersResults[i].pension.duration = (customersResults[i].pension.age - customersResults[i].age);

				}//end of customer profile loop 
				
				// if all customer results are processed callback json
				if (customersResults.length === data.length) {
					callback(customersResults);
				} 
			}) // end of readfile function

		})//end loop for each file 

	})// end readdirectory

}// end of function 			
	 	
// Exports the filereader function
module.exports = jsonReader









