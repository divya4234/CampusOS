import express from "express";
import { 
  listStudents, 
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByDepartment,
  getStudentsByYear,
  updateStudentStatus
} from "../controllers/student.controller.js";
import { tenantMiddleware } from "../middleware/tenant.middleware.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();
router.use(tenantMiddleware);

// List students: ADMIN or TEACHER can list
router.get("/", authRequired, requireRole("ADMIN", "TEACHER"), listStudents);

// Filter students
router.get("/department", authRequired, requireRole("ADMIN", "TEACHER"), getStudentsByDepartment);
router.get("/year", authRequired, requireRole("ADMIN", "TEACHER"), getStudentsByYear);

// Create student: ADMIN only
router.post("/", authRequired, requireRole("ADMIN"), createStudent);

// Get/update/delete single student
router.get("/:id", authRequired, requireRole("ADMIN", "TEACHER", "STUDENT"), getStudentById);
router.put("/:id", authRequired, requireRole("ADMIN", "STUDENT"), updateStudent);
router.delete("/:id", authRequired, requireRole("ADMIN"), deleteStudent);

// Update student status: ADMIN only
router.patch("/:id/status", authRequired, requireRole("ADMIN"), updateStudentStatus);

export default router;
