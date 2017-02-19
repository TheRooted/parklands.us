var controller = require('./controller');
var passport = require('passport');
var router = require('express').Router();


/** SIGN UP, SIGN IN, SIGN OUT **/

// Routes for signup, signin, and signout
router.post('/api/signup', controller.signup.post);

router.post('/api/signin', controller.signin.post);

router.post('/api/signout', controller.signout.post);



/** LOADING COMPONENTS ON HOMEPAGE **/

// Routes for getting posts, tags, and categories in db
router.get('/api/posts', passport.authenticate('local'), controller.posts.get);



/** USER ACTIONS ON POST **/

// Routes for submitting a new post, deleting a post, upvoting a post, and downvoting a post
router.post('/api/upvote', passport.authenticate('local'), controller.upvote.post);

router.post('/api/downvote', passport.authenticate('local'), controller.downvote.post);



module.exports = router;