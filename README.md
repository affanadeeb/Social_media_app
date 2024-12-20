# Connectify - Social Media Platform
![image](https://github.com/user-attachments/assets/359b9184-754e-48ba-bde3-27b07ec2b10f)

![image](https://github.com/user-attachments/assets/e214a051-3cb4-41f6-aeb3-143598ba8274)

![image](https://github.com/user-attachments/assets/fb174584-a784-4401-af18-135c15b53a0a)

## Overview
Connectify is a modern social media platform that allows users to connect, share thoughts, and interact with posts through reactions. The platform features real-time translation and text summarization capabilities powered by AI services.

## Features
* **User Authentication**
  - Sign up and login functionality
  - Secure session management
  - Protected routes

* **Post Management**
  - Create posts with text content
  - Upload images and videos
  - Delete your own posts
  - Express feelings/emotions with posts

* **Interactive Features**
  - React to posts with multiple emoji options
  - Real-time reaction counts
  - Translation of post content (powered by Google Translate API)
  - Text summarization (powered by Hugging Face API)

* **User Interface**
  - Modern, responsive design
  - Gradient-based theme
  - Intuitive navigation
  - Real-time updates

## Technology Stack
### Frontend
* React.js
* React Router for navigation
* Context API for state management
* CSS3 with modern features
* React Icons

### Backend
* Node.js
* Express.js
* MongoDB with Mongoose
* Session-based authentication
* Multer for file uploads

### AI Services
* Google Translate API (via RapidAPI)
* Hugging Face API for summarization

## Setup Instructions

### Prerequisites
* Node.js (v14 or higher)
* MongoDB
* npm or yarn
* RapidAPI key
* Hugging Face API key

### Environment Variables
Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
RAPIDAPI_KEY=your_rapidapi_key
HUGGING_FACE_API_KEY=your_huggingface_key
```

#### Frontend (.env.development)
```
REACT_APP_API_URL=http://localhost:5000
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/connectify.git
cd connectify
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Start the backend server
```bash
cd backend
npm start
```

5. Start the frontend development server
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

# How to Run as Localhost

This guide explains how to set up and run the project on your local machine.

## Prerequisites
- **MongoDB** installed and running.
- **Node.js** and **npm** installed.
- **Visual Studio Code (VSCode)** or any other terminal.

---

## Steps to Run

### 1. Set Up MongoDB
Ensure MongoDB is installed and running on your system. Use the following command to check its status:

```bash
sudo systemctl status mongod
```

If MongoDB is not running, start it with:

```bash
sudo systemctl start mongod
```

---

### 2. Set Up the Frontend

1. Open a terminal in VSCode.
2. Navigate to the frontend directory:
   
   ```bash
   cd frontend
   ```

3. Install dependencies (if `node_modules` are not already installed):

   ```bash
   npm install
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

---

### 3. Set Up the Backend

1. Open another terminal in VSCode.
2. Navigate to the backend directory:
   
   ```bash
   cd backend
   ```

3. Install dependencies (if `node_modules` are not already installed):

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

---

### 4. Access the Application
After both the frontend and backend servers are running, open your web browser and navigate to:

```
http://localhost:3000
```

The frontend should now be accessible, and it will communicate with the backend through the configured API routes.

---

## Troubleshooting
- Ensure MongoDB is running if you encounter connection issues.
- Verify that the required ports (e.g., `3000` for frontend, `5000` or similar for backend) are not blocked.
- Check for error messages in the terminal and resolve missing dependencies by re-running `npm install` in the respective directories.


## API Endpoints

### Authentication
* `POST /api/auth/register` - Register new user
* `POST /api/auth/login` - User login
* `POST /api/auth/logout` - User logout

### Posts
* `GET /api/posts` - Get all posts
* `POST /api/posts` - Create new post
* `DELETE /api/posts/:id` - Delete a post
* `POST /api/posts/:id/translate` - Translate post content
* `POST /api/posts/:id/summarize` - Summarize post content
* `POST /api/posts/:id/react` - Add reaction to post

## Deployment
The application is configured for deployment on:
* Frontend: Vercel
* Backend: Render

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments
* Google Translate API for translation services
* Hugging Face for AI-powered text summarization
* React Icons for the icon library
