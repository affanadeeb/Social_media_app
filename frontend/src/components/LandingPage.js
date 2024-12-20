import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaComments, FaGlobe } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <nav className="landing-nav">
          <div className="brand">
            <h1>Connectify</h1>
            <span className="tagline">Connect. Share. Thrive.</span>
          </div>
          <div className="nav-buttons">
            <Link to="/login" className="nav-btn login-btn">Login</Link>
            <Link to="/register" className="nav-btn register-btn">Sign up</Link>
          </div>
        </nav>

        <main className="landing-content">
          <div className="hero-section">
            <div className="hero-text">
              <h2>Welcome to a New<br />Social Experience</h2>
              <p>Share your thoughts, connect with friends, and explore a world of possibilities.</p>
            </div>
            <div className="feature-cards">
              <div className="feature-card">
                <FaUsers className="feature-icon" />
                <h3>Connect</h3>
                <p>Build meaningful relationships with people around the world</p>
              </div>
              <div className="feature-card">
                <FaComments className="feature-icon" />
                <h3>Share</h3>
                <p>Express yourself through posts, photos, and more</p>
              </div>
              <div className="feature-card">
                <FaGlobe className="feature-icon" />
                <h3>Explore</h3>
                <p>Discover trending topics and join exciting conversations</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage; 