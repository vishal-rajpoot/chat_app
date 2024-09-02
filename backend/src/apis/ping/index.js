import express from "express";
import { pong, hash } from "./pingController.js";

const router = express.Router();

router.get("/", pong);
router.get("/hash/:id", hash);

export default router;
