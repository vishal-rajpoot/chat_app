import express from "express";
import { loginUser, registerUser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/registeration", registerUser);
router.post("/login", loginUser);

export default router;
