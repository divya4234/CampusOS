import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Grades = () => {
  const { user } = useAuth();
  const [gradesData, setGradesData] = useState({});
  const [cgpaHistory, setCgpaHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock grades data
  useEffect(() => {
    const fetchGradesData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock current semester data
      const mockCurrentSemester = {
        semester: '6th Semester',
        year: '3rd Year',
        subjects: [
          {
            code: 'CS301',
            name: 'Database Management Systems',
            credits: 4,
            midTerm: { marks: 18, total: 20 },
            endTerm: { marks: 72, total: 80 },
            totalMarks: 90,
            grade: 'A',
            gradePoints: 9
          },
          {
            code: 'CS302',
            name: 'Software Engineering',
            credits: 4,
            midTerm: { marks: 16, total: 20 },
            endTerm: { marks: 68, total: 80 },
            totalMarks: 84,
            grade: 'A',
            gradePoints: 9
          },
          {
            code: 'CS303',
            name: 'Computer Networks',
            credits: 3,
            midTerm: { marks: 15, total: 20 },
            endTerm: { marks: 65, total: 80 },
            totalMarks: 80,
            grade: 'A',
            gradePoints: 9
          },
          {
            code: 'CS304',
            name: 'Web Technologies',
            credits: 3,
            midTerm: { marks: 17, total: 20 },
            endTerm: { marks: 70, total: 80 },
            totalMarks: 87,
            grade: 'A',
            gradePoints: 9
          },
          {
            code: 'CS305',
            name: 'Machine Learning',
            credits: 4,
            midTerm: { marks: 19, total: 20 },
            endTerm: { marks: 75, total: 80 },
            totalMarks: 94,
            grade: 'A+',
            gradePoints: 10
          },
          {
            code: 'CS306',
            name: 'Data Analytics Lab',
            credits: 2,
            midTerm: { marks: 18, total: 20 },
            endTerm: { marks: 76, total: 80 },
            totalMarks: 94,
            grade: 'A+',
            gradePoints: 10
          }
        ]
      };

      // Calculate current SGPA
      const totalCredits = mockCurrentSemester.subjects.reduce((sum, subject) => sum + subject.credits, 0);
      const totalGradePoints = mockCurrentSemester.subjects.reduce((sum, subject) => sum + (subject.gradePoints * subject.credits), 0);
      const currentSGPA = (totalGradePoints / totalCredits).toFixed(2);

      // Mock CGPA history for all years
      const mockCgpaHistory = [
        {
          year: '1st Year',
          semesters: [
            { semester: '1st Semester', sgpa: 8.2, subjects: 6, credits: 20 },
            { semester: '2nd Semester', sgpa: 8.5, subjects: 6, credits: 22 }
          ],
          yearCgpa: 8.35
        },
        {
          year: '2nd Year',
          semesters: [
            { semester: '3rd Semester', sgpa: 8.7, subjects: 6, credits: 21 },
            { semester: '4th Semester', sgpa: 8.9, subjects: 6, credits: 23 }
          ],
          yearCgpa: 8.80
        },
        {
          year: '3rd Year',
          semesters: [
            { semester: '5th Semester', sgpa: 9.1, subjects: 6, credits: 22 },
            { semester: '6th Semester (Current)', sgpa: parseFloat(currentSGPA), subjects: 6, credits: 20, current: true }
          ],
          yearCgpa: 9.05
        }
      ];

      // Calculate overall CGPA
      const totalSemesters = mockCgpaHistory.flatMap(year => year.semesters);
      const overallCgpa = (totalSemesters.reduce((sum, sem) => sum + sem.sgpa, 0) / totalSemesters.length).toFixed(2);

      setGradesData({
        current: { ...mockCurrentSemester, sgpa: currentSGPA },
        overallCgpa,
        totalCredits: mockCgpaHistory.reduce((sum, year) => 
          sum + year.semesters.reduce((semSum, sem) => semSum + sem.credits, 0), 0
        )
      });
      setCgpaHistory(mockCgpaHistory);
      setLoading(false);
    };

    fetchGradesData();
  }, []);

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'bg-success text-white';
      case 'A':
        return 'bg-primary text-white';
      case 'B+':
        return 'bg-secondary text-white';
      case 'B':
        return 'bg-accent text-white';
      case 'C':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 70) return 'text-secondary';
    if (percentage >= 60) return 'text-accent';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading grades data...</p>
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
            {user?.name}'s Academic Performance
          </h1>
          <p className="text-slate-600">
            Track your grades, CGPA, and academic progress
          </p>
        </div>

        {/* CGPA Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Current SGPA</p>
                <p className="text-3xl font-bold text-primary">{gradesData.current?.sgpa}</p>
                <p className="text-slate-500 text-sm mt-1">{gradesData.current?.semester}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                📊
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Overall CGPA</p>
                <p className="text-3xl font-bold text-success">{gradesData.overallCgpa}</p>
                <p className="text-slate-500 text-sm mt-1">All Semesters</p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                🏆
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Credits</p>
                <p className="text-3xl font-bold text-secondary">{gradesData.totalCredits}</p>
                <p className="text-slate-500 text-sm mt-1">Completed</p>
              </div>
              <div className="bg-secondary p-3 rounded-xl text-white text-2xl">
                📚
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md mb-8">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Current Semester
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Academic History
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'analysis'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Performance Analysis
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    {gradesData.current?.semester} - {gradesData.current?.year}
                  </h2>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Current SGPA</p>
                    <p className="text-2xl font-bold text-primary">{gradesData.current?.sgpa}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject Code</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject Name</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Credits</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Mid Term (/20)</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">End Term (/80)</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Total (/100)</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Grade</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700">Grade Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradesData.current?.subjects.map((subject, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4 font-medium">{subject.code}</td>
                          <td className="py-4 px-4">{subject.name}</td>
                          <td className="py-4 px-4 text-center">{subject.credits}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`font-semibold ${getPerformanceColor((subject.midTerm.marks / subject.midTerm.total) * 100)}`}>
                              {subject.midTerm.marks}/{subject.midTerm.total}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`font-semibold ${getPerformanceColor((subject.endTerm.marks / subject.endTerm.total) * 100)}`}>
                              {subject.endTerm.marks}/{subject.endTerm.total}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`font-semibold ${getPerformanceColor(subject.totalMarks)}`}>
                              {subject.totalMarks}/100
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center font-semibold">{subject.gradePoints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                {cgpaHistory.map((year, yearIndex) => (
                  <div key={yearIndex} className="border border-slate-200 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">{year.year}</h3>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Year CGPA</p>
                        <p className="text-xl font-bold text-primary">{year.yearCgpa}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {year.semesters.map((semester, semIndex) => (
                        <div key={semIndex} className={`p-4 rounded-lg border ${semester.current ? 'border-primary bg-primary/5' : 'border-slate-200'}`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-slate-800">{semester.semester}</h4>
                              <p className="text-sm text-slate-600">{semester.subjects} subjects • {semester.credits} credits</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-600">SGPA</p>
                              <p className={`text-xl font-bold ${semester.current ? 'text-primary' : 'text-slate-800'}`}>
                                {semester.sgpa}
                              </p>
                            </div>
                          </div>
                          {semester.current && (
                            <div className="mt-2">
                              <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded-full">
                                Current Semester
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Grade Distribution</h3>
                    <div className="space-y-3">
                      {['A+', 'A', 'B+', 'B', 'C'].map(grade => {
                        const count = gradesData.current?.subjects.filter(s => s.grade === grade).length || 0;
                        const percentage = gradesData.current?.subjects.length ? (count / gradesData.current.subjects.length * 100).toFixed(1) : 0;
                        return (
                          <div key={grade} className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(grade)}`}>
                              Grade {grade}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600 w-12">{count} ({percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Insights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <span className="text-success font-medium">Strong Performance</span>
                        <span className="text-sm text-slate-600">Machine Learning, Data Analytics</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                        <span className="text-accent font-medium">Improvement Needed</span>
                        <span className="text-sm text-slate-600">Computer Networks</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">CGPA Trend</h3>
                  <div className="space-y-4">
                    {cgpaHistory.map((year, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <span className="font-medium">{year.year}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">{year.yearCgpa}</span>
                          {index > 0 && (
                            <span className={`text-sm ${year.yearCgpa > cgpaHistory[index-1].yearCgpa ? 'text-success' : 'text-danger'}`}>
                              {year.yearCgpa > cgpaHistory[index-1].yearCgpa ? '↗️' : '↘️'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Academic Goals</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Maintain CGPA above 8.5 ✅</li>
                      <li>• Target CGPA of 9.0+ for final year</li>
                      <li>• Improve performance in theory subjects</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-primary hover:bg-primary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Download Transcript</span>
          </button>
          <button className="bg-secondary hover:bg-secondary-dark text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📧</span>
            <span className="font-semibold">Email to Parents</span>
          </button>
          <button className="bg-success hover:bg-green-600 text-white p-4 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold">Set Academic Goals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grades;
