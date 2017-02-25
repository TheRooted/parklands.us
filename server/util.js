// var bcrypt = require('bcrypt');

// // var isLoggedIn = function(req) {
// //   return req.session ? !!req.session.user : false;
// // };

// // module.exports.checkUser = function(req, res, next){
// //   if (!isLoggedIn(req)) {
// //     // User must be redirected to Signin page
// //     res.sendStatus(401);
// //   } else {
// //     next();
// //   }
// // };

// // module.exports.createSession = function(req, res, newUser) {
// //   return req.session.regenerate(function() {
// //     req.session.user = newUser.dataValues;
// //     res.status(201).send({
// //       username: newUser.dataValues.username,
// //       userId: newUser.dataValues.id });
// //   });
// // };

// var saltRounds = 10;

// // generating a hash
// module.exports.generateHash = function(password) {
//   return bcrypt.hash(password, saltRounds, function(err, comparison) {
//     if (err) {
//       return done(err);
//     }
//     // Alert incorrect password
//     if (comparison === false) {
//       return done(null, false, { message: 'Incorrect password.' });
//     // Email registered and password matches
//     } else {
//       console.log('Found you!')
//       return done(null, user.dataValues, req);
//     }
//   });
// };

// // checking if password is valid
// module.exports.validPassword = function(user, password, dbPassword, done) {
//   return bcrypt.compare(password, dbPassword, function(err, comparison) {
//     if (err) {
//       return done(err);
//     }
//     // Alert incorrect password
//     if (comparison === false) {
//       return done(null, false, { message: 'Incorrect password.' });
//     // Email registered and password matches
//     } else {
//       console.log('Found you!')
//       return done(null, user.dataValues, req);
//     }
//   });
// };
