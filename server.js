var express = require('express');
var app = express();
var logger = require('morgan');
var dotenv = require('dotenv').load({silent: true});
var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: process.env.TA_APP_ID,
  application_key: process.env.TA_KEY
});

app.use(logger('dev'));
app.use(express.static('public'));

app.post('/api/sentiment', function(req, res){
  textapi.sentiment({
    text: req.body.text,
    mode: req.body.mode
  }, function(err, response) {
    if(err) {
      res.json(err)
    } else {
      res.json(response);
    }
  });
});

app.listen(3000, function(err){
  console.log(err || "Listening on port 3000");
})