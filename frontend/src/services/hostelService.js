import apiClient from './apiClient';

export const hostelService = {
  // Hostel Management
  createHostel: async (hostelData) => {
    const response = await apiClient.post('/hostels', hostelData);
    return response.data;
  },

  updateHostel: async (id, data) => {
    const response = await apiClient.put(`/hostels/${id}`, data);
    return response.data;
  },

  listHostels: async () => {
    const response = await apiClient.get('/hostels');
    return response.data;
  },

  // Room Management
  addRoom: async (hostelId, roomData) => {
    const response = await apiClient.post(`/hostels/${hostelId}/rooms`, roomData);
    return response.data;
  },

  updateRoom: async (id, data) => {
    const response = await apiClient.put(`/hostels/rooms/${id}`, data);
    return response.data;
  },

  listRooms: async (hostelId) => {
    const response = await apiClient.get(`/hostels/${hostelId}/rooms`);
    return response.data;
  },

  // Room Allocation
  allocateRoom: async (allocationData) => {
    const response = await apiClient.post('/hostels/allocations', allocationData);
    return response.data;
  },

  deallocateRoom: async (allocationId) => {
    const response = await apiClient.put(`/hostels/allocations/${allocationId}`);
    return response.data;
  },

  getStudentAllocation: async (studentId) => {
    const response = await apiClient.get(`/hostels/allocations/student/${studentId}`);
    return response.data;
  },

  // Complaints
  fileComplaint: async (complaintData) => {
    const response = await apiClient.post('/hostels/complaints', complaintData);
    return response.data;
  },

  updateComplaint: async (id, data) => {
    const response = await apiClient.put(`/hostels/complaints/${id}`, data);
    return response.data;
  },

  listComplaints: async (hostelId, status) => {
    const response = await apiClient.get('/hostels/complaints', {
      params: { hostelId, status }
    });
    return response.data;
  },

  getStudentComplaints: async (studentId) => {
    const response = await apiClient.get(`/hostels/complaints/student/${studentId}`);
    return response.data;
  }
};
