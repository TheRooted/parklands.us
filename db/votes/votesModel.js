let Sequelize = require('sequelize');
let db = require('../schema.js');

let Votes = db.define('vote', {

});

Users.hasMany(Votes);
Posts.hasMany(Votes);

Votes.belongsTo(Users);
Votes.belongsTo(Posts);

db.sync();

module.exports = Votes;

