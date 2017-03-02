var controller = require('./controller');
var passport = require('./passport');
var router = require('express').Router();
var path = require('path');


//seed online db
// var seed = require('./../db/seed.js');
// router.get(path.resolve(__dirname, '/api/seedDB'), seed);
// Routes for signup, signin, and signout

router.post(path.resolve(__dirname, '/signup'), passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/signup' }));
router.post(path.resolve(__dirname, '/signin'), passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/signin' }));
router.post(path.resolve(__dirname, '/signout'), passport.authenticate('local-signout', { successRedirect: '/signin', failureRedirect: '/signin' }));

// Route to check and get active session user
router.get(path.resolve(__dirname, '/api/session'), controller.session.get);

// Routes for parks
router.get(path.resolve(__dirname, '/api/grid'), controller.grid.get);
router.get(path.resolve(__dirname, '/api/park/:parkName'), controller.park.get);
router.get(path.resolve(__dirname, '/api/parkPhoto/:id'), controller.parkPhoto.get);
router.get(path.resolve(__dirname, '/api/parkPhotoPost/:id'), controller.parkPhotoPost.get);
router.get(path.resolve(__dirname, '/api/parkComment/:id'), controller.parkComment.get);

//Routes for snp Page
router.get(path.resolve(__dirname, '/api/rating'), controller.rating.get);

//Routes for snp Page Ratings
;

router.post(path.resolve(__dirname, '/api/rating'), controller.rating.post);

//Routes for snp page park reviews
router.post(path.resolve(__dirname,'/api/parkReview'), controller.parkReview.post);

// router.get('/api/parkAlert/:id', controller.parkAlert.get);

// Routes for user timeline
router.get(path.resolve(__dirname, '/api/userTimeline'), controller.userTimeline.get);
router.post(path.resolve(__dirname, '/api/userTimeline'), controller.userTimeline.post);

// Routes for likes on photos
router.get(path.resolve(__dirname, '/api/photoLike'), controller.photoLike.get);
router.post(path.resolve(__dirname, '/api/photoLike'), controller.photoLike.post);

// Routes for user user feed
router.get(path.resolve(__dirname, '/api/userfeed'), controller.userfeed.get);

// Routes for post comment
router.get(path.resolve(__dirname, '/api/postcomment'), controller.postcomment.get);
router.post(path.resolve(__dirname, '/api/postcomment'), controller.postcomment.post);

//Routes for user name
router.get(path.resolve(__dirname, '/api/username'), controller.username.get);

// Routes for map
router.get(path.resolve(__dirname, '/api/parklocations'), controller.parklocations.get);

module.exports = router;
