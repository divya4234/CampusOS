import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import StdImg from './../../assets/studentImg.png';
const ProfilePage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [academicHistory, setAcademicHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profile data based on user role
      let mockProfileData;
      
      if (user?.role === 'faculty') {
        mockProfileData = {
          personal: {
            name: user?.name || 'Dr. Jane Smith',
            facultyId: user?.facultyId || 'FAC001',
            email: user?.email || 'jane.smith@faculty.campus.edu',
            phone: '+1 (555) 123-4567',
            dateOfBirth: '1985-03-20',
            bloodGroup: 'A+',
            address: '789 Faculty Quarters, Campus University, Knowledge City, KC 12345',
            emergencyContact: '+1 (555) 987-6543',
            emergencyContactName: 'John Smith (Spouse)',
            nationality: 'American',
            religion: 'Christianity',
            maritalStatus: 'Married',
            profileImage: '/api/placeholder/200/200'
          },
          academic: {
            facultyId: user?.facultyId || 'FAC001',
            department: user?.department || 'Computer Science',
            position: user?.position || 'Professor',
            qualification: 'PhD in Computer Science',
            experience: '12 years',
            joiningDate: '2012-08-15',
            specialization: 'Machine Learning, Data Science',
            researchInterests: 'AI, Deep Learning, Computer Vision',
            publications: 45,
            awards: 'Best Teacher Award 2023, Research Excellence Award 2022'
          },
          contact: {
            officeAddress: 'Room 301, CS Building, Campus University',
            officePhone: '+1 (555) 234-5678',
            alternateEmail: 'j.smith@personal.email.com',
            linkedIn: 'linkedin.com/in/drjanesmith',
            researchGate: 'researchgate.net/profile/Jane_Smith',
            orcid: '0000-0000-0000-0000'
          },
          documents: {
            employeeId: 'EMP2012001',
            aadharCard: 'XXXX-XXXX-5678',
            panCard: 'FGHIJ5678K',
            passport: 'P1234567',
            bankAccount: 'XXXX-XXXX-XXXX-9012',
            ifscCode: 'HDFC0001234'
          }
        };
      } else {
        // Student profile data (existing)
        mockProfileData = {
          personal: {
            name: user?.name || 'John Doe',
            rollNo: 'CSE21001',
            email: 'john.doe@student.campus.edu',
            phone: '+1 (555) 987-6543',
            dateOfBirth: '2003-05-15',
            bloodGroup: 'O+',
            address: '123 Student Housing, Campus University, Knowledge City, KC 12345',
            emergencyContact: '+1 (555) 876-5432',
            emergencyContactName: 'Jane Doe (Mother)',
            nationality: 'American',
            religion: 'Christianity',
            category: 'General',
            fatherName: 'Robert Doe',
            motherName: 'Jane Doe',
            guardianName: 'Robert Doe',
            profileImage: '/api/placeholder/200/200'
          },
          academic: {
            studentId: 'STU2021001',
            branch: 'Computer Science Engineering',
            semester: '6th Semester',
            section: 'A',
            batch: '2021-2025',
            admissionDate: '2021-08-15',
            currentCGPA: 8.7,
            currentSGPA: 8.9,
            totalCredits: 142,
            completedCredits: 120,
            rank: 5,
            totalStudents: 125,
            mentor: 'Dr. Sarah Johnson',
            classIncharge: 'Prof. Michael Chen'
          },
          contact: {
            permanentAddress: '456 Family Home, Hometown, State 67890',
            localAddress: '123 Student Housing, Campus University',
            parentPhone: '+1 (555) 876-5432',
            parentEmail: 'jane.doe@email.com',
            alternatePhone: '+1 (555) 765-4321',
            linkedIn: 'linkedin.com/in/johndoe',
            github: 'github.com/johndoe'
          },
          documents: {
            aadharCard: 'XXXX-XXXX-1234',
            panCard: 'ABCDE1234F',
            passport: 'Not Available',
            drivingLicense: 'DL-XX-20-2021-1234567',
            bankAccount: 'XXXX-XXXX-XXXX-5678',
            ifscCode: 'SBIN0001234'
          }
        };
      }

      // Mock academic history
      const mockAcademicHistory = [
        {
          semester: '5th Semester',
          sgpa: 9.1,
          cgpa: 8.6,
          credits: 22,
          year: '2024',
          status: 'Completed'
        },
        {
          semester: '4th Semester',
          sgpa: 8.8,
          cgpa: 8.5,
          credits: 24,
          year: '2023',
          status: 'Completed'
        },
        {
          semester: '3rd Semester',
          sgpa: 8.2,
          cgpa: 8.3,
          credits: 20,
          year: '2023',
          status: 'Completed'
        },
        {
          semester: '2nd Semester',
          sgpa: 8.5,
          cgpa: 8.4,
          credits: 22,
          year: '2022',
          status: 'Completed'
        },
        {
          semester: '1st Semester',
          sgpa: 8.3,
          cgpa: 8.3,
          credits: 20,
          year: '2021',
          status: 'Completed'
        }
      ];

      // Mock achievements
      const mockAchievements = [
        {
          id: 1,
          title: 'Dean\'s List',
          description: 'Achieved Dean\'s List for academic excellence in 5th semester',
          date: '2024-06-15',
          category: 'Academic',
          icon: '🏆'
        },
        {
          id: 2,
          title: 'Best Project Award',
          description: 'Won best project award for Database Management System project',
          date: '2024-04-20',
          category: 'Project',
          icon: '🥇'
        },
        {
          id: 3,
          title: 'Coding Competition - 2nd Place',
          description: 'Secured 2nd position in inter-college coding competition',
          date: '2024-03-10',
          category: 'Competition',
          icon: '🥈'
        },
        {
          id: 4,
          title: 'Perfect Attendance',
          description: 'Maintained 100% attendance in 4th semester',
          date: '2023-12-15',
          category: 'Attendance',
          icon: '✅'
        }
      ];

      setProfileData(mockProfileData);
      setEditForm(mockProfileData.personal);
      setAcademicHistory(mockAcademicHistory);
      setAchievements(mockAchievements);
      setLoading(false);
    };

    fetchProfileData();
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profileData.personal);
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfileData(prev => ({
      ...prev,
      personal: editForm
    }));
    
    setIsEditing(false);
    setLoading(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profileData.personal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getGradeColor = (cgpa) => {
    if (cgpa >= 9.0) return 'text-success';
    if (cgpa >= 8.0) return 'text-primary';
    if (cgpa >= 7.0) return 'text-accent';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
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
            Student Profile
          </h1>
          <p className="text-slate-600">
            Manage your personal information and academic details
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#6366F1] to-[#14B8A6] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {profileData.personal?.name?.charAt(0) || 'J'}
                <img src={StdImg} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute bottom-2 right-2 bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                ✓
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {profileData.personal?.name}
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                {profileData.academic?.branch} • {profileData.academic?.semester}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#6366F1]/10 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Roll Number</p>
                  <p className="font-semibold text-primary">{profileData.personal?.rollNo}</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Current CGPA</p>
                  <p className={`font-semibold text-xl ${getGradeColor(profileData.academic?.currentCGPA)}`}>
                    {profileData.academic?.currentCGPA}
                  </p>
                </div>
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Class Rank</p>
                  <p className="font-semibold text-accent">
                    #{profileData.academic?.rank} of {profileData.academic?.totalStudents}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span className="roboto-font">{isEditing ? '💾' : '✏️'}</span>
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
                {isEditing && (
                  <button
                    onClick={handleCancel}
                    className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>❌</span>
                    <span>Cancel</span>
                  </button>
                )}
                <button className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <span>📧</span>
                  <span>Contact Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { id: 'personal', name: 'Personal Info', icon: '👤' },
              { id: 'academic', name: 'Academic Details', icon: '📚' },
              { id: 'contact', name: 'Contact Info', icon: '📞' },
              { id: 'documents', name: 'Documents', icon: '📄' },
              { id: 'achievements', name: 'Achievements', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#6366F1] border-b-2 border-[#6366F1] bg-[#6366F1]/5'
                    : 'text-slate-600 hover:text-[#6366F1] hover:bg-slate-50'
                }`}
              >
                <span className="text-lg roboto-font">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6 secHeading-font">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text' },
                    { label: 'Email Address', name: 'email', type: 'email' },
                    { label: 'Phone Number', name: 'phone', type: 'tel' },
                    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                    { label: 'Blood Group', name: 'bloodGroup', type: 'text' },
                    { label: 'Nationality', name: 'nationality', type: 'text' },
                    { label: 'Religion', name: 'religion', type: 'text' },
                    { label: 'Category', name: 'category', type: 'text' },
                    { label: 'Father\'s Name', name: 'fatherName', type: 'text' },
                    { label: 'Mother\'s Name', name: 'motherName', type: 'text' }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field.label}
                      </label>
                      {isEditing ? (
                        <input
                          type={field.type}
                          name={field.name}
                          value={editForm[field.name] || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                          {profileData.personal?.[field.name] || 'Not provided'}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editForm.address || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        {profileData.personal?.address || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Academic Details Tab */}
            {activeTab === 'academic' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Academic Details</h3>
                
                {/* Current Academic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'Student ID', value: profileData.academic?.studentId },
                    { label: 'Branch', value: profileData.academic?.branch },
                    { label: 'Current Semester', value: profileData.academic?.semester },
                    { label: 'Section', value: profileData.academic?.section },
                    { label: 'Batch', value: profileData.academic?.batch },
                    { label: 'Admission Date', value: profileData.academic?.admissionDate },
                    { label: 'Current CGPA', value: profileData.academic?.currentCGPA },
                    { label: 'Current SGPA', value: profileData.academic?.currentSGPA },
                    { label: 'Credits Completed', value: `${profileData.academic?.completedCredits}/${profileData.academic?.totalCredits}` }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-sm font-medium text-slate-600 mb-1">{item.label}</p>
                      <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Academic History */}
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Academic History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">Semester</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">SGPA</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">CGPA</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">Credits</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">Year</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 roboto-font">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {academicHistory.map((record, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-slate-800 font-medium">{record.semester}</td>
                          <td className={`px-6 py-4 font-semibold ${getGradeColor(record.sgpa)}`}>
                            {record.sgpa}
                          </td>
                          <td className={`px-6 py-4 font-semibold ${getGradeColor(record.cgpa)}`}>
                            {record.cgpa}
                          </td>
                          <td className="px-6 py-4 text-slate-600">{record.credits}</td>
                          <td className="px-6 py-4 text-slate-600">{record.year}</td>
                          <td className="px-6 py-4">
                            <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-xs font-medium">
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Information Tab */}
            {activeTab === 'contact' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Permanent Address', value: profileData.contact?.permanentAddress },
                    { label: 'Local Address', value: profileData.contact?.localAddress },
                    { label: 'Parent Phone', value: profileData.contact?.parentPhone },
                    { label: 'Parent Email', value: profileData.contact?.parentEmail },
                    { label: 'Alternate Phone', value: profileData.contact?.alternatePhone },
                    { label: 'Emergency Contact', value: profileData.personal?.emergencyContact },
                    { label: 'Emergency Contact Name', value: profileData.personal?.emergencyContactName },
                    { label: 'LinkedIn Profile', value: profileData.contact?.linkedIn },
                    { label: 'GitHub Profile', value: profileData.contact?.github }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-sm font-medium text-slate-600 mb-2">{item.label}</p>
                      <p className="text-slate-800">{item.value || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Document Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Aadhar Card', value: profileData.documents?.aadharCard, icon: '🆔' },
                    { label: 'PAN Card', value: profileData.documents?.panCard, icon: '💳' },
                    { label: 'Passport', value: profileData.documents?.passport, icon: '📘' },
                    { label: 'Driving License', value: profileData.documents?.drivingLicense, icon: '🚗' },
                    { label: 'Bank Account', value: profileData.documents?.bankAccount, icon: '🏦' },
                    { label: 'IFSC Code', value: profileData.documents?.ifscCode, icon: '🔢' }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <p className="text-sm font-medium text-slate-600">{item.label}</p>
                      </div>
                      <p className="text-slate-800 font-mono">{item.value || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Achievements & Awards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-2">{achievement.title}</h4>
                          <p className="text-slate-600 text-sm mb-3">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                              {achievement.category}
                            </span>
                            <span className="text-slate-500 text-xs">{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-primary hover:bg-primary-dark text-white p-6 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📊</span>
            <span className="font-semibold">Download Transcript</span>
          </button>
          <button className="bg-secondary hover:bg-secondary-dark text-white p-6 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">📋</span>
            <span className="font-semibold">Update Documents</span>
          </button>
          <button className="bg-accent hover:bg-yellow-500 text-white p-6 rounded-2xl transition-colors flex items-center justify-center space-x-3">
            <span className="text-2xl">🔒</span>
            <span className="font-semibold">Change Password</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
