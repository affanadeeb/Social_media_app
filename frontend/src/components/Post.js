import React from 'react';
import { useAuth } from '../context/AuthContext';

function Post({ post, onDelete }) {
  const { user } = useAuth();
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
          <button onClick={() => onDelete(post._id)} className="delete-btn">
            Delete
          </button>
        )}
      </div>
      <p className="post-content">{post.content}</p>
      {post.mediaUrl && (
        <div className="post-media">
          {post.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <img src={`http://localhost:5000${post.mediaUrl}`} alt="Post media" />
          ) : (
            <video controls>
              <source src={`http://localhost:5000${post.mediaUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <div className="post-footer">
        <span className="post-timestamp">{formattedDate}</span>
        {post.feeling && <span className="post-feeling">Feeling {post.feeling}</span>}
      </div>
    </div>
  );
}

export default Post; 