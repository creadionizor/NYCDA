let fs = require('fs'); // Require FS library
let Chance = require('chance'), // Require Chance module
    chance = new Chance();

// random number generator
let randomNumber = (min, max) => {
	return Math.round(Math.random() * (max-min) + min)
}

// random user generator
function randomCustomer (number, callback) {
	// for loop that creates the amount of users
	for (let i = number - 1; i >= 0; i--) {
		
		let user = [];

		// create a new reandom user 
		user.push({
			"name" : chance.name(),
			"age" : randomNumber(15, 50),
			"finances" : {
				"startcapital" : randomNumber(1000, 10000),
				"monthlyadd" : randomNumber(200, 2000)
			},
			"pension" : {
				"age" : randomNumber(55, 75),
				"interest" : {
					"pessimistic" : 1.02,
					"average": 1.04,
					"optimistic" : 1.08
				}
			}
		}); // end of new user generator 

		// write the user data to a JSON file in customers map
		fs.writeFile(__dirname + '/customers/customer' + [i] + '.json', JSON.stringify(user), 'utf8', (err,data) =>{
			if (err) throw err;
			else {
				console.log("User " + [i] + " was created!")
			};
			if (i === 0) {
				callback();
				console.log("Succesfully created all users!")
			};
		});
	};// end of for loop
}; //end of function

module.exports = randomCustomer;

