var db = require('./schema');
var cheerio = require('cheerio');
var request = require('request');


// Create Yosemite park model
db.models.park.findOrCreate({
  where: {
    name: 'yosemite'
  }
});


// Seed ParkPhotos with Yosemite pics
var url = 'https://twitter.com/YosemiteNPS/media';
var numPicsToPull = 10;

request(url, function (error, response, html) {
  if (error) {
    console.log('Error requesting url', error);
  } else {
    var $ = cheerio.load(html);
    db.models.park.find({
      where: {
        name: 'Yosemite'
      }
    })
    .then(function(results) {
      console.log('query results', results);
      for (var i = 0; i < numPicsToPull; i++){
        var photoUrl = $('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['data-image-url'];
        db.models.parkphoto.create({
          photoUrl: photoUrl,
          parkId: results.dataValues.id
        });
      }
    });
  }
});