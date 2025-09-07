import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useAttendance } from '../../../hooks/useAttendance';

const AttendanceFac = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [stats, setStats] = useState({});
  const [viewMode, setViewMode] = useState('mark'); // 'mark' or 'view'
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const {
    markAttendance,
    markingAttendance: loading,
    fetchTeacherAttendance,
    teacherAttendance,
    fetchCourseAttendance,
    courseAttendance,
    fetchAttendanceReport,
    report
  } = useAttendance();

  // Load teacher's classes and their attendance
  useEffect(() => {
    if (user?.id) {
      fetchTeacherAttendance(user.id);
    }
  }, [user, fetchTeacherAttendance]);

  // Load class data when a class is selected
  useEffect(() => {
    if (selectedClass) {
      fetchCourseAttendance(selectedClass);
    }
  }, [selectedClass, fetchCourseAttendance]);

  // Update attendance data when course attendance changes
  useEffect(() => {
    if (courseAttendance) {
      const initialAttendance = {};
      courseAttendance.students?.forEach(student => {
        initialAttendance[student.id] = 'present';
      });
      setAttendanceData(initialAttendance);
      setStudents(courseAttendance.students || []);
    }
  }, [courseAttendance]);

  // Update classes when teacher attendance data changes
  useEffect(() => {
    if (teacherAttendance?.courses) {
      setClasses(teacherAttendance.courses);
      if (teacherAttendance.courses.length > 0) {
        setSelectedClass(teacherAttendance.courses[0].id);
      }
    }
  }, [teacherAttendance]);

  useEffect(() => {
    if (viewMode === 'view' && selectedClass) {
      fetchAttendanceReport({ courseId: selectedClass, startDate, endDate });
    }
  }, [viewMode, selectedClass, startDate, endDate, fetchAttendanceReport]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = async () => {
    try {
      const attendanceRecords = Object.entries(attendanceData).map(([studentId, status]) => ({
        course: selectedClass,
        student: studentId,
        teacher: user.id,
        date: selectedDate,
        status,
        remarks: ''
      }));

      // Submit attendance records
      await Promise.all(attendanceRecords.map(record => markAttendance(record)));

      // Fetch updated course attendance
      await fetchCourseAttendance(selectedClass);

      // Update stats
      const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
      const absentCount = Object.values(attendanceData).filter(status => status === 'absent').length;
      const lateCount = Object.values(attendanceData).filter(status => status === 'late').length;
      
      setStats({
        totalClasses: stats.totalClasses + 1,
        averageAttendance: ((stats.totalClasses * stats.averageAttendance + presentCount) / (stats.totalClasses + 1)).toFixed(1),
        presentToday: presentCount,
        absentToday: absentCount,
        lateToday: lateCount
      });

    } catch (error) {
      console.error('Failed to submit attendance:', error);
      alert('Failed to submit attendance. Please try again.');
    }
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

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const renderAttendanceReport = () => {
    if (!report) return null;

    return (
      <div className="space-y-6">
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance Report</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {startDate} to {endDate}
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              {report.summary && (
                <>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Total Classes</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {report.summary.totalClasses}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Average Attendance</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {report.summary.averageAttendance}%
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          <div className="px-4 py-5 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Absent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Late
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.studentRecords?.map((record) => (
                  <tr key={record.studentId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.absent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.late}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.attendancePercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    return viewMode === 'mark' ? (
      <div className="space-y-8">
        {/* Class Selection */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'mark' ? 'view' : 'mark')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {viewMode === 'mark' ? 'View Reports' : 'Mark Attendance'}
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Classes</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalClasses}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Average Attendance</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.averageAttendance}%</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Present Today</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.presentToday}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Absent Today</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.absentToday}</dd>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.rollNo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={attendanceData[student.id] || 'present'}
                            onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmitAttendance}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      </div>
    ) : renderAttendanceReport();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Mark and view student attendance records
          </p>
        </div>

        {renderMainContent()}
      </div>
    </div>
  );
};

export default AttendanceFac;
