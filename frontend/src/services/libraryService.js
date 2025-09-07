import apiClient from './apiClient';

export const libraryService = {
  // Book Management
  addBook: async (bookData) => {
    const response = await apiClient.post('/library/books', bookData);
    return response.data;
  },

  updateBook: async (id, data) => {
    const response = await apiClient.put(`/library/books/${id}`, data);
    return response.data;
  },

  searchBooks: async (query, category) => {
    const response = await apiClient.get('/library/books/search', {
      params: { query, category }
    });
    return response.data;
  },

  getBookDetails: async (id) => {
    const response = await apiClient.get(`/library/books/${id}`);
    return response.data;
  },

  // Book Issue Management
  issueBook: async (issueData) => {
    const response = await apiClient.post('/library/issues', issueData);
    return response.data;
  },

  returnBook: async (issueId) => {
    const response = await apiClient.put(`/library/issues/${issueId}/return`);
    return response.data;
  },

  getStudentIssues: async (studentId) => {
    const response = await apiClient.get(`/library/issues/student/${studentId}`);
    return response.data;
  },

  getOverdueBooks: async () => {
    const response = await apiClient.get('/library/issues/overdue');
    return response.data;
  },

  calculateFine: async (issueId) => {
    const response = await apiClient.get(`/library/issues/${issueId}/fine`);
    return response.data;
  }
};
