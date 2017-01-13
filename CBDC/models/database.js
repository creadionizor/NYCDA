// require modules
const sequelize = require( 'sequelize' )
const bcrypt = require('bcrypt-nodejs')


// Container object
let db = {
	module: {}
}


// Initiate database 
db.connection       =  new sequelize('pbdc', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres',
					});

// normal user 
db.user = db.connection.define('user', {
	firstname: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING 
})

db.model = db.connection.define('model', {
	name: sequelize.STRING,
	nationality: sequelize.STRING,
	price: sequelize.INTEGER
})

db.product = db.connection.define('product', {
	image: sequelize.STRING,
	brand: sequelize.STRING,
	productname: sequelize.STRING,
	description: sequelize.STRING,
	price: sequelize.INTEGER
})

db.selectedproduct = db.connection.define('selectedproduct', {
	brand: sequelize.STRING,
	productname: sequelize.STRING,
	description: sequelize.STRING,
})

db.selectedmodel = db.connection.define('selectedmodel', {
	name: sequelize.STRING,
	nationality: sequelize.STRING,
})


db.connection.sync( {force: true} ).then(
	() => { 
		console.log ( 'Synchronized' )
		bcrypt.hash('abc', null, null, (err,hash) =>{
			db.user.create({
				firstname: "a",
				lastname: "b",
				email:"a@b",
				password: hash
			}).then(()=>{
				makeproducts()
				makemodels()
			}).then(() => {
				console.log( 'Usain Bolt Created' )
			})
		})
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
)

module.exports = db



function makeproducts() { 

	db.product.create({
		image: 'images/products_bag1.jpg',
		brand: 'Celine',
		productname: 'Bag Nr. 1',
		description: 'This is a fancy pancy bag',
		price: 4000
	})

	db.product.create({
		image: 'images/products_bag2.jpg',
		brand: 'Chanel',
		productname: 'Bag Nr. 2',
		description: 'Tooooo expensive YAAA',
		price: 6500
	})

	db.product.create({
		image: 'images/products_bag3.jpg',
		brand: 'Prada',
		productname: 'Bag Nr. 3',
		description: 'This is a bag for a (rich) old women',
		price: 7000
	})

		db.product.create({
		image: 'images/products_bag3.jpg',
		brand: 'LALA LAND',
		productname: 'Bag Nr. 4',
		description: 'This bag is forbidden',
		price: 9000
	})
} 



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


