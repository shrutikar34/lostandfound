import express from "express";
import { createFoundItem, deleteFoundItem, getFoundItems, getSingleFoundItem, updateFoundItem } from "../controllers/foundController.js";
import  isAuthenticated  from "../middleware/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createFoundItem);
router.route("/items").get(getFoundItems);
router.route("/items/:id").get(getSingleFoundItem);
router.route("/update/:id").put(isAuthenticated, updateFoundItem);
router.route("/delete/:id").delete(isAuthenticated, deleteFoundItem);

export default router;