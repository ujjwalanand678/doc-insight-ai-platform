import express from 'express';
import { improveContentWithAI } from '../controller/improveContent.controller.js';

const router = express.Router();

// POST /api/ai/improve
router.post('/improve', improveContentWithAI);

export default router;
