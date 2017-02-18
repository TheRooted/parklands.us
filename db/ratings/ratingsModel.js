let Sequelize = require('sequelize');
let db = require('../schema.js');

let Ratings = db.define('rating', {
  ratingVal: {
    type: Sequelize.STRING
  }
});


Ratings.belongsTo(Users);

Parks.hasMany(Ratings);
Ratings.belongsTo(Parks);

db.sync();

module.exports = Ratings;