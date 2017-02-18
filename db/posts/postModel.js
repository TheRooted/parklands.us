let Sequelize = require('sequelize');
let db = require('../schema.js');

let Posts = db.define('post', {
  type: {
    type: Sequelize.STRING
  },
  voteCount: {
    type: Sequelize.INTEGER,
  },
  filePath: {
    type: Sequelize.STRING
  }
});

Parks.hasMany(Posts);
Posts.belongsTo(Parks);


Users.hasMany(Posts);
Posts.belongsTo(Users);

db.sync();

module.exports = Posts;
