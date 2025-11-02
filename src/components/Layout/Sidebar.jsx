import React, { useState } from 'react';
import { X, Home, Users, BookOpen, BarChart3, LogOut, GraduationCap, UserCheck, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const TeacherMenu = ({ isDarkMode, onClose, location }) => {
  const [open, setOpen] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const currentView = searchParams.get('view') || 'overview';
  const isActive = location.pathname === '/teachers';
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? isDarkMode
              ? 'bg-blue-900 text-blue-200 border-r-2 border-blue-500'
              : 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
            : isDarkMode
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <span className="flex items-center">
          <UserCheck className={`mr-3 h-5 w-5 ${isActive ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-400')}`} />
          Quản Lý Giảng Viên
        </span>
        <span className="text-xs">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="mt-1 space-y-1 pl-8">
          <Link to="/teachers?view=overview" onClick={onClose} className={`block px-2 py-2 text-sm rounded-md ${currentView==='overview' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50')}`}>Tổng quan</Link>
          <Link to="/teachers?view=schedule" onClick={onClose} className={`block px-2 py-2 text-sm rounded-md ${currentView==='schedule' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50')}`}>Lịch giảng dạy</Link>
        </div>
      )}
    </div>
  );
};


const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const navigation = [
    { name: 'Trang Chủ', href: '/dashboard', icon: Home, current: location.pathname === '/' || location.pathname === '/dashboard' },
    { name: 'Quản Lý Giảng Viên', href: '/teachers', icon: UserCheck, current: location.pathname === '/teachers' || location.pathname.startsWith('/teachers/') },
    { name: 'Phân tích Sinh viên', href: '/students', icon: Users, current: location.pathname === '/students' || location.pathname.startsWith('/students/') },
    { name: 'Hiệu suất Khóa học', href: '/courses', icon: BookOpen, current: location.pathname === '/courses' || location.pathname.startsWith('/courses/') },
    { name: 'Phân tích Lớp học', href: '/classes', icon: GraduationCap, current: location.pathname === '/classes' || location.pathname.startsWith('/classes/') },
    { name: 'Phân Tích Ngành', href: '/reports', icon: BarChart3, current: location.pathname === '/reports' },
    // Ẩn Quản Lý Bài Tập vì quản lý ngành không chấm bài
    // { name: 'Quản Lý Bài Tập', href: '/assignments', icon: FileText, current: location.pathname === '/assignments' || location.pathname.startsWith('/assignments/') },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className={`flex items-center justify-between h-16 px-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Department Manager</span>
          </div>
          <button onClick={onClose} className={`lg:hidden p-2 rounded-md ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.name === 'Quản Lý Giảng Viên' ? (
                  <TeacherMenu isDarkMode={isDarkMode} onClose={onClose} location={location} />
                ) : (
                <Link
                  to={item.href}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                        ? isDarkMode 
                          ? 'bg-blue-900 text-blue-200 border-r-2 border-blue-500'
                          : 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                    <item.icon className={`mr-3 h-5 w-5 ${item.current ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-400')}`} />
                  {item.name}
                </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={`absolute bottom-0 w-full p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="space-y-2">
            <Link
              to="/settings"
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Settings className="mr-3 h-5 w-5" />
              Cấu hình Ngành
            </Link>
            <button className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}>
              <LogOut className="mr-3 h-5 w-5" />
            Đăng Xuất
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;