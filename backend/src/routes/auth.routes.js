// src/routes/auth.routes.js
import express from "express";
import { loginUser } from "../controllers/auth.controller.js";
import { tenantFromHeader } from "../middleware/auth.js";

const router = express.Router();

// Client must send X-College-Id header during login
router.post("/login", tenantFromHeader, loginUser);

export default router;
