import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import {
  submitGrade,
  getStudentGrades,
  getCourseGrades,
  updateGrade,
  getGradeReport,
  getGradeStatistics
} from '../controllers/grade.controller.js';

const router = Router();

// All routes require authentication
router.use(authRequired);

// Submit grade
router.post('/grades', submitGrade);

// Get grades by student
router.get('/grades/student/:studentId', getStudentGrades);

// Get grades by course
router.get('/grades/course/:courseId', getCourseGrades);

// Update grade
router.put('/grades/:id', updateGrade);

// Get grade report
router.get('/grades/report', getGradeReport);

// Get grade statistics
router.get('/grades/statistics/:courseId', getGradeStatistics);

export default router;
