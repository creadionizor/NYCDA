// Load the json-file-reader 
let pensionReader = require(__dirname + '/json-file-reader'); 

pensionReader(__dirname + '/customers.json', (customer) => {

	for (let x = customer.length - 1; x >= 0; x--) {

		for (let i = customer[x].pension.duration - 1; i >= 0; i--) {
		
			// Add monthly spend to all the scenarios		
			customer[x].pension.endamount.pessimistic += (customer[x].finances.monthlyadd * 12);
			customer[x].pension.endamount.average += (customer[x].finances.monthlyadd * 12);
			customer[x].pension.endamount.optimistic += (customer[x].finances.monthlyadd * 12);

			// Calculate the added interest
			customer[x].pension.endamount.pessimistic *= (customer[x].pension.interest.pessimistic);
			customer[x].pension.endamount.average *= (customer[x].pension.interest.average);
			customer[x].pension.endamount.optimistic *= (customer[x].pension.interest.optimistic);
		}// end of pension duration loop 

	// Output our data
		console.log("Welcome " + customer[x].name + " to our advanced pension planner!");
		console.log("You are starting with €" + customer[x].finances.startcapital + " and add a monthly amount of €" + customer[x].finances.monthlyadd);
		console.log("When you retire at age " + customer[x].pension.age + " you will have the following:");
	// Scenario outcomes 
		console.log("In a pessimistic scenario you will earn: €" + prettyNr(customer[x].pension.endamount.pessimistic));
		console.log("In an average scenario you will earn: €" + prettyNr(customer[x].pension.endamount.average));
		console.log("In an optimistic scenario you will earn: €" + prettyNr(customer[x].pension.endamount.optimistic)+ "\n");
	}
});//end of pension reader 


// Round numbers in decimals
let roundDecimal = (number) => {
	return Math.round((number * 100) / 100);
};

// Add Comma's to numbers
let addCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Add Comma's and round decimals
let prettyNr = (number) => {
	return addCommas(roundDecimal(number));
};
		


