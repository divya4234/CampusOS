import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import {
  markAttendance,
  getStudentAttendance,
  getCourseAttendance,
  getTeacherAttendance,
  updateAttendance,
  getAttendanceReport
} from '../controllers/attendance.controller.js';

const router = Router();

// All routes require authentication
router.use(authRequired);

// Mark attendance
router.post('/attendance', markAttendance);

// Get attendance by student
router.get('/attendance/student/:studentId', getStudentAttendance);

// Get attendance by course
router.get('/attendance/course/:courseId', getCourseAttendance);

// Get attendance by teacher
router.get('/attendance/teacher/:teacherId', getTeacherAttendance);

// Update attendance
router.put('/attendance/:id', updateAttendance);

// Get attendance report
router.get('/attendance/report', getAttendanceReport);

export default router;
