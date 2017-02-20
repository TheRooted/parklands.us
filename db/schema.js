var Sequelize = require('sequelize');
var cfg = require('./dbConfig.js');

var sequelize = new Sequelize(cfg.myLocalDB, cfg.myLocalDBRole, cfg.myLocalDBPW, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database', err);
  });


  /*** Define Models **/
  var ParkComments = sequelize.define('parkcomment', {
    text: {
      type: Sequelize.STRING
    }
  });

  var ParkPhotos = sequelize.define('parkphoto', {
    photoUrl: {
      type: Sequelize.STRING,
      unique: true
    }
  });

  var Parks = sequelize.define('park', {
    name: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  var PostComments = sequelize.define('postcomment', {
    text: {
      type: Sequelize.STRING
    }
  });

  var Posts = sequelize.define('post', {
    type: {
      type: Sequelize.STRING
    },
    voteCount: {
      type: Sequelize.INTEGER
    },
    filePath: {
      type: Sequelize.STRING
    }
  });

  var Ratings = sequelize.define('rating', {
    ratingVal: {
      type: Sequelize.STRING
    }
  });

  var UserParks = sequelize.define('userpark', {});

  var Users = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });

  var Votes = sequelize.define('vote', {});


  // Sync database with defined schema
  sequelize.sync()
  .then(function() {
    console.log('adding associations')
    /** Define Model Associations **/
    sequelize.Promise.all([
      ParkPhotos.belongsTo(Parks),
      Users.hasMany(PostComments),
      PostComments.belongsTo(Users),

      Posts.hasMany(PostComments),
      PostComments.belongsTo(Posts),
      Parks.hasMany(Posts),
      Posts.belongsTo(Parks),

      Users.hasMany(Posts),
      Posts.belongsTo(Users),

      Ratings.belongsTo(Users),

      Parks.hasMany(Ratings),
      Ratings.belongsTo(Parks),

      // UserParks.hasMany(Users),
      // UserParks.hasMany(Parks),

      UserParks.belongsTo(Users),
      UserParks.belongsTo(Parks),

      Users.hasMany(Votes),
      Posts.hasMany(Votes),

      Votes.belongsTo(Users),
      Votes.belongsTo(Posts)
    ])
    .then(function(results) {
      console.log('final results', results)
    });
  });

module.exports = sequelize;
