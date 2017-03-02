var controller = require('./controller');
var passport = require('./passport');
var router = require('express').Router();
var path = require('path');


//seed online db
var seed = require('./../db/seed.js');
router.get(__dirname + '/api/seedDB', seed);
// Routes for signup, signin, and signout
router.post(__dirname + '/signup', passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/signup' }));
router.post(__dirname + '/signin', passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/signin' }));
router.post(__dirname + '/signout', passport.authenticate('local-signout', { successRedirect: '/signin', failureRedirect: '/signin' })); 

// Route to check and get active session user
router.get(__dirname + '/api/session', controller.session.get);

// Routes for parks
router.get(__dirname + '/api/grid', controller.grid.get);
router.get(__dirname + '/api/park/:parkName', controller.park.get);
router.get(__dirname + '/api/parkPhoto/:id', controller.parkPhoto.get);
router.get(__dirname + '/api/parkPhotoPost/:id', controller.parkPhotoPost.get);
router.get(__dirname + '/api/parkComment/:id', controller.parkComment.get);

//Routes for snp Page
router.get(__dirname + '/api/rating', controller.rating.get);

router.post(__dirname + '/api/rating', controller.rating.post);

// router.get('/api/parkAlert/:id', controller.parkAlert.get);

// Routes for user timeline
router.get(__dirname + '/api/userTimeline', controller.userTimeline.get);
router.post(__dirname + '/api/userTimeline', controller.userTimeline.post);

// Routes for likes on photos
router.get(__dirname + '/api/photoLike', controller.photoLike.get)
router.post(__dirname + '/api/photoLike', controller.photoLike.post);

// Routes for user user feed
router.get(__dirname + '/api/userfeed', controller.userfeed.get);

// Routes for post comment
router.get(__dirname + '/api/postcomment', controller.postcomment.get);

//Routes for user name
router.get(__dirname + '/api/username', controller.username.get);

// Routes for map
router.get(__dirname + '/api/parklocations', controller.parklocations.get);


module.exports = router;
