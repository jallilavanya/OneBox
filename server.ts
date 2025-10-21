import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('ReachInbox Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this to your backend server.js
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is connected!',
    timestamp: new Date().toISOString()
  });
});