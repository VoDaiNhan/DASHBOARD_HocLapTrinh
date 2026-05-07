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
  Layers
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const TeacherMenu = ({ isDarkMode, onClose, location }) => {
  const isActive = location.pathname.startsWith('/teachers');

  const baseButton =
    isDarkMode === true
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  const activeButton =
    isDarkMode === true
      ? 'bg-blue-900 text-blue-200 border-r-2 border-blue-500'
      : 'bg-blue-50 text-blue-700 border-r-2 border-blue-600';

  return (
    <div>
      <Link
        to="/teachers"
        onClick={onClose}
        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive ? activeButton : baseButton
        }`}
      >
        <UserCheck
          className={`mr-3 h-5 w-5 ${
            isActive
              ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
              : 'text-gray-400'
          }`}
        />
        {'Qu\u1EA3n L\u00FD Gi\u1EA3ng Vi\u00EAn'}
      </Link>
    </div>
  );
};

const ClassMenu = ({ isDarkMode, onClose, location }) => {
  const isActive = location.pathname.startsWith('/classes');

  const baseButton =
    isDarkMode === true
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  const activeButton =
    isDarkMode === true
      ? 'bg-indigo-900 text-indigo-100 border-r-2 border-indigo-500'
      : 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600';

  return (
    <div>
      <Link
        to="/classes"
        onClick={onClose}
        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive ? activeButton : baseButton
        }`}
      >
        <Layers
          className={`mr-3 h-5 w-5 ${
            isActive
              ? isDarkMode
                ? 'text-indigo-300'
                : 'text-indigo-600'
              : 'text-gray-400'
          }`}
        />
        Quản lý lớp
      </Link>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const navigation = [
    {
      name: 'Trang Ch\u1EE7',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/' || location.pathname === '/dashboard'
    },
    {
      name: 'Qu\u1EA3n L\u00FD L\u1EDBp',
      type: 'class'
    },
    {
      name: 'Qu\u1EA3n L\u00FD Gi\u1EA3ng Vi\u00EAn',
      type: 'teacher'
    },
    {
      name: 'Ph\u00E2n t\u00EDch Sinh vi\u00EAn',
      href: '/students',
      icon: Users,
      current: location.pathname === '/students' || location.pathname.startsWith('/students/')
    },
    {
      name: 'Hi\u1EC7u su\u1EA5t Kh\u00F3a h\u1ECDc',
      href: '/courses',
      icon: BookOpen,
      current: location.pathname === '/courses' || location.pathname.startsWith('/courses/')
    },
    {
      name: 'Ph\u00E2n T\u00EDch Ng\u00E0nh',
      href: '/reports',
      icon: BarChart3,
      current: location.pathname === '/reports'
    },
    {
      name: 'Ng\u00E2n h\u00E0ng b\u00E0i t\u1EADp',
      href: '/exercises',
      icon: BookOpen,
      current: location.pathname === '/exercises'
    }
  ];

  const baseLink =
    isDarkMode === true
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  const activeLink =
    isDarkMode === true
      ? 'bg-blue-900 text-blue-200 border-r-2 border-blue-500'
      : 'bg-blue-50 text-blue-700 border-r-2 border-blue-600';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        </div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-56 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div
          className={`flex items-center justify-between h-16 px-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Department Manager
            </span>
          </div>
          <button
            onClick={onClose}
            className={`lg:hidden p-2 rounded-md ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.type === 'teacher' ? (
                  <TeacherMenu isDarkMode={isDarkMode} onClose={onClose} location={location} />
                ) : item.type === 'class' ? (
                  <ClassMenu isDarkMode={isDarkMode} onClose={onClose} location={location} />
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.current ? activeLink : baseLink
                    }`}
                    onClick={onClose}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current
                          ? isDarkMode
                            ? 'text-blue-400'
                            : 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`absolute bottom-0 w-full p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="space-y-2">
            <Link
              to="/settings"
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={onClose}
            >
              <Settings className="mr-3 h-5 w-5" />
              {'C\u1EA5u h\u00ECnh chuy\u00EAn ng\u00E0nh'}
            </Link>
            <button
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <LogOut className="mr-3 h-5 w-5" />
              {'\u0110\u0103ng Xu\u1EA5t'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
