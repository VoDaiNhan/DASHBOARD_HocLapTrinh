import React from 'react';
import {
  X,
  Home,
  Users,
  BookOpen,
  BarChart3,
  LogOut,
  UserCheck,
  Settings,
  Layers,
  LayoutGrid,
  Sun,
  Moon
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const NavLink = ({ item, isDarkMode, onClose }) => {
  const isActive = item.current;

  // Premium styles for active state
  const activeStyles = isDarkMode
    ? 'bg-gradient-to-r from-indigo-900/40 to-blue-900/40 text-indigo-300 shadow-sm border-l-4 border-indigo-500'
    : 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 shadow-sm border-l-4 border-indigo-600';

  const baseStyles = isDarkMode
    ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900';

  return (
    <Link
      to={item.href}
      onClick={onClose}
      className={`group flex items-center px-4 py-3.5 text-xs font-black uppercase tracking-widest rounded-r-2xl transition-all duration-300 ease-out hover:pl-6 ${isActive ? activeStyles : baseStyles
        }`}
    >
      <div className={`mr-4 p-2 rounded-xl transition-all duration-300 ${isActive
          ? (isDarkMode ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/50' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100')
          : (isDarkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-gray-200')
        }`}>
        <item.icon className="h-4 w-4" />
      </div>
      {item.name}
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    {
      name: 'Trang Chủ',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/' || location.pathname === '/dashboard'
    },
    {
      name: 'Quản Lý Lớp',
      href: '/classes',
      icon: Layers,
      current: location.pathname.startsWith('/classes')
    },
    {
      name: 'Quản Lý Giảng Viên',
      href: '/teachers',
      icon: UserCheck,
      current: location.pathname.startsWith('/teachers')
    },
    {
      name: 'Phân tích Sinh viên',
      href: '/students',
      icon: Users,
      current: location.pathname === '/students' || location.pathname.startsWith('/students/')
    },
    {
      name: 'Hiệu suất Khóa học',
      href: '/courses',
      icon: BookOpen,
      current: location.pathname === '/courses' || location.pathname.startsWith('/courses/')
    },
    {
      name: 'Phân Tích Ngành',
      href: '/reports',
      icon: BarChart3,
      current: location.pathname === '/reports'
    },
    {
      name: 'Ngân hàng bài tập',
      href: '/exercises',
      icon: LayoutGrid,
      current: location.pathname === '/exercises'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
        </div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col ${isDarkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'
          } backdrop-blur-xl border-r shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-between px-6 mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-black uppercase tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quản lý
              </span>
              <span className={`text-lg font-black uppercase tracking-widest leading-none ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Chuyên ngành
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`lg:hidden p-2 rounded-xl ${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-none">
          <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Danh mục quản lý</p>
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} isDarkMode={isDarkMode} onClose={onClose} />
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className={`p-6 mt-auto border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="space-y-2">
            <Link
              to="/settings"
              className={`group flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${isDarkMode
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              onClick={onClose}
            >
              <Settings className="mr-3 h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
              Cấu hình chuyên ngành
            </Link>
            <button
              className={`group flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${isDarkMode
                  ? 'text-rose-400 hover:bg-rose-950/30'
                  : 'text-rose-600 hover:bg-rose-50'
                }`}
            >
              <LogOut className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Đăng Xuất
            </button>
          </div>

          {/* Mini Profile Info + Theme Toggle */}
          <div className={`mt-6 p-4 rounded-3xl flex items-center justify-between gap-2 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                A
              </div>
              <div className="overflow-hidden">
                <p className={`text-xs font-black truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin User</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase truncate">Trưởng bộ môn</p>
              </div>
            </div>

            <button
              onClick={(e) => { e.preventDefault(); toggleTheme(); }}
              className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${isDarkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-white text-indigo-600 shadow-sm border border-gray-100 hover:bg-gray-100'
                }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
