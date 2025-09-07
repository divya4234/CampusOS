import React, { useState, useEffect } from 'react';

const ManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Mock data for management dashboard
  const overviewStats = {
    totalStudents: 2847,
    totalFaculty: 156,
    totalStaff: 89,
    activeCourses: 45,
    pendingApplications: 23,
    monthlyRevenue: 2847500,
    expenses: 1923400,
    hostelOccupancy: 89.5,
    libraryUsage: 76.2,
    attendanceRate: 87.3
  };

  const recentActivities = [
    {
      id: 1,
      type: 'admission',
      title: 'New Student Registration',
      description: '15 new students registered for Computer Science',
      time: '2 hours ago',
      priority: 'medium',
      icon: '👥'
    },
    {
      id: 2,
      type: 'financial',
      title: 'Fee Payment Alert',
      description: '₹2,45,000 received in fee payments today',
      time: '4 hours ago',
      priority: 'high',
      icon: '💰'
    },
    {
      id: 3,
      type: 'facility',
      title: 'Infrastructure Maintenance',
      description: 'Library air conditioning system maintenance completed',
      time: '6 hours ago',
      priority: 'low',
      icon: '🔧'
    },
    {
      id: 4,
      type: 'academic',
      title: 'Examination Schedule',
      description: 'Mid-term examination schedule published',
      time: '8 hours ago',
      priority: 'medium',
      icon: '📝'
    },
    {
      id: 5,
      type: 'staff',
      title: 'Faculty Meeting',
      description: 'Monthly faculty meeting scheduled for tomorrow',
      time: '1 day ago',
      priority: 'high',
      icon: '👨‍🏫'
    }
  ];

  const departmentStats = [
    { name: 'Computer Science', students: 584, faculty: 24, budget: 1200000, utilization: 92 },
    { name: 'Electronics', students: 456, faculty: 19, budget: 980000, utilization: 87 },
    { name: 'Mechanical', students: 523, faculty: 22, budget: 1100000, utilization: 89 },
    { name: 'Civil', students: 398, faculty: 18, budget: 850000, utilization: 84 },
    { name: 'Electrical', students: 467, faculty: 20, budget: 950000, utilization: 91 },
    { name: 'Chemical', students: 234, faculty: 15, budget: 720000, utilization: 78 },
    { name: 'Information Tech', students: 389, faculty: 17, budget: 880000, utilization: 88 },
    { name: 'Biotechnology', students: 196, faculty: 12, budget: 650000, utilization: 82 }
  ];

  const financialData = {
    totalRevenue: 15678900,
    totalExpenses: 12456700,
    netProfit: 3222200,
    pendingFees: 987600,
    scholarships: 456800,
    infrastructure: 2345600,
    salaries: 8956400,
    utilities: 1567800,
    maintenance: 892300,
    research: 1234500
  };

  const pendingApprovals = [
    {
      id: 1,
      type: 'Leave Application',
      applicant: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      duration: '5 days',
      reason: 'Conference Attendance',
      submittedDate: '2024-09-05',
      priority: 'high'
    },
    {
      id: 2,
      type: 'Budget Request',
      applicant: 'Prof. Meera Sharma',
      department: 'Electronics',
      amount: '₹2,50,000',
      reason: 'Lab Equipment Purchase',
      submittedDate: '2024-09-04',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'New Course Proposal',
      applicant: 'Dr. Amit Patel',
      department: 'Information Technology',
      duration: 'Semester Course',
      reason: 'Industry Demand',
      submittedDate: '2024-09-03',
      priority: 'low'
    },
    {
      id: 4,
      type: 'Infrastructure Request',
      applicant: 'Maintenance Dept.',
      department: 'Administration',
      amount: '₹5,00,000',
      reason: 'Classroom Renovation',
      submittedDate: '2024-09-02',
      priority: 'high'
    },
    {
      id: 5,
      type: 'Research Grant',
      applicant: 'Dr. Priya Singh',
      department: 'Biotechnology',
      amount: '₹8,00,000',
      reason: 'Cancer Research Project',
      submittedDate: '2024-09-01',
      priority: 'medium'
    }
  ];

  const quickActions = [
    { id: 1, title: 'Generate Reports', icon: '📊', color: 'bg-blue-500', description: 'Create detailed analytics reports' },
    { id: 2, title: 'Approve Requests', icon: '✅', color: 'bg-green-500', description: 'Review pending approvals' },
    { id: 3, title: 'Financial Overview', icon: '💰', color: 'bg-yellow-500', description: 'View financial dashboard' },
    { id: 4, title: 'Send Announcements', icon: '📢', color: 'bg-purple-500', description: 'Broadcast to campus' },
    { id: 5, title: 'Manage Faculty', icon: '👨‍🏫', color: 'bg-indigo-500', description: 'Faculty administration' },
    { id: 6, title: 'Student Analytics', icon: '👥', color: 'bg-pink-500', description: 'Student performance data' },
    { id: 7, title: 'Infrastructure', icon: '🏢', color: 'bg-gray-500', description: 'Facility management' },
    { id: 8, title: 'Emergency Alerts', icon: '🚨', color: 'bg-red-500', description: 'Campus emergency system' }
  ];

  useEffect(() => {
    // Dashboard is ready to render with static data
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, trend, color = 'bg-white' }) => (
    <div className={`${color} rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className="bg-primary/10 p-3 rounded-xl">
          <span className="text-2xl">{icon}</span>
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            trend > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-slate-600 text-sm">{title}</p>
      {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-3 rounded-xl">
                <span className="text-white text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Management Dashboard</h1>
                <p className="text-slate-600">Comprehensive campus oversight and administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>📊</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-wrap border-b border-slate-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'departments', label: 'Departments', icon: '🏫' },
              { id: 'financial', label: 'Financial', icon: '💰' },
              { id: 'approvals', label: 'Approvals', icon: '✅' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students"
                value={formatNumber(overviewStats.totalStudents)}
                subtitle="Active enrollments"
                icon="👥"
                trend={5.2}
              />
              <StatCard
                title="Faculty Members"
                value={formatNumber(overviewStats.totalFaculty)}
                subtitle="Teaching staff"
                icon="👨‍🏫"
                trend={2.1}
              />
              <StatCard
                title="Monthly Revenue"
                value={formatCurrency(overviewStats.monthlyRevenue)}
                subtitle="This month's income"
                icon="💰"
                trend={8.7}
              />
              <StatCard
                title="Active Courses"
                value={formatNumber(overviewStats.activeCourses)}
                subtitle="Currently running"
                icon="📚"
                trend={3.4}
              />
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Hostel Occupancy"
                value={`${overviewStats.hostelOccupancy}%`}
                subtitle="Current capacity"
                icon="🏠"
                trend={1.8}
              />
              <StatCard
                title="Library Usage"
                value={`${overviewStats.libraryUsage}%`}
                subtitle="Daily average"
                icon="📖"
                trend={4.2}
              />
              <StatCard
                title="Attendance Rate"
                value={`${overviewStats.attendanceRate}%`}
                subtitle="Overall average"
                icon="✅"
                trend={-0.5}
              />
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Actions</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all group text-left"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-lg">{action.icon}</span>
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1">{action.title}</h3>
                    <p className="text-xs text-slate-600">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
                  <span>🔔</span>
                  <span>Recent Activities</span>
                </h2>
                <button className="text-primary hover:text-primary-dark font-medium text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-slate-800">{activity.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{activity.description}</p>
                      <p className="text-slate-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>🏫</span>
                <span>Department Overview</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Students</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Faculty</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Budget</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Utilization</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-800">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentStats.map((dept, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-800">{dept.name}</div>
                        </td>
                        <td className="py-4 px-4 text-slate-600">{formatNumber(dept.students)}</td>
                        <td className="py-4 px-4 text-slate-600">{dept.faculty}</td>
                        <td className="py-4 px-4 text-slate-600">{formatCurrency(dept.budget)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${dept.utilization}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-600">{dept.utilization}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-primary hover:text-primary-dark font-medium text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(financialData.totalRevenue)}
                subtitle="Current year"
                icon="💰"
                trend={12.5}
                color="bg-green-50"
              />
              <StatCard
                title="Total Expenses"
                value={formatCurrency(financialData.totalExpenses)}
                subtitle="Current year"
                icon="💸"
                trend={-3.2}
                color="bg-red-50"
              />
              <StatCard
                title="Net Profit"
                value={formatCurrency(financialData.netProfit)}
                subtitle="Current year"
                icon="📈"
                trend={28.7}
                color="bg-blue-50"
              />
              <StatCard
                title="Pending Fees"
                value={formatCurrency(financialData.pendingFees)}
                subtitle="Outstanding amount"
                icon="⏳"
                trend={-8.9}
                color="bg-yellow-50"
              />
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center space-x-2">
                <span>📊</span>
                <span>Expense Breakdown</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Salaries', amount: financialData.salaries, percentage: 71.9 },
                  { label: 'Infrastructure', amount: financialData.infrastructure, percentage: 18.8 },
                  { label: 'Utilities', amount: financialData.utilities, percentage: 12.6 },
                  { label: 'Research', amount: financialData.research, percentage: 9.9 },
                  { label: 'Maintenance', amount: financialData.maintenance, percentage: 7.2 },
                  { label: 'Scholarships', amount: financialData.scholarships, percentage: 3.7 }
                ].map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h3 className="font-medium text-slate-800">{expense.label}</h3>
                      <p className="text-slate-600">{formatCurrency(expense.amount)}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 bg-slate-200 rounded-full h-2 mb-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${expense.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{expense.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
                  <span>✅</span>
                  <span>Pending Approvals</span>
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600">{pendingApprovals.length} items pending</span>
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Bulk Actions
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(approval.priority)}`}>
                          {approval.priority} priority
                        </span>
                        <h3 className="font-semibold text-slate-800">{approval.type}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                          Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                          Reject
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Applicant</p>
                        <p className="font-medium text-slate-800">{approval.applicant}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Department</p>
                        <p className="font-medium text-slate-800">{approval.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Submitted</p>
                        <p className="font-medium text-slate-800">{approval.submittedDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">
                          {approval.type === 'Budget Request' || approval.type === 'Infrastructure Request' || approval.type === 'Research Grant' ? 'Amount' : 'Duration'}
                        </p>
                        <p className="font-medium text-slate-800">
                          {approval.amount || approval.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Reason</p>
                        <p className="font-medium text-slate-800">{approval.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <span>📈</span>
                  <span>Performance Trends</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Student Satisfaction', value: 92, trend: 'up', change: '+3.2%' },
                    { metric: 'Faculty Retention', value: 89, trend: 'up', change: '+1.8%' },
                    { metric: 'Research Output', value: 76, trend: 'up', change: '+12.5%' },
                    { metric: 'Alumni Employment', value: 94, trend: 'up', change: '+2.1%' },
                    { metric: 'Infrastructure Score', value: 87, trend: 'down', change: '-1.2%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{item.metric}</p>
                        <p className="text-sm text-slate-600">{item.value}% score</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? '↗' : '↘'} {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Resource Utilization</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { resource: 'Classrooms', utilization: 85, capacity: '45/53' },
                    { resource: 'Laboratories', utilization: 78, capacity: '28/36' },
                    { resource: 'Library Seats', utilization: 92, capacity: '460/500' },
                    { resource: 'Sports Facilities', utilization: 67, capacity: '134/200' },
                    { resource: 'Auditoriums', utilization: 43, capacity: '3/7' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-800">{item.resource}</p>
                        <span className="text-sm text-slate-600">{item.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{item.utilization}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparative Analysis */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <span>📊</span>
                <span>Year-over-Year Comparison</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    title: 'Student Enrollment', 
                    current: 2847, 
                    previous: 2679, 
                    change: 6.3,
                    icon: '👥'
                  },
                  { 
                    title: 'Revenue Growth', 
                    current: formatCurrency(15678900), 
                    previous: formatCurrency(14234567), 
                    change: 10.1,
                    icon: '💰'
                  },
                  { 
                    title: 'Research Projects', 
                    current: 47, 
                    previous: 38, 
                    change: 23.7,
                    icon: '🔬'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-xl font-bold text-slate-800 mb-1">{item.current}</p>
                    <p className="text-sm text-slate-600 mb-2">Previous: {item.previous}</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      item.change > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementDashboard;
