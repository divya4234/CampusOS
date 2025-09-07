import { createPayment, getPaymentHistory } from "../controllers/payment.controller.js";
import { requireRole,authRequired } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

// Only admin can create payments
router.post(
  "/payments",
  authRequired,           // must come first
  requireRole(["student", "admin", "teacher"]),   // then role check
  createPayment
);

// All roles can view payment history
router.get("/payments/history/:studentId", getPaymentHistory);

export default router;
