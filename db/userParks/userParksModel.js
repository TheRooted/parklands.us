let Sequelize = require('sequelize');
let db = require('../schema.js');

let UserParks = db.define('userPark', {

});

UserParks.hasMany(Users);
UserParks.hasMany(Parks);

UserParks.belongsTo(Users);
UserParks.belongsTo(Parks);

db.sync();

module.exports = UserParks;

