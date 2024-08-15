import express from "express";
import { Login, Logout, Register } from "../controller/authController.js";

const router = express.Router();

router.route("/signup").post(Register);
router.route("/signin").post(Login);
router.route("/signout").get(Logout);

export default router;