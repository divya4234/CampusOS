import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Import route protection components
import { 
  StudentRoute, 
  FacultyRoute, 
  ManagementRoute, 
  AdminRoute, 
  AuthenticatedRoute,
  MultiRoleRoute 
} from './RoleBasedRoute';

// Import pages
import HomePage from '../pages/Landing/HomePage';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';

// Dashboard pages
import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import FacultyDashboard from '../pages/Dashboard/FacultyDashboard';
import ManagementDashboard from '../pages/Dashboard/ManagementDashboard';
import AdminPanel from '../pages/Dashboard/AdminPanel';

// Academic pages
import Attendance from '../pages/Academic/Attendance';
import Grades from '../pages/Academic/Grades';
import Library from '../pages/Academic/Library';
import RegitrationPortal from '../pages/Academic/RegitrationPortal';
import AttendanceFac from '../pages/Academic/Faculty/AttendanceFac';

// Profile pages
import ProfilePage from '../pages/Profile/ProfilePage';
import ManagmentProfile from '../pages/Profile/ManagmentProfile';

// Other pages
import FeesSection from '../pages/Fees Mangement/FeesSection';
import Hostel from '../pages/hostel/Hostel';
import Canteen from '../pages/hostel/Canteen';

// Error pages
import NotFoundPage from '../pages/Error/NotFoundPage';
import UnauthorizedPage from '../pages/Error/UnauthorizedPage';

// Layout components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loading from '../components/Loading/loading';

// Page wrapper component for loading transitions
const PageWrapper = ({ children }) => {
  return (
    <Loading>
      {children}
    </Loading>
  );
};

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                  <PageWrapper>
                    <HomePage />
                  </PageWrapper>
                </main>
                <Footer />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            
            {/* Student-only routes */}
            <Route path="/student/*" element={
              <StudentRoute>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="dashboard" element={<PageWrapper><StudentDashboard /></PageWrapper>} />
                      <Route path="attendance" element={<PageWrapper><Attendance /></PageWrapper>} />
                      <Route path="grades" element={<PageWrapper><Grades /></PageWrapper>} />
                      <Route path="library" element={<PageWrapper><Library /></PageWrapper>} />
                      <Route path="registration" element={<PageWrapper><RegitrationPortal /></PageWrapper>} />
                      <Route path="fees" element={<PageWrapper><FeesSection /></PageWrapper>} />
                      <Route path="hostel" element={<PageWrapper><Hostel /></PageWrapper>} />
                      <Route path="canteen" element={<PageWrapper><Canteen /></PageWrapper>} />
                      <Route path="profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
                      <Route path="" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </StudentRoute>
            } />

            {/* Faculty-only routes */}
            <Route path="/faculty/*" element={
              <FacultyRoute>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="dashboard" element={<PageWrapper><FacultyDashboard /></PageWrapper>} />
                      <Route path="attendance" element={<PageWrapper><AttendanceFac /></PageWrapper>} />
                      <Route path="grades" element={<PageWrapper><Grades /></PageWrapper>} />
                      <Route path="library" element={<PageWrapper><Library /></PageWrapper>} />
                      <Route path="profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
                      <Route path="" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </FacultyRoute>
            } />

            {/* Management-only routes */}
            <Route path="/management/*" element={
              <ManagementRoute>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="dashboard" element={<PageWrapper><ManagementDashboard /></PageWrapper>} />
                      <Route path="profile" element={<PageWrapper><ManagmentProfile /></PageWrapper>} />
                      <Route path="fees" element={<PageWrapper><FeesSection /></PageWrapper>} />
                      <Route path="reports" element={<PageWrapper><div>Management Reports</div></PageWrapper>} />
                      <Route path="" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ManagementRoute>
            } />

            {/* Admin-only routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="panel" element={<PageWrapper><AdminPanel /></PageWrapper>} />
                      <Route path="users" element={<PageWrapper><div>User Management</div></PageWrapper>} />
                      <Route path="system" element={<PageWrapper><div>System Settings</div></PageWrapper>} />
                      <Route path="" element={<Navigate to="panel" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </AdminRoute>
            } />

            {/* Shared routes for multiple roles */}
            <Route path="/library" element={
              <MultiRoleRoute roles={['student', 'faculty']}>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <PageWrapper>
                      <Library />
                    </PageWrapper>
                  </main>
                  <Footer />
                </div>
              </MultiRoleRoute>
            } />

            {/* Profile route accessible by all authenticated users */}
            <Route path="/profile" element={
              <AuthenticatedRoute>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <PageWrapper>
                      <ProfilePage />
                    </PageWrapper>
                  </main>
                  <Footer />
                </div>
              </AuthenticatedRoute>
            } />

            {/* Error pages */}
            <Route path="/unauthorized" element={
              <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                  <PageWrapper>
                    <UnauthorizedPage />
                  </PageWrapper>
                </main>
                <Footer />
              </div>
            } />
            <Route path="/404" element={
              <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                  <PageWrapper>
                    <NotFoundPage />
                  </PageWrapper>
                </main>
                <Footer />
              </div>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
