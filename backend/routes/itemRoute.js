import express from "express";
import { createItem, deleteItem, getLostItems, getSingleLostItems, updatedItem } from "../controllers/itemController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createItem);
router.route("/delete/:id").delete(isAuthenticated, deleteItem);

router.route("/items").get(getLostItems);
router.route("/items/:id").get(getSingleLostItems);
router.route("/update/:id").put(isAuthenticated, updatedItem);

export default router;
