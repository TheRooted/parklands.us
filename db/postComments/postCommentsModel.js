let Sequelize = require('sequelize');
let db = require('../schema.js');

let PostComments = db.define('postComment', {
  text: {
    type: Sequelize.STRING
  }
});

Users.hasMany(PostComments);
PostComments.belongsTo(Users);

Posts.hasMany(PostComments);
PostComments.belongsTo(Posts);

db.sync();

module.exports = PostComments;
