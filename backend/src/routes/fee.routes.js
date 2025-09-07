import express from "express";
import { requireRole,authRequired } from "../middleware/auth.js";
import { createFeeController, getFees, getDues } from "../controllers/fee.controller.js";

const router = express.Router();

router.post("/fees", authRequired, requireRole("admin"), createFeeController);
// GET /api/fees/:studentId → Get all fee records
router.get("/fees/:studentId", getFees);

// GET /api/dues/:studentId → Get only unpaid dues
router.get("/dues/:studentId", getDues);

export default router;
