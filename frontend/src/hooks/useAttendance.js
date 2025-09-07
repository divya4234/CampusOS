import { useApiRequest } from './useApiRequest';
import { attendanceService } from '../services/attendanceService';

export function useAttendance() {
  const { data: attendanceData, loading: markingAttendance, error: markError, execute: executeMarkAttendance } = useApiRequest(attendanceService.markAttendance);
  
  const { data: studentAttendance, loading: loadingStudentAttendance, error: studentError, execute: fetchStudentAttendance } = useApiRequest(attendanceService.getStudentAttendance);
  
  const { data: courseAttendance, loading: loadingCourseAttendance, error: courseError, execute: fetchCourseAttendance } = useApiRequest(attendanceService.getCourseAttendance);
  
  const { data: teacherAttendance, loading: loadingTeacherAttendance, error: teacherError, execute: fetchTeacherAttendance } = useApiRequest(attendanceService.getTeacherAttendance);
  
  const { data: report, loading: loadingReport, error: reportError, execute: fetchAttendanceReport } = useApiRequest(attendanceService.getAttendanceReport);

  return {
    // Mark attendance
    markAttendance: executeMarkAttendance,
    markingAttendance,
    markError,
    attendanceData,

    // Student attendance
    fetchStudentAttendance,
    loadingStudentAttendance,
    studentError,
    studentAttendance,

    // Course attendance
    fetchCourseAttendance,
    loadingCourseAttendance,
    courseError,
    courseAttendance,

    // Teacher attendance
    fetchTeacherAttendance,
    loadingTeacherAttendance,
    teacherError,
    teacherAttendance,

    // Attendance report
    fetchAttendanceReport,
    loadingReport,
    reportError,
    report
  };
}
