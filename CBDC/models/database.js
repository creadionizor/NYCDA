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
	brand: sequelize.STRING,
	productname: sequelize.STRING,
	description: sequelize.STRING,
	price: sequelize.INTEGER
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
			}).then(() => {
				console.log( 'Usain Bolt Created' )
			})
		})
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
)


module.exports = db