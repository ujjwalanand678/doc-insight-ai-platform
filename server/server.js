import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

// routes
import atsRoutes from './routes/ats.routes.js';
import documentRoutes from './routes/document.routes.js';
import imageAnalyzerRoutes from './routes/imageAnalyzer.routes.js';
import improveContentRoutes from './routes/improveContent.routes.js';
import aiChatRoutes from './routes/aiChat.routes.js';

dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------------
// Database
// --------------------
connectDB();

// --------------------
// Routes
// --------------------
app.get('/', (req, res) => {
  res.json({ message: 'AI Resume & Document API is running 🚀' });
});

// ATS checker
app.use('/api/ats', atsRoutes); 
// POST /api/ats/check

// Document APIs
app.use('/api/documents', documentRoutes);
/*
POST   /api/documents/upload
GET    /api/documents/documents
POST   /api/documents/extract-text
POST   /api/documents/export-pdf
*/

// Image analyzer
app.use('/api/image', imageAnalyzerRoutes);
// POST /api/image/analyze

// Improve content with AI
app.use('/api/ai', improveContentRoutes);
// POST /api/ai/improve

// AI chat
app.use('/api/chat', aiChatRoutes);
// POST /api/chat/chat

// --------------------
// Error handling
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

// --------------------
// Server
// --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
