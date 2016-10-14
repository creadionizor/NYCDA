// Load the json-file-reader 
let pensionReader = require(__dirname + '/json-file-reader'); 

pensionReader(__dirname + '/customers.json', (customer) => {

	console.log(customer)

	// // Do the interest math
	// for (var i = customer.pension.duration - 1; i >= 0; i--) {
	// 	// Add monthly spend to all the scenarios		
	// 	customer.pension.endamount.pessimistic += (customer.finances.monthlyadd * 12);
	// 	customer.pension.endamount.average 	   += (customer.finances.monthlyadd * 12);
	// 	customer.pension.endamount.optimistic  += (customer.finances.monthlyadd * 12);

	// 	// Calculate the added interest
	// 	customer.pension.endamount.pessimistic *= (customer.pension.interest.pessimistic);
	// 	customer.pension.endamount.average     *= (customer.pension.interest.average);
	// 	customer.pension.endamount.optimistic  *= (customer.pension.interest.optimistic);
	// };

	// // Output our data
	// console.log("Welcome " + customer.name + " to our advanced pension planner!");
	// console.log("You are starting with €" + customer.finances.startcapital + " and add a monthly amount of €" + customer.finances.monthlyadd);
	// console.log("When you retire at age " + customer.pension.age + " you will have the following:");
	// // Scenario outcomes 
	// console.log("In a pessimistic scenario you will earn: €" + prettyNr(customer.pension.endamount.pessimistic));
	// console.log("In an average scenario you will earn: €" + prettyNr(customer.pension.endamount.average));
	// console.log("In an optimistic scenario you will earn: €" + prettyNr(customer.pension.endamount.optimistic));

	}
);

// // Making the numbers in the calculation pretty 

// // Round numbers in decimals
// let roundDecimal = (number) => {
// 	return Math.round((number * 100) / 100);
// };

// // Add Comma's to numbers
// let addCommas = (number) => {
// 	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

// // Add Comma's and round decimals
// let prettyNr = (number) => {
// 	return addCommas(roundDecimal(number));
// };

