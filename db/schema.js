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
      type: Sequelize.TEXT
    },
    userEmail: {
      type: Sequelize.STRING
    },
    parkId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  var ParkPhotos = sequelize.define('parkphoto', {
    photoUrl: {
      type: Sequelize.STRING,
      unique: true
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

  var Parks = sequelize.define('park', {
    name: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    photo: {
      type: Sequelize.STRING
    },
    info: {
      type: Sequelize.TEXT
    },
    // alertUrl: {
    //   type: Sequelize.STRING
    // }
  });

  var PostComments = sequelize.define('postcomment', {
    text: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER
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
    },
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

  var Ratings = sequelize.define('rating', {
    ratingVal: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

  var UserParks = sequelize.define('userpark', {
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

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

  var Votes = sequelize.define('vote', {
    userId: {
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER
    }
  });


  // Sync database with defined schema
  sequelize.sync()
  .then(function() {
    /** Define Model Associations **/
    sequelize.Promise.all([
      Users.hasMany(Votes),
      Users.hasMany(Ratings),
      Users.hasMany(ParkComments),
      Users.hasMany(UserParks),
      Users.hasMany(PostComments),
      Users.hasMany(Posts),

      Posts.hasMany(Votes),
      Posts.hasMany(PostComments),

      Parks.hasMany(UserParks),
      Parks.hasMany(ParkPhotos),
      Parks.hasMany(Posts),
      Parks.hasMany(Ratings),
      Parks.hasMany(ParkComments)
    ])
    .then(function(results) {
    });
  });

module.exports = sequelize;