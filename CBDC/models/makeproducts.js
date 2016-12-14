const sequelize = require( 'sequelize' )
const express       = require('express');
const db            = require('./database');


function makeproducts() { 

	db.product.create({
		brand: 'Celine',
		productname: 'Bag Nr. 1',
		description: 'This is a fancy pancy bag',
		price: 4000
	})

	db.product.create({
		brand: 'Chanel',
		productname: 'Bag Nr. 2',
		description: 'The Price of this bag makes my head spin',
		price: 6500
	})

	db.product.create({
		brand: 'Prada',
		productname: 'Bag Nr. 3',
		description: 'This is a bag for a (rich) old women',
		price: 7000
	})
} 

module.exports = makeproducts