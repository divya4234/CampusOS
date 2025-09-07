import { useApiRequest } from './useApiRequest';
import { hostelService } from '../services/hostelService';

export function useHostel() {
  const { data: hostels, loading: loadingHostels, error: hostelError, execute: fetchHostels } = useApiRequest(hostelService.listHostels);
  
  const { data: rooms, loading: loadingRooms, error: roomsError, execute: fetchRooms } = useApiRequest(hostelService.listRooms);
  
  const { data: allocation, loading: allocating, error: allocError, execute: executeAllocation } = useApiRequest(hostelService.allocateRoom);
  
  const { data: studentAllocation, loading: loadingAllocation, error: studentAllocError, execute: fetchStudentAllocation } = useApiRequest(hostelService.getStudentAllocation);
  
  const { data: complaints, loading: loadingComplaints, error: complaintError, execute: fetchComplaints } = useApiRequest(hostelService.listComplaints);
  
  const { data: studentComplaints, loading: loadingStudentComplaints, error: studentComplaintError, execute: fetchStudentComplaints } = useApiRequest(hostelService.getStudentComplaints);

  return {
    // Hostel listing
    fetchHostels,
    loadingHostels,
    hostelError,
    hostels,

    // Room listing
    fetchRooms,
    loadingRooms,
    roomsError,
    rooms,

    // Room allocation
    allocateRoom: executeAllocation,
    allocating,
    allocError,
    allocation,

    // Student allocation
    fetchStudentAllocation,
    loadingAllocation,
    studentAllocError,
    studentAllocation,

    // Complaints listing
    fetchComplaints,
    loadingComplaints,
    complaintError,
    complaints,

    // Student complaints
    fetchStudentComplaints,
    loadingStudentComplaints,
    studentComplaintError,
    studentComplaints,

    // Original service methods for admin operations
    hostelService
  };
}
