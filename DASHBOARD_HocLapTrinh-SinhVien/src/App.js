import React, { useState } from 'react';
import SidebarNew from './components/SidebarNew';
import HeaderNew from './components/HeaderNew';
import SidebarControl from './components/SidebarControl';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Exercises from './pages/Exercises';
import Feedback from './pages/Feedback';
import Skills from './pages/Skills';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState('expanded'); // expanded, collapsed, hover

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
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
        return <Dashboard setCurrentPage={setCurrentPage} />;
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
        <HeaderNew 
          onMenuClick={() => setSidebarOpen(true)}
        />
        
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
}

export default App;

