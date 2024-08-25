import express from "express";
import { createFoundItem, deleteFoundItem, getFoundItems, getSingleFoundItem, updateFoundItem } from "../controllers/foundController.js";
import  isAuthenticated  from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, upload.single("image"),createFoundItem);
router.route("/items").get(getFoundItems);
router.route("/items/:id").get(getSingleFoundItem);
router.route("/update/:id").put(isAuthenticated, upload.single("image"),updateFoundItem);
router.route("/delete/:id").delete(isAuthenticated, deleteFoundItem);

export default router;