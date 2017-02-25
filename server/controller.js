var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/schema');
var util = require('./util');
var saltRounds = 10;


module.exports = {

  signout: {
    post: function(req, res) {
      req.session.destroy(function() {
        res.sendStatus(200);
      });
    }
  },

  grid: {
    get: function(req, res) {
      db.models.park.findAll({})
      .then(function(parks) {
        res.send(parks);
      });
    }
  },

  park: {
    get: function(req, res) {
      var name = req.url.split('/');
      name = name[name.length-1];
      db.models.park.findOne({
        where: {name: name}
      }).then(function(park) {
        res.send(park);
      });
    }
  },

  parkPhoto: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      db.models.parkphoto.findAll({
        where: {parkId: id}
      }).then(function(photos) {
        res.send(photos);
      });
    }
  },

  parkPhotoPost: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      db.models.post.findAll({
        where: {parkId: id}
      }).then(function(photos) {
        res.send(photos);
      });
    }
  },


  parkComment: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      console.log('id inside parkComment controller:', id);
      db.models.parkcomment.findAll({
        where: {parkId: id}
      }).then(function(comments) {
        res.send(comments);
      });
    }
  },

  // parkAlert: {
  //   get: function(req, res) {
  //     var id = req.url.split('/');
  //     id = id[id.length-1];
  //     console.log('id inside parkAlert controller:', id)
  //     db.models.park.findOne({
  //       where: {id: id}
  //     }).then(function(park) {
  //       console.log('park alertUrl inside parkAlert: ', park.alertUrl);
  //       request(park.alertUrl, function (error, response, html) {
  //         if (error) {
  //           console.log('Error requesting url', error);
  //         } else {
  //           var $ = cheerio.load(html);
  //           console.log($('.Alerts-severity-header'))
  //           res.end();
  //         }
  //       })
  //     })
  //   }
  // },

  // user: {
  //   get: function(req, res) {
  //     var id = req.url.split('/');
  //     id = id[id.length-1];
  //     db.models.user.findOne({
  //       where: {userId: id}
  //     }).then(function(comments) {
  //       console.log(comments);
  //       res.send(comments)
  //     })
  //   }
  // },

  userTimeline: {
    get: function (req, res) {
      db.models.post.findAll({})
      .then(function (post) {
        console.log('park photo is ', post);
        res.send(post);
      });
    },
    post: function (req, res) {
      console.log('req.body.filePath is', req.body.filePath);
      db.models.post.findOrCreate({
        where: {
          type: 'photo',
          userId: 1,
          parkId: 1,
          filePath: req.body.filePath
        }
      });
    }
  },

  userfeed : {
    get: function (req, res) {
      db.models.post.findAll({})
      .then(function (userPost) {
        console.log('all user post are ', userPost);
        res.send(userPost);
      });
    }
  }
};
