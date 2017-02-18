var express = require('express');
var parser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var sequelize = require('sequelize');
var pg = require('pg');

var app = express();
app.use(parser.json());
app.use(express.static('./../public'));

var port = 3000;

app.listen(port, () => {
	console.log('Now listening on port: ', port);
});