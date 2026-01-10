import express from 'express';
import upload from '../middleware/upload.middleware.js';
import { extractTextOnly, getDocuments, uploadDocument } from '../controller/document.controller.js';


const router = express.Router();

// http://localhost:3000/api/upload
router.post('/upload', upload.single('file'), uploadDocument);

// http://localhost:3000/api/documents
router.get('/documents', getDocuments);

// http://localhost:3000/api/extract-text
router.post('/extract-text', upload.single('file'), extractTextOnly);
export default router;
