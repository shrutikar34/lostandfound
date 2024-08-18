import express from "express";
import { createReport, deleteReport } from "../controllers/reportlostController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,createReport);
router.route("/delete/:id").delete(isAuthenticated,deleteReport);

export default router;