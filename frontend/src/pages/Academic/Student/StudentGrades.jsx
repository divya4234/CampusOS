import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useGrades } from '../../../hooks/useGrades';

const StudentGrades = () => {
  const { user } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  
  const {
    fetchStudentGrades,
    loadingStudentGrades,
    studentError,
    studentGrades
  } = useGrades();

  // Fetch grades when component mounts
  useEffect(() => {
    const loadGrades = async () => {
      if (!user?.id) return;
      
      setError(null);
      setLoading(true);
      try {
        await fetchStudentGrades(user.id);
      } catch (err) {
        setError('Failed to load grades. Please try again.');
        console.error('Error loading grades:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGrades();
  }, [user, fetchStudentGrades]);

  // Update grades when student grades data changes
  useEffect(() => {
    if (studentGrades?.courses) {
      setGrades(studentGrades.courses);
    }
  }, [studentGrades]);

  // Calculate semester-wise statistics
  const semesterStats = useMemo(() => {
    const stats = {};
    
    grades.forEach(grade => {
      if (!stats[grade.semester]) {
        stats[grade.semester] = {
          courses: 0,
          totalMarks: 0,
          totalCredits: 0,
          grades: []
        };
      }
      
      stats[grade.semester].courses++;
      stats[grade.semester].totalMarks += grade.marks;
      stats[grade.semester].totalCredits += grade.credits || 0;
      stats[grade.semester].grades.push(grade);
    });

    // Calculate GPA and other stats
    Object.keys(stats).forEach(sem => {
      const semData = stats[sem];
      semData.average = semData.totalMarks / semData.courses;
      
      // Calculate GPA (4.0 scale)
      const gradePoints = {
        'A+': 4.0, 'A': 3.7,
        'B+': 3.3, 'B': 3.0,
        'C+': 2.7, 'C': 2.0,
        'F': 0.0
      };

      let totalPoints = 0;
      semData.grades.forEach(grade => {
        totalPoints += (gradePoints[grade.grade] || 0) * (grade.credits || 1);
      });
      
      semData.gpa = totalPoints / semData.totalCredits;
    });

    return stats;
  }, [grades]);

  // Calculate CGPA
  const cgpa = useMemo(() => {
    if (Object.keys(semesterStats).length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    Object.values(semesterStats).forEach(sem => {
      totalPoints += sem.gpa * sem.totalCredits;
      totalCredits += sem.totalCredits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [semesterStats]);

  // Filter grades by selected semester
  const filteredGrades = useMemo(() => {
    if (selectedSemester === 'all') return grades;
    return grades.filter(grade => grade.semester.toString() === selectedSemester);
  }, [grades, selectedSemester]);

  // Get color class based on grade
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-success font-bold';
      case 'B+':
      case 'B':
        return 'text-primary font-bold';
      case 'C+':
      case 'C':
        return 'text-warning font-bold';
      case 'F':
        return 'text-danger font-bold';
      default:
        return 'text-slate-600';
    }
  };

  if (loading || loadingStudentGrades) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your grades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Academic Performance
          </h1>
          <p className="text-slate-600">
            View your grades and academic progress
          </p>
        </div>

        {/* Error Message */}
        {(error || studentError) && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">{error || studentError}</p>
          </div>
        )}

        {/* CGPA Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Cumulative GPA
              </h2>
              <p className="text-slate-600">
                Your overall academic performance
              </p>
            </div>
            <div className="text-5xl font-bold text-primary mt-4 md:mt-0">
              {cgpa.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Semester Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(semesterStats).map(([sem, stats]) => (
            <div key={sem} className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Semester {sem}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">GPA</span>
                  <span className="font-bold text-primary">{stats.gpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Average</span>
                  <span className="font-bold text-slate-800">{stats.average.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Courses</span>
                  <span className="font-bold text-slate-800">{stats.courses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Credits</span>
                  <span className="font-bold text-slate-800">{stats.totalCredits}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grade List */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 md:mb-0">
              Course Grades
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Semesters</option>
                {Object.keys(semesterStats).map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Course</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Code</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Credits</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Marks</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Grade</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">{grade.courseName}</div>
                      <div className="text-sm text-slate-500">Semester {grade.semester}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">{grade.courseCode}</td>
                    <td className="py-4 px-4 text-center">{grade.credits}</td>
                    <td className="py-4 px-4 text-center font-medium">{grade.marks}%</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{grade.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Report */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={() => {
              // Handle report download
              alert('Grade report download feature coming soon!');
            }}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
          >
            <span className="text-xl">📄</span>
            <span>Download Grade Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
