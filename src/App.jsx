import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Giảng viên imports
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

// Dashboard Selector Component
const DashboardSelector = ({ onSelect }) => {
  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Chọn Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => onSelect('teacher')}
            className="px-8 py-6 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-xl font-semibold shadow-lg"
          >
            👨‍🏫 Dashboard Giảng Viên
          </button>
          <button
            onClick={() => onSelect('student')}
            className="px-8 py-6 bg-success-600 text-white rounded-xl hover:bg-success-700 transition-colors text-xl font-semibold shadow-lg"
          >
            👨‍🎓 Dashboard Sinh Viên
          </button>
        </div>
      </div>
    </div>
  );
};

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
        <HeaderNew onMenuClick={() => setSidebarOpen(true)} />
        
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
  const [selectedDashboard, setSelectedDashboard] = useState(localStorage.getItem('dashboardType') || null);

  // If no dashboard selected, show selector
  if (!selectedDashboard) {
    return <DashboardSelector onSelect={(type) => {
      setSelectedDashboard(type);
      localStorage.setItem('dashboardType', type);
    }} />;
  }

  // Student dashboard (no router)
  if (selectedDashboard === 'student') {
    return (
      <>
        <button
          onClick={() => {
            setSelectedDashboard(null);
            localStorage.removeItem('dashboardType');
          }}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          ← Chọn lại Dashboard
        </button>
        <StudentApp />
      </>
    );
  }

  // Teacher dashboard (with router)
  return (
    <Router>
      <>
        <button
          onClick={() => {
            setSelectedDashboard(null);
            localStorage.removeItem('dashboardType');
          }}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          ← Chọn lại Dashboard
        </button>
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
      </>
    </Router>
  );
}

export default App;
