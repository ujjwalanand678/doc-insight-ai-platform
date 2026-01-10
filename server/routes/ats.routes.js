import express from 'express';
import upload from '../middleware/upload.middleware.js';
import { checkATS } from '../controller/ats.controller.js';

const router = express.Router();

router.post('/check', upload.single('resume'), checkATS);

export default router;
