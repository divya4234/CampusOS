import { useApiRequest } from './useApiRequest';
import { gradeService } from '../services/gradeService';

export function useGrades() {
  const { data: grades, loading: submittingGrade, error: submitError, execute: executeSubmitGrade } = useApiRequest(gradeService.submitGrade);
  
  const { data: studentGrades, loading: loadingStudentGrades, error: studentError, execute: fetchStudentGrades } = useApiRequest(gradeService.getStudentGrades);
  
  const { data: courseGrades, loading: loadingCourseGrades, error: courseError, execute: fetchCourseGrades } = useApiRequest(gradeService.getCourseGrades);
  
  const { data: report, loading: loadingReport, error: reportError, execute: fetchGradeReport } = useApiRequest(gradeService.getGradeReport);
  
  const { data: statistics, loading: loadingStats, error: statsError, execute: fetchGradeStats } = useApiRequest(gradeService.getGradeStatistics);

  return {
    // Submit grades
    submitGrade: executeSubmitGrade,
    submittingGrade,
    submitError,
    grades,

    // Student grades
    fetchStudentGrades,
    loadingStudentGrades,
    studentError,
    studentGrades,

    // Course grades
    fetchCourseGrades,
    loadingCourseGrades,
    courseError,
    courseGrades,

    // Grade report
    fetchGradeReport,
    loadingReport,
    reportError,
    report,

    // Grade statistics
    fetchGradeStats,
    loadingStats,
    statsError,
    statistics
  };
}
