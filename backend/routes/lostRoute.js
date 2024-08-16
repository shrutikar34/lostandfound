import express from "express";
import { createReport } from "../controllers/reportlostController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,createReport);

export default router;