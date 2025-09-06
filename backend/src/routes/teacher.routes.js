import express from "express";
import { 
  listTeachers, 
  createTeacher, 
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeachersByDepartment,
  updateTeacherStatus
} from "../controllers/teacher.controller.js";
import { tenantMiddleware } from "../middleware/tenant.middleware.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();
router.use(tenantMiddleware);

// List teachers: ADMIN or TEACHER can list
router.get("/", authRequired, requireRole("ADMIN", "TEACHER"), listTeachers);

// Filter teachers by department
router.get("/department", authRequired, requireRole("ADMIN", "TEACHER"), getTeachersByDepartment);

// Create teacher: ADMIN only
router.post("/", authRequired, requireRole("ADMIN"), createTeacher);

// Get/update/delete single teacher: ADMIN or the teacher themselves
router.get("/:id", authRequired, requireRole("ADMIN", "TEACHER"), getTeacherById);
router.put("/:id", authRequired, requireRole("ADMIN"), updateTeacher);
router.delete("/:id", authRequired, requireRole("ADMIN"), deleteTeacher);

// Update teacher status: ADMIN only
router.patch("/:id/status", authRequired, requireRole("ADMIN"), updateTeacherStatus);

export default router;