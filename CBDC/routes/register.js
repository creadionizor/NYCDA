const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router = express.Router()


router.route('/register')
 	.get((req,res) => {
 		res.render('register')
  		}
	);


module.exports = router