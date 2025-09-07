import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Hostel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    address: '',
    parentContact: ''
  });
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock hostel data
  const hostelInfo = {
    roomNumber: 'A-301',
    block: 'A Block',
    floor: '3rd Floor',
    roomType: 'Double Occupancy',
    roommate: 'Rahul Kumar',
    roommateContact: '+91 9876543211',
    wifiPassword: 'HostelA301@2024',
    checkinDate: '2024-07-15',
    roomFacilities: ['AC', 'Study Table', 'Wardrobe', 'Attached Bathroom', 'Balcony'],
    monthlyFee: 8500,
    securityDeposit: 10000,
    dueDate: '5th of every month'
  };

  const wardenInfo = {
    name: 'Dr. Priya Sharma',
    designation: 'Chief Warden - A Block',
    contact: '+91 9876543210',
    email: 'warden.a@campusos.edu',
    office: 'A Block - Ground Floor',
    officeHours: '9:00 AM - 6:00 PM',
    emergencyContact: '+91 8765432109',
    photo: 'https://via.placeholder.com/150x150?text=Warden',
    experience: '8 years',
    specialization: 'Student Welfare & Counseling'
  };

  const hostelRules = [
    'Entry time: 6:00 AM to 10:30 PM',
    'Visitors allowed till 8:00 PM only',
    'No loud music after 10:00 PM',
    'Keep room clean and tidy',
    'Report maintenance issues immediately',
    'No cooking in rooms',
    'ID card mandatory for entry',
    'Monthly room inspection on 1st week'
  ];

  const facilities = [
    { name: 'Laundry', icon: '👕', timing: '6 AM - 8 PM', location: 'Ground Floor' },
    { name: 'Mess Hall', icon: '🍽️', timing: '7 AM - 10 PM', location: 'Ground Floor' },
    { name: 'Study Room', icon: '📚', timing: '24/7', location: '1st Floor' },
    { name: 'Recreation', icon: '🎮', timing: '6 AM - 11 PM', location: '2nd Floor' },
    { name: 'Gym', icon: '💪', timing: '5 AM - 10 PM', location: 'Basement' },
    { name: 'Medical', icon: '⚕️', timing: '24/7', location: 'Ground Floor' },
    { name: 'Wi-Fi', icon: '📶', timing: '24/7', location: 'All Floors' },
    { name: 'Security', icon: '🛡️', timing: '24/7', location: 'Main Gate' }
  ];

  useEffect(() => {
    // Load existing leave applications
    const savedApplications = localStorage.getItem(`hostelLeave_${user?.id}`);
    if (savedApplications) {
      setLeaveApplications(JSON.parse(savedApplications));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLeaveForm = () => {
    const newErrors = {};
    
    if (!leaveForm.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!leaveForm.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (new Date(leaveForm.endDate) <= new Date(leaveForm.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!leaveForm.reason.trim()) {
      newErrors.reason = 'Reason is required';
    } else if (leaveForm.reason.length < 10) {
      newErrors.reason = 'Please provide detailed reason (minimum 10 characters)';
    }
    
    if (!leaveForm.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(leaveForm.emergencyContact)) {
      newErrors.emergencyContact = 'Please enter a valid contact number';
    }
    
    if (!leaveForm.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!leaveForm.parentContact.trim()) {
      newErrors.parentContact = 'Parent contact is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(leaveForm.parentContact)) {
      newErrors.parentContact = 'Please enter a valid parent contact number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!validateLeaveForm()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newApplication = {
      id: Date.now(),
      ...leaveForm,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      applicationNumber: `HL${Date.now().toString().slice(-6)}`
    };
    
    const updatedApplications = [...leaveApplications, newApplication];
    setLeaveApplications(updatedApplications);
    localStorage.setItem(`hostelLeave_${user?.id}`, JSON.stringify(updatedApplications));
    
    // Reset form
    setLeaveForm({
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: '',
      address: '',
      parentContact: ''
    });
    
    setLoading(false);
    setActiveTab('applications');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-success bg-success/10';
      case 'Rejected': return 'text-danger bg-danger/10';
      case 'Pending': return 'text-warning bg-warning/10';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <span className="text-white text-2xl">🏠</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Hostel Management</h1>
              <p className="text-slate-600">Room {hostelInfo.roomNumber} - {hostelInfo.block}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { id: 'leave', label: 'Leave Application', icon: '📝' },
              { id: 'applications', label: 'My Applications', icon: '📋' },
              { id: 'warden', label: 'Warden Info', icon: '👨‍💼' },
              { id: 'facilities', label: 'Facilities', icon: '🏢' }
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Information */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">🏠</span>
                <h2 className="text-xl font-semibold text-slate-800">Room Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Room Number</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.roomNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Block</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.block}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Floor</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.floor}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Room Type</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.roomType}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Check-in Date</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.checkinDate}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Roommate</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.roommate}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Roommate Contact</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.roommateContact}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">WiFi Password</span>
                    <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{hostelInfo.wifiPassword}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Monthly Fee</span>
                    <span className="font-semibold text-slate-800">₹{hostelInfo.monthlyFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Due Date</span>
                    <span className="font-semibold text-slate-800">{hostelInfo.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Room Facilities */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Room Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {hostelInfo.roomFacilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Rules */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Quick Actions</span>
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('leave')}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>📝</span>
                    <span>Apply for Leave</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('warden')}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>👨‍💼</span>
                    <span>Contact Warden</span>
                  </button>
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                    <span>🔧</span>
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>

              {/* Hostel Rules */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Hostel Rules</span>
                </h3>
                <div className="space-y-2">
                  {hostelRules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-slate-600">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leave Application Tab */}
        {activeTab === 'leave' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">📝</span>
                <h2 className="text-xl font-semibold text-slate-800">Hostel Leave Application</h2>
              </div>

              <form onSubmit={handleLeaveSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={leaveForm.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.startDate ? 'border-danger' : 'border-slate-300'
                      }`}
                    />
                    {errors.startDate && <p className="text-danger text-sm mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={leaveForm.endDate}
                      onChange={handleInputChange}
                      min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.endDate ? 'border-danger' : 'border-slate-300'
                      }`}
                    />
                    {errors.endDate && <p className="text-danger text-sm mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reason for Leave *
                  </label>
                  <textarea
                    name="reason"
                    value={leaveForm.reason}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Please provide detailed reason for leave..."
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.reason ? 'border-danger' : 'border-slate-300'
                    }`}
                  />
                  {errors.reason && <p className="text-danger text-sm mt-1">{errors.reason}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address During Leave *
                  </label>
                  <textarea
                    name="address"
                    value={leaveForm.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Complete address where you'll be staying..."
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.address ? 'border-danger' : 'border-slate-300'
                    }`}
                  />
                  {errors.address && <p className="text-danger text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={leaveForm.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.emergencyContact ? 'border-danger' : 'border-slate-300'
                      }`}
                    />
                    {errors.emergencyContact && <p className="text-danger text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Parent Contact *
                    </label>
                    <input
                      type="tel"
                      name="parentContact"
                      value={leaveForm.parentContact}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.parentContact ? 'border-danger' : 'border-slate-300'
                      }`}
                    />
                    {errors.parentContact && <p className="text-danger text-sm mt-1">{errors.parentContact}</p>}
                  </div>
                </div>

                {leaveForm.startDate && leaveForm.endDate && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-primary font-medium">
                      Duration: {calculateDays(leaveForm.startDate, leaveForm.endDate)} days
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>📝</span>
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h2 className="text-xl font-semibold text-slate-800">My Leave Applications</h2>
              </div>
              <button
                onClick={() => setActiveTab('leave')}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>+</span>
                <span>New Application</span>
              </button>
            </div>

            {leaveApplications.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl">📝</span>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">No Applications Yet</h3>
                <p className="text-slate-600 mb-6">You haven't submitted any leave applications.</p>
                <button
                  onClick={() => setActiveTab('leave')}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Submit Your First Application
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {leaveApplications.map((application) => (
                  <div key={application.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Application #{application.applicationNumber}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Submitted on {new Date(application.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Duration</p>
                        <p className="font-medium">
                          {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-slate-500">
                          ({calculateDays(application.startDate, application.endDate)} days)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Emergency Contact</p>
                        <p className="font-medium">{application.emergencyContact}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-slate-600">Reason</p>
                      <p className="text-slate-800">{application.reason}</p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600">Address</p>
                      <p className="text-slate-800">{application.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Warden Information Tab */}
        {activeTab === 'warden' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-2xl">👨‍💼</span>
                <h2 className="text-xl font-semibold text-slate-800">Warden Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Warden Photo & Basic Info */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={wardenInfo.photo} 
                      alt={wardenInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-primary flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-white text-4xl">👨‍💼</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">{wardenInfo.name}</h3>
                  <p className="text-slate-600 mb-2">{wardenInfo.designation}</p>
                  <p className="text-sm text-slate-500 mb-4">{wardenInfo.experience} experience</p>
                  
                  <div className="space-y-3">
                    <a 
                      href={`tel:${wardenInfo.contact}`}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>📞</span>
                      <span>Call Warden</span>
                    </a>
                    <a 
                      href={`mailto:${wardenInfo.email}`}
                      className="w-full bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>📧</span>
                      <span>Send Email</span>
                    </a>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h4>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">📞</span>
                      <div>
                        <p className="font-medium text-slate-800">Office Contact</p>
                        <p className="text-slate-600">{wardenInfo.contact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🚨</span>
                      <div>
                        <p className="font-medium text-slate-800">Emergency Contact</p>
                        <p className="text-slate-600">{wardenInfo.emergencyContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">📧</span>
                      <div>
                        <p className="font-medium text-slate-800">Email</p>
                        <p className="text-slate-600">{wardenInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="font-medium text-slate-800">Office Location</p>
                        <p className="text-slate-600">{wardenInfo.office}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🕒</span>
                      <div>
                        <p className="font-medium text-slate-800">Office Hours</p>
                        <p className="text-slate-600">{wardenInfo.officeHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🎯</span>
                      <div>
                        <p className="font-medium text-slate-800">Specialization</p>
                        <p className="text-slate-600">{wardenInfo.specialization}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contact Tips */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <h5 className="font-semibold text-primary mb-2">📝 Contact Guidelines</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• For emergencies, call the emergency contact number</li>
                      <li>• For room issues, visit during office hours</li>
                      <li>• For leave applications, email or visit office</li>
                      <li>• For general queries, use the regular contact</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-semibold text-slate-800">Hostel Facilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{facility.icon}</div>
                  <h3 className="font-semibold text-slate-800 mb-2">{facility.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">
                    <span className="font-medium">Timing:</span> {facility.timing}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Location:</span> {facility.location}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                <span>ℹ️</span>
                <span>Important Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p className="mb-2">• Mess timings: Breakfast (7-9 AM), Lunch (12-2 PM), Dinner (7-10 PM)</p>
                  <p className="mb-2">• Laundry service available at ₹5 per piece</p>
                  <p className="mb-2">• Study room has 24/7 access with student ID</p>
                </div>
                <div>
                  <p className="mb-2">• Gym membership included in hostel fees</p>
                  <p className="mb-2">• Medical facility has basic first aid and medicines</p>
                  <p className="mb-2">• Wi-Fi speed: 100 Mbps with fair usage policy</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostel;
