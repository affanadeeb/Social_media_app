import React, { useState, useEffect, useRef } from 'react';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { FaImage, FaVideo, FaSmile } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview logic here if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (selectedFile) {
        formData.append('media', selectedFile);
      }
      if (selectedEmoji) {
        formData.append('feeling', selectedEmoji);
      }

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
      }

      const data = await response.json();
      setContent('');
      setSelectedFile(null);
      setSelectedEmoji(null);
      fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error creating post:', error);
      // You might want to show an error message to the user here
    }
  };

  const emojis = ['😊', '😂', '😍', '😢', '😎', '🎉'];
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
    setContent(prev => `${prev} Feeling ${emoji}`);
  };

  const renderPosts = () => {
    if (!Array.isArray(posts)) {
      console.error('Posts is not an array:', posts);
      return null;
    }
    return posts.map(post => (
      <Post key={post._id} post={post} onDelete={fetchPosts} />
    ));
  };

  return (
    <div className="home-container">
      <div className="content-area">
        <div className="left-sidebar">
          <div className="sidebar-menu">
            <div className="menu-item active">
              <FaImage /> Feed
            </div>
            <div className="menu-item">
              <FaVideo /> Videos
            </div>
            <div className="menu-item">
              <FaSmile /> Friends
            </div>
          </div>
        </div>

        <div className="main-content">
          {user && (
            <div className="create-post">
              <div className="post-header">
                <img 
                  src={user.profilePic || 'https://via.placeholder.com/40'} 
                  alt={user.username} 
                  className="user-avatar"
                />
                <div className="post-input-container">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`What's on your mind, ${user.username}?`}
                    className="post-input"
                  />
                  {selectedFile && (
                    <div className="selected-media">
                      <p>{selectedFile.name}</p>
                      <button onClick={() => setSelectedFile(null)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="post-actions">
                <div className="action-buttons">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    style={{ display: 'none' }}
                  />
                  <button className="action-btn" onClick={handlePhotoClick}>
                    <FaImage /> Photo
                  </button>
                  <button className="action-btn" onClick={handleVideoClick}>
                    <FaVideo /> Video
                  </button>
                  <button 
                    className="action-btn" 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FaSmile /> Feeling
                  </button>
                </div>
                <button 
                  className="share-btn"
                  onClick={handleSubmit}
                  disabled={!content.trim() && !selectedFile}
                >
                  Share Post
                </button>
              </div>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className="emoji-btn"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="posts-container">
            {renderPosts()}
          </div>
        </div>

        <div className="right-sidebar">
          <div className="suggestions-box">
            <h3>Suggested Friends</h3>
            {/* Add suggested friends here */}
          </div>
          <div className="trending-box">
            <h3>Trending Topics</h3>
            {/* Add trending topics here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 