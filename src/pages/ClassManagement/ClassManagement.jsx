import React, { useState, useMemo } from 'react';
import { BarChart3, Plus, Edit, Trash2, Users, Calendar, GraduationCap, Filter, X, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockClassData, mockDepartmentData } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const ClassManagement = () => {
  // Get current year for default cohort
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  const [classes, setClasses] = useState(mockClassData.classes || []);
  const [filters, setFilters] = useState({
    cohort: currentYear.toString(), // Default to current year instead of 'all'
    status: 'all',
    search: '',
    instructor: '' // For instructor filtering
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [instructorFilter, setInstructorFilter] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'single'|'bulk', data: any }

  // Generate cohort years dynamically (from 2020 to current year)
  const cohortYears = useMemo(() => {
    const years = [];
    for (let year = 2020; year <= currentYear + 2; year++) {
      years.push(year);
    }
    return years.reverse(); // Most recent first
  }, [currentYear]);

  // Filter classes
  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      // Instructor filter (when clicking on instructor name)
      if (instructorFilter && cls.instructor !== instructorFilter) {
        return false;
      }
      
      if (filters.cohort !== 'all' && cls.cohort !== parseInt(filters.cohort)) {
        return false;
      }
      
      if (filters.status !== 'all' && cls.status !== filters.status) {
        return false;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        
        // Smart search: match cohort (K26, K25, etc), class code, or instructor name
        const cohortMatch = `k${cls.cohort.toString().slice(-2)}`.includes(searchLower);
        const nameMatch = cls.name?.toLowerCase().includes(searchLower);
        const instructorMatch = cls.instructor?.toLowerCase().includes(searchLower);
        const codeMatch = cls.name?.toLowerCase().replace(/-/g, '').includes(searchLower.replace(/-/g, ''));
        
        if (!cohortMatch && !nameMatch && !instructorMatch && !codeMatch) {
          return false;
        }
      }
      
      return true;
    });
  }, [classes, filters, instructorFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = classes.length;
    const active = classes.filter(c => c.status === 'active').length;
    const archived = classes.filter(c => c.status === 'archived' || c.status === 'completed').length;
    const totalStudents = classes.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0);
    
    return { total, filtered: filteredClasses.length, active, archived, totalStudents };
  }, [classes, filteredClasses]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ cohort: currentYear.toString(), status: 'all', search: '', instructor: '' });
    setInstructorFilter(null);
  };

  const handleAddClass = (newClass) => {
    setClasses(prev => [...prev, { ...newClass, id: Date.now(), cohort: parseInt(newClass.cohort) }]);
    setShowAddModal(false);
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setShowAddModal(true);
  };

  const handleUpdateClass = (updatedClass) => {
    setClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));
    setShowAddModal(false);
    setEditingClass(null);
  };

  const handleDeleteClass = (cls) => {
    setDeleteConfirm({ type: 'single', data: cls });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    
    if (deleteConfirm.type === 'single') {
      const cls = deleteConfirm.data;
      setClasses(prev => prev.filter(c => c.id !== cls.id));
      setSelectedClasses(prev => prev.filter(id => id !== cls.id));
    } else if (deleteConfirm.type === 'bulk') {
      setClasses(prev => prev.filter(c => !selectedClasses.includes(c.id)));
      setSelectedClasses([]);
    }
    
    setDeleteConfirm(null);
  };

  const handleSelectClass = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClasses.length === filteredClasses.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(filteredClasses.map(c => c.id));
    }
  };

  const handleBulkArchive = () => {
    if (window.confirm(`Bạn có chắc muốn kết thúc ${selectedClasses.length} lớp đã chọn?`)) {
      setClasses(prev => prev.map(c => 
        selectedClasses.includes(c.id) ? { ...c, status: 'completed' } : c
      ));
      setSelectedClasses([]);
    }
  };

  const handleBulkExport = () => {
    const selectedData = classes.filter(c => selectedClasses.includes(c.id));
    const csv = [
      ['Lớp học', 'Khóa', 'Sinh viên', 'Cố vấn', 'Trạng thái'],
      ...selectedData.map(c => [c.name, c.cohort, c.enrolledStudents, c.instructor, c.status === 'active' ? 'Đang học' : 'Đã kết thúc'])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `danh-sach-lop-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const hasActiveFilters = filters.cohort !== currentYear.toString() || filters.status !== 'all' || filters.search !== '' || instructorFilter !== null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <BarChart3 className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý lớp học</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {stats.active} lớp đang hoạt động · {stats.totalStudents} sinh viên
                </p>
              </div>
            </div>
            <button
              onClick={() => { setEditingClass(null); setShowAddModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              Thêm lớp
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Warning Banner - No Active Classes */}
        {stats.active === 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                  Hiện không có lớp đang hoạt động
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                  Tất cả {stats.total} lớp đã kết thúc. Hãy thêm lớp mới để bắt đầu quản lý.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tổng số lớp</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="h-6 w-6 text-green-600 dark:text-green-400 font-bold text-xl">●</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Đã kết thúc</p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{stats.archived}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="h-6 w-6 text-gray-600 dark:text-gray-400 font-bold text-xl">📦</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tổng sinh viên</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          {/* Instructor Filter Banner */}
          {instructorFilter && (
            <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Đang xem lớp của: <span className="font-semibold">{instructorFilter}</span>
                  </span>
                </div>
                <button
                  onClick={() => setInstructorFilter(null)}
                  className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Bộ lọc</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.filtered}/{stats.total} lớp {hasActiveFilters && '(đang lọc)'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Tìm theo K26, CNTT-01, tên giảng viên..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />

              <select
                value={filters.cohort}
                onChange={(e) => handleFilterChange('cohort', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả khóa</option>
                {cohortYears.map(year => (
                  <option key={year} value={year}>Khóa {year}</option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang học</option>
                <option value="completed">Đã kết thúc</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedClasses.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Đã chọn {selectedClasses.length} lớp
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkExport}
                  className="px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Xuất danh sách
                </button>
                <button
                  onClick={handleBulkArchive}
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đánh dấu đã kết thúc
                </button>
                <button
                  onClick={() => setSelectedClasses([])}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Class Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedClasses.length === filteredClasses.length && filteredClasses.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Lớp học
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Khóa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sĩ số
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Tiến độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Cố vấn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClasses.map((cls) => {
                  const statusConfig = {
                    active: { 
                      bg: 'bg-blue-100 dark:bg-blue-900/30', 
                      text: 'text-blue-700 dark:text-blue-300', 
                      label: 'Đang học', 
                      icon: '🔵' 
                    },
                    completed: { 
                      bg: 'bg-gray-100 dark:bg-gray-700', 
                      text: 'text-gray-700 dark:text-gray-300', 
                      label: 'Đã kết thúc', 
                      icon: '⚪' 
                    }
                  };
                  const status = statusConfig[cls.status] || statusConfig.active;

                  return (
                    <tr 
                      key={cls.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedClasses.includes(cls.id)}
                          onChange={() => handleSelectClass(cls.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <button
                              onClick={() => navigate(`/classes/${cls.id}`)}
                              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                            >
                              {cls.name}
                            </button>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {cls.cohort}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {cls.enrolledStudents}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setShowProgressModal(cls)}
                          className="w-full text-left hover:opacity-80 transition-opacity"
                          title="Click để xem chi tiết tiến độ theo môn học"
                        >
                          <div className="space-y-1.5 min-w-[120px]">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {Math.round((cls.submittedAssignments / (cls.enrolledStudents * cls.totalAssignments)) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  ((cls.submittedAssignments / (cls.enrolledStudents * cls.totalAssignments)) * 100) >= 75 
                                    ? 'bg-green-500' 
                                    : ((cls.submittedAssignments / (cls.enrolledStudents * cls.totalAssignments)) * 100) >= 50 
                                    ? 'bg-blue-500' 
                                    : ((cls.submittedAssignments / (cls.enrolledStudents * cls.totalAssignments)) * 100) >= 25 
                                    ? 'bg-yellow-500' 
                                    : 'bg-orange-500'
                                }`}
                                style={{ width: `${Math.round((cls.submittedAssignments / (cls.enrolledStudents * cls.totalAssignments)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </button>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setInstructorFilter(cls.instructor)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors text-left"
                          title="Xem tất cả lớp của giảng viên này"
                        >
                          {cls.instructor}
                        </button>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.text}`}>
                          <span className="text-base">{status.icon}</span>
                          {status.label}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setQuickViewClass(cls)}
                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                            title="Xem nhanh"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEditClass(cls)}
                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                            title="Sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls)}
                            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredClasses.length === 0 && (
            <div className="p-12 text-center">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Không tìm thấy lớp học nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Modal - Drill-down by Subject */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowProgressModal(null)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Chi tiết tiến độ - {showProgressModal.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Khóa {showProgressModal.cohort} • {showProgressModal.enrolledStudents} sinh viên
                  </p>
                </div>
                <button onClick={() => setShowProgressModal(null)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-4 space-y-6">
                {/* Tổng quan */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">🔥 Tổng quan tiến độ</h4>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {Math.round((showProgressModal.submittedAssignments / (showProgressModal.enrolledStudents * showProgressModal.totalAssignments)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        ((showProgressModal.submittedAssignments / (showProgressModal.enrolledStudents * showProgressModal.totalAssignments)) * 100) >= 75 
                          ? 'bg-green-500' 
                          : ((showProgressModal.submittedAssignments / (showProgressModal.enrolledStudents * showProgressModal.totalAssignments)) * 100) >= 50 
                          ? 'bg-blue-500' 
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.round((showProgressModal.submittedAssignments / (showProgressModal.enrolledStudents * showProgressModal.totalAssignments)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {showProgressModal.submittedAssignments} / {showProgressModal.enrolledStudents * showProgressModal.totalAssignments} bài đã hoàn thành
                  </p>
                </div>

                {/* Breakdown theo môn */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">📊 Breakdown theo môn học</h4>
                    <button
                      onClick={() => {
                        setShowProgressModal(null);
                        navigate(`/classes/${showProgressModal.id}/progress`);
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Xem chi tiết đầy đủ →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(() => {
                      const currentYear = new Date().getFullYear();
                      const yearInProgram = currentYear - showProgressModal.cohort + 1;
                      const overallProgress = Math.round((showProgressModal.submittedAssignments / (showProgressModal.enrolledStudents * showProgressModal.totalAssignments)) * 100);
                      
                      let subjects = [];
                      if (yearInProgram === 1) {
                        subjects = [
                          { name: 'Nhập môn lập trình', progress: Math.min(100, overallProgress + 15) },
                          { name: 'Toán rời rạc', progress: Math.max(0, overallProgress - 5) },
                          { name: 'Cấu trúc dữ liệu', progress: Math.max(0, overallProgress - 10) }
                        ];
                      } else if (yearInProgram === 2) {
                        subjects = [
                          { name: 'Lập trình hướng đối tượng', progress: Math.min(100, overallProgress + 10) },
                          { name: 'Cơ sở dữ liệu', progress: overallProgress },
                          { name: 'Mạng máy tính', progress: Math.max(0, overallProgress - 8) }
                        ];
                      } else if (yearInProgram === 3) {
                        subjects = [
                          { name: 'Phát triển Web', progress: Math.min(100, overallProgress + 5) },
                          { name: 'Công nghệ phần mềm', progress: overallProgress },
                          { name: 'Trí tuệ nhân tạo', progress: Math.max(0, overallProgress - 12) }
                        ];
                      } else {
                        subjects = [
                          { name: 'Đồ án tốt nghiệp', progress: overallProgress },
                          { name: 'Thực tập doanh nghiệp', progress: Math.min(100, overallProgress + 8) },
                          { name: 'Chuyên đề nâng cao', progress: Math.max(0, overallProgress - 5) }
                        ];
                      }
                      
                      return subjects.map((subject, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {subject.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {subject.progress}%
                              </span>
                              {subject.progress < overallProgress - 10 && (
                                <span className="text-xs text-amber-600 dark:text-amber-400">⚠️ Thấp</span>
                              )}
                              {subject.progress > overallProgress + 10 && (
                                <span className="text-xs text-green-600 dark:text-green-400">✅ Tốt</span>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                subject.progress >= 75 ? 'bg-green-500' : 
                                subject.progress >= 50 ? 'bg-blue-500' : 
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowProgressModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowProgressModal(null);
                    navigate(`/classes/${showProgressModal.id}/progress`);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem chi tiết đầy đủ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <ClassModal
          isOpen={showAddModal}
          onClose={() => { setShowAddModal(false); setEditingClass(null); }}
          onSubmit={editingClass ? handleUpdateClass : handleAddClass}
          initialData={editingClass}
          isEdit={!!editingClass}
        />
      )}

      {/* 🗑️ DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setDeleteConfirm(null)} 
          />
          <div className="relative bg-white dark:bg-gray-800 w-full max-w-sm rounded-[24px] shadow-2xl p-6 border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600">
                <Trash2 size={32} />
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Xác nhận xóa</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {deleteConfirm.type === 'single' 
                  ? `Bạn có chắc chắn muốn xóa lớp ${deleteConfirm.data.name}? Hành động này không thể hoàn tác.`
                  : `Bạn có chắc chắn muốn xóa ${selectedClasses.length} lớp đã chọn? Hành động này không thể hoàn tác.`
                }
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-3 text-xs font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Component
const ClassModal = ({ isOpen, onClose, onSubmit, initialData, isEdit }) => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    cohort: currentYear,
    instructor: '',
    enrolledStudents: 0,
    status: 'active'
  });

  React.useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        name: initialData.name || '',
        cohort: initialData.cohort || currentYear,
        instructor: initialData.instructor || '',
        enrolledStudents: initialData.enrolledStudents || 0,
        status: initialData.status || 'active'
      });
    } else if (!isEdit) {
      setFormData({
        name: '',
        cohort: currentYear,
        instructor: '',
        enrolledStudents: 0,
        status: 'active'
      });
    }
  }, [initialData, isEdit, isOpen, currentYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && initialData) {
      onSubmit({ ...initialData, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Sửa thông tin lớp' : 'Thêm lớp học mới'}
            </h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mã lớp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: 22CT111"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Khóa <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.cohort}
                onChange={(e) => setFormData(prev => ({ ...prev, cohort: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => (currentYear + 2) - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cố vấn học tập <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.instructor}
                onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Chọn giảng viên --</option>
                {mockDepartmentData.teachers
                  .filter(teacher => teacher.status === 'active')
                  .map(teacher => (
                    <option key={teacher.id} value={teacher.name}>
                      {teacher.name} - {teacher.position}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Số sinh viên
              </label>
              <input
                type="number"
                min="0"
                value={formData.enrolledStudents}
                onChange={(e) => setFormData(prev => ({ ...prev, enrolledStudents: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Trạng thái
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Đang học</option>
                <option value="completed">Đã kết thúc</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEdit ? 'Cập nhật' : 'Thêm lớp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
