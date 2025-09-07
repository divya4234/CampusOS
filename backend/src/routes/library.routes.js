import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import {
  addBook,
  updateBook,
  searchBooks,
  getBookDetails,
  issueBook,
  returnBook,
  getStudentIssues,
  getOverdueBooks,
  calculateFine
} from '../controllers/library.controller.js';

const router = Router();

// All routes require authentication
router.use(authRequired);

// Book Management
router.post('/library/books', addBook);
router.put('/library/books/:id', updateBook);
router.get('/library/books/search', searchBooks);
router.get('/library/books/:id', getBookDetails);

// Book Issue Management
router.post('/library/issues', issueBook);
router.put('/library/issues/:issueId/return', returnBook);
router.get('/library/issues/student/:studentId', getStudentIssues);
router.get('/library/issues/overdue', getOverdueBooks);
router.get('/library/issues/:issueId/fine', calculateFine);

export default router;
