import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPlay, FaPause, FaVolumeUp, FaLanguage, FaBookReader } from 'react-icons/fa';

function Post({ post, onDelete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranslateOptions, setShowTranslateOptions] = useState(false);
  const [translatedContent, setTranslatedContent] = useState('');
  const [summary, setSummary] = useState('');
  const audioRef = useRef(null);
  const { user } = useAuth();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' }
  ];

  const handleTranslate = async (languageCode) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ targetLanguage: languageCode }),
      });
      const data = await response.json();
      setTranslatedContent(data.translatedContent);
      setShowTranslateOptions(false);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const handleSummarize = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/summarize`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Summarization error:', error);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (response.ok) {
        // Call the parent's onDelete function to refresh the posts list
        onDelete();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user-info">
          <img 
            src={post.user.profilePic || 'https://via.placeholder.com/40'} 
            alt={post.user.username}
            className="user-avatar"
          />
          <span className="post-user">{post.user.username}</span>
        </div>
        {user && user._id === post.user._id && (
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        )}
      </div>
      <div className="post-content">
        {post.title && <h2 className="post-title">{post.title}</h2>}
        <p>{translatedContent || post.content}</p>
        {post.mediaUrl && (
          <div className="post-media">
            {post.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img 
                src={`http://localhost:5000${post.mediaUrl}`} 
                alt="Post media" 
                className="post-image"
              />
            ) : post.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video 
                controls 
                className="post-video"
              >
                <source src={`http://localhost:5000${post.mediaUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        )}
        {summary && (
          <div className="post-summary">
            <h4>Summary</h4>
            <p>{summary}</p>
          </div>
        )}
      </div>

      {/* Media section */}

      <div className="post-actions">
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={() => setShowTranslateOptions(!showTranslateOptions)}
          >
            <FaLanguage /> Translate
          </button>
          <button 
            className="action-btn"
            onClick={handleSummarize}
          >
            <FaBookReader /> Summarize
          </button>
          {post.audioUrl && (
            <div className="audio-controls">
              <button onClick={togglePlayback}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <select 
                value={playbackSpeed}
                onChange={(e) => {
                  const speed = parseFloat(e.target.value);
                  setPlaybackSpeed(speed);
                  if (audioRef.current) {
                    audioRef.current.playbackRate = speed;
                  }
                }}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
              <audio ref={audioRef} src={`http://localhost:5000${post.audioUrl}`} />
            </div>
          )}
        </div>
      </div>

      {showTranslateOptions && (
        <div className="language-options">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleTranslate(lang.code)}
              className="language-btn"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post; 