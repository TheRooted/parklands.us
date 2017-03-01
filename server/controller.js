var db = require('../db/schema');


module.exports = {

  session: {
    get: function(req, res) {
      if (req.user) {
        console.log('there is a user')
        res.status(200).send(req.user);
      } else {
        console.log('there is not a user')
        res.sendStatus(201).end();
      }
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
      name = name.split('%20');
      name = name.join(' ');
      name = name.split('%E2%80%93');
      name = name.join('–');
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

  parklocations: {
    get: function(req, res) {
      db.models.park.findAll({})
      .then(function(parks) {
        res.send(parks);
      });
    },
    post: function(req, res) {
      db.models.park.findOne({
        where: {
          name: req.body.name
        }
      })
      .then(function(park) {
        res.send(park);
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
        //console.log('park photo is ', post);
        res.send(post);
      });
    },
    post: function (req, res) {
      console.log('req.body.filePath is', req.body.filePath);
      db.models.post.findOrCreate({
        where: {
          type: 'photo',
          voteCount: 1,
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
        //console.log('all user post are ', userPost);
        res.send(userPost);
      });
    }
  },

  postcomment: {
    get: function (req, res) {
      db.models.postcomment.findAll({})
      .then(function (comment) {
        //console.log('comment is ...', comment);
        res.send(comment);
      });
    }
  },

  photoLike: {
    post: function (req, res) {
      db.models.vote.findOne({where: {
        userId: req.body.userId,
        postId: req.body.postId
      } })
      .then(function (like) {
        // console.log('what is like', like)
        if (!like) {
          db.models.vote.create(req.body)
          .then(function (createdRow) {
            db.models.post.findOne({where: {id: req.body.postId }})
            .then(function(post) {
              // console.log('@@@@@post', post.dataValues.voteCount);
              db.models.post.update({
                voteCount: post.dataValues.voteCount + 1
              },
              {
                fields: ['voteCount'],
                where: {id: req.body.postId}
              })
              .then(function(response) {
                res.send({voteCount: post.dataValues.voteCount + 1})
              })
            })
          })
        } else {
          console.log('already voted, insert remove like logic here')
          like.destroy()
          .then(function() {
            db.models.post.findOne({where: {id: req.body.postId }})
            .then(function(post) {
              db.models.post.update({
                voteCount: post.dataValues.voteCount - 1
              },
              {
                fields: ['voteCount'],
                where: {id: req.body.postId}
              })
              .then(function(response) {
                res.send({voteCount: post.dataValues.voteCount - 1})
              })
            })
          })
        }
      })
    },

    get: function(req, res) {
      var totalVotes;
      // console.log('req.body in mount', req.query)
      db.models.post.findOne({where: {id: req.query.postId }})
      .then(function (post) {
        totalVotes = post.dataValues.voteCount;
        db.models.vote.findOne({where:
          {
            userId: req.query.userId,
            postId: req.query.postId
          }
        }).then(function(userLiked) {
          if (userLiked) {
            res.send({
              voteCount: totalVotes,
              userLiked: true
            });
          } else {
            res.send({
              voteCount: totalVotes,
              userLiked: false
            });
          }
        })

      })
    }

  }
};

// db.Alert.update(
//   { url: url },
//   {
//     fields: ['url'],
//     where: {id: id}
//   }
// );
