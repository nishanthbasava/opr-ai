import express from "express";
import { generatePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/generate", generatePost);

export default router;