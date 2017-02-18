let Sequalize = require('sequalize');
let db = require('../schema.js');

let Ratings = db.define('rating', {
  ratingVal: {
    type: sequalize.STRING
  }
});


Ratings.belongsTo(Users);

Parks.hasMany(ratings);
Ratings.belongsTo(Parks);

db.sync();

module.exports = Ratings;