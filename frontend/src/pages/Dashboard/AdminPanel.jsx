import React, { useState } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'students', label: 'Students', icon: '🎓' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'attendance', label: 'Attendance', icon: '✅' },
    { id: 'fees', label: 'Fee Management', icon: '💰' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const statsCards = [
    { title: 'Total Students', value: '2,847', change: '+12%', icon: '🎓', color: 'bg-primary' },
    { title: 'Total Faculty', value: '156', change: '+5%', icon: '👨‍🏫', color: 'bg-secondary' },
    { title: 'Active Courses', value: '89', change: '+8%', icon: '📚', color: 'bg-accent' },
    { title: 'Revenue', value: '$125K', change: '+15%', icon: '💰', color: 'bg-success' },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Enrolled in Computer Science', time: '2 hours ago', type: 'student' },
    { user: 'Dr. Smith', action: 'Updated course materials', time: '4 hours ago', type: 'faculty' },
    { user: 'Admin', action: 'Generated monthly report', time: '6 hours ago', type: 'system' },
    { user: 'Jane Wilson', action: 'Fee payment completed', time: '1 day ago', type: 'payment' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      <p className="text-success text-sm mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl text-white text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-primary hover:bg-primary-dark text-white p-4 rounded-xl transition-colors flex flex-col items-center">
                    <span className="text-2xl mb-2">➕</span>
                    <span className="text-sm">Add Student</span>
                  </button>
                  <button className="bg-secondary hover:bg-secondary-dark text-white p-4 rounded-xl transition-colors flex flex-col items-center">
                    <span className="text-2xl mb-2">👨‍🏫</span>
                    <span className="text-sm">Add Faculty</span>
                  </button>
                  <button className="bg-accent hover:bg-yellow-500 text-white p-4 rounded-xl transition-colors flex flex-col items-center">
                    <span className="text-2xl mb-2">📚</span>
                    <span className="text-sm">New Course</span>
                  </button>
                  <button className="bg-success hover:bg-green-600 text-white p-4 rounded-xl transition-colors flex flex-col items-center">
                    <span className="text-2xl mb-2">📊</span>
                    <span className="text-sm">Generate Report</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'student' ? 'bg-primary' :
                        activity.type === 'faculty' ? 'bg-secondary' :
                        activity.type === 'payment' ? 'bg-success' : 'bg-accent'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-slate-800 font-medium">{activity.user}</p>
                        <p className="text-text-muted text-sm">{activity.action}</p>
                      </div>
                      <span className="text-text-muted text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl transition-colors">
                Add New User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Login</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">John Doe</td>
                    <td className="py-3 px-4"><span className="bg-primary text-white px-2 py-1 rounded-full text-xs">Student</span></td>
                    <td className="py-3 px-4"><span className="bg-success text-white px-2 py-1 rounded-full text-xs">Active</span></td>
                    <td className="py-3 px-4">2 hours ago</td>
                    <td className="py-3 px-4">
                      <button className="text-primary hover:text-primary-dark mr-2">Edit</button>
                      <button className="text-danger hover:text-red-600">Delete</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">Dr. Smith</td>
                    <td className="py-3 px-4"><span className="bg-secondary text-white px-2 py-1 rounded-full text-xs">Faculty</span></td>
                    <td className="py-3 px-4"><span className="bg-success text-white px-2 py-1 rounded-full text-xs">Active</span></td>
                    <td className="py-3 px-4">4 hours ago</td>
                    <td className="py-3 px-4">
                      <button className="text-primary hover:text-primary-dark mr-2">Edit</button>
                      <button className="text-danger hover:text-red-600">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{menuItems.find(item => item.id === activeTab)?.label}</h2>
            <p className="text-text-muted">This section is under development. Coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 roboto-font">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-xl transition-all duration-300 min-h-screen text-slate-700 roboto-font`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <span className="text-xl">🎓</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold text-slate-800 heading-font">CampusOS</h1>
                  <p className="text-text-muted text-sm">Admin Panel</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mt-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-xl">{sidebarOpen ? '←' : '→'}</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 heading-font">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-text-muted mt-1">Welcome back, Admin!</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-white rounded-xl transition-colors">
                  <span className="text-xl">🔔</span>
                </button>
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;