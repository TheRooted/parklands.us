var express = require('express');
var parser = require('body-parser');
var passport = require('passport');
var pg = require('pg');
var sequelize = require('sequelize');
var router = require('./routes');
var db = require('../db/schema')


var app = express();

// middleware
app.use(parser.json());

// routing
app.use('', router);

// serve static file
app.use(express.static('public'));

var port = 3000;

app.listen(port, () => {
  console.log('Now listening on port: ', port);
});
