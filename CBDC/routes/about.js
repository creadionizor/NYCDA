const express    =  require ('express')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const router     =  express.Router()

router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


router.route('/about')
 	.get((req,res) => {
 		res.render('about')
  		}
	);

module.exports = router