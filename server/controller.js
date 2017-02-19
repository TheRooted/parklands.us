var db = require('../db/schema');


module.exports = {

  // Sign up new user
  signup: {
    post: function(req, res) {
      console.log('MADE IT TO SIGNUP')
      var username = req.body.username;
      var password = req.body.password;

      // If username or password left blank, send back 400: Bad request
      if (username === '' || password === '') {
        res.sendStatus(400);

      } else {
        // Check database for supplied username
        db.User.findAll({
          where: { username: username }
        })
        .then(function(users) {

          // Username is free; hash password
          if (users.length === 0) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              } else {

                // Add new user to database
                db.User.create({
                  username: username,
                  password: hash
                })

                // Create session and send back 201: Created code
                .then(function(user) {
                  util.createSession(req, res, user);
                });
              }
            });

          // Username is already in db; compare supplied password to pw in db
          } else {
            bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
              if (err) {
                console.log('Error in password comparison', err);
              }

              // Supplied password matches, user already has account; send to Signin page
              if (comparison === true) {
                res.sendStatus(204);

              // Supplied pw doesn't match; probably new user & should choose another username
              } else {
                res.sendStatus(401);
              }
            });
          }
        });
      }
    }
  },
  // Sign in user
  signin: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      
      // Check database for username
      db.User.findAll({
        where: { username: username }
      })
      .then(function(users) {
        // If username is not in database, send back 401 code
        if (users.length === 0) {
          res.sendStatus(401);

        // If username is in database, compare supplied password with stored password
        } else {   
          bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
            if (err) {
              console.log('Error in comparison', err);
            }

            // Passwords match; create session
            if (comparison === true) {
              util.createSession(req, res, users[0]);

            // Passwords don't match; send 401: Unauthorized status
            } else {
              res.sendStatus(401);
            }
          });
        }
      })
    }
  },

  // Sign out user
  signout: {
    post: function(req, res) {
      req.session.destroy(function() {
        res.sendStatus(200);
      });
    }
  },

  // Retrieve 20 posts in Posts table, sorted by descending votes
  posts: {
    get: function(req, res) {

      //get the categoryId from a category name
      var options = {where: {name: req.query.category}};

      db.Category.findOne(options)
      .then(category => {
        var options = {
          include: [{model: db.User}],
          limit: 20,
          order: [['vote_count', 'DESC']]
        }
        // options.where = {categoryId: 1};
        if (category) { options.where = {categoryId: category.id};}

      //   console.log(options);
       return db.Post.findAndCountAll(options)
      })
        .then(posts => {
          // console.log(posts.rows[0]);
          res.json(posts);
        });
    }
  },

  // Retrieve all tags in Tags table
  tags: {
    get: function(req, res) {
      db.Tag.findAll()
        .then(function(tags) {
          res.json(tags);
        });
    }
  },

  tagId: {
    get: function(req, res) {
      db.sequelize.query('select tag from tags where id in (select tagId from tagpost where postId = ' + req.query.postId + ');').spread(function(results, metadata) {
        var tags = [];
        results.map(tag => {tags.push(tag.tag);})
        res.json(tags);
      });
    }
  },

  // Retrieve all categories in Categories table
  categories: {
    get: function(req, res) {
      db.Category.findAll()
        .then(function(categories) {
          res.json(categories);
        });
    }
  },

  // Retrieve username associated with user id
  users: {
    get: function(req, res) {
      var userId = req.url.match(/\d+/);
      console.log('userId is', userId);

      db.User.findAll({
        where: {
          id: userId
        }
      })
      .then(function(user) {
        res.json(user[0].username);
      });
    }
  },

  // Retrieve name of tag associated with tag id
  tagName: {
    get: function(req, res) {
      var tagId = req.url.match(/\d+/);

      db.Tag.findAll({
        where: {
          id: tagId
        }
      })
      .then(function(tag) {
        res.json(tag[0].tag);
      })
    }
  },

  // Retrieve name of category associated with category id
  categoryName: {
    get: function(req, res) {
      var catId = req.url.match(/\d+/);

      db.Category.findAll({
        where: {
          id: catId
        }
      })
      .then(function(category) {
        res.json(category[0].name);
      })
    }
  },

  // Add a new post to database
  submit: {
    post: function(req, res) {

      // Parse out any links within the comment
      if (helpers.findUrls(req.body.comment).length > 0) {
        var link_url = helpers.findUrls(req.body.comment)[0];
      } else {
        link_url = null;
      }

      // Separate tags into an array
      var tags = helpers.separateTags(req.body.tags);

      // First scrape for meta data
      helpers.externalRequest.linkPreview(link_url)
        .then(function(metaData) {

          // Lookup the id of the category submitted
          db.Category.findOne({
            where: { name: req.body.category }
          })
          .then(function(category) {

            if (metaData) {
              metaData = JSON.parse(metaData);
              db.Post.create({
                comment: req.body.comment,
                link_url: metaData.url,
                link_description: metaData.description,
                link_image: metaData.image,
                link_title: metaData.title,
                vote_count: 0,
                categoryId: category.id,
                userId: req.body.userId,
                tags: tags
              }, {
                include: [
                // below is only needed if creating a new category when the post is created
                // {association: db.PostCategory},
                {association: db.PostTags}
                ]
              });

            } else {
              db.Post.create({
                comment: req.body.comment,
                vote_count: 0,
                categoryId: category.id,
                userId: req.body.userId,
                tags: tags
              }, {
                include: [
                // below is only needed if creating a new category when the post is created
                // {association: db.PostCategory},
                {association: db.PostTags}
                ]
              });
            }
          })
        })
        .then(function(err) {
          if (err) {throw err;}
          res.sendStatus(201);
        });
    }
  },

  // Delete post from database
  delete: {
    post: function(req, res) {
      db.Post.destroy({
        where: { id: req.body.id },
        limit: 1
      })
        .then(function(result) {
          res.sendStatus(200);
        });
    }
  },

  upvote: {
    post: function(req, res) {

      // Grab the post associated with the vote
      db.Post.findOne({
        include: [
          {
            model: db.User
          }
        ],
        where: { id: req.body.postId },
      })
        .then(function(result) {
          // Check if this user has already voted this post
          db.UserVotes.findOrCreate({
            where: {
              userId: req.body.userId,
              postId: req.body.postId
            },
            defaults: {
              userId: req.body.userId,
              postId: req.body.postId,
              upvote: false,
              downvote: false
            }
          })
            .then(function(uservote) {
              if (!uservote[0].dataValues.upvote && !uservote[0].dataValues.downvote) {
                result.increment('vote_count');
                result.reload().then(function() {
                  // Flag that the user submitted an upvote
                  uservote[0].update({
                    upvote: true,
                    downvote: false
                  });
                  res.status(202).json(result);  
                });
              } else if (!uservote[0].dataValues.upvote && uservote[0].dataValues.downvote) {
                result.increment('vote_count');
                result.reload().then(function() {
                  // Flag that the user is reversing their downvote decision
                  uservote[0].update({
                    upvote: false,
                    downvote: false
                  });
                  res.status(202).json(result);  
                });
              } else {
                res.status(200).json(result);
              }
            });
        });
    }
  },

  downvote: {
    post: function(req, res) {

      // Grab the post associated with the vote
      db.Post.findOne({
        include: [
          {
            model: db.User
          }
        ],
        where: { id: req.body.postId },
      })
        .then(function(result) {
          // Check if this user has already voted this post
          db.UserVotes.findOrCreate({
            where: {
              userId: req.body.userId,
              postId: req.body.postId
            },
            defaults: {
              userId: req.body.userId,
              postId: req.body.postId,
              upvote: false,
              downvote: false
            }
          })
            .then(function(uservote) {
              if (!uservote[0].dataValues.downvote && !uservote[0].dataValues.upvote) {
                result.decrement('vote_count');
                result.reload().then(function() {
                  // Flag that the user submitted a downvote
                  uservote[0].update({
                    upvote: false,
                    downvote: true
                  });
                  res.status(202).json(result);  
                });
              } else if (!uservote[0].dataValues.downvote && uservote[0].dataValues.upvote) {
                result.decrement('vote_count');
                result.reload().then(function() {
                  // Flag that the user is reversing their upvote decision
                  uservote[0].update({
                    upvote: false,
                    downvote: false
                  });
                  res.status(202).json(result);  
                });
              } else {
                res.status(200).json(result);
              }
            });
        });

    }
  }
};