var controller = require('./controller');
var passport = require('./passport');
var router = require('express').Router();


// Routes for signup, signin, and signout
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/signup' }));
router.post('/signin', passport.authenticate('local-signin', { successRedirect: '/', failureRedirect: '/signin' }));
router.post('/signout', passport.authenticate('local-signout', { successRedirect: '/signin', failureRedirect: '/signin' }));

// Route to check and get active session user
router.get('/api/session', controller.session.get);

// Routes for parks
router.get('/api/grid', controller.grid.get);
router.get('/api/park/:parkName', controller.park.get);
router.get('/api/parkPhoto/:id', controller.parkPhoto.get);
router.get('/api/parkPhotoPost/:id', controller.parkPhotoPost.get);
router.get('/api/parkComment/:id', controller.parkComment.get);
router.get('/api/parkAverageRating/:id', controller.parkAverageRating.get);
//Routes for snp Page
router.get('/api/rating', controller.rating.get);

router.post('/api/rating', controller.rating.post);

// router.get('/api/parkAlert/:id', controller.parkAlert.get);

// Routes for user timeline
router.get('/api/userTimeline', controller.userTimeline.get);
router.post('/api/userTimeline', controller.userTimeline.post);

// Routes for likes on photos
router.get('/api/photoLike', controller.photoLike.get);
router.post('/api/photoLike', controller.photoLike.post);

// Routes for user user feed
router.get('/api/userfeed', controller.userfeed.get);

// Routes for post comment
router.get('/api/postcomment', controller.postcomment.get);

//Routes for user name
router.get('/api/username', controller.username.get);

// Routes for map
router.get('/api/parklocations', controller.parklocations.get);


module.exports = router;
