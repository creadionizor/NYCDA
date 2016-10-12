// PART 2 version with external json-file-reader
var readfile = require(__dirname + '/json-file-reader'); // require json-file-reader
var country = process.argv[2]; // country input on terminal 

// The Awesome json country reader
readfile(__dirname + '/countries/countries.json', function (json) {
	// loop though the json data
	for (var i = 0; i < json.length; i++) {
		// if the name of country (output) is similar to the country name (input)
		if (json[i].name === country) {
			// output the country name and the top level domain
			console.log('Country: ' + json[i].name + '\n' + 'Top Level Domain: ' + json[i].topLevelDomain)
		}
	}
})

// PART 1 version without external json-file reader

// var fs = require('fs'); // require the fs library
// var country = process.argv[2]; // country input on terminal 

// The Awesome Json file and country reader

// fs.readFile(__dirname + '/countries/countries.json', 'utf8', function(err,data){
// 	if (err) throw err;
// 	var json = JSON.parse(data);
// 	for (var i = 0; i < json.length; i++) {
// 			if (json[i].name === country) {
// 		 		console.log('Country: ' + json[i].name + '\n' + 'Top Level Domain: ' + json[i].topLevelDomain)
// 			}
// 		}
// });