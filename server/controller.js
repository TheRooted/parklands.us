var db = require('../db/schema');


module.exports = {

  signup: {
    post: function() {
      console.log('signup post');
    }
  },

  signin: {
    post: function() {
      console.log('signin post')
    }
  },

  signout: {
    post: function() {
      console.log('singout post')
    }
  },



};