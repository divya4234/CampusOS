import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from './../../assets/erp-logo.png';
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMenuOpen(false);
  };

  const getNavigationLinks = () => {
    const isActive = (path) => location.pathname.includes(path);

    switch (user?.role) {
      case 'student':
        return [
          {
            name: 'Dashboard',
            path: '/student/dashboard',
            icon: '🏠',
            active: isActive('/student/dashboard')
          },
          {
            name: 'Attendance',
            path: '/student/attendance',
            icon: '✅',
            active: isActive('/student/attendance')
          },
          {
            name: 'Grades',
            path: '/student/grades',
            icon: '📊',
            active: isActive('/student/grades')
          },
          {
            name: 'Fees',
            path: '/student/fees',
            icon: '💰',
            active: isActive('/student/fees')
          },
          {
            name: 'Canteen',
            path: '/student/canteen',
            icon: '🍽️',
            active: isActive('/student/canteen')
          },
          {
            name: 'Library',
            path: '/student/library',
            icon: '📚',
            active: isActive('/student/library')
          }
        ];
      
      case 'faculty':
        return [
          {
            name: 'Dashboard',
            path: '/faculty/dashboard',
            icon: '🏠',
            active: isActive('/faculty/dashboard')
          },
          {
            name: 'Attendance',
            path: '/faculty/attendance',
            icon: '✅',
            active: isActive('/faculty/attendance')
          },
          {
            name: 'Grades',
            path: '/faculty/grades',
            icon: '📊',
            active: isActive('/faculty/grades')
          },
          {
            name: 'Library',
            path: '/faculty/library',
            icon: '📚',
            active: isActive('/faculty/library')
          }
        ];
      
      case 'management':
        return [
          {
            name: 'Dashboard',
            path: '/management/dashboard',
            icon: '🏠',
            active: isActive('/management/dashboard')
          },
          {
            name: 'Reports',
            path: '/management/reports',
            icon: '📈',
            active: isActive('/management/reports')
          },
          {
            name: 'Fees',
            path: '/management/fees',
            icon: '💰',
            active: isActive('/management/fees')
          },
          {
            name: 'Profile',
            path: '/management/profile',
            icon: '👤',
            active: isActive('/management/profile')
          }
        ];
      
      case 'admin':
        return [
          {
            name: 'Admin Panel',
            path: '/admin/panel',
            icon: '⚙️',
            active: isActive('/admin/panel')
          },
          {
            name: 'Users',
            path: '/admin/users',
            icon: '👥',
            active: isActive('/admin/users')
          },
          {
            name: 'System',
            path: '/admin/system',
            icon: '🔧',
            active: isActive('/admin/system')
          }
        ];
      
      default:
        return [];
    }
  };

  const navigationLinks = getNavigationLinks();

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'student':
        return 'Student Portal';
      case 'faculty':
        return 'Faculty Portal';
      case 'management':
        return 'Management Portal';
      case 'admin':
        return 'Admin Portal';
      default:
        return 'Campus Portal';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'student':
        return 'bg-primary text-white';
      case 'faculty':
        return 'bg-secondary text-white';
      case 'management':
        return 'bg-accent text-white';
      case 'admin':
        return 'bg-danger text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to={user ? `/${user.role}/dashboard` : '/'} className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-800">CampusOS</h1>
                <p className="text-xs text-slate-600">{getRoleDisplayName(user?.role)}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all hover:bg-blue-700 ${
                  link.active 
                    ? 'text-primary bg-primary/10 border border-primary/20' 
                    : 'text-slate-700 hover:text-primary'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-primary transition-colors">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                  <p className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </p>
                </div>
                <span className="text-slate-500">▼</span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <p className="font-medium text-slate-800">{user?.name}</p>
                    <p className="text-sm text-slate-600">{user?.email}</p>
                  </div>
                  
                  <Link
                    to={user?.role === 'management' ? '/management/profile' : '/profile'}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <span>👤</span>
                    <span>My Profile</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </Link>
                  
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <span>❓</span>
                    <span>Help & Support</span>
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-danger hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            >
              <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                    link.active 
                      ? 'text-primary bg-primary/10 border border-primary/20' 
                      : 'text-slate-700 hover:text-primary hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              
              <hr className="my-2" />
              
              <Link
                to={user?.role === 'management' ? '/management/profile' : '/profile'}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:text-primary hover:bg-slate-100 transition-all"
              >
                <span className="text-lg">👤</span>
                <span className="font-medium">My Profile</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-danger hover:bg-red-50 transition-all w-full text-left"
              >
                <span className="text-lg">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
