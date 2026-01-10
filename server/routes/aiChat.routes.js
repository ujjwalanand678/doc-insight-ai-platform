import express from 'express';
import { chatWithAI } from '../controller/aiChat.controller.js';

const router = express.Router();

router.post('/chat', chatWithAI);

export default router;
