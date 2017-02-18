let Sequelize = require('sequelize');
let db = require('../schema.js');

let ParkPhotos = db.define('parkPhoto', {
  photoUrl: {
    type: Sequelize.STRING,
    unique: true
  }
});

Parks.hasMany(ParkPhotos);
ParkPhotos.belongsTo(Parks);

db.sync();

module.exports = ParkPhotos;
