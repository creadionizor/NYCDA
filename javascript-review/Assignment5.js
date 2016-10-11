// write a function that takes in three parameters and returns the sum of those three parameters

var findSum = function (number1,number2,number3) {
	return number1 + number2+number3;
}

console.log(findSum(4,10,11))

// given a string, create a function that returns the last character in that string.
// examples:
// "cattywampus" --> s

var turkish = "Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine"

function findLast (word) {
	return "The last character is: " + word.slice(-1)
}

console.log(findLast(turkish))

// write a function that takes in one parameter and returns the cube of that parameter
// examples:
// 3 --> 27
// 4 --> 64

function toPower (power){
	return Math.pow(power,power)
}

console.log(toPower(3)) 


// define a function that takes in a string and reverses it. you are not allowed to
// call the "reverse" function (or any other string functions)

function reverseWord(word) {
  var newword = '';
  for (var i = word.length - 1; i >= 0; i--)
    newword += word[i];
  return newword;
}

console.log(reverse(turkish))

// write a function that takes in two arrays of the same length as parameters. From those two arrays,
// create, then return an object which contains the elements of the first array as keys, and the
// elements of the second array as values.
// examples:
// ["exciting", "exotic"], ["markets", "britain"] --> { exciting: "markets", exotic: "britain" }
// ["a", "b", "c"], ["x", "y", "z"] --> { a: "x", b: "y", c: "z" }

var list1 = ["exciting", "exotic"]
var list2 = ["markets", "britain"]

function listMaker (one,two) {
		var theList= {}
	    for (var i=0; i < one.length; i++) {
	  		theList[list1[i]] = list2[i]
	}
	return theList
}

listMaker(list1,list2)

// Given an object with keys and values, create two arrays: one which contains the object's keys,
// and one which contains the object's values. Wrap this into a function which takes in one object
// that contains keys and values, and returns a different object that contains two keys. The first key
// should be named "keys" and will have the first array as a value. The second key should be named
// "values" and will have the second array as a value.


var list3 = {
	exciting: "markets",
	exotic: "britain"
}

function ultimateListMaker (one) {
		var ultimateList = {'keys': [], 'values':[]}
		for (var i in one) {
			ultimateList.keys.push(i)
			ultimateList.values.push(one[i])
		}
	return ultimateList
}

console.log(ultimateListMaker(list3))


// examples:
// { exciting: "markets", exotic: "britain" } --> { keys: ["exciting", "exotic"], values: ["markets", "britain"] }
// { a: "x", b: "y", c: "z" } --> { keys: ["a", "b", "c"], values: ["x", "y", "z"] }

