var controller = require('./controller');
var passport = require('./passport');
var router = require('express').Router();
var util = require('./util');

// Routes for signup, signin, and signout
router.post('/signup', controller.signup.post);

router.post('/signin', passport.authenticate('local', function(msg, user, req) {
  console.log('back in routes, args', arguments);

}));

// router.post('/signin', passport.authenticate('local'), function(req, res, next) {
//   console.log('back in routes, args', arguments);
// });

router.post('/signout', controller.signout.post);

//Routes for parks
router.get('/api/grid', controller.grid.get);

router.get('/api/park/:parkName', controller.park.get);

router.get('/api/parkPhoto/:id', controller.parkPhoto.get);

router.get('/api/parkPhotoPost/:id', controller.parkPhotoPost.get);

router.get('/api/parkComment/:id', controller.parkComment.get);

// router.get('/api/parkAlert/:id', controller.parkAlert.get);

//Routes for accessing user
// router.get('/api/user/:id', controller.user.get);

//Routes for user timeline
router.get('/api/userTimeline', controller.userTimeline.get);
router.post('/api/userTimeline', controller.userTimeline.post);

router.get('/api/userfeed', controller.userfeed.get);

module.exports = router;
