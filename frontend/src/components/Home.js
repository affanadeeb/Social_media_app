import React, { useState } from 'react';
import { FaHome, FaVideo, FaUserFriends, FaBookmark, FaCalendar, FaNewspaper } from 'react-icons/fa';
import PostForm from './PostForm';
import PostList from './PostList';
import Navbar from './Navbar';

function Home() {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handlePostCreated = () => {
    setRefreshPosts(prev => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item active">
              <FaHome size={20} />
              <span>Feed</span>
            </button>
            
            <button className="sidebar-item">
              <FaVideo size={20} />
              <span>Videos</span>
            </button>
            
            <button className="sidebar-item">
              <FaUserFriends size={20} />
              <span>Friends</span>
            </button>
            
            <button className="sidebar-item">
              <FaBookmark size={20} />
              <span>Saved</span>
            </button>
            
            <button className="sidebar-item">
              <FaCalendar size={20} />
              <span>Events</span>
            </button>
            
            <button className="sidebar-item">
              <FaNewspaper size={20} />
              <span>News</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <PostForm onPostCreated={handlePostCreated} />
          <PostList key={refreshPosts} />
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="suggested-friends">
            <h3 className="section-title">Suggested Friends</h3>
            <div className="friend-suggestions">
              <div className="friend-item">
                <div className="user-avatar">JD</div>
                <div className="friend-info">
                  <span className="friend-name">John Doe</span>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>
              <div className="friend-item">
                <div className="user-avatar">AS</div>
                <div className="friend-info">
                  <span className="friend-name">Alice Smith</span>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>
            </div>
          </div>
          <div className="trending-topics">
            <h3 className="section-title">Trending Topics</h3>
            <div className="topic-list">
              <div className="topic-item">
                <span className="topic-name">#Technology</span>
                <span className="topic-posts">250K posts</span>
              </div>
              <div className="topic-item">
                <span className="topic-name">#Programming</span>
                <span className="topic-posts">180K posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home; 