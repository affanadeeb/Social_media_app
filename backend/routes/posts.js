const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const { isAuthenticated } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all posts
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(posts || []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ message: error.message });
  }
});

// Create post
router.post('/', isAuthenticated, upload.single('media'), async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      user: req.session.userId,
      mediaUrl: req.file ? `/uploads/${req.file.filename}` : null,
      feeling: req.body.feeling
    });
    
    await post.save();
    
    // Populate user information before sending response
    await post.populate('user', 'username');
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 