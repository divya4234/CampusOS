import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
const Attendance = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock attendance data - replace with API call
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for current month
      const mockData = [
        { id: 1, subject: 'Data Structures', date: '2025-01-15', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
        { id: 2, subject: 'Operating Systems', date: '2025-01-15', status: 'present', time: '11:00 AM', teacher: 'Prof. Johnson' },
        { id: 3, subject: 'Database Management', date: '2025-01-16', status: 'absent', time: '10:00 AM', teacher: 'Dr. Brown' },
        { id: 4, subject: 'Web Development', date: '2025-01-16', status: 'present', time: '02:00 PM', teacher: 'Ms. Davis' },
        { id: 5, subject: 'Data Structures', date: '2025-01-17', status: 'present', time: '09:00 AM', teacher: 'Dr. Smith' },
        { id: 6, subject: 'Operating Systems', date: '2025-01-17', status: 'late', time: '11:00 AM', teacher: 'Prof. Johnson' },
        { id: 7, subject: 'Software Engineering', date: '2025-01-18', status: 'present', time: '01:00 PM', teacher: 'Dr. Wilson' },
        { id: 8, subject: 'Web Development', date: '2025-01-18', status: 'absent', time: '03:00 PM', teacher: 'Ms. Davis' },
      ];

      // Calculate statistics
      const totalClasses = mockData.length;
      const presentCount = mockData.filter(record => record.status === 'present').length;
      const absentCount = mockData.filter(record => record.status === 'absent').length;
      const lateCount = mockData.filter(record => record.status === 'late').length;
      const attendancePercentage = ((presentCount + lateCount) / totalClasses * 100).toFixed(1);

      // Subject-wise statistics
      const subjectStats = {};
      mockData.forEach(record => {
        if (!subjectStats[record.subject]) {
          subjectStats[record.subject] = { total: 0, present: 0, absent: 0, late: 0 };
        }
        subjectStats[record.subject].total++;
        subjectStats[record.subject][record.status]++;
      });

      setAttendanceData(mockData);
      setStats({
        total: totalClasses,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        percentage: attendancePercentage,
        subjects: subjectStats
      });
      setLoading(false);
    };

    fetchAttendanceData();
  }, [selectedMonth, selectedYear]);

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
          <p className="text-slate-600">Loading attendance data...</p>
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
            {user?.name}'s Attendance
          </h1>
          <p className="text-slate-600">
            Track your class attendance and maintain academic performance
          </p>
        </div>

        {/* Attendance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Classes</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                📚
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Present</p>
                <p className="text-2xl font-bold text-success">{stats.present}</p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Absent</p>
                <p className="text-2xl font-bold text-danger">{stats.absent}</p>
              </div>
              <div className="bg-danger p-3 rounded-xl text-white text-2xl">
                ❌
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Attendance Rate</p>
                <p className="text-2xl font-bold text-primary">{stats.percentage}%</p>
              </div>
              <div className="bg-secondary p-3 rounded-xl text-white text-2xl">
                📊
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Status Alert */}
        {stats.percentage < 75 && (
          <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-danger">Low Attendance Alert!</h3>
                <p className="text-slate-600">
                  Your attendance is below 75%. You need to attend more classes to maintain eligibility.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Attendance Records */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Recent Attendance</h2>
                <div className="flex space-x-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(2025, i).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {attendanceData.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getStatusIcon(record.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{record.subject}</h3>
                        <p className="text-slate-600 text-sm">{record.teacher} • {record.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                      <p className="text-slate-500 text-sm mt-1">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject-wise Statistics */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Subject-wise Attendance</h2>
              <div className="space-y-4">
                {Object.entries(stats.subjects || {}).map(([subject, data]) => {
                  const percentage = ((data.present + data.late) / data.total * 100).toFixed(1);
                  return (
                    <div key={subject} className="p-4 border border-slate-200 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-slate-800">{subject}</h3>
                        <span className={`text-sm font-semibold ${
                          percentage >= 75 ? 'text-success' : 'text-danger'
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentage >= 75 ? 'bg-success' : 'bg-danger'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Present: {data.present}</span>
                        <span>Absent: {data.absent}</span>
                        <span>Late: {data.late}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-md mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <span>📄</span>
                  <span>Download Report</span>
                </button>
                <button className="w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <span>📧</span>
                  <span>Email Summary</span>
                </button>
                <button className="w-full bg-[#FACC15] hover:bg-yellow-500 text-white p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
                  <span>📅</span>
                  <span>View Timetable</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
