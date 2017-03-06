var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var bcrypt = require('bcrypt');


// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  console.log('serialize user', user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize')
  db.models.user.findOne({ where: { id: id } })
  .then(function(user) {
    console.log('deser user', user.dataValues)
    done(null, user.dataValues);
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
  console.log('local-signup')
  var first = req.body.firstName;
  var last = req.body.lastName;

  process.nextTick(function() {
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
            return done(err);
          } else {
            db.models.user.create({
              firstName: first,
              lastName: last,
              email: email,
              password: hash
            })
            // Create session
            .then(function(user) {
              console.log('all good!');
              return done(null, user.dataValues, req);
            })
            .catch(function(err) {
              return done(null, err, req);
            });
          }
        });
      }
    })
    .catch(function(err) {
      return done(null, err, req);
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
    console.log('local-signin')
    // console.log('req', req)
    process.nextTick(function() {

      // Find user by email submitted
      db.models.user.findOne({ where: { email: email }})
      .then(function(user, err) {
        if (err) { 
          return done(err); 
        }
        // Email entered incorrectly or user is not registered
        if (user === null || !user.dataValues.email) {
          console.log('user is null or no email');
          return done(null, false, { message: 'Incorrect email.' });
        }
        // Compare password supplied with db password for selected user
        bcrypt.compare(password, user.dataValues.password, function(err, comparison) {
          if (err) {
            return done(err);
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
      })
      .catch(function(err) {
        return done(err);
      });
    })
  }
));

//************************************//
//          Signout Strategy          //
//************************************//

passport.use('local-signout', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},
  function(req, email, password, done) {
    console.log('local-signout');
    req.session.destroy();
    req.logout();
    return done(null, false, { message: 'Successfully signed out.' }, req);
  }
));


module.exports = passport;

