var controller = require('./controller');
var passport = require('passport');
var router = require('express').Router();
var util = require('./util');


// Routes for signup, signin, and signout
router.post('/api/signup', controller.signup.post);

router.post('/api/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/api/signin' }));

router.post('/api/signout', controller.signout.post);

//Routes for parks
router.get('/api/grid', controller.grid.get);

router.get('/api/park/:parkName', controller.park.get);

router.get('/api/parkPhoto/:id', controller.parkPhoto.get);

//Routes for user timeline
router.get('/api/userTimeline', controller.userTimeline.get);


module.exports = router;
