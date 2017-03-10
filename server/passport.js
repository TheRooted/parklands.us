var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var bcrypt = require('bcrypt');


// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.models.user.findOne({ where: { id: id } })
  .then((user, err) => {
    done(null, user.dataValues);
  })
  .catch((err) => {
    return done(err);
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
(req, email, password, done) => {

  process.nextTick(() => {
    // Check whether account already exists for submitted email
    db.models.user.findOne({ where: { email: email }})
    .then((user, err) => {
      if (err) {
        return done(err);
      // Email already registered
      } else if (user !== null) {
        return done(null, false, { message: 'This email already has an account. Please sign in.' });
      // No account registered for that email
      } else {
        // Hash password and save account
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            return done(err);
          } else {
            db.models.user.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: email,
              password: hash
            })
            // Create session
            .then((user) => {
              return done(null, user.dataValues, req);
            })
            .catch((err) => {
              return done(err);
            });
          }
        });
      }
    })
    .catch((err) => {
      return done(err);
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
  (req, email, password, done) => {
    process.nextTick(() => {

      // Find user by email submitted
      db.models.user.findOne({ where: { email: email }})
      .then((user, err) => {
        if (err) { 
          return done(err); 
        // Email entered incorrectly or user is not registered
        } else if (user === null || !user.dataValues.email) {
          return done(null, false, { message: 'Incorrect email.' });
        } else {
          // Compare password supplied with db password for selected user
          bcrypt.compare(password, user.dataValues.password, (err, comparison) => {
            if (err) {
              return done(err);
            // Alert incorrect password
            } else if (comparison === false) {
              return done(null, false, { message: 'Incorrect password.' });
            // Email registered and password matches
            } else {
              return done(null, user.dataValues, req);
            }
          });
        }
      })
      .catch((err) => {
        return done(null, err);
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
  (req, email, password, done) => {
    req.session.destroy();
    req.logout();
    return done(null, false, { message: 'Successfully signed out.' }, req);
  }
));


module.exports = passport;

