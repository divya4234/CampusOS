import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import {
  createHostel,
  updateHostel,
  listHostels,
  addRoom,
  updateRoom,
  listRooms,
  allocateRoom,
  deallocateRoom,
  getStudentAllocation,
  fileComplaint,
  updateComplaint,
  listComplaints,
  getStudentComplaints
} from '../controllers/hostel.controller.js';

const router = Router();

// All routes require authentication
router.use(authRequired);

// Hostel Management Routes
router.post('/hostels', createHostel);
router.put('/hostels/:id', updateHostel);
router.get('/hostels', listHostels);

// Room Management Routes
router.post('/hostels/:hostelId/rooms', addRoom);
router.put('/hostels/rooms/:id', updateRoom);
router.get('/hostels/:hostelId/rooms', listRooms);

// Room Allocation Routes
router.post('/hostels/allocations', allocateRoom);
router.put('/hostels/allocations/:allocationId', deallocateRoom);
router.get('/hostels/allocations/student/:studentId', getStudentAllocation);

// Complaint Routes
router.post('/hostels/complaints', fileComplaint);
router.put('/hostels/complaints/:id', updateComplaint);
router.get('/hostels/complaints', listComplaints);
router.get('/hostels/complaints/student/:studentId', getStudentComplaints);

export default router;
