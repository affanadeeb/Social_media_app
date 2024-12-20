import React, { useState } from 'react';
import { FaImage, FaVideo, FaSmile } from 'react-icons/fa';

function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [feeling, setFeeling] = useState('');
  const [showFeelings, setShowFeelings] = useState(false);

  // Hidden file input ref
  const fileInputRef = React.useRef();
  const videoInputRef = React.useRef();

  const feelings = [
    { text: 'Happy', emoji: '😊' },
    { text: 'Sad', emoji: '😢' },
    { text: 'Excited', emoji: '🤩' },
    { text: 'Tired', emoji: '😴' },
    { text: 'Blessed', emoji: '🙏' },
    { text: 'Loved', emoji: '🥰' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && !mediaFile) {
      alert('Please add some content or media');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    if (mediaFile) {
      formData.append('media', mediaFile);
    }
    if (feeling) {
      formData.append('feeling', feeling);
    }

    try {
      console.log('Sending request to:', 'http://localhost:5000/api/posts');
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        setContent('');
        setMediaFile(null);
        setFeeling('');
        if (onPostCreated) {
          onPostCreated();
        }
      } else {
        alert(`Failed to create post: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const handleFeelingClick = () => {
    setShowFeelings(!showFeelings);
  };

  const selectFeeling = (selectedFeeling) => {
    setFeeling(selectedFeeling);
    setShowFeelings(false);
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        
        {mediaFile && (
          <div className="media-preview">
            {mediaFile.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(mediaFile)} alt="Preview" />
            ) : (
              <video src={URL.createObjectURL(mediaFile)} controls />
            )}
            <button type="button" onClick={() => setMediaFile(null)} className="remove-media">
              Remove
            </button>
          </div>
        )}

        {feeling && (
          <div className="feeling-tag">
            Feeling {feeling}
            <button type="button" onClick={() => setFeeling('')} className="remove-feeling">
              ×
            </button>
          </div>
        )}

        <div className="post-form-actions">
          <div className="post-form-buttons">
            <button type="button" className="action-btn" onClick={handlePhotoClick}>
              <FaImage /> Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            <button type="button" className="action-btn" onClick={handleVideoClick}>
              <FaVideo /> Video
            </button>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleFileChange}
              accept="video/*"
              style={{ display: 'none' }}
            />
            
            <button type="button" className="action-btn" onClick={handleFeelingClick}>
              <FaSmile /> Feeling
            </button>
          </div>
          <button type="submit" className="post-btn">Post</button>
        </div>

        {showFeelings && (
          <div className="feelings-popup">
            {feelings.map((f) => (
              <button
                key={f.text}
                type="button"
                onClick={() => selectFeeling(f.text)}
                className="feeling-option"
              >
                {f.emoji} {f.text}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default PostForm; 