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

var ParkPhotos = sequelize.define('parkPhoto', {
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
    type: Sequelize.INTEGER
  }
});

var PostComments = sequelize.define('postComment', {
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

var UserParks = sequelize.define('userPark', {});

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


/** Define Model Associations **/
Parks.hasMany(ParkPhotos);
ParkPhotos.belongsTo(Parks);
Users.hasMany(PostComments);
PostComments.belongsTo(Users);

Posts.hasMany(PostComments);
PostComments.belongsTo(Posts);
Parks.hasMany(Posts);
Posts.belongsTo(Parks);


Users.hasMany(Posts);
Posts.belongsTo(Users);

Ratings.belongsTo(Users);

Parks.hasMany(Ratings);
Ratings.belongsTo(Parks);

UserParks.hasMany(Users);
UserParks.hasMany(Parks);

UserParks.belongsTo(Users);
UserParks.belongsTo(Parks);

Users.hasMany(Votes);
Posts.hasMany(Votes);

Votes.belongsTo(Users);
Votes.belongsTo(Posts);


// Create all models
sequelize.Promise.all([
  ParkPhotos.create({}),
  Parks.create({}),
  PostComments.create({}),
  Posts.create({}),
  Ratings.create({}),
  UserParks.create({}),
  Users.create({}),
])
.then(function(err) {
  if (err) {
    console.log('there was an err', err);
  }
});


module.exports = sequelize;
