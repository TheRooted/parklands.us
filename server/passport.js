var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var bcrypt = require('bcrypt');



// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  db.models.user.findById({ where: { id: id } })
  .then(function(user) {
    done(null, user);
  });
});

// Define local auth strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {

      // Find user by email submitted
      db.models.user.findOne({ where: { email: email }})
      .then(function(user, err) {
        if (err) { 
          return done(err); 
        }

        // Email entered incorrectly or user is not registered
        if (user === null || !user.dataValues.email) {
          console.log('Incorrect email or missing user');
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Compared password supplied with db password for selected user
        bcrypt.compare(password, user.dataValues.password, function(err, comparison) {
          if (err) {
            console.log('Error in password comparison', err);
          }

          // Alert incorrect password
          if (comparison === false) {
            return done(null, false, { message: 'Incorrect password.' });

          // Email registered and password matches
          } else {
            console.log('Everything was okay!')
            return done(null, user.dataValues, req);
          }
        });
      });
    })
  }
));

module.exports = passport;
