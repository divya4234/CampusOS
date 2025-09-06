// src/routes/dashboard.routes.js
import express from "express";
import { dashboard, recommendations } from "../controllers/dashboard.controller.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();

// protected dashboard: ADMIN and TEACHER
router.get("/", authRequired, requireRole("ADMIN","TEACHER"), dashboard);

// recommendations: allow any authenticated user (or public if you want)
router.get("/recommendations", authRequired, recommendations);

export default router;
