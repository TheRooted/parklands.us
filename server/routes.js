var controller = require('./controller');
var passport = require('passport');
var router = require('express').Router();


// Routes for signup, signin, and signout
router.post('/api/signup', controller.signup.post);

router.post('/api/signin', controller.signin.post);

router.post('/api/signout', controller.signout.post);

//Routes for parks
router.get('/api/grid', controller.grid.get);


module.exports = router;
