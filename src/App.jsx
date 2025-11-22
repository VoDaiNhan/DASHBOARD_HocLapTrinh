import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth imports
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Giảng viên 
import LayoutTeacher from './giangvien/components/Layout/Layout';
import DashboardTeacher from './giangvien/pages/Dashboard/Dashboard';
import ClassManagement from './giangvien/pages/ClassManagement/ClassManagement';
import ClassDetail from './giangvien/pages/ClassDetail/ClassDetail';
import CourseManagement from './giangvien/pages/CourseManagement/CourseManagement';
import CourseDetail from './giangvien/pages/CourseManagement/CourseDetail';
import StudentTracking from './giangvien/pages/StudentTracking/StudentTracking';
import AssignmentManagement from './giangvien/pages/AssignmentManagement/AssignmentManagement';
import AssignmentDetail from './giangvien/pages/AssignmentManagement/AssignmentDetail';
import AssignmentCreate from './giangvien/pages/AssignmentManagement/AssignmentCreate';
import AssignmentEdit from './giangvien/pages/AssignmentManagement/AssignmentEdit';
import Reports from './giangvien/pages/Reports/Reports';
import Settings from './giangvien/pages/Settings/Settings';

// Sinh viên imports
import SidebarNew from './sinhvien/components/SidebarNew.jsx';
import HeaderNew from './sinhvien/components/HeaderNew.jsx';
import SidebarControl from './sinhvien/components/SidebarControl.jsx';
import DashboardStudent from './sinhvien/pages/Dashboard.jsx';
import Courses from './sinhvien/pages/Courses.jsx';
import Exercises from './sinhvien/pages/Exercises.jsx';
import Feedback from './sinhvien/pages/Feedback.jsx';
import Skills from './sinhvien/pages/Skills.jsx';
import Profile from './sinhvien/pages/Profile.jsx';

// Ngành imports
import { ThemeProvider } from './nganh/contexts/ThemeContext';
import LayoutNghanh from './nganh/components/Layout/Layout';
import DashboardNghanh from './nganh/pages/Dashboard/Dashboard';
import TeacherManagementNghanh from './nganh/pages/TeacherManagement/TeacherManagement';
import ClassManagementNghanh from './nganh/pages/ClassManagement/ClassManagement';
import ClassDetailNghanh from './nganh/pages/ClassDetail/ClassDetail';
import CourseManagementNghanh from './nganh/pages/CourseManagement/CourseManagement';
import CourseDetailNghanh from './nganh/pages/CourseManagement/CourseDetail';
import StudentTrackingNghanh from './nganh/pages/StudentTracking/StudentTracking';
import ReportsNghanh from './nganh/pages/Reports/Reports';
import SettingsNghanh from './nganh/pages/Settings/Settings';

// Student App Component (without router)
const StudentApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState('expanded');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardStudent setCurrentPage={setCurrentPage} />;
      case 'courses':
        return <Courses />;
      case 'exercises':
        return <Exercises />;
      case 'feedback':
        return <Feedback />;
      case 'skills':
        return <Skills />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardStudent setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNew 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mode={sidebarMode}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderNew onMenuClick={() => setSidebarOpen(true)} setCurrentPage={setCurrentPage} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>

        {/* Sidebar Control - Fixed Bottom Left */}
        <div className="hidden lg:block fixed bottom-6 left-6 z-50">
          <SidebarControl 
            mode={sidebarMode}
            onModeChange={setSidebarMode}
          />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedDashboard, setSelectedDashboard] = useState(sessionStorage.getItem('dashboardType') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('access_token'));


  // Auth routes wrapper
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // If no dashboard selected, something went wrong - force reload to get fresh data
  if (!selectedDashboard) {
    console.error('⚠️ No dashboard selected! This should not happen.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  // Student dashboard (no router)
  if (selectedDashboard === 'student') {
    return <StudentApp />;
  }

  // Ngành dashboard (with router and ThemeProvider)
  if (selectedDashboard === 'nghanh') {
    return (
      <ThemeProvider>
        <Router>
          <LayoutNghanh>
            <Routes>
              <Route path="/" element={<DashboardNghanh />} />
              <Route path="/dashboard" element={<DashboardNghanh />} />
              <Route path="/teachers" element={<TeacherManagementNghanh />} />
              <Route path="/courses" element={<CourseManagementNghanh />} />
              <Route path="/courses/:id" element={<CourseDetailNghanh />} />
              <Route path="/classes" element={<ClassManagementNghanh />} />
              <Route path="/classes/:id" element={<ClassDetailNghanh />} />
              <Route path="/students" element={<StudentTrackingNghanh />} />
              <Route path="/reports" element={<ReportsNghanh />} />
              <Route path="/settings" element={<SettingsNghanh />} />
            </Routes>
          </LayoutNghanh>
        </Router>
      </ThemeProvider>
    );
  }

  // Teacher dashboard (with router)
  return (
    <Router>
        <div className="min-h-screen bg-gray-50">
          <LayoutTeacher>
            <Routes>
              <Route path="/" element={<DashboardTeacher />} />
              <Route path="/dashboard" element={<DashboardTeacher />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/classes" element={<ClassManagement />} />
              <Route path="/classes/:id" element={<ClassDetail />} />
              <Route path="/students" element={<StudentTracking />} />
              <Route path="/assignments" element={<AssignmentManagement />} />
              <Route path="/assignments/create" element={<AssignmentCreate />} />
              <Route path="/assignments/:id" element={<AssignmentDetail />} />
              <Route path="/assignments/:id/edit" element={<AssignmentEdit />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </LayoutTeacher>
        </div>
    </Router>
  );
}

export default App;
