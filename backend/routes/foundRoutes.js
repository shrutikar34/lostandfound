import express from "express";
import { createFoundItem, getFoundItems, getSingleFoundItem } from "../controllers/foundController";
import  isAuthenticated  from "../middleware/auth.js";
import { updatedItem } from "../controllers/itemController";

const router = express.Router();

router.route("/create").post(isAuthenticated, createFoundItem);
router.route("/items").get(getFoundItems);
router.route("/items/:id").get(getSingleFoundItem);
router.route("/update/:id").put(isAuthenticated, updateFoundItem);
