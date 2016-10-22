var express = require('express');
var router = express.Router();
var Post = require('../../models/Post')

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: process.env.TA_APP_ID,
  application_key: process.env.TA_KEY
});

router.get('/', function(req, res){
  Post.find({}, function(err, post){
    res.json(err || post);
  });
});

router.post('/', function(req, res){
  textapi.sentiment({
    text: req.body.text,
    mode: 'tweet'
  }, function(err, response) {
    if (err) {
      res.json(err);
    } else {
      var newPost = {
        text: response.text,
        polarity: response.polarity,
        subjectivity: response.subjectivity,
        polarity_confidence: response.polarity_confidence,
        subjectivity_confidence: response.subjectivity_confidence
      }

      Post.create(newPost, function(err, post){
        res.json(err || post);
      })
    }
  });
});

module.exports = router;
