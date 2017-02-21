var db = require('../db/schema');
var express = require('express');
var parser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = require('./routes');


var app = express();

// middleware
app.use(parser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('', router);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    db.models.user.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
