var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

module.exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    // User must be redirected to Signin page
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser.dataValues;
    res.status(201).send({
      username: newUser.dataValues.username,
      userId: newUser.dataValues.id });
  });
};