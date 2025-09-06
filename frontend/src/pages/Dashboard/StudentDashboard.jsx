import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import studImg from './../../assets/studentImg.png';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [studentProfile, setStudentProfile] = useState({});
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [gradesSummary, setGradesSummary] = useState({});
  const [canteenSummary, setCanteenSummary] = useState({});
  const [feesSummary, setFeesSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock notifications data
      const mockNotifications = [
        {
          id: 1,
          title: 'Assignment Due Tomorrow',
          message: 'Database Management Assignment #3 due by 11:59 PM',
          time: '2 hours ago',
          type: 'assignment',
          priority: 'high',
          unread: true
        },
        {
          id: 2,
          title: 'New Grade Posted',
          message: 'Operating Systems Mid-term exam grade available',
          time: '5 hours ago',
          type: 'grade',
          priority: 'medium',
          unread: true
        },
        {
          id: 3,
          title: 'Fee Payment Reminder',
          message: 'Semester fee payment due in 3 days',
          time: '1 day ago',
          type: 'fee',
          priority: 'high',
          unread: false
        },
        {
          id: 4,
          title: 'Canteen Menu Updated',
          message: 'Special meals available this week',
          time: '2 days ago',
          type: 'canteen',
          priority: 'low',
          unread: false
        },
        {
          id: 5,
          title: 'Library Book Due',
          message: 'Return "Advanced Algorithms" by Sept 10th',
          time: '3 days ago',
          type: 'library',
          priority: 'medium',
          unread: false
        }
      ];

      // Mock faculty details
      const mockFacultyDetails = [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          subject: 'Data Structures',
          code: 'CS101',
          email: 'sarah.johnson@campus.edu',
          phone: '+1 (555) 123-4567',
          office: 'Room 201',
          officeHours: 'Mon-Wed 2:00-4:00 PM',
          image: '/api/placeholder/60/60'
        },
        {
          id: 2,
          name: 'Prof. Michael Chen',
          subject: 'Operating Systems',
          code: 'CS201',
          email: 'michael.chen@campus.edu',
          phone: '+1 (555) 234-5678',
          office: 'Room 305',
          officeHours: 'Tue-Thu 1:00-3:00 PM',
          image: '/api/placeholder/60/60'
        },
        {
          id: 3,
          name: 'Dr. Emily Davis',
          subject: 'Database Management',
          code: 'CS301',
          email: 'emily.davis@campus.edu',
          phone: '+1 (555) 345-6789',
          office: 'Room 408',
          officeHours: 'Mon-Fri 10:00-12:00 PM',
          image: '/api/placeholder/60/60'
        }
      ];

      // Mock student profile
      const mockStudentProfile = {
        name: user?.name || 'John Doe',
        rollNo: 'CSE21001',
        semester: '6th Semester',
        branch: 'Computer Science Engineering',
        section: 'A',
        email: 'john.doe@student.campus.edu',
        phone: '+1 (555) 987-6543',
        address: '123 Student Housing, Campus',
        bloodGroup: 'O+',
        parentContact: '+1 (555) 876-5432',
        image: '/api/placeholder/120/120'
      };

      // Mock attendance summary
      const mockAttendanceSummary = {
        overall: 87.5,
        subjects: [
          { subject: 'Data Structures', percentage: 92, present: 23, total: 25 },
          { subject: 'Operating Systems', percentage: 85, present: 17, total: 20 },
          { subject: 'Database Management', percentage: 88, present: 22, total: 25 }
        ],
        trend: 'increasing',
        lastUpdated: '2 hours ago'
      };

      // Mock grades summary
      const mockGradesSummary = {
        cgpa: 8.7,
        sgpa: 8.9,
        rank: 5,
        totalStudents: 125,
        recentGrades: [
          { subject: 'Operating Systems', grade: 'A', points: 9.0, credits: 4 },
          { subject: 'Database Management', grade: 'A+', points: 10.0, credits: 4 },
          { subject: 'Software Engineering', grade: 'B+', points: 8.0, credits: 3 }
        ],
        trend: 'improving'
      };

      // Mock canteen summary
      const mockCanteenSummary = {
        mealPlan: 'Premium',
        remainingMeals: 45,
        totalMeals: 60,
        monthlySpent: 2850,
        monthlyBudget: 3500,
        todayMenu: {
          breakfast: 'Idli Sambhar, Coffee',
          lunch: 'Chicken Biryani, Raita',
          dinner: 'Chapati, Dal Curry'
        },
        nextPayment: '2025-09-15'
      };

      // Mock fees summary
      const mockFeesSummary = {
        totalFee: 125000,
        paidAmount: 95000,
        pendingAmount: 30000,
        nextDueDate: '2025-09-15',
        installments: [
          { name: 'Tuition Fee', amount: 80000, status: 'paid', dueDate: '2025-08-15' },
          { name: 'Lab Fee', amount: 15000, status: 'paid', dueDate: '2025-08-15' },
          { name: 'Library Fee', amount: 5000, status: 'pending', dueDate: '2025-09-15' },
          { name: 'Hostel Fee', amount: 25000, status: 'pending', dueDate: '2025-09-15' }
        ],
        scholarship: 15000
      };

      // Mock today's schedule
      const mockTodaySchedule = [
        { time: '09:00 AM', subject: 'Data Structures', room: 'Room 101', faculty: 'Dr. Sarah Johnson' },
        { time: '11:00 AM', subject: 'Operating Systems', room: 'Room 203', faculty: 'Prof. Michael Chen' },
        { time: '02:00 PM', subject: 'Database Management', room: 'Lab 301', faculty: 'Dr. Emily Davis' },
        { time: '04:00 PM', subject: 'Software Lab', room: 'Lab 205', faculty: 'Mr. David Wilson' }
      ];

      setNotifications(mockNotifications);
      setFacultyDetails(mockFacultyDetails);
      setStudentProfile(mockStudentProfile);
      setAttendanceSummary(mockAttendanceSummary);
      setGradesSummary(mockGradesSummary);
      setCanteenSummary(mockCanteenSummary);
      setFeesSummary(mockFeesSummary);
      setTodaySchedule(mockTodaySchedule);
      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, unread: false } : notif
    ));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'grade':
        return '📊';
      case 'fee':
        return '💰';
      case 'canteen':
        return '🍽️';
      case 'library':
        return '📚';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-danger bg-danger/5';
      case 'medium':
        return 'border-accent bg-accent/5';
      case 'low':
        return 'border-success bg-success/5';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 75) return 'text-accent';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
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
            Welcome back, {studentProfile.name}!
          </h1>
          <p className="text-slate-600">
            {studentProfile.branch} • {studentProfile.semester} • Roll No: {studentProfile.rollNo}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile & Faculty */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div 
              onClick={() => navigate('/student/profile')}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {studentProfile.name.charAt(0)}
                  <img src={studImg} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{studentProfile.name}</h3>
                <p className="text-slate-600 text-sm">{studentProfile.rollNo}</p>
                <p className="text-slate-600 text-sm">{studentProfile.semester}</p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>📧 {studentProfile.email}</p>
                    <p>📞 {studentProfile.phone}</p>
                    <p>🩸 {studentProfile.bloodGroup}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faculty in Charge */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Faculty in Charge</h3>
              <div className="space-y-4">
                {facultyDetails.slice(0, 2).map((faculty) => (
                  <div key={faculty.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 text-sm">{faculty.name}</h4>
                      <p className="text-slate-600 text-xs">{faculty.subject}</p>
                      <p className="text-slate-500 text-xs">{faculty.office}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full text-primary hover:text-primary-dark text-sm font-medium mt-2">
                  View All Faculty →
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Main Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance Card */}
              <div 
                onClick={() => navigate('/student/attendance')}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#6366F1] p-3 rounded-xl text-white text-2xl group-hover:scale-110 transition-transform">
                    ✅
                  </div>
                  <span className={`text-2xl font-bold ${getAttendanceColor(attendanceSummary.overall)}`}>
                    {attendanceSummary.overall}%
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Attendance</h3>
                <p className="text-slate-600 text-sm mb-3">Overall attendance this semester</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${attendanceSummary.overall}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Updated {attendanceSummary.lastUpdated}</p>
              </div>

              {/* Grades Card */}
              <div 
                onClick={() => navigate('/student/grades')}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-secondary group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#14B8A6] p-3 rounded-xl text-white text-2xl group-hover:scale-110 transition-transform">
                    📊
                  </div>
                  <span className="text-2xl font-bold text-[#14B8A6] roboto-font">
                    {gradesSummary.cgpa}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Grades</h3>
                <p className="text-slate-600 text-sm mb-3">Current CGPA • Rank #{gradesSummary.rank}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">SGPA:</span>
                  <span className="font-medium text-[#14B8A6]">{gradesSummary.sgpa}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Rank {gradesSummary.rank} of {gradesSummary.totalStudents}</p>
              </div>

              {/* Canteen Card */}
              <div 
                onClick={() => navigate('/student/canteen')}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-accent group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#FACC15] p-3 rounded-xl text-white text-2xl group-hover:scale-110 transition-transform">
                    🍽️
                  </div>
                  <span className="text-lg font-bold text-[#FACC15]">
                    {canteenSummary.remainingMeals}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Canteen</h3>
                <p className="text-slate-600 text-sm mb-3">Meals remaining this month</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#FACC15] h-2 rounded-full transition-all" 
                    style={{ width: `${(canteenSummary.remainingMeals / canteenSummary.totalMeals) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 roboto-font">Plan: {canteenSummary.mealPlan}</p>
              </div>

              {/* Fees Card */}
              <div 
                onClick={() => navigate('/student/fees')}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-danger group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#EF4444] p-3 rounded-xl text-white text-2xl group-hover:scale-110 transition-transform">
                    💰
                  </div>
                  <span className="text-lg font-bold text-danger">
                    ₹{(feesSummary.pendingAmount / 1000).toFixed(0)}K
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Fees</h3>
                <p className="text-slate-600 text-sm mb-3">Pending amount</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#22C55E] h-2 rounded-full transition-all" 
                    style={{ width: `${(feesSummary.paidAmount / feesSummary.totalFee) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500">Due: {feesSummary.nextDueDate}</p>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 secHeading-font">Today's Schedule</h3>
              <div className="space-y-3">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="text-[#6366F1] font-medium text-sm w-20">
                      {schedule.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{schedule.subject}</h4>
                      <p className="text-slate-600 text-sm">{schedule.room} • {schedule.faculty}</p>
                    </div>
                    <div className="text-2xl">📚</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
                <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                  {notifications.filter(n => n.unread).length} new
                </span>
              </div>
              
              <div className="space-y-3">
                {notifications.slice(0, 6).map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      notification.unread 
                        ? getPriorityColor(notification.priority)
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          notification.unread ? 'text-slate-800' : 'text-slate-600'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-slate-600 text-xs mt-1">{notification.message}</p>
                        <span className="text-slate-500 text-xs mt-1 block">{notification.time}</span>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-primary hover:text-primary-dark text-sm font-medium">
                View All Notifications
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-md mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Assignments Due</span>
                  <span className="bg-danger text-white px-2 py-1 rounded-full text-xs">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Upcoming Exams</span>
                  <span className="bg-accent text-white px-2 py-1 rounded-full text-xs">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Library Books</span>
                  <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Study Hours</span>
                  <span className="bg-success text-white px-2 py-1 rounded-full text-xs">32h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
