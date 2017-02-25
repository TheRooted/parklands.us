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


//************************************//
//          Signup Strategy           //
//************************************//

var saltRounds = 10;

passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {

  var first = req.body.firstName;
  var last = req.body.lastName;

  process.nextTick(function() {
    // Reject if user left email or password blank
    if (email === '' || password === '') {
      done(null, false, { message: 'Please enter an email and a password.'});
    }
    // Check whether account already exists for submitted email
    db.models.user.findAll({ where: { email: email }})
    .then(function(user, err) {
      if (err) {
        return done(err);
      }
      // Email already registered
      if (user.dataValues) {
        return done(null, false, { message: 'An account is already registered to that email. Please sign in.' });
      // No account registered for that email
      } else {
        // Hash password and save account
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
            return done(null, false, { message: 'We messed up! Please try again.'});
          } else {
            db.models.user.create({
              firstName: first,
              lastName: last,
              email: email,
              password: hash
            })
            // Create session
            .then(function(user) {
              return done(null, user.dataValues, req);
            });
          }
        });
      }
    });
  });
}));

//************************************//
//          Signin Strategy           //
//************************************//


passport.use('local-signin', new LocalStrategy({
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
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Compared password supplied with db password for selected user
        bcrypt.compare(password, user.dataValues.password, function(err, comparison) {
          if (err) {
            return done(null, false, { message: 'We messed up! Please try again.'});
          }

          // Alert incorrect password
          if (comparison === false) {
            return done(null, false, { message: 'Incorrect password.' });

          // Email registered and password matches
          } else {
            console.log('Found you!')
            return done(null, user.dataValues, req);
          }
        });
      });
    })
  }
));


module.exports = passport;
