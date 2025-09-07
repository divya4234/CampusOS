import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    if (user) {
      // Redirect to user's role-based dashboard
      switch (user.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'faculty':
          navigate('/faculty/dashboard');
          break;
        case 'management':
          navigate('/management/dashboard');
          break;
        case 'admin':
          navigate('/admin/panel');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl text-danger">🚫</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-slate-800 mb-4 heading-font">
          Access Denied
        </h1>
        <p className="text-slate-600 mb-6 leading-relaxed">
          You don't have permission to access this page. This area is restricted to specific user roles.
        </p>

        {/* User Info */}
        {user && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-600">
              You are logged in as: <span className="font-semibold text-slate-800">{user.name}</span>
            </p>
            <p className="text-sm text-slate-600">
              Role: <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'student' ? 'bg-primary text-white' :
                user.role === 'faculty' ? 'bg-secondary text-white' :
                user.role === 'management' ? 'bg-accent text-white' :
                'bg-slate-500 text-white'
              }`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            {user ? 'Go to Dashboard' : 'Go to Home'}
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Go Back
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full text-danger hover:text-red-700 px-6 py-2 font-semibold transition-colors"
            >
              Logout & Login as Different User
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Need access? Contact your system administrator or{' '}
            <Link to="/contact" className="text-primary hover:text-primary-dark underline">
              submit a request
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
