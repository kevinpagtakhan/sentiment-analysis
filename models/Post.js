var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  polarity: String,
  subjectivity: String,
  text: String,
  polarity_confidence: Number,
  subjectivity_confidence: Number
}, { timestamps: true })


var Post = mongoose.model('Post', postSchema);

module.exports = Post;
