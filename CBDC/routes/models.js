const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router     =  express.Router()

router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


router.route('/models')
 	.get((req,res) => {
 		res.render('models')
  		}
	);

module.exports = router