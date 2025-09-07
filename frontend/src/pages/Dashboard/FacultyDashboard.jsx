import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendanceOverview, setAttendanceOverview] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [fileDescription, setFileDescription] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock notifications data
      const mockNotifications = [
        {
          id: 1,
          title: 'New Assignment Submission',
          message: 'John Doe submitted Database Assignment #3',
          time: '10 minutes ago',
          type: 'assignment',
          unread: true
        },
        {
          id: 2,
          title: 'Parent Meeting Request',
          message: 'Meeting requested for Alice Brown (CS301)',
          time: '1 hour ago',
          type: 'meeting',
          unread: true
        },
        {
          id: 3,
          title: 'Low Attendance Alert',
          message: '3 students below 75% attendance in CS201',
          time: '2 hours ago',
          type: 'alert',
          unread: false
        },
        {
          id: 4,
          title: 'Department Meeting',
          message: 'Faculty meeting scheduled for tomorrow 2 PM',
          time: '1 day ago',
          type: 'meeting',
          unread: false
        }
      ];

      // Mock classes data
      const mockClasses = [
        { 
          id: 'cs101', 
          name: 'Data Structures - CS101', 
          students: 45, 
          time: '09:00 AM',
          section: 'A',
          semester: '3rd',
          room: 'Room 101'
        },
        { 
          id: 'cs201', 
          name: 'Operating Systems - CS201', 
          students: 38, 
          time: '11:00 AM',
          section: 'B',
          semester: '5th',
          room: 'Room 203'
        },
        { 
          id: 'cs301', 
          name: 'Database Management - CS301', 
          students: 42, 
          time: '02:00 PM',
          section: 'A',
          semester: '6th',
          room: 'Lab 301'
        }
      ];

      // Mock attendance overview
      const mockAttendanceOverview = [
        {
          classId: 'cs101',
          className: 'Data Structures',
          code: 'CS101',
          totalStudents: 45,
          presentToday: 38,
          absentToday: 7,
          attendancePercentage: 84.4,
          lastUpdated: '2 hours ago'
        },
        {
          classId: 'cs201',
          className: 'Operating Systems',
          code: 'CS201',
          totalStudents: 38,
          presentToday: 32,
          absentToday: 6,
          attendancePercentage: 84.2,
          lastUpdated: '1 hour ago'
        },
        {
          classId: 'cs301',
          className: 'Database Management',
          code: 'CS301',
          totalStudents: 42,
          presentToday: 39,
          absentToday: 3,
          attendancePercentage: 92.9,
          lastUpdated: '30 minutes ago'
        }
      ];

      // Mock recent activities
      const mockRecentActivities = [
        {
          id: 1,
          action: 'File shared to CS101 - Data Structures',
          description: 'Lecture Notes Chapter 5.pdf',
          time: '2 hours ago',
          type: 'file'
        },
        {
          id: 2,
          action: 'Attendance marked for CS301',
          description: '39/42 students present',
          time: '3 hours ago',
          type: 'attendance'
        },
        {
          id: 3,
          action: 'Assignment graded',
          description: 'CS201 - Operating Systems Assignment #2',
          time: '1 day ago',
          type: 'grading'
        },
        {
          id: 4,
          action: 'New announcement posted',
          description: 'Mid-term exam schedule updated',
          time: '2 days ago',
          type: 'announcement'
        }
      ];

      setNotifications(mockNotifications);
      setClasses(mockClasses);
      setAttendanceOverview(mockAttendanceOverview);
      setRecentActivities(mockRecentActivities);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleFileUpload = async () => {
    if (!uploadFile || !selectedClass || !fileDescription) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add to recent activities
    const newActivity = {
      id: Date.now(),
      action: `File shared to ${classes.find(c => c.id === selectedClass)?.name}`,
      description: uploadFile.name,
      time: 'Just now',
      type: 'file'
    };
    
    setRecentActivities(prev => [newActivity, ...prev]);
    
    // Reset form
    setUploadFile(null);
    setFileDescription('');
    setSelectedClass('');
    setShowFileUpload(false);
    setLoading(false);
    
    alert('File shared successfully!');
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, unread: false } : notif
    ));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'meeting':
        return '👥';
      case 'alert':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'file':
        return '📎';
      case 'attendance':
        return '✅';
      case 'grading':
        return '📊';
      case 'announcement':
        return '📢';
      default:
        return '📌';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 70) return 'text-accent';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 heading-font">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-600">
            Faculty Dashboard - Manage your classes and student activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Classes</p>
                <p className="text-2xl font-bold text-primary">{classes.length}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                📚
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold text-secondary">
                  {classes.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
              <div className="bg-secondary p-3 rounded-xl text-white text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Unread Notifications</p>
                <p className="text-2xl font-bold text-accent">
                  {notifications.filter(n => n.unread).length}
                </p>
              </div>
              <div className="bg-accent p-3 rounded-xl text-white text-2xl">
                🔔
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg Attendance</p>
                <p className="text-2xl font-bold text-success">
                  {Math.round(attendanceOverview.reduce((sum, att) => sum + att.attendancePercentage, 0) / attendanceOverview.length)}%
                </p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                📊
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Attendance Overview Cards */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Class Attendance Overview</h2>
                <button
                  onClick={() => navigate('/faculty/attendance')}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendanceOverview.map((classData) => (
                  <div 
                    key={classData.classId}
                    onClick={() => navigate('/faculty/attendance')}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">{classData.className}</h3>
                        <p className="text-slate-600 text-sm">{classData.code}</p>
                      </div>
                      <span className={`text-xl font-bold ${getAttendanceColor(classData.attendancePercentage)}`}>
                        {classData.attendancePercentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Present Today:</span>
                        <span className="font-medium text-success">{classData.presentToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Absent Today:</span>
                        <span className="font-medium text-danger">{classData.absentToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total Students:</span>
                        <span className="font-medium">{classData.totalStudents}</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${classData.attendancePercentage}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-xs text-slate-500">Updated {classData.lastUpdated}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* File Sharing Section */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Share Files with Classes</h2>
                <button
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl transition-colors"
                >
                  {showFileUpload ? 'Cancel' : 'Share File'}
                </button>
              </div>

              {showFileUpload && (
                <div className="border border-slate-200 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Select Class</label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choose a class...</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name} - Section {cls.section}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Upload File</label>
                      <input
                        type="file"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={fileDescription}
                      onChange={(e) => setFileDescription(e.target.value)}
                      placeholder="Enter file description or message..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-20 resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleFileUpload}
                    className="bg-success hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-colors"
                  >
                    Share File
                  </button>
                </div>
              )}

              {/* Recent Activities */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {recentActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{activity.action}</p>
                        <p className="text-slate-600 text-sm">{activity.description}</p>
                      </div>
                      <span className="text-slate-500 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Notifications</h2>
                <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                  {notifications.filter(n => n.unread).length} new
                </span>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      notification.unread 
                        ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${notification.unread ? 'text-primary' : 'text-slate-800'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-slate-600 text-sm mt-1">{notification.message}</p>
                        <span className="text-slate-500 text-xs mt-2 block">{notification.time}</span>
                      </div>
                      {notification.unread && (
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-primary hover:text-primary-dark text-sm font-medium">
                View All Notifications
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-md mt-6 text-[#0F172A]">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/faculty/attendance')}
                  className="w-full bg-primary hover:bg-[#4F46E5] text-[#0F172A] p-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>✅</span>
                  <span>Mark Attendance</span>
                </button>
                <button className="w-full bg-secondary hover:bg-[#0D9488] text-[#0F172A] p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <span>📊</span>
                  <span>Generate Reports</span>
                </button>
                <button className="w-full bg-accent hover:bg-yellow-500 text-[#0F172A] p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <span>📢</span>
                  <span>Make Announcement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
