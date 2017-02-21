var express = require('express');
var session = require('express-session');
var parser = require('body-parser');
var passport = require('passport');
var router = require('./routes');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var bcrypt = require('bcrypt');
// var RedisStore = require('connect-redis')(session)

var app = express();


// Passport middleware
app.use(parser.json());

app.use(session({  
  secret: 'saucecat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    process.nextTick(function() {
      db.models.user.findOne({ where: { email: username }})
      .then(function(user, err) {
        console.log('user is', user);
        if (err) { return done(err); }
        if (!user.dataValues.email) {
          console.log('in email');
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
            console.log('everything was okay!')
            return done(null, user.dataValues);
            // return done(user.dataValues);
          }
        });
      });
    })
  }
));

// Routing
app.use('', router);

// Serve static file
app.use(express.static('public'));


var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
