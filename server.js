var express = require('express');
var app = express();
var logger = require('morgan');
var dotenv = require('dotenv').load({silent: true});
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var postRoutes = require('./routes/api/posts');

mongoose.connect('mongodb://localhost/postanalysis', function(err, db){
  console.log(err || 'Connected to database');
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/posts', postRoutes);

app.listen(3000, function(err){
  console.log(err || "Listening on port 3000");
})
