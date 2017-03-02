var express = require('express');
var session = require('express-session');
var parser = require('body-parser');
var passport = require('passport');
var router = require('./routes');
var path = require('path');

var app = express();


// Passport middleware
app.use(parser.urlencoded({ extended: true }) );
app.use(parser.json());
app.use(session({  
  secret: 'saucecat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires: new Date(Date.now() + (60 * 60 * 1000)),
    maxAge: 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('', router);

// Serve static file
app.use(express.static('public'));

app.get('*', (req, res, next) => {
   if(req.path.split('/')[1] === 'static') return next();
   res.sendFile(path.resolve(__dirname, '../public/index.html'));
});


var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
