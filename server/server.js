var express = require('express');
var parser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var sequelize = require('sequelize');
var pg = require('pg');

var app = express();
app.use(parser.json()); //middleware
app.use(express.static('./../public'));

app.get('/seedthedatabasewithscrapeddata', function(req, res) {
  var url = 'https://twitter.com/YosemiteNPS/media';
  request(url, function (error, response, html) {
  	if (!error) {
  		var $ = cheerio.load(html);
  		//unfinished
  	}
  })
});

var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
