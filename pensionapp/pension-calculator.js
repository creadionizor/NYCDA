	




	// Making the numbers in the calculation pretty 

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

