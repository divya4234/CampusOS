import apiClient from './apiClient';

export const teacherService = {
  // Get teacher's courses
  getTeacherCourses: async (teacherId) => {
    const response = await apiClient.get(`/teachers/${teacherId}/courses`);
    return response.data;
  },

  // Get teacher's timetable
  getTeacherTimetable: async (teacherId) => {
    const response = await apiClient.get(`/teachers/${teacherId}/timetable`);
    return response.data;
  },

  // Get teacher's students
  getTeacherStudents: async (teacherId, courseId) => {
    const response = await apiClient.get(`/teachers/${teacherId}/courses/${courseId}/students`);
    return response.data;
  },

  // Update teacher profile
  updateProfile: async (teacherId, data) => {
    const response = await apiClient.put(`/teachers/${teacherId}`, data);
    return response.data;
  },

  // Get teacher's course statistics
  getCourseStats: async (teacherId, courseId) => {
    const response = await apiClient.get(`/teachers/${teacherId}/courses/${courseId}/stats`);
    return response.data;
  }
};

export default teacherService;
