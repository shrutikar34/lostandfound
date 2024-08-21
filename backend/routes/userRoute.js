import express from 'express';
import { deleteMyProfile, getMyProfile, updateMyProfile } from '../controllers/userController.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.route("/profile/:id").get(isAuthenticated,getMyProfile);
router.route("/profile/update").put(isAuthenticated,updateMyProfile);
router.route("/profile/delete/:id").delete(isAuthenticated,deleteMyProfile);
export default router;