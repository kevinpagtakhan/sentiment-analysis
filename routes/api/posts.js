var express = require('express');
var router = express.Router();
var Post = require('../../models/Post')

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
