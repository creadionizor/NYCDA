const sequelize = require( 'sequelize' )
const express       = require('express');
const db            = require('./database');


function makemodels() {

	db.model.create({
		name: 'Mario',
		nationality: 'Italian',
		price: 5000
	})

	db.model.create({
		name: 'Luigi',
		nationality: 'German',
		price: 5000
	})


	db.model.create({
		name: 'Tina',
		nationality: 'Swedish',
		price: 5000
	})


	db.model.create({
		name: 'Turner',
		nationality: 'Dutch',
		price: 5000
	})

}

module.exports = makemodels

