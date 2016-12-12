const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router = express.Router()


router.route('/about')
 	.get((req,res) => {
 		res.render('about')
  		}
	);

module.exports = router