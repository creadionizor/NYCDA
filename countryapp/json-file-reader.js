var fs = require('fs'); // Require FS library

// The Awesome JSON File reader 
function filereader (filename, callback) {
	// read the json file
	fs.readFile(filename, 'utf8', function(err,data){
	// if cannot read error
	if (err) throw err;
	// parse the json file 
	var json = JSON.parse(data);
	// callback json
	callback(json);
	})
} 

// Exports the filereader function
module.exports = filereader






