import express, { Router, Request, Response } from 'express';
import {
  apiAuth,
  authenticateToken,
} from '../controllers/auth';
import { youtubeConversion } from '../controllers/youtube';

const router: Router = express.Router();

router.post("/youtube", apiAuth, authenticateToken, youtubeConversion);

export { router as youtubeRoutes };
