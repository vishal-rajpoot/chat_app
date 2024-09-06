import express from "express";
import { getChatById, getChats } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChatById);

export default router;
