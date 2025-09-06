import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextBase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock authentication - replace with real API calls
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check for stored authentication token
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username, password, role) => {
    try {
      setLoading(true);

      // Basic password validation (in real app, this would be done on server)
      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Mock login API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on role
      let mockUser;
      switch (role) {
        case 'admin':
          mockUser = {
            id: 'admin001',
            name: 'System Administrator',
            email: 'admin@campus.edu',
            role: 'admin',
            adminId: 'admin001',
            department: 'IT Administration',
            position: 'System Administrator'
          };
          break;
        case 'faculty':
          mockUser = {
            id: username,
            name: 'Dr. Jane Smith',
            email: 'jane.smith@campus.edu',
            role: 'faculty',
            facultyId: username,
            department: 'Computer Science',
            position: 'Professor'
          };
          break;
        case 'management':
          mockUser = {
            id: username,
            name: 'Management User',
            email: 'management@campus.edu',
            role: 'management',
            managementId: username,
            department: 'Administration',
            position: 'Manager'
          };
          break;
        default:
          mockUser = {
            id: username,
            name: 'John Doe',
            email: 'john.doe@campus.edu',
            role: 'student',
            studentId: username,
            department: 'Computer Science',
            year: 2
          };
      }

      console.log('Login Attempt:', { username, role }); // Debugging log
      console.log('Mock User:', mockUser); // Debugging log

      // Store authentication data
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  // Helper functions to check user roles
  const isStudent = () => user?.role === 'student';
  const isFaculty = () => user?.role === 'faculty';
  const isManagement = () => user?.role === 'management';
  const isAdmin = () => user?.role === 'admin';

  // Get redirect path based on user role
  const getRoleBasedRedirect = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'faculty':
        return '/faculty/dashboard';
      case 'management':
        return '/management/dashboard';
      case 'admin':
        return '/admin/panel';
      default:
        return '/';
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateProfile,
    isStudent,
    isFaculty,
    isManagement,
    isAdmin,
    getRoleBasedRedirect
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext } from './AuthContextBase';
