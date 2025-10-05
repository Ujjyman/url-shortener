import { Router } from "express";
import { createShortUrl, redirect, stats } from "../controllers/url.controller.js";

const router = Router();

router.post("/api/shorten", createShortUrl);
router.get("/api/:shortId/stats", stats);
router.get("/:shortId", redirect);

export default router;

