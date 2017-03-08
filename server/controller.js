var db = require('../db/schema');
var Promise = require('bluebird');

module.exports = {

  session: {
    get: function(req, res) {
      process.nextTick(function() {
        if (req.user) {
          // TODO: REMOVE THIS CONSOLE LOG
          console.log('there is a user', req.user);
          res.status(200).send(req.user);
        } else {
          console.log('there is not a user');
          res.sendStatus(201).end();
        }
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
      name = name.split('%20');
      name = name.join(' ');
      name = name.split('%E2%80%93');
      name = name.join('–');
      // For Haleakalā National Park:
      name = name.split('%C4%81');
      name = name.join('ā')
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
      db.models.parkcomment.findAll({
        where: {parkId: id}
      }).then(function(comments) {
        res.send(comments);
      });
    }
  },

  parkAverageRating: {
    get: function(req, res) {
      var id = req.url.split('/');
      id = id[id.length-1];
      db.models.park.findOne({
        where: {id: id}
      }).then(function(park) {
        res.send({rating: park.dataValues.rating});
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

  // user: {
  //   get: function(req, res) {
  //     var id = req.url.split('/');
  //     id = id[id.length-1];
  //     db.models.user.findOne({
  //       where: {userId: id}
  //     }).then(function(comments) {
  //       res.send(comments)
  //     })
  //   }
  // },

  userTimeline: {
    get: function (req, res) {
      db.models.post.findAll({
        where: {
          userId: req.query.userId
        }
      })
      .then(function (post) {
        res.send(post);
      });
    },
    post: function (req, res) {
      db.models.post.findOrCreate({
        where: {
          type: 'photo',
          voteCount: 0,
          userId: req.body.userId,
          parkId: req.body.parkId,
          filePath: req.body.filePath,
          description: req.body.description,
          firstName: req.body.firstName
        }
      }).then(function () {
        res.end();
      });
    }
  },

  userfeed: {
    get: function (req, res) {
      db.models.post.findAll({})
      .then(function (userPost) {
        res.send(userPost);
      });
    }
  },

  username: {
    get: function (req, res) {
      db.models.user.findOne({
        where: {
          id: parseInt(req.query.userId)
        }
      }).
      then(function (user) {
        //console.log('user isssss ', user);
        res.send(user);
      });
    }
  },

  postcomment: {
    get: function (req, res) {
      db.models.postcomment.findAll({
        where: {
          postId: parseInt(req.query.postId)
        }
      })
      .then(function (comment) {
        res.send(comment);
      });
    },
    post: function (req, res) {
      db.models.postcomment.create(req.body)
      .then(function (response) {
        res.send(response);
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
        if (!like) {
          db.models.vote.create(req.body)
          .then(function (createdRow) {
            db.models.post.findOne({where: {id: req.body.postId }})
            .then(function(post) {
              db.models.post.update({
                voteCount: post.dataValues.voteCount + 1
              },
              {
                fields: ['voteCount'],
                where: {id: req.body.postId}
              })
              .then(function(response) {
                res.send({voteCount: post.dataValues.voteCount + 1});
              });
            });
          });
        } else {
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
                res.send({voteCount: post.dataValues.voteCount - 1});
              });
            });
          });
        }
      });
    },

    get: function(req, res) {
      var totalVotes;
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
        });

      });
    }
  },

  userNameFromPostId: {
    get: function (req, res) {
      // req.query === postId
      db.models.post.findOne({
        where: {
          id: req.query.postId
        }
      }).then(function(post) {
        db.models.user.findOne({
          where: {
            id: post.userId
          }
        }).then(function(user) {
          res.send(user);
        })
      })
    }
  },

  rating: {
    post: function (req, res) {
      // for average rating of overall park
      var average;
      var starContainer = [];
      // if the rating is zero, find and delete the row
      if (req.body.ratingVal === 0) {
        db.models.rating.findOne({where: {
          userId: req.body.userId,
          parkId: req.body.parkId
        } })
        .then(function(ratingRow) {
          ratingRow.destroy();
        });
      }

      // else, do all the things

      db.models.rating.findOne({where: {
        userId: req.body.userId,
        parkId: req.body.parkId
      } })
      .then(function(ratings) {
        // if the rating doesn't exist
        if (!ratings) {
          // create a row in ratings
          starContainer.push(
            db.models.rating.create(req.body)
            .then(function(createdRow) {
            })
          );
        } else {
          // update the rating
          starContainer.push(
            db.models.rating.update({
              ratingVal: req.body.ratingVal
            },
            {
              fields: ['ratingVal'],
              where: {
                userId: req.body.userId,
                parkId: req.body.parkId
              }
            })
          );
        }
        // updating total stars on national parks
        // get the total amount of stars
        Promise.all(starContainer).then(function(response) {
          db.models.rating.findAll({where: {
            parkId: req.body.parkId
          }}).then(function(parkRatings) {

            var total = 0;
            for (var i = 0; i < parkRatings.length; i++) {
              total = total + parkRatings[i].dataValues.ratingVal;
            }
            // rounded to an integer
            if (parkRatings.length === 0) {
              average = 0;
            } else {
              average = total/parkRatings.length;
            }
            //update the park with the average rating
            db.models.park.update({
              rating: average
            },
            {
              fields: ['rating'],
              where: {id: req.body.parkId}
            }).then(function(updated) {
              res.send({averageRating: average});
            });

          });
        });
      });
    },

    get: function(req, res) {
      db.models.rating.findOne({where: {
        parkId: parseInt(req.query.parkId),
        userId: parseInt(req.query.userId)
      } })
      .then(function(ratingInstance) {
        var rate;
        if (!ratingInstance) {
          rate = 0;
        } else {
          rate = ratingInstance.dataValues.ratingVal;
        }
        var ratingContainer = {rating: rate};
        res.send(ratingContainer);
      });
    }
  },

  totalReviews: {
    get: function(req, res) {
      db.models.rating.findAll({
        where: {
          parkId: req.query.parkId
        }
      })
      .then(function(ratings){
        res.send({reviews: ratings.length})
      })
    }
  },

  simpleRating: {
    get: function(req, res) {
      db.models.rating.findAll({
        where: {
          // TODO: replace with actual userId
          userId: req.query.userId
          // userId: 106
        }
      })
      .then((results) => {
        res.send(results);
      });
    }
  },

  parkReview: {
    post: function(req, res) {
      // insert review into table
      db.models.parkcomment.create({
        text: req.body.userReview,
        firstName: req.body.firstName,
        userId: req.body.userId,
        parkId: req.body.parkId
      }).then(function(createdRow) {
        res.send({});
      });
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
