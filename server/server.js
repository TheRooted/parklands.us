var cheerio = require('cheerio');
var express = require('express');
var parser = require('body-parser');
var passport = require('passport');
var pg = require('pg');
var request = require('request');
var sequelize = require('sequelize');
var router = require('./routes');


var app = express();

// middleware
app.use(parser.json());

// routing
app.use('', router);

// serve static file
app.use(express.static('public'));


// Seed the database with scraped data (specifically yosemite; can abstract to all nps park twitter pages)
app.get('/seedthedatabasewithscrapeddata', function(req, res) {
  var url = 'https://twitter.com/YosemiteNPS/media';
  var numPicsToPull = 10;
  request(url, function (error, response, html) {
    if (error) {
      console.log('Error requesting url', error);
    } else {
      var $ = cheerio.load(html);
      for (var i = 0; i < numPicsToPull; i++){
        console.log($('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['data-image-url']);
      }
    }
  })
});

var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
