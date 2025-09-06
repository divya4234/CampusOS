import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RegistrationPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('semester');
  const [semesterExams, setSemesterExams] = useState([]);
  const [competitiveExams, setCompetitiveExams] = useState([]);
  const [registeredExams, setRegisteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock semester exams data
      const mockSemesterExams = [
        {
          id: 'sem_001',
          type: 'Mid-Term Examination',
          subject: 'Database Management Systems',
          code: 'CS301',
          date: '2025-02-15',
          time: '09:00 AM - 12:00 PM',
          duration: '3 hours',
          venue: 'Main Building - Room 101',
          credits: 4,
          registrationDeadline: '2025-02-10',
          status: 'open',
          fee: 150,
          eligibility: 'All registered students'
        },
        {
          id: 'sem_002',
          type: 'End-Term Examination',
          subject: 'Software Engineering',
          code: 'CS302',
          date: '2025-03-20',
          time: '02:00 PM - 05:00 PM',
          duration: '3 hours',
          venue: 'Main Building - Room 102',
          credits: 4,
          registrationDeadline: '2025-03-15',
          status: 'open',
          fee: 200,
          eligibility: 'Mid-term completed'
        },
        {
          id: 'sem_003',
          type: 'Mid-Term Examination',
          subject: 'Computer Networks',
          code: 'CS303',
          date: '2025-02-18',
          time: '09:00 AM - 12:00 PM',
          duration: '3 hours',
          venue: 'IT Building - Lab 201',
          credits: 3,
          registrationDeadline: '2025-02-13',
          status: 'open',
          fee: 150,
          eligibility: 'All registered students'
        },
        {
          id: 'sem_004',
          type: 'Practical Examination',
          subject: 'Web Technologies Lab',
          code: 'CS304L',
          date: '2025-02-25',
          time: '10:00 AM - 01:00 PM',
          duration: '3 hours',
          venue: 'Computer Lab 3',
          credits: 2,
          registrationDeadline: '2025-02-20',
          status: 'open',
          fee: 100,
          eligibility: 'Lab attendance ≥ 75%'
        }
      ];

      // Mock competitive exams data
      const mockCompetitiveExams = [
        {
          id: 'comp_001',
          name: 'GATE Computer Science 2025',
          type: 'National Level',
          date: '2025-02-08',
          time: '09:00 AM - 12:00 PM',
          duration: '3 hours',
          venue: 'Multiple Centers',
          fee: 1850,
          registrationDeadline: '2025-01-20',
          status: 'open',
          eligibility: 'B.Tech/BE final year or completed',
          benefits: 'M.Tech admissions, PSU jobs',
          website: 'https://gate.iisc.ac.in'
        },
        {
          id: 'comp_002',
          name: 'TCS CodeVita 2025',
          type: 'Corporate Challenge',
          date: '2025-02-12',
          time: '07:00 PM - 10:00 PM',
          duration: '3 hours',
          venue: 'Online',
          fee: 0,
          registrationDeadline: '2025-02-05',
          status: 'open',
          eligibility: 'All students',
          benefits: 'Job interviews, Cash prizes',
          website: 'https://tcs.com/codevita'
        },
        {
          id: 'comp_003',
          name: 'Google Summer of Code 2025',
          type: 'Open Source Program',
          date: '2025-03-01',
          time: 'Application Deadline',
          duration: '3 months',
          venue: 'Remote',
          fee: 0,
          registrationDeadline: '2025-02-25',
          status: 'open',
          eligibility: 'University students',
          benefits: 'Stipend, Open source experience',
          website: 'https://summerofcode.withgoogle.com'
        },
        {
          id: 'comp_004',
          name: 'Microsoft Imagine Cup 2025',
          type: 'Innovation Challenge',
          date: '2025-03-15',
          time: 'Project Submission',
          duration: 'Team Project',
          venue: 'Global Online',
          fee: 0,
          registrationDeadline: '2025-03-10',
          status: 'open',
          eligibility: 'Student teams',
          benefits: 'Cash prizes, Mentorship',
          website: 'https://imaginecup.microsoft.com'
        }
      ];

      // Mock registered exams
      const mockRegisteredExams = [
        { examId: 'sem_001', registrationDate: '2025-01-15', status: 'confirmed' },
        { examId: 'comp_002', registrationDate: '2025-01-18', status: 'pending' }
      ];

      setSemesterExams(mockSemesterExams);
      setCompetitiveExams(mockCompetitiveExams);
      setRegisteredExams(mockRegisteredExams);
      setLoading(false);
    };

    fetchExamData();
  }, []);

  const isRegistered = (examId) => {
    return registeredExams.some(reg => reg.examId === examId);
  };

  const getRegistrationStatus = (examId) => {
    const registration = registeredExams.find(reg => reg.examId === examId);
    return registration ? registration.status : null;
  };

  const handleRegister = async (exam) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRegistration = {
      examId: exam.id,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };
    
    setRegisteredExams(prev => [...prev, newRegistration]);
    setShowModal(false);
    setSelectedExam(null);
    setLoading(false);
    
    alert(`Successfully registered for ${exam.subject || exam.name}!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-success text-white';
      case 'closed':
        return 'bg-danger text-white';
      case 'confirmed':
        return 'bg-primary text-white';
      case 'pending':
        return 'bg-accent text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading examination data...</p>
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
            Examination Registration Portal
          </h1>
          <p className="text-slate-600">
            Welcome {user?.name}, register for semester exams and competitive examinations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Semester Exams</p>
                <p className="text-2xl font-bold text-primary">{semesterExams.length}</p>
              </div>
              <div className="bg-primary p-3 rounded-xl text-white text-2xl">
                📝
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Competitive Exams</p>
                <p className="text-2xl font-bold text-secondary">{competitiveExams.length}</p>
              </div>
              <div className="bg-secondary p-3 rounded-xl text-white text-2xl">
                🏆
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Registered</p>
                <p className="text-2xl font-bold text-success">{registeredExams.length}</p>
              </div>
              <div className="bg-success p-3 rounded-xl text-white text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-accent">
                  {registeredExams.filter(reg => reg.status === 'pending').length}
                </p>
              </div>
              <div className="bg-accent p-3 rounded-xl text-white text-2xl">
                ⏳
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md mb-8">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('semester')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'semester'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Semester Examinations
            </button>
            <button
              onClick={() => setActiveTab('competitive')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'competitive'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              Competitive Examinations
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'registered'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              My Registrations
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'semester' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {semesterExams.map((exam) => (
                  <div key={exam.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{exam.subject}</h3>
                        <p className="text-slate-600">{exam.code} • {exam.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📅</span>
                        <span>{formatDate(exam.date)} • {exam.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📍</span>
                        <span>{exam.venue}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">⏱️</span>
                        <span>Duration: {exam.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">💰</span>
                        <span>Fee: ₹{exam.fee}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📋</span>
                        <span>Eligibility: {exam.eligibility}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-slate-600">Registration Deadline:</span>
                        <span className={`ml-1 font-medium ${isDeadlinePassed(exam.registrationDeadline) ? 'text-danger' : 'text-slate-800'}`}>
                          {formatDate(exam.registrationDeadline)}
                        </span>
                      </div>
                      
                      {isRegistered(exam.id) ? (
                        <span className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(getRegistrationStatus(exam.id))}`}>
                          {getRegistrationStatus(exam.id) === 'confirmed' ? 'Registered' : 'Pending'}
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedExam(exam);
                            setShowModal(true);
                          }}
                          disabled={isDeadlinePassed(exam.registrationDeadline)}
                          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                            isDeadlinePassed(exam.registrationDeadline)
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                              : 'bg-primary hover:bg-primary-dark text-white'
                          }`}
                        >
                          {isDeadlinePassed(exam.registrationDeadline) ? 'Deadline Passed' : 'Register'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'competitive' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {competitiveExams.map((exam) => (
                  <div key={exam.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{exam.name}</h3>
                        <p className="text-slate-600">{exam.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📅</span>
                        <span>{formatDate(exam.date)} • {exam.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📍</span>
                        <span>{exam.venue}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">⏱️</span>
                        <span>Duration: {exam.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">💰</span>
                        <span>Fee: {exam.fee === 0 ? 'Free' : `₹${exam.fee}`}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">📋</span>
                        <span>Eligibility: {exam.eligibility}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <span className="mr-2">🎁</span>
                        <span>Benefits: {exam.benefits}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-slate-600">Registration Deadline:</span>
                        <span className={`ml-1 font-medium ${isDeadlinePassed(exam.registrationDeadline) ? 'text-danger' : 'text-slate-800'}`}>
                          {formatDate(exam.registrationDeadline)}
                        </span>
                      </div>
                      
                      {isRegistered(exam.id) ? (
                        <span className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(getRegistrationStatus(exam.id))}`}>
                          {getRegistrationStatus(exam.id) === 'confirmed' ? 'Registered' : 'Pending'}
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <a
                            href={exam.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-secondary hover:bg-secondary-dark text-white text-sm rounded-lg transition-colors"
                          >
                            Official Site
                          </a>
                          <button
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowModal(true);
                            }}
                            disabled={isDeadlinePassed(exam.registrationDeadline)}
                            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                              isDeadlinePassed(exam.registrationDeadline)
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary-dark text-white'
                            }`}
                          >
                            {isDeadlinePassed(exam.registrationDeadline) ? 'Deadline Passed' : 'Register'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'registered' && (
              <div className="space-y-6">
                {registeredExams.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No Registrations Yet</h3>
                    <p className="text-slate-600">You haven't registered for any examinations yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {registeredExams.map((registration) => {
                      const exam = [...semesterExams, ...competitiveExams].find(e => e.id === registration.examId);
                      if (!exam) return null;

                      return (
                        <div key={registration.examId} className="border border-slate-200 rounded-xl p-6 bg-white">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">
                                {exam.subject || exam.name}
                              </h3>
                              <p className="text-slate-600">{exam.code || exam.type}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                              {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-slate-600">
                              <span className="mr-2">📅</span>
                              <span>Exam Date: {formatDate(exam.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <span className="mr-2">📝</span>
                              <span>Registered: {formatDate(registration.registrationDate)}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <span className="mr-2">📍</span>
                              <span>{exam.venue}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors">
                              View Details
                            </button>
                            <button className="bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg transition-colors">
                              Download Admit Card
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Registration Modal */}
        {showModal && selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Confirm Registration
              </h3>
              
              <div className="space-y-3 mb-6">
                <p><strong>Exam:</strong> {selectedExam.subject || selectedExam.name}</p>
                <p><strong>Date:</strong> {formatDate(selectedExam.date)}</p>
                <p><strong>Time:</strong> {selectedExam.time}</p>
                <p><strong>Venue:</strong> {selectedExam.venue}</p>
                <p><strong>Fee:</strong> {selectedExam.fee === 0 ? 'Free' : `₹${selectedExam.fee}`}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-700 py-2 px-4 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRegister(selectedExam)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-xl transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPortal;
