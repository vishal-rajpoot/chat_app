import express from "express";
import { getChatById, getChats } from "../controllers/chatController.js";
import tryCatchHandler from "../../utils/tryCatchHandler.js";

const router = express.Router();

router.get("/", tryCatchHandler(getChats));
router.get("/:id", tryCatchHandler(getChatById));

export default router;
