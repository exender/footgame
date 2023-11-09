import express from 'express';
import { youtubeConversion } from '../controllers/youtube.js';
import {
  apiAuth,
  authenticateToken,
} from '../controllers/auth.js';

const router = express.Router();

router.post("/youtube", apiAuth, authenticateToken, youtubeConversion);

export { router as youtubeRoutes }
