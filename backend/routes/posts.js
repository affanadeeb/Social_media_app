const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const { isAuthenticated } = require('../middleware/auth');
const { translateText, summarizeText, textToAudio } = require('../services/aiServices');
const fs = require('fs');

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

    // Check if the user is authorized to delete the post
    if (post.user.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // If post has media, delete the file
    if (post.mediaUrl) {
      const filePath = path.join(__dirname, '..', post.mediaUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Translate post
router.post('/:id/translate', isAuthenticated, async (req, res) => {
  try {
    const { targetLanguage } = req.body;
    const post = await Post.findById(req.params.id);
    
    // Use either GPT or simple translation
    const translatedContent = await translateText(post.content, targetLanguage);
    // or
    // const translatedContent = await translateWithGPT(post.content, targetLanguage);
    
    res.json({ translatedContent });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Summarize article
router.post('/:id/summarize', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Use either GPT or simple summarization
    const summary = await summarizeText(post.content);
    // or
    // const summary = await summarizeWithGPT(post.content);
    
    post.summary = summary;
    await post.save();
    res.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Generate audio
router.post('/:id/audio', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const audioContent = await textToAudio(post.content);
    // Save audio file and update post with URL
    const audioUrl = `/uploads/audio/${Date.now()}.mp3`;
    fs.writeFileSync(`./public${audioUrl}`, audioContent);
    post.audioUrl = audioUrl;
    await post.save();
    res.json({ audioUrl });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 