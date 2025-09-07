import apiClient from './apiClient';

export const gradeService = {
  // Submit grade for a student
  submitGrade: async (gradeData) => {
    const response = await apiClient.post('/grades/submit', gradeData);
    return response.data;
  },

  // Submit bulk grades
  submitBulkGrades: async (gradesData) => {
    const response = await apiClient.post('/grades/submit/bulk', gradesData);
    return response.data;
  },

  // Get grades for a student
  getStudentGrades: async (studentId, options = {}) => {
    const { semester, courseId } = options;
    const response = await apiClient.get(`/grades/student/${studentId}`, {
      params: { semester, courseId }
    });
    return response.data;
  },

  // Get student's CGPA
  getStudentCGPA: async (studentId) => {
    const response = await apiClient.get(`/grades/student/${studentId}/cgpa`);
    return response.data;
  },

  // Get grades for a course
  getCourseGrades: async (courseId, semester) => {
    const response = await apiClient.get(`/grades/course/${courseId}`, {
      params: { semester }
    });
    return response.data;
  },

  // Update grade record
  updateGrade: async (id, data) => {
    const response = await apiClient.put(`/grades/${id}`, data);
    return response.data;
  },

  // Delete grade record
  deleteGrade: async (id) => {
    const response = await apiClient.delete(`/grades/${id}`);
    return response.data;
  },

  // Get grade report
  getGradeReport: async (options = {}) => {
    const { courseId, semester, studentId, fromDate, toDate } = options;
    const response = await apiClient.get('/grades/report', {
      params: { courseId, semester, studentId, fromDate, toDate }
    });
    return response.data;
  },

  // Get grade statistics
  getGradeStatistics: async (courseId, semester) => {
    const response = await apiClient.get(`/grades/statistics/${courseId}`, {
      params: { semester }
    });
    return response.data;
  },

  // Export grades to PDF
  exportGradesToPDF: async (options = {}) => {
    const { courseId, semester, studentId } = options;
    const response = await apiClient.get('/grades/export/pdf', {
      params: { courseId, semester, studentId },
      responseType: 'blob'
    });
    return response.data;
  },

  // Export grades to Excel
  exportGradesToExcel: async (options = {}) => {
    const { courseId, semester, studentId } = options;
    const response = await apiClient.get('/grades/export/excel', {
      params: { courseId, semester, studentId },
      responseType: 'blob'
    });
    return response.data;
  },

  // Get grade distribution
  getGradeDistribution: async (courseId, semester) => {
    const response = await apiClient.get(`/grades/distribution/${courseId}`, {
      params: { semester }
    });
    return response.data;
  },

  // Publish grades
  publishGrades: async (courseId, semester) => {
    const response = await apiClient.post(`/grades/publish`, {
      courseId,
      semester
    });
    return response.data;
  }
};
