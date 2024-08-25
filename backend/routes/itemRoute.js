import express from "express";
import { createItem, deleteItem, getLostItems, getSingleLostItems, updatedItem } from "../controllers/itemController.js";
import isAuthenticated from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, upload.single("image"), createItem);
router.route("/delete/:id").delete(isAuthenticated, deleteItem);

router.route("/items").get(getLostItems);
router.route("/items/:id").get(getSingleLostItems);
router.route("/update/:id").put(isAuthenticated, upload.single("image"),updatedItem);

export default router;
