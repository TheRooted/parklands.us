var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var bcrypt = require('bcrypt');



// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Define local auth strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    process.nextTick(function() {
      db.models.user.findOne({ where: { email: username }})
      .then(function(user, err) {
        if (err) { 
          return done(err); 
        }
        if (user === null || !user.dataValues.email) {
          console.log('Incorrect email or missing user');
          return done(null, false, { message: 'Incorrect email.' });
        }
        bcrypt.compare(password, user.dataValues.password, function(err, comparison) {
          if (err) {
            console.log('Error in password comparison', err);
          }
          // Supplied password matches, user already has account; send to Signin page
          if (comparison === false) {
            return done(null, false, { message: 'Incorrect password.' });
          // Supplied pw doesn't match; probably new user & should choose another username
          } else {
            console.log('Everything was okay!')
            return done(null, user.dataValues);
          }
        });
      });
    })
  }
));

module.exports = passport;
