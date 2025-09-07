import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useGrades } from '../../../hooks/useGrades';
import { teacherService } from '../../../services/teacherService';

const GradeSubmission = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [gradeData, setGradeData] = useState({});
  const [remarks, setRemarks] = useState({});

  const {
    submitGrade,
    submittingGrade: loading,
    submitError,
    fetchCourseGrades,
    courseGrades,
    fetchGradeStats,
    statistics
  } = useGrades();

  const [error, setError] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // Import teacherService at the top of the file
  import { teacherService } from '../../../services/teacherService';
  
    // Load teacher's courses
  useEffect(() => {
    const fetchTeacherCourses = async () => {
      if (!user?.id) return;
      
      setLoadingCourses(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/teachers/${user.id}/courses`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'X-College-Id': localStorage.getItem('collegeId'),
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch courses');
        }
        
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch courses. Please try again.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchTeacherCourses();
  }, [user]);

  // Load course students when a course is selected
  useEffect(() => {
    const loadCourseData = async () => {
      if (!selectedCourse) return;
      
      setError(null);
      try {
        await Promise.all([
          fetchCourseGrades(selectedCourse),
          fetchGradeStats(selectedCourse)
        ]);
      } catch (err) {
        setError('Failed to load course data. Please try again.');
        console.error('Error loading course data:', err);
      }
    };

    loadCourseData();
  }, [selectedCourse, fetchCourseGrades, fetchGradeStats]);

  // Update students list when course grades change
  useEffect(() => {
    if (courseGrades?.students) {
      setStudents(courseGrades.students);
      
      // Initialize grade data for new students, preserving existing data
      const initialGrades = {};
      courseGrades.students.forEach(student => {
        // If the student already has grades, use them
        if (student.marks && student.grade) {
          initialGrades[student.id] = {
            marks: student.marks.toString(),
            grade: student.grade
          };
          // Set remarks if they exist
          if (student.remarks) {
            setRemarks(prev => ({
              ...prev,
              [student.id]: student.remarks
            }));
          }
        } else {
          // Otherwise initialize empty
          initialGrades[student.id] = {
            marks: '',
            grade: ''
          };
        }
      });
      setGradeData(initialGrades);
    }
  }, [courseGrades]);

  const getGradeDetails = (marks) => {
    if (isNaN(marks) || marks < 0 || marks > 100) {
      return { grade: '', color: '', status: 'invalid' };
    }
    
    // Grade scale with colors and descriptions
    const gradeScale = [
      { min: 90, grade: 'A+', color: 'text-success', status: 'outstanding' },
      { min: 80, grade: 'A', color: 'text-success', status: 'excellent' },
      { min: 70, grade: 'B+', color: 'text-primary', status: 'very good' },
      { min: 60, grade: 'B', color: 'text-primary', status: 'good' },
      { min: 50, grade: 'C+', color: 'text-warning', status: 'average' },
      { min: 40, grade: 'C', color: 'text-warning', status: 'pass' },
      { min: 0, grade: 'F', color: 'text-danger', status: 'fail' }
    ];

    const result = gradeScale.find(scale => marks >= scale.min) || { 
      grade: '', 
      color: '', 
      status: 'invalid' 
    };

    return {
      ...result,
      marks
    };
  };

  const handleGradeChange = (studentId, field, value) => {
    // Remove non-numeric characters except decimal point for marks
    if (field === 'marks') {
      value = value.replace(/[^\d.]/g, '');
      // Ensure only one decimal point
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) return;
      // Limit decimal places to 2
      if (value.includes('.')) {
        const [whole, decimal] = value.split('.');
        value = `${whole}.${decimal.slice(0, 2)}`;
      }
      // Ensure value is between 0 and 100
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 100) value = '100';
    }

    setGradeData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
        ...(field === 'marks' && {
          grade: getGradeDetails(parseFloat(value)).grade
        })
      }
    }));

    // Clear error when user makes changes
    setError(null);
  };

  const handleRemarksChange = (studentId, value) => {
    setRemarks(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const validateGrades = (gradeRecords) => {
    const errors = [];
    
    // Check if course and semester are selected
    if (!selectedCourse) errors.push('Please select a course');
    if (!selectedSemester) errors.push('Please select a semester');

    // Validate each grade record
    gradeRecords.forEach((record, index) => {
      const student = students.find(s => s.id === record.student);
      const studentName = student ? student.name : `Student ${index + 1}`;

      if (isNaN(record.marks)) {
        errors.push(`Invalid marks for ${studentName}`);
      } else if (record.marks < 0 || record.marks > 100) {
        errors.push(`Marks for ${studentName} must be between 0 and 100`);
      }

      if (!record.grade) {
        errors.push(`Please select a grade for ${studentName}`);
      }
    });

    return errors;
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      const gradeRecords = Object.entries(gradeData).map(([studentId, data]) => ({
        course: selectedCourse,
        student: studentId,
        teacher: user.id,
        semester: selectedSemester,
        marks: parseFloat(data.marks),
        grade: data.grade,
        remarks: remarks[studentId] || ''
      }));

      // Validate grades
      const validationErrors = validateGrades(gradeRecords);
      if (validationErrors.length > 0) {
        setError(validationErrors.join('\n'));
        return;
      }

      // Submit grades in bulk for better performance
      await submitGrade({ grades: gradeRecords });

      // Refresh course data
      await Promise.all([
        fetchCourseGrades(selectedCourse),
        fetchGradeStats(selectedCourse)
      ]);

      // Show success message with auto-dismiss
      const successMessage = document.createElement('div');
      successMessage.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" id="successModal">
          <div class="bg-white p-6 rounded-2xl shadow-xl">
            <div class="text-green-500 text-6xl mb-4">✓</div>
            <h3 class="text-lg font-semibold mb-2">Grades Submitted Successfully</h3>
            <p class="text-slate-600 mb-4">All grades have been saved and updated.</p>
            <div class="flex justify-between items-center">
              <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl transition-colors" onclick="document.getElementById('successModal').remove()">
                Close
              </button>
              <button class="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-xl transition-colors ml-4" onclick="window.location.reload()">
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(successMessage);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        const modal = document.getElementById('successModal');
        if (modal) modal.remove();
      }, 5000);

    } catch (err) {
      console.error('Failed to submit grades:', err);
      
      // Handle specific error cases
      if (err.isApiError) {
        switch (err.status) {
          case 400:
            setError('Invalid grade data. Please check your inputs.');
            break;
          case 401:
            setError('Your session has expired. Please log in again.');
            break;
          case 403:
            setError('You don\'t have permission to submit grades for this course.');
            break;
          case 404:
            setError('Course or student not found. Please refresh the page.');
            break;
          case 422:
            setError(err.validationErrors?.join('\n') || 'Validation failed. Please check your inputs.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(err.message || 'Failed to submit grades. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Grade Submission
          </h1>
          <p className="text-slate-600">
            Submit and manage student grades for your courses
          </p>
        </div>

        {/* Controls */}
        {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                disabled={loadingCourses}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loadingCourses ? 'Loading courses...' : 'Select a course'}
                </option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} (Semester {course.semester})
                  </option>
                ))}
              </select>
              {loadingCourses && (
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                  Loading courses...
                </div>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grade Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Class Average</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {statistics.average.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                  📊
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Highest Grade</p>
                  <p className="text-2xl font-bold text-success">
                    {statistics.highest}%
                  </p>
                </div>
                <div className="bg-success p-3 rounded-xl text-white text-2xl">
                  🏆
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Lowest Grade</p>
                  <p className="text-2xl font-bold text-danger">
                    {statistics.lowest}%
                  </p>
                </div>
                <div className="bg-danger p-3 rounded-xl text-white text-2xl">
                  📉
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pass Rate</p>
                  <p className="text-2xl font-bold text-primary">
                    {statistics.passRate}%
                  </p>
                </div>
                <div className="bg-accent p-3 rounded-xl text-white text-2xl">
                  📈
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grade Submission Form */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Student Grades
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {students.length} students in this course
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {/* Bulk Actions */}
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (!action) return;

                    // Reset select
                    e.target.value = '';

                    // Apply bulk action
                    const newGradeData = { ...gradeData };
                    
                    students.forEach(student => {
                      switch (action) {
                        case 'clear':
                          newGradeData[student.id] = { marks: '', grade: '' };
                          break;
                        case 'pass':
                          if (!newGradeData[student.id]?.marks || newGradeData[student.id]?.marks < 40) {
                            newGradeData[student.id] = { marks: '40', grade: 'C' };
                          }
                          break;
                        default:
                          break;
                      }
                    });
                    
                    setGradeData(newGradeData);
                  }}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Bulk Actions</option>
                  <option value="clear">Clear All Grades</option>
                  <option value="pass">Set Minimum Pass Grade</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !selectedCourse || !selectedSemester}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Grades'
                )}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Student</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Roll No</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Marks (%)</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Grade</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-slate-800">{student.name}</div>
                        <div className="text-sm text-slate-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{student.rollNo}</td>
                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gradeData[student.id]?.marks || ''}
                        onChange={(e) => handleGradeChange(student.id, 'marks', e.target.value)}
                        className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        <select
                          value={gradeData[student.id]?.grade || ''}
                          onChange={(e) => handleGradeChange(student.id, 'grade', e.target.value)}
                          className={`w-24 px-3 py-2 border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary ${
                            gradeData[student.id]?.grade ? getGradeDetails(gradeData[student.id]?.marks).color : ''
                          }`}
                        >
                          <option value="">Select</option>
                          {['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'].map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                        {gradeData[student.id]?.grade && (
                          <span className="ml-2 text-xs">
                            {getGradeDetails(gradeData[student.id]?.marks).status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={remarks[student.id] || ''}
                        onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        placeholder="Add remarks..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <button 
            onClick={async () => {
              if (!selectedCourse || !selectedSemester) {
                setError('Please select a course and semester first.');
                return;
              }
              try {
                const distribution = await gradeService.getGradeDistribution(selectedCourse, selectedSemester);
                // Show grade distribution modal (you can implement this)
                console.log('Grade distribution:', distribution);
              } catch (err) {
                setError('Failed to load grade analysis. Please try again.');
              }
            }}
            className="bg-primary hover:bg-primary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3"
          >
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Grade Analysis</span>
          </button>
          
          <button 
            onClick={async () => {
              if (!selectedCourse || !selectedSemester) {
                setError('Please select a course and semester first.');
                return;
              }
              try {
                await gradeService.publishGrades(selectedCourse, selectedSemester);
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="bg-white p-6 rounded-2xl shadow-xl">
                      <div class="text-primary text-4xl mb-4">📧</div>
                      <h3 class="text-lg font-semibold mb-2">Grades Published</h3>
                      <p class="text-slate-600 mb-4">Students have been notified of their grades.</p>
                      <button class="bg-primary text-white px-4 py-2 rounded-xl" onclick="this.parentElement.parentElement.remove()">
                        Close
                      </button>
                    </div>
                  </div>
                `;
                document.body.appendChild(successMessage);
              } catch (err) {
                setError('Failed to publish grades. Please try again.');
              }
            }}
            className="bg-secondary hover:bg-secondary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3"
          >
            <span className="text-2xl">📧</span>
            <span className="font-semibold">Publish & Notify</span>
          </button>
          
          <div className="relative group">
            <button 
              onClick={() => {
                const dropdown = document.getElementById('exportDropdown');
                if (dropdown) {
                  dropdown.classList.toggle('hidden');
                }
              }}
              className="w-full bg-accent hover:bg-yellow-500 text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3"
            >
              <span className="text-2xl">📥</span>
              <span className="font-semibold">Export Grades</span>
            </button>
            
            <div id="exportDropdown" className="hidden absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={async () => {
                    if (!selectedCourse || !selectedSemester) {
                      setError('Please select a course and semester first.');
                      return;
                    }
                    try {
                      const blob = await gradeService.exportGradesToPDF({
                        courseId: selectedCourse,
                        semester: selectedSemester
                      });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `grades-${selectedCourse}-sem${selectedSemester}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      a.remove();
                    } catch (err) {
                      setError('Failed to export PDF. Please try again.');
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                
                <button
                  onClick={async () => {
                    if (!selectedCourse || !selectedSemester) {
                      setError('Please select a course and semester first.');
                      return;
                    }
                    try {
                      const blob = await gradeService.exportGradesToExcel({
                        courseId: selectedCourse,
                        semester: selectedSemester
                      });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `grades-${selectedCourse}-sem${selectedSemester}.xlsx`;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      a.remove();
                    } catch (err) {
                      setError('Failed to export Excel file. Please try again.');
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Click outside handler for dropdown */}
        <div 
          onClick={() => {
            const dropdown = document.getElementById('exportDropdown');
            if (dropdown && !dropdown.classList.contains('hidden')) {
              dropdown.classList.add('hidden');
            }
          }}
          className="fixed inset-0 z-0 hidden group-focus-within:block"
        />
      </div>
    </div>
  );
};

export default GradeSubmission;
