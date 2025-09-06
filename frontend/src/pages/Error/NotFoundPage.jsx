import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const getHomePath = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'student':
        return '/dashboard/student';
      case 'faculty':
        return '/dashboard/faculty';
      case 'management':
        return '/dashboard/management';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  const quickLinks = [
    { 
      title: 'Student Dashboard', 
      path: '/dashboard/student', 
      icon: '👨‍🎓',
      description: 'Access your academic portal',
      roles: ['student']
    },
    { 
      title: 'Faculty Dashboard', 
      path: '/dashboard/faculty', 
      icon: '👨‍🏫',
      description: 'Faculty management portal',
      roles: ['faculty']
    },
    { 
      title: 'Library', 
      path: '/library', 
      icon: '📚',
      description: 'Browse books and resources',
      roles: ['student', 'faculty']
    },
    { 
      title: 'Attendance', 
      path: '/attendance', 
      icon: '✅',
      description: 'Check attendance records',
      roles: ['student', 'faculty']
    },
    { 
      title: 'Grades', 
      path: '/grades', 
      icon: '📊',
      description: 'View academic performance',
      roles: ['student', 'faculty']
    },
    { 
      title: 'Profile', 
      path: '/profile', 
      icon: '👤',
      description: 'Manage your profile',
      roles: ['student', 'faculty', 'management']
    },
    { 
      title: 'Hostel', 
      path: '/hostel', 
      icon: '🏠',
      description: 'Hostel management',
      roles: ['student']
    },
    { 
      title: 'Canteen', 
      path: '/canteen', 
      icon: '🍽️',
      description: 'Food services and menu',
      roles: ['student', 'faculty']
    }
  ];

  const getFilteredLinks = () => {
    if (!user) return [];
    return quickLinks.filter(link => link.roles.includes(user.role));
  };

  const errorMessages = [
    "Oops! This page seems to have gone on a study break.",
    "404: Page not found. Maybe it's in the library?",
    "This page is currently attending a different class.",
    "Error 404: The page you're looking for has graduated!",
    "Sorry, this page is not in our course curriculum.",
    "This URL seems to have dropped out of our system."
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Error Section */}
        <div className="text-center mb-12">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4">
              <span className="text-8xl md:text-9xl font-bold text-primary animate-bounce">4</span>
              <div className="relative">
                <span className="text-8xl md:text-9xl font-bold text-secondary">0</span>
                <div className="absolute inset-0 animate-spin">
                  <span className="text-6xl">🎓</span>
                </div>
              </div>
              <span className="text-8xl md:text-9xl font-bold text-primary animate-bounce delay-150">4</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              {randomMessage}
            </p>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <p className="text-slate-700">
                <strong>Don't worry!</strong> Let's get you back to your academic journey.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGoBack}
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>←</span>
              <span>Go Back</span>
            </button>
            <Link
              to={getHomePath()}
              className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>🏠</span>
              <span>Go Home</span>
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>🔑</span>
              <span>Login</span>
            </Link>
          </div>
        </div>

        {/* Quick Navigation */}
        {user && getFilteredLinks().length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center flex items-center justify-center space-x-2">
              <span>🧭</span>
              <span>Quick Navigation</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getFilteredLinks().map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 text-center transition-all hover:shadow-md group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{link.title}</h3>
                  <p className="text-sm text-slate-600">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Suggestion */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center flex items-center justify-center space-x-2">
            <span>🔍</span>
            <span>What were you looking for?</span>
          </h2>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for pages, features, or help..."
                className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['Dashboard', 'Library', 'Attendance', 'Grades', 'Profile', 'Hostel'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center flex items-center justify-center space-x-2">
            <span>💡</span>
            <span>Need Help?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Support */}
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-slate-800 mb-2">Contact Support</h3>
              <p className="text-sm text-slate-600 mb-3">Get help from our technical team</p>
              <div className="space-y-1 text-sm">
                <p className="text-slate-600">📱 +91 98765 43210</p>
                <p className="text-slate-600">📧 support@campusos.edu</p>
              </div>
            </div>

            {/* Report Issue */}
            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="text-3xl mb-3">🐛</div>
              <h3 className="font-semibold text-slate-800 mb-2">Report Issue</h3>
              <p className="text-sm text-slate-600 mb-3">Found a broken link or bug?</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Report Problem
              </button>
            </div>

            {/* Documentation */}
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-slate-800 mb-2">User Guide</h3>
              <p className="text-sm text-slate-600 mb-3">Learn how to use CampusOS</p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Guide
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500">
          <p className="text-sm">
            © 2024 CampusOS - Your Digital Campus Experience
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Help Center</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
