import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const AttendanceFac = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [viewMode, setViewMode] = useState('mark'); // 'mark' or 'view'

  // Mock data for faculty classes and students
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock classes data
      const mockClasses = [
        { id: 'cs101', name: 'Data Structures - CS101', students: 45, time: '09:00 AM' },
        { id: 'cs201', name: 'Operating Systems - CS201', students: 38, time: '11:00 AM' },
        { id: 'cs301', name: 'Database Management - CS301', students: 42, time: '02:00 PM' },
      ];

      // Mock students data for selected class
      const mockStudents = [
        { id: 'ST001', name: 'John Doe', rollNo: 'CSE21001', email: 'john@campus.edu' },
        { id: 'ST002', name: 'Jane Smith', rollNo: 'CSE21002', email: 'jane@campus.edu' },
        { id: 'ST003', name: 'Bob Johnson', rollNo: 'CSE21003', email: 'bob@campus.edu' },
        { id: 'ST004', name: 'Alice Brown', rollNo: 'CSE21004', email: 'alice@campus.edu' },
        { id: 'ST005', name: 'Charlie Wilson', rollNo: 'CSE21005', email: 'charlie@campus.edu' },
        { id: 'ST006', name: 'Diana Davis', rollNo: 'CSE21006', email: 'diana@campus.edu' },
        { id: 'ST007', name: 'Eva Martinez', rollNo: 'CSE21007', email: 'eva@campus.edu' },
        { id: 'ST008', name: 'Frank Taylor', rollNo: 'CSE21008', email: 'frank@campus.edu' },
      ];

      // Mock attendance statistics
      const mockStats = {
        totalClasses: 15,
        averageAttendance: 87.5,
        presentToday: 6,
        absentToday: 2,
        lateToday: 0
      };

      setClasses(mockClasses);
      setStudents(mockStudents);
      setStats(mockStats);
      
      // Initialize attendance data
      const initialAttendance = {};
      mockStudents.forEach(student => {
        initialAttendance[student.id] = 'present';
      });
      setAttendanceData(initialAttendance);
      
      // Set default class if available
      if (mockClasses.length > 0) {
        setSelectedClass(mockClasses[0].id);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update stats
    const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
    const absentCount = Object.values(attendanceData).filter(status => status === 'absent').length;
    const lateCount = Object.values(attendanceData).filter(status => status === 'late').length;
    
    setStats(prev => ({
      ...prev,
      presentToday: presentCount,
      absentToday: absentCount,
      lateToday: lateCount
    }));
    
    setLoading(false);
    alert('Attendance marked successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success text-white';
      case 'absent':
        return 'bg-danger text-white';
      case 'late':
        return 'bg-accent text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'late':
        return '⏰';
      default:
        return '❓';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading class data...</p>
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
            {user?.name} - Attendance Management
          </h1>
          <p className="text-slate-600">
            Mark and manage student attendance for your classes
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Classes</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalClasses}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                📚
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg Attendance</p>
                <p className="text-2xl font-bold text-success">{stats.averageAttendance}%</p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                📊
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Present Today</p>
                <p className="text-2xl font-bold text-success">{stats.presentToday}</p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Absent Today</p>
                <p className="text-2xl font-bold text-danger">{stats.absentToday}</p>
              </div>
              <div className="bg-danger p-3 rounded-xl text-white text-2xl">
                ❌
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students} students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('mark')}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  viewMode === 'mark' 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Mark Attendance
              </button>
              <button
                onClick={() => setViewMode('view')}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  viewMode === 'view' 
                    ? 'bg-secondary text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                View Records
              </button>
            </div>
          </div>
        </div>

        {/* Student Attendance List */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {viewMode === 'mark' ? 'Mark Attendance' : 'Attendance Records'}
            </h2>
            {viewMode === 'mark' && (
              <button
                onClick={handleSubmitAttendance}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl transition-colors"
              >
                Submit Attendance
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Roll No</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Student Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Email</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Status</th>
                  {viewMode === 'mark' && (
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 font-medium">{student.rollNo}</td>
                    <td className="py-4 px-4">{student.name}</td>
                    <td className="py-4 px-4 text-slate-600">{student.email}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(attendanceData[student.id] || 'present')}`}>
                        <span className="mr-1">{getStatusIcon(attendanceData[student.id] || 'present')}</span>
                        {(attendanceData[student.id] || 'present').charAt(0).toUpperCase() + (attendanceData[student.id] || 'present').slice(1)}
                      </span>
                    </td>
                    {viewMode === 'mark' && (
                      <td className="py-4 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                            className={`p-2 rounded-lg transition-colors ${
                              attendanceData[student.id] === 'present'
                                ? 'bg-success text-white'
                                : 'bg-slate-200 hover:bg-success hover:text-white'
                            }`}
                            title="Present"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                            className={`p-2 rounded-lg transition-colors ${
                              attendanceData[student.id] === 'absent'
                                ? 'bg-danger text-white'
                                : 'bg-slate-200 hover:bg-danger hover:text-white'
                            }`}
                            title="Absent"
                          >
                            ❌
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                            className={`p-2 rounded-lg transition-colors ${
                              attendanceData[student.id] === 'late'
                                ? 'bg-accent text-white'
                                : 'bg-slate-200 hover:bg-accent hover:text-white'
                            }`}
                            title="Late"
                          >
                            ⏰
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <button className="bg-primary hover:bg-primary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Generate Report</span>
          </button>
          <button className="bg-secondary hover:bg-secondary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📧</span>
            <span className="font-semibold">Email Parents</span>
          </button>
          <button className="bg-accent hover:bg-yellow-500 text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📥</span>
            <span className="font-semibold">Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFac;
