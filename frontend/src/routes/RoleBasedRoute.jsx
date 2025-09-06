import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RoleBasedRoute = ({ children, allowedRoles = [], redirectTo = '/unauthorized' }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow access for any authenticated user
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is in the allowed roles
  const hasPermission = allowedRoles.includes(user?.role?.toLowerCase());

  if (!hasPermission) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Higher-order component for specific role routes
export const StudentRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['student']} redirectTo="/unauthorized">
    {children}
  </RoleBasedRoute>
);

export const FacultyRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['faculty']} redirectTo="/unauthorized">
    {children}
  </RoleBasedRoute>
);

export const ManagementRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['management', 'admin']} redirectTo="/unauthorized">
    {children}
  </RoleBasedRoute>
);

export const AdminRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={['admin']} redirectTo="/unauthorized">
    {children}
  </RoleBasedRoute>
);

// Multi-role route for components accessible by multiple roles
export const MultiRoleRoute = ({ children, roles }) => (
  <RoleBasedRoute allowedRoles={roles} redirectTo="/unauthorized">
    {children}
  </RoleBasedRoute>
);

// Route that requires any authenticated user (any role)
export const AuthenticatedRoute = ({ children }) => (
  <RoleBasedRoute allowedRoles={[]} redirectTo="/login">
    {children}
  </RoleBasedRoute>
);

export default RoleBasedRoute;
