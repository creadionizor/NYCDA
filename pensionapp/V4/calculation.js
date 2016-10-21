// Calc function
function calculatePension (customer, callback) {
	let calculationResults = [];
	for (let x = customer.length - 1; x >= 0; x--) {

		for (let i = customer[x].pension.duration - 1; i >= 0; i--) {
			// Add monthly spend to all the scenarios		
			customer[x].pension.endamount.pessimistic += (customer[x].finances.monthlyadd * 12);
			customer[x].pension.endamount.average     += (customer[x].finances.monthlyadd * 12);
			customer[x].pension.endamount.optimistic  += (customer[x].finances.monthlyadd * 12);

			// Calculate the added interest
			customer[x].pension.endamount.pessimistic  *= (customer[x].pension.interest.pessimistic);
			customer[x].pension.endamount.average      *= (customer[x].pension.interest.average);
			customer[x].pension.endamount.optimistic   *= (customer[x].pension.interest.optimistic);
		}; // end of i loop - second loop

		// Output our data
		calculationResults.push({ 
			"name" : customer[x].name,
			"start" : customer[x].finances.startcapital,
			"montlyadd" : customer[x].finances.monthlyadd,
			"pensionage" :customer[x].pension.age,
			// Scenario outcomes 
			"pessimistic" : prettyNr(customer[x].pension.endamount.pessimistic),
			"average" : prettyNr(customer[x].pension.endamount.average),
			"optimistic" : prettyNr(customer[x].pension.endamount.optimistic)
		});// end of push

		if (calculationResults.length === customer.length) {
			callback(calculationResults);
		}; // end if statement

	};// end of x loop - first loop

}; // end of pension calculator 

// Number convertions 

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

// // Exports the filereader function
module.exports = calculatePension;

