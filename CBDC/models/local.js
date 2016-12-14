const express       = require('express');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        =  require('bcrypt-nodejs')
const db            = require('./database');

// This function validates password
let validPw = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

passport.use( new LocalStrategy ( {
    	 usernameField: 'email'
    },
    function(email, password, done) {
        console.log('email: ' + email + ' password: ' + password)
    	db.user.find( { 
            where: {
                'email' : email
            }
        }).then(
    		function(user) {
                console.log( user )
    			if (!user){
                    console.log('User Not Found with email ');
                    return done(null, false);                 
                }
                if (!validPw(user, password)){
                    console.log('Invalid Password');
                    return done(null, false); 
                }
                console.log('found user')
                return done(null, user);
            },
            function(err) {
                console.log(err)
            	return done(err);
            });
    })
);


passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
    db.user.find( { 
        where: { 
            id: id
        }
    }).then(
        function(user) { 
            done(null, user) 
        },
        function(err) { 
            done(err, null) 
        }
    );
});

module.exports = passport