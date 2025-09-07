import apiClient from './apiClient';

export const attendanceService = {
  // Mark attendance for a student
  markAttendance: async (attendanceData) => {
    const response = await apiClient.post('/attendance', attendanceData);
    return response.data;
  },

  // Get attendance for a student
  getStudentAttendance: async (studentId) => {
    const response = await apiClient.get(`/attendance/student/${studentId}`);
    return response.data;
  },

  // Get attendance for a course
  getCourseAttendance: async (courseId) => {
    const response = await apiClient.get(`/attendance/course/${courseId}`);
    return response.data;
  },

  // Get attendance for a teacher
  getTeacherAttendance: async (teacherId) => {
    const response = await apiClient.get(`/attendance/teacher/${teacherId}`);
    return response.data;
  },

  // Update attendance record
  updateAttendance: async (id, data) => {
    const response = await apiClient.put(`/attendance/${id}`, data);
    return response.data;
  },

  // Get attendance report
  getAttendanceReport: async (courseId, startDate, endDate) => {
    const response = await apiClient.get('/attendance/report', {
      params: { courseId, startDate, endDate }
    });
    return response.data;
  }
};
