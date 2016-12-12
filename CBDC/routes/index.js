const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router = express.Router()


router.route('/')
 	.get((req,res) => {
 		res.render('index')
  		}
	);

router.route('/index')
 	.get((req,res) => {
 		res.render('index')
  		}
	);

module.exports = router