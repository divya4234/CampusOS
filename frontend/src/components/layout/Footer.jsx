import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Campus Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <span className="text-white text-xl font-bold">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-white">CampusOS</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Your comprehensive campus management system for academic excellence, 
              student life, and institutional growth.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                title="Facebook"
              >
                📘
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                title="Twitter"
              >
                🐦
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                title="Instagram"
              >
                📷
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/student/attendance" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Attendance
                </Link>
              </li>
              <li>
                <Link 
                  to="/student/grades" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Grades & Results
                </Link>
              </li>
              <li>
                <Link 
                  to="/student/fees" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Fee Management
                </Link>
              </li>
              <li>
                <Link 
                  to="/student/canteen" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Canteen Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/student/library" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Library Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Academic Services</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/student/registration" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Exam Registration
                </Link>
              </li>
              <li>
                <Link 
                  to="/faculty/attendance" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Faculty Portal
                </Link>
              </li>
              <li>
                <Link 
                  to="/student/hostel" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Hostel Management
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Academic Calendar
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Course Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-primary">📍</span>
                <div>
                  <p className="text-slate-300">
                    CampusOS University<br />
                    123 Education Street<br />
                    Knowledge City, KC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary">📞</span>
                <p className="text-slate-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary">📧</span>
                <p className="text-slate-300">info@campusos.edu</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary">🌐</span>
                <p className="text-slate-300">www.campusos.edu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Help Section */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <h5 className="font-semibold text-white mb-2">📚 Student Support</h5>
              <p className="text-slate-300 text-sm">
                Get help with academics, registration, and campus life
              </p>
              <a 
                href="#" 
                className="text-primary hover:text-primary-light text-sm font-medium"
              >
                Contact Support →
              </a>
            </div>
            <div className="text-center md:text-left">
              <h5 className="font-semibold text-white mb-2">💻 Technical Help</h5>
              <p className="text-slate-300 text-sm">
                Issues with the portal? Our IT team is here to help
              </p>
              <a 
                href="#" 
                className="text-primary hover:text-primary-light text-sm font-medium"
              >
                IT Support →
              </a>
            </div>
            <div className="text-center md:text-left">
              <h5 className="font-semibold text-white mb-2">📋 Documentation</h5>
              <p className="text-slate-300 text-sm">
                User guides, FAQs, and system documentation
              </p>
              <a 
                href="#" 
                className="text-primary hover:text-primary-light text-sm font-medium"
              >
                View Docs →
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
            Quick Actions
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link 
              to="/student/profile"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              👤 My Profile
            </Link>
            <Link 
              to="/student/fees"
              className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              💰 Pay Fees
            </Link>
            <a 
              href="#"
              className="bg-accent hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              📞 Emergency Contact
            </a>
            <a 
              href="#"
              className="bg-success hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              📋 Feedback
            </a>
          </div>
        </div>

        {/* Important Links */}
        <div className="border-t border-slate-700 pt-6 mb-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Academic Policies
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Student Code of Conduct
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Accessibility
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Campus Safety
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} CampusOS University. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Made with ❤️ for education</span>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Version 2.1.0</span>
                <span className="bg-success text-white px-2 py-1 rounded-full text-xs">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-6 bg-danger rounded-lg p-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-2xl">🚨</span>
            <div className="text-center">
              <p className="text-white font-semibold text-sm">
                Emergency Contact: Campus Security
              </p>
              <p className="text-red-100 text-sm">
                📞 +1 (555) 911-HELP | Available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
