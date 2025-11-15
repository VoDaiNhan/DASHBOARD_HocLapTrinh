import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import TeacherManagement from './pages/TeacherManagement/TeacherManagement';
import ClassManagement from './pages/ClassManagement/ClassManagement';
import ClassDetail from './pages/ClassDetail/ClassDetail';
import CourseManagement from './pages/CourseManagement/CourseManagement';
import CourseDetail from './pages/CourseManagement/CourseDetail';
import StudentTracking from './pages/StudentTracking/StudentTracking';
// Ẩn Assignment Management vì quản lý ngành không chấm bài
// import AssignmentManagement from './pages/AssignmentManagement/AssignmentManagement';
// import AssignmentDetail from './pages/AssignmentManagement/AssignmentDetail';
// import AssignmentCreate from './pages/AssignmentManagement/AssignmentCreate';
// import AssignmentEdit from './pages/AssignmentManagement/AssignmentEdit';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <ThemeProvider>
    <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/students" element={<StudentTracking />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/classes" element={<ClassManagement />} />
            <Route path="/classes/:id" element={<ClassDetail />} />
              {/* Ẩn Assignment routes vì quản lý ngành không chấm bài */}
              {/* <Route path="/assignments" element={<AssignmentManagement />} />
            <Route path="/assignments/create" element={<AssignmentCreate />} />
            <Route path="/assignments/:id" element={<AssignmentDetail />} />
              <Route path="/assignments/:id/edit" element={<AssignmentEdit />} /> */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
