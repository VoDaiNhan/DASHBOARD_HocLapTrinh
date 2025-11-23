import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, BookOpen, FileText, Users, Clock, Loader2 } from 'lucide-react';
import { searchService } from '../services/searchService';

const SmartSearch = ({ userRole = 'teacher' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  // Mock data - Chỉ tìm kiếm trang và chức năng
  const mockData = {
    pages: [
      { type: 'page', name: 'Dashboard', path: '/dashboard', icon: 'home' },
      { type: 'page', name: 'Quản lý Khóa học', path: '/courses', icon: 'book' },
      { type: 'page', name: 'Quản lý Lớp học', path: '/classes', icon: 'users' },
      { type: 'page', name: 'Quản lý Bài tập', path: '/assignments', icon: 'file' },
      { type: 'page', name: 'Theo dõi Sinh viên', path: '/students', icon: 'user' },
      { type: 'page', name: 'Báo cáo', path: '/reports', icon: 'chart' },
      { type: 'page', name: 'Cài đặt', path: '/settings', icon: 'settings' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tìm kiếm chỉ trang và chức năng
  const searchAll = async (searchQuery) => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    const results = [];

    // Tìm trang (local search)
    mockData.pages.forEach(page => {
      if (page.name.toLowerCase().includes(lowerQuery)) {
        results.push(page);
      }
    });

    return results.slice(0, 8); // Giới hạn 8 kết quả
  };

  // Debounce search
  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        const results = await searchAll(searchQuery);
        setSuggestions(results);
        setShowSuggestions(true);
        setSelectedIndex(-1);
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setLoading(false);
      }
    }, 300); // Đợi 300ms sau khi người dùng ngừng gõ
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);

    try {
      if (item.type === 'page' && item.path) {
        navigate(item.path);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const getIcon = (type) => {
    return <Search className="w-4 h-4" />;
  };

  const getTypeLabel = (type) => {
    return 'Trang';
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 text-gray-900">{part}</mark>
        : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="Tìm kiếm trang, khóa học..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {suggestions.map((item, index) => (
            <button
              key={`${item.type}-${item.id || item.mssv || item.path}-${index}`}
              onClick={() => handleSelectSuggestion(item)}
              className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                selectedIndex === index ? 'bg-gray-50' : ''
              }`}
            >
              <div className="mt-1 text-gray-400">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {highlightMatch(item.name, query)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    {getTypeLabel(item.type)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <p className="text-sm text-gray-500 text-center">
            Không tìm thấy kết quả cho "{query}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
