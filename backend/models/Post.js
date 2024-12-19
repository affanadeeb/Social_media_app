const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  category: {
    type: String,
    enum: ['news', 'article', 'social', 'media'],
    default: 'social'
  },
  mediaUrl: {
    type: String
  },
  feeling: {
    type: String
  },
  language: {
    type: String,
    default: 'en'
  },
  summary: {
    type: String
  },
  audioUrl: {
    type: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isArticle: {
    type: Boolean,
    default: false
  },
  readTime: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema); 