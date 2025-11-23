import React from 'react';
import { X, Home, Users, BookOpen, BarChart3, Settings, LogOut, GraduationCap, FileText } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { authAPI } from '../../../services/api';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Trang Chủ', href: '/dashboard', icon: Home, current: location.pathname === '/' || location.pathname === '/dashboard' },
    { name: 'Quản Lý Khóa Học', href: '/courses', icon: BookOpen, current: location.pathname === '/courses' || location.pathname.startsWith('/courses/') },
    { name: 'Quản Lý Lớp Học', href: '/classes', icon: GraduationCap, current: location.pathname === '/classes' || location.pathname.startsWith('/classes/') },
    { name: 'Quản Lý Bài Tập', href: '/assignments', icon: FileText, current: location.pathname === '/assignments' || location.pathname.startsWith('/assignments/') },
    { name: 'Theo Dõi Sinh Viên', href: '/students', icon: Users, current: location.pathname === '/students' },
    { name: 'Báo Cáo', href: '/reports', icon: BarChart3, current: location.pathname === '/reports' },
    { name: 'Cài Đặt', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">EduTracker</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  onClick={() => onClose()}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button 
            onClick={async () => {
              try {
                await authAPI.logout();
              } catch (error) {
                console.error('Logout error:', error);
              } finally {
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('dashboardType');
                window.location.href = '/login';
              }
            }}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            Đăng Xuất
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;