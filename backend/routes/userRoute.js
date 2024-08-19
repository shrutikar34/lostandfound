import express from 'express';
import { getMyProfile } from '../controllers/userController.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.route("/profile/:id").get(isAuthenticated,getMyProfile);

export default router;