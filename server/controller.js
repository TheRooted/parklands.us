var db = require('../db/schema');
var Promise = require('bluebird');


module.exports = {

  session: {
    get: function(req, res) {
      if (req.user) {
        console.log('there is a user');
        res.status(200).send(req.user);
      } else {
        console.log('there is not a user');
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
      console.log('id inside parkComment controller:', id);
      db.models.parkcomment.findAll({
        where: {parkId: id}
      }).then(function(comments) {
        res.send(comments);
      });
    }
  },

  parkAverageRating: {
    get: function(req, res) {
      // console.log('@@@@@@@inside park average rating', req.url)
      var id = req.url.split('/');
      id = id[id.length-1];
      db.models.park.findOne({
        where: {id: id}
      }).then(function(park) {
        res.send({rating: park.dataValues.rating})
      })
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
      console.log('req.body in userfeed is ', req.body);
      db.models.post.findAll({})
      .then(function (userPost) {
        //console.log('all user post are ', userPost);
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
        console.log('user isssss ', user);
        res.send(user);
      });
    }
  },

  postcomment: {
    get: function (req, res) {
      console.log('req.query ', req.query);
      db.models.postcomment.findAll({
        where: {
          postId: parseInt(req.query.postId)
        }
      })
      .then(function (comment) {
        console.log('comment is ...', comment);
        res.send(comment);
      });
    }
  },

  // comment : {
  //   get: function (req, res) {
  //     console.log('req.body.postId is ', req.body.postId);
  //     db.models.postcomment.findOne({
  //       where: {
  //         postId: req.body.postId
  //       }
  //     })
  //     .then(function (comment) {
  //       console.log('comment is ', comment);
  //     });
  //   }
  // },

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
                res.send({voteCount: post.dataValues.voteCount + 1});
              });
            });
          });
        } else {
          console.log('already voted, insert remove like logic here');
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
        });

      });
    }
  },

  rating: {
    post: function (req, res) {
      // for average rating of overall park
      var average;
      var starContainer = [];

      console.log('req.body', req.body)

      // if the rating is zero, find and delete the row
      if (req.body.ratingVal === 0) {
        db.models.rating.findOne({where: {
          userId: req.body.userId,
          parkId: req.body.parkId
        } })
        .then(function(ratingRow) {
          ratingRow.destroy();
        })
      }

      // else, do all the things

      db.models.rating.findOne({where: {
        userId: req.body.userId,
        parkId: req.body.parkId
      } })
      .then(function(ratings) {
        console.log('@@rating', ratings)
        // if the rating doesnt exist
        if (!ratings) {
          // create a row in ratings
          starContainer.push(
            db.models.rating.create(req.body)
            .then(function(createdRow) {
              console.log('rating row created')
            })
          )
        } else {
          // update the rating
          console.log('@@in updating', req.body)
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
          )
        }
        // updating total stars on national parks
        // get the total amount of stars
        Promise.all(starContainer).then(function(response) {
          db.models.rating.findAll({where: {
            parkId: req.body.parkId
          }}).then(function(parkRatings) {
            console.log('park ratings', parkRatings);

            var total = 0;
            for (var i = 0; i < parkRatings.length; i++) {
              total = total + parkRatings[i].dataValues.ratingVal;
            }
            // rounded to an integer
            if (parkRatings.length === 0) {
              average = 0;
            } else {
              average = Math.round(total/parkRatings.length);
            }
            //update the park with the average rating
            db.models.park.update({
              rating: average
            },
            {
              fields: ['rating'],
              where: {id: req.body.parkId}
            }).then(function(updated) {
              res.send({averageRating: average})
            })

          })
        })
      })
    },

    get: function(req, res) {
      db.models.rating.findOne({where: {
        parkId: parseInt(req.query.parkId),
        userId: parseInt(req.query.userId)
      } })
      .then(function(ratingInstance) {
        // console.log('userRating', ratingInstance)
        var rate;
        if (!ratingInstance) {
          rate = 0;
        } else {
          rate = ratingInstance.dataValues.ratingVal;
        }
        var ratingContainer = {rating: rate}
        res.send(ratingContainer);
      });
    }
  },

  parkReview: {
    post: function(req, res) {
      console.log(req.body)
      // insert review into table
      db.models.parkcomment.create({
        text: req.body.userReview,
        firstName: req.body.firstName,
        userId: req.body.userId,
        parkId: req.body.parkId
      }).then(function(createdRow) {
        res.send({})
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
