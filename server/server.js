var express = require('express');
var parser = require('body-parser');
var router = require('./routes');


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
