var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var util = require('./util');
var request = require('request');
var cheerio = require('cheerio');
var saltRounds = 10;


module.exports = {

  signup: {
    post: function(req, res) {
      console.log('signup controller, req.body', req.body)
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var email = req.body.email;
      var password = req.body.password;

      // If username or password left blank, send back 400: Bad request
      if (email === '' || password === '') {
        res.sendStatus(400);

      } else {
        // Check database for supplied username
        db.models.user.findAll({
          where: { email: email }
        })
        .then(function(users) {
          // Username is free; hash password
          if (users.length === 0) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              } else {
                // Add new user to database
                db.models.user.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: hash
                })

                // Create session and send back 201: Created code
                .then(function(user) {
                  util.createSession(req, res, user);
                });
              }
            });

          // Username is already in db; compare supplied password to pw in db
          } else {
            bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
              if (err) {
                console.log('Error in password comparison', err);
              }

              // Supplied password matches, user already has account; send to Signin page
              if (comparison === true) {
                res.sendStatus(204);

              // Supplied pw doesn't match; probably new user & should choose another username
              } else {
                res.sendStatus(401);
              }
            });
          }
        });
      }
    }
  },

  // signin: {
  //   post: function() {
  //     console.log('signin post')
  //     passport.use(new LocalStrategy({
  //       usernameField: 'email',
  //       passwordField: 'password'
  //     },
  //     function(username, password, done) {
  //       db.models.user.findOne({ email: email }, function (err, user) {
  //         if (err) { return done(err); }
  //         if (!user) {
  //           return done(null, false, { message: 'Incorrect username.' });
  //         }
  //         if (!user.validPassword(password)) {
  //           return done(null, false, { message: 'Incorrect password.' });
  //         }
  //         return done(null, user);
  //       });
  //     }
  //   ));
  //   }
  // },

  signout: {
    post: function(req, res) {
      req.session.destroy(function() {
        res.sendStatus(200);
      });
    }
  },

  grid: {
    get: function(req, res) {
      db.models.park.findAll({})
      .then(function(parks) {
        res.send(parks);
      });
    }
  },

  park: {
    get: function(req, res) {
      var url = req.url.split('/');
      url = url[url.length-1];
      db.models.park.findOne({
        where: {name: url}
      }).then(function(park) {
        res.send(park);
      });
    }
  },

  parkPhoto: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      db.models.post.findAll({
        where: {parkId: id}
      }).then(function(photos) {
        res.send(photos);
      });
    }
  },

  parkComment: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      console.log('id inside parkComment controller:', id)
      db.models.parkcomment.findAll({
        where: {parkId: id}
      }).then(function(comments) {
        res.send(comments)
      })
    }
  },

  parkAlert: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      console.log('id inside parkAlert controller:', id)
      db.models.park.findOne({
        where: {id: id}
      }).then(function(park) {
        console.log('park alertUrl inside parkAlert: ', park.alertUrl);
        request(park.alertUrl, function (error, response, html) {
          if (error) {
            console.log('Error requesting url', error);
          } else {
            var $ = cheerio.load(html);
          }
        })
      })
    }
  },

  // user: {
  //   get: function(req, res) {
  //     var id = req.url.split('/');
  //     id = id[id.length-1];
  //     db.models.user.findOne({
  //       where: {userId: id}
  //     }).then(function(comments) {
  //       console.log(comments);
  //       res.send(comments)
  //     })
  //   }
  // },

  userTimeline: {
    get: function (req, res) {
      db.models.parkphoto.findAll({})
      .then(function (parkPhoto) {
        console.log('park photo is ', parkPhoto);
        res.send(parkPhoto);
      });
    }
  }
};
