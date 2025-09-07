import React, { useState } from 'react';

const ManagementProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: 'Dr. Priya Sharma',
    employeeId: 'MG001',
    designation: 'Vice Chancellor',
    department: 'Administration',
    email: 'priya.sharma@campusos.edu',
    phone: '+91 98765 43210',
    alternatePhone: '+91 87654 32109',
    dateOfBirth: '1975-08-15',
    gender: 'Female',
    bloodGroup: 'A+',
    maritalStatus: 'Married',
    
    // Professional Information
    employeeType: 'Permanent',
    joinDate: '2015-07-01',
    experience: '15 years',
    qualification: 'Ph.D. in Educational Administration',
    previousRole: 'Dean of Academic Affairs',
    reportingTo: 'Board of Directors',
    managingDepartments: ['Academic Affairs', 'Student Services', 'Finance', 'HR', 'Administration'],
    responsibilities: [
      'Strategic planning and institutional development',
      'Academic program oversight and quality assurance',
      'Budget planning and financial management',
      'Faculty recruitment and development',
      'Student welfare and campus life',
      'External relations and partnerships'
    ],
    
    // Contact Information
    address: {
      current: '123 University Campus, Admin Block, CampusOS University',
      permanent: '456 Residential Area, Sector 15, New Delhi - 110001',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    
    // Emergency Contact
    emergencyContact: {
      name: 'Dr. Rajesh Sharma',
      relation: 'Spouse',
      phone: '+91 98765 43211',
      address: '456 Residential Area, Sector 15, New Delhi - 110001'
    },
    
    // Administrative Access
    accessLevel: 'Level 1 - Full Access',
    permissions: [
      'Financial Management',
      'Faculty Administration',
      'Student Records',
      'Infrastructure Management',
      'Policy Development',
      'External Communications',
      'Emergency Response',
      'System Administration'
    ],
    
    // Professional Development
    certifications: [
      {
        name: 'Higher Education Leadership Certification',
        institution: 'IIM Bangalore',
        year: '2020',
        validity: '2025'
      },
      {
        name: 'Educational Technology Integration',
        institution: 'Stanford University',
        year: '2019',
        validity: 'Lifetime'
      },
      {
        name: 'Strategic Management in Education',
        institution: 'Harvard Business School',
        year: '2018',
        validity: 'Lifetime'
      }
    ],
    
    // Achievements
    achievements: [
      {
        title: 'Excellence in Educational Leadership Award',
        organization: 'National Education Board',
        year: '2023',
        description: 'Recognized for outstanding contribution to higher education management'
      },
      {
        title: 'Digital Transformation in Education',
        organization: 'Ministry of Education',
        year: '2022',
        description: 'Successfully led campus digitization initiative'
      },
      {
        title: 'Research Excellence Award',
        organization: 'University Grants Commission',
        year: '2021',
        description: 'For promoting research culture in the institution'
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    if (section === 'address' || section === 'emergencyContact') {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setIsEditing(false);
        // Show success message
      }, 1000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const InfoField = ({ label, value, field, section = null, type = "text", required = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors[field] ? 'border-red-500' : 'border-slate-300'
            }`}
            rows={3}
          />
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors[field] ? 'border-red-500' : 'border-slate-300'
            }`}
          >
            <option value="">Select...</option>
            {field === 'gender' && (
              <>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </>
            )}
            {field === 'bloodGroup' && (
              <>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </>
            )}
            {field === 'maritalStatus' && (
              <>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </>
            )}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors[field] ? 'border-red-500' : 'border-slate-300'
            }`}
          />
        )
      ) : (
        <p className="text-slate-800 bg-slate-50 px-4 py-3 rounded-xl">
          {value || 'Not specified'}
        </p>
      )}
      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-white text-3xl">👩‍💼</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{profileData.fullName}</h1>
                <p className="text-slate-600">{profileData.designation}</p>
                <p className="text-slate-500 text-sm">Employee ID: {profileData.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>💾</span>
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                >
                  <span>✏️</span>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { id: 'personal', label: 'Personal Info', icon: '👤' },
              { id: 'professional', label: 'Professional', icon: '💼' },
              { id: 'contact', label: 'Contact & Address', icon: '📍' },
              { id: 'access', label: 'Access & Permissions', icon: '🔐' },
              { id: 'achievements', label: 'Achievements', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary bg-primary/5'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
              <span>👤</span>
              <span>Personal Information</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                label="Full Name"
                value={profileData.fullName}
                field="fullName"
                required
              />
              <InfoField
                label="Employee ID"
                value={profileData.employeeId}
                field="employeeId"
              />
              <InfoField
                label="Email Address"
                value={profileData.email}
                field="email"
                type="email"
                required
              />
              <InfoField
                label="Phone Number"
                value={profileData.phone}
                field="phone"
                type="tel"
                required
              />
              <InfoField
                label="Alternate Phone"
                value={profileData.alternatePhone}
                field="alternatePhone"
                type="tel"
              />
              <InfoField
                label="Date of Birth"
                value={profileData.dateOfBirth}
                field="dateOfBirth"
                type="date"
              />
              <InfoField
                label="Gender"
                value={profileData.gender}
                field="gender"
                type="select"
              />
              <InfoField
                label="Blood Group"
                value={profileData.bloodGroup}
                field="bloodGroup"
                type="select"
              />
              <InfoField
                label="Marital Status"
                value={profileData.maritalStatus}
                field="maritalStatus"
                type="select"
              />
            </div>
          </div>
        )}

        {/* Professional Information Tab */}
        {activeTab === 'professional' && (
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>💼</span>
                <span>Professional Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  label="Designation"
                  value={profileData.designation}
                  field="designation"
                />
                <InfoField
                  label="Department"
                  value={profileData.department}
                  field="department"
                />
                <InfoField
                  label="Employee Type"
                  value={profileData.employeeType}
                  field="employeeType"
                />
                <InfoField
                  label="Join Date"
                  value={profileData.joinDate}
                  field="joinDate"
                  type="date"
                />
                <InfoField
                  label="Total Experience"
                  value={profileData.experience}
                  field="experience"
                />
                <InfoField
                  label="Reporting To"
                  value={profileData.reportingTo}
                  field="reportingTo"
                />
              </div>

              <div className="mt-6">
                <InfoField
                  label="Qualification"
                  value={profileData.qualification}
                  field="qualification"
                />
                <InfoField
                  label="Previous Role"
                  value={profileData.previousRole}
                  field="previousRole"
                />
              </div>
            </div>

            {/* Managing Departments */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>🏢</span>
                <span>Managing Departments</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {profileData.managingDepartments.map((dept, index) => (
                  <div key={index} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium text-center">
                    {dept}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>📋</span>
                <span>Key Responsibilities</span>
              </h3>
              <div className="space-y-3">
                {profileData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-slate-700">{responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>📜</span>
                <span>Professional Certifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">{cert.name}</h4>
                    <p className="text-slate-600 text-sm mb-1">Institution: {cert.institution}</p>
                    <p className="text-slate-600 text-sm mb-1">Year: {cert.year}</p>
                    <p className="text-slate-600 text-sm">Validity: {cert.validity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact & Address Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>📍</span>
                <span>Address Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Current Address</h3>
                  <InfoField
                    label="Address"
                    value={profileData.address.current}
                    field="current"
                    section="address"
                    type="textarea"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Permanent Address</h3>
                  <InfoField
                    label="Address"
                    value={profileData.address.permanent}
                    field="permanent"
                    section="address"
                    type="textarea"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <InfoField
                  label="City"
                  value={profileData.address.city}
                  field="city"
                  section="address"
                />
                <InfoField
                  label="State"
                  value={profileData.address.state}
                  field="state"
                  section="address"
                />
                <InfoField
                  label="PIN Code"
                  value={profileData.address.pincode}
                  field="pincode"
                  section="address"
                />
                <InfoField
                  label="Country"
                  value={profileData.address.country}
                  field="country"
                  section="address"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>🚨</span>
                <span>Emergency Contact</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  label="Contact Name"
                  value={profileData.emergencyContact.name}
                  field="name"
                  section="emergencyContact"
                />
                <InfoField
                  label="Relation"
                  value={profileData.emergencyContact.relation}
                  field="relation"
                  section="emergencyContact"
                />
                <InfoField
                  label="Phone Number"
                  value={profileData.emergencyContact.phone}
                  field="phone"
                  section="emergencyContact"
                  type="tel"
                />
                <div></div>
                <div className="md:col-span-2">
                  <InfoField
                    label="Address"
                    value={profileData.emergencyContact.address}
                    field="address"
                    section="emergencyContact"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Access & Permissions Tab */}
        {activeTab === 'access' && (
          <div className="space-y-6">
            {/* Access Level */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>🔐</span>
                <span>Access & Permissions</span>
              </h2>
              
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Access Level</h3>
                <p className="text-slate-800 font-medium">{profileData.accessLevel}</p>
                <p className="text-slate-600 text-sm mt-1">Full administrative access to all campus systems</p>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-4">System Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <span className="text-green-600 text-lg">✅</span>
                    <span className="text-slate-800 font-medium">{permission}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h4 className="font-semibold text-yellow-800 mb-2">🔒 Security Note</h4>
                <p className="text-yellow-700 text-sm">
                  This user has full administrative privileges. All actions are logged and monitored for security purposes.
                  Access can be modified only by the Board of Directors.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
              <span>🏆</span>
              <span>Achievements & Recognition</span>
            </h2>
            
            <div className="space-y-6">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-xl">
                      <span className="text-yellow-600 text-2xl">🏆</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{achievement.title}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-sm text-slate-600">
                          <strong>Organization:</strong> {achievement.organization}
                        </span>
                        <span className="text-sm text-slate-600">
                          <strong>Year:</strong> {achievement.year}
                        </span>
                      </div>
                      <p className="text-slate-700">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <h3 className="font-semibold text-primary mb-3">🌟 Leadership Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">15+</div>
                  <div className="text-sm text-slate-600">Years of Leadership</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">2,800+</div>
                  <div className="text-sm text-slate-600">Students Impacted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">150+</div>
                  <div className="text-sm text-slate-600">Faculty Mentored</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementProfile;
