var express = require('express');
var parser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var sequelize = require('sequelize');
var pg = require('pg');

var app = express();
app.use(parser.json()); //middleware
app.use(express.static('./../public'));


//Seed the database with scraped data (specifically yosemite; can abstract to all nps park twitter pages)
app.get('/seedthedatabasewithscrapeddata', function(req, res) {
  var url = 'https://twitter.com/YosemiteNPS/media';
  var numPicsToPull = 10;
  request(url, function (error, response, html) {
    if (!error) {
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
