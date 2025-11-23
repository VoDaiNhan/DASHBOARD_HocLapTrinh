import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Plus, Eye, Edit, Trash2, Mail, Phone, Star, AlertTriangle, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mockDepartmentData, mockClassData } from '../../data/mockData';

const TeacherManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterPosition, setFilterPosition] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [searchName, setSearchName] = useState('');
  const [activeView, setActiveView] = useState(() => {
    // Initialize from URL on mount
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    return (view === 'overview' || view === 'schedule' || view === 'progress') ? view : 'overview';
  });

  // Sync view from URL changes (only when URL changes, not from our own updates)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    if (view === 'overview' || view === 'schedule' || view === 'progress') {
      if (view !== activeView) {
        setActiveView(view);
      }
    }
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when activeView changes (from user interaction, not from URL sync)
  const prevViewRef = useRef(activeView);
  useEffect(() => {
    if (prevViewRef.current !== activeView) {
      prevViewRef.current = activeView;
      const params = new URLSearchParams(location.search);
      if (params.get('view') !== activeView) {
        params.set('view', activeView);
        navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
      }
    }
  }, [activeView, navigate, location.pathname, location.search]);

  // Luôn khai báo teachers trước để specializationOptions không lỗi
  const teachers = (mockDepartmentData && Array.isArray(mockDepartmentData.teachers)) ? mockDepartmentData.teachers : [];
  // Lấy mảng chuyên môn duy nhất từ danh sách giảng viên
  const specializationOptions = React.useMemo(() => {
    const specializations = teachers.map(t => t.specialization);
    // Tách nhỏ các chuyên môn nếu có dấu phẩy hoặc gạch ngang, sau đó loại trùng trắng đầu/cuối
    return [
      'all',
      ...Array.from(
        new Set(
          specializations
            .flatMap(specs => specs.split(/[,-]/g).map(s => s.trim()))
            .filter(s => s && s !== '')
        )
      ),
    ];
  }, [teachers]);

  const filteredTeachers = teachers.filter(teacher => {
    const name = (teacher?.name || '').toLowerCase();
    const spec = (teacher?.specialization || '').toLowerCase();
    const matchesSearch = !searchName || name.includes(searchName.toLowerCase());
    const matchesPosition = filterPosition === 'all' || teacher?.position === filterPosition;
    const matchesSpec = filterSpecialization === 'all' || spec === filterSpecialization.toLowerCase();
    const matchesMin = true; // đã bỏ lọc số lớp
    return matchesSearch && matchesPosition && matchesSpec && matchesMin;
  });

  const positions = ['all', 'Trưởng khoa', 'Phó trưởng khoa', 'Giảng viên chính', 'Giảng viên'];

  // PERFORMANCE: Memoize classes and per-instructor stats to avoid recompute
  const allClasses = useMemo(() => (mockClassData && Array.isArray(mockClassData.classes)) ? mockClassData.classes : [], [mockClassData]);

  const classesByInstructor = useMemo(() => {
    const map = new Map();
    for (const c of allClasses) {
      const key = c.instructor || '—';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(c);
    }
    return map;
  }, [allClasses]);

  const avgCompletionByInstructor = useMemo(() => {
    const map = new Map();
    for (const [name, arr] of classesByInstructor.entries()) {
      if (!arr.length) { map.set(name, 0); continue; }
      const sum = arr.reduce((acc, c) => acc + (c.completionRate || 0), 0);
      map.set(name, Math.round((sum / arr.length) * 10) / 10);
    }
    return map;
  }, [classesByInstructor]);

  const weakCountByInstructor = useMemo(() => {
    const map = new Map();
    const details = (mockClassData && mockClassData.classDetails) ? mockClassData.classDetails : {};
    for (const [name, arr] of classesByInstructor.entries()) {
      let count = 0;
      for (const cls of arr) {
        const detail = details[cls.id];
        if (!detail || !detail.students) continue;
        count += detail.students.filter(s => (s.averageScore ?? 0) < 6 || (s.completionRate ?? 0) < 60).length;
      }
      map.set(name, count);
    }
    return map;
  }, [classesByInstructor, mockClassData]);

  const hasLowProgressByInstructor = useMemo(() => {
    const map = new Map();
    for (const [name, arr] of classesByInstructor.entries()) {
      map.set(name, arr.some(c => (c.completionRate || 0) < 70));
    }
    return map;
  }, [classesByInstructor]);

  // Helper: hoạt động gần nhất (mock hiển thị)
  const lastActiveMap = useMemo(() => ({
    1: '2 ngày trước',
    2: '1 ngày trước',
    3: '5 giờ trước',
    4: '3 ngày trước',
    5: '8 giờ trước',
    6: 'hôm qua',
    7: '4 giờ trước',
    8: '2 giờ trước'
  }), []);

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailModal(true);
  };

  // Progress helpers
  const getProgressColor = (percent) => {
    if (percent >= 80) return 'bg-emerald-500';
    if (percent >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getProgressStatus = (percent) => {
    if (percent >= 80) return { label: 'Tốt', color: 'text-emerald-600' };
    if (percent >= 60) return { label: 'Đạt yêu cầu', color: 'text-amber-600' };
    return { label: 'Cần cải thiện', color: 'text-rose-600' };
  };

  const departmentAverage = useMemo(() => {
    if (!teachers.length) return 0;
    const sum = teachers.reduce((acc, t) => acc + (avgCompletionByInstructor.get(t.name) || 0), 0);
    return Math.round((sum / teachers.length) * 10) / 10;
  }, [teachers, avgCompletionByInstructor]);

  const getPositionColor = (position) => {
    switch (position) {
      case 'Trưởng khoa': return 'text-purple-600 bg-purple-100';
      case 'Phó trưởng khoa': return 'text-blue-600 bg-blue-100';
      case 'Giảng viên chính': return 'text-indigo-600 bg-indigo-100';
      case 'Giảng viên': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 text-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Giảng Viên</h1>
        </div>
        <p className="text-gray-600 text-sm mt-1">Quản lý thông tin và hoạt động của đội ngũ giảng viên trong khoa</p>
      </div>

      {/* Removed stats cards as requested */}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="min-w-[220px] text-sm">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Tìm theo tên giảng viên"
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="min-w-[200px] text-sm">
            <select
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="all">Tất cả chức vụ</option>
              <option value="Trưởng khoa">Trưởng khoa</option>
              <option value="Phó trưởng khoa">Phó trưởng khoa</option>
              <option value="Giảng viên chính">Giảng viên chính</option>
              <option value="Giảng viên">Giảng viên</option>
            </select>
          </div>
          <div className="min-w-[260px] text-sm">
            <select
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterSpecialization}
              onChange={e => setFilterSpecialization(e.target.value)}
            >
              <option value="all">Tất cả chuyên môn</option>
              {specializationOptions.filter(s => s !== 'all').map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Giảng Viên
          </button>
        </div>
      </div>

      {/* Teachers List / Schedule / Progress based on view */}
      {activeView === 'overview' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Giảng Viên
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Chức Vụ
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Môn phụ trách
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  SV yếu trong lớp
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá (feedback)
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động gần nhất
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Nghiên cứu/Hướng dẫn
                </th>
                <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 text-xs">
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                        {teacher.name.split(' ').pop().charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-[11px] text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(teacher.position)}`}>
                      {teacher.position}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-xs text-gray-900">{teacher.specialization}</div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="text-xs text-gray-900">{weakCountByInstructor.get(teacher.name) || 0} SV</div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                      <span className="text-xs font-medium text-gray-900">{teacher.averageRating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className="text-[11px] text-gray-700">{lastActiveMap[teacher.id] || '—'}</span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="text-xs text-gray-900">{teacher.projects} dự án</div>
                    <div className="text-[11px] text-gray-500">{teacher.publications} bài báo</div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-[11px] font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(teacher)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Xóa"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      ) : activeView === 'schedule' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                  <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Giảng viên</th>
                  <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Buổi</th>
                  <th className="px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">Thời gian / Phòng</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(mockClassData?.classes ?? []).map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 text-xs">
                    <td className="px-4 py-2.5 whitespace-nowrap text-gray-900">{c.name || c.code || `Lớp ${c.id}`}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-gray-700">{c.instructor || '—'}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-gray-700">{c.session || c.schedule?.session || c.timeSlot || '—'}</td>
                    <td className="px-4 py-2.5 text-gray-700">
                      {c.time || (c.startTime && c.endTime ? `${c.startTime} - ${c.endTime}` : c.schedule?.time) || c.schedule?.day || c.room || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-900">Tỷ lệ hoàn thành trung bình lớp</h3>
            <div className="text-sm text-gray-700">TB khoa: <span className="font-semibold">{departmentAverage}%</span></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Đánh giá tiến độ giảng dạy trung bình của giảng viên trong khoa.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: progress list */}
            <div className="lg:col-span-7 space-y-3">
              {teachers.map(t => {
                const p = avgCompletionByInstructor.get(t.name) || 0;
                const status = getProgressStatus(p);
                return (
                  <div key={t.id} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-800">{t.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                        <span className="text-sm font-semibold text-gray-900 min-w-[48px] text-right">{p}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                      <div className={`h-2 ${getProgressColor(p)}`} style={{ width: `${p}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: simple overview bar chart */}
            <div className="lg:col-span-5">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800 mb-2">Tổng quan theo giảng viên</div>
                <div className="relative h-48 flex items-end gap-3">
                  {teachers.map(t => {
                    const p = avgCompletionByInstructor.get(t.name) || 0;
                    return (
                      <div key={t.id} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-6 rounded-t ${getProgressColor(p)}`}
                          style={{ height: `${Math.max(p, 2)}%`, minHeight: '4px' }}
                          title={`${t.name}: ${p}%`}
                        />
                        <div className="mt-1 text-[10px] text-gray-600 text-center truncate w-10" title={t.name}>
                          {t.name.split(' ').slice(-1)[0]}
                        </div>
                      </div>
                    );
                  })}
                  <div className="absolute left-0 right-0 bottom-[calc(48px)]" />
                </div>
                <div className="mt-3 text-[11px] text-gray-500">
                  <span className="inline-block w-3 h-2 rounded bg-emerald-500 mr-1 align-middle" /> Tốt
                  <span className="inline-block w-3 h-2 rounded bg-amber-500 mx-3 align-middle" /> Đạt yêu cầu
                  <span className="inline-block w-3 h-2 rounded bg-rose-500 mr-1 align-middle" /> Cần cải thiện
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Detail Modal */}
      {showDetailModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Chi Tiết Giảng Viên</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedTeacher.name.split(' ').pop().charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">{selectedTeacher.name}</h4>
                    <p className="text-gray-600">{selectedTeacher.position}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        {selectedTeacher.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        {selectedTeacher.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{selectedTeacher.totalClasses}</div>
                    <div className="text-sm text-gray-600">Lớp học</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{selectedTeacher.totalStudents}</div>
                    <div className="text-sm text-gray-600">Sinh viên</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{selectedTeacher.experience}</div>
                    <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{selectedTeacher.averageRating}</div>
                    <div className="text-sm text-gray-600">Đánh giá</div>
                  </div>
                </div>

                {/* Education & Research */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Học Vấn</h5>
                  <p className="text-gray-600">{selectedTeacher.education}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Chuyên Môn</h5>
                  <p className="text-gray-600">{selectedTeacher.specialization}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Lĩnh Vực Nghiên Cứu</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.researchAreas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Công Bố Khoa Học</h5>
                    <p className="text-gray-600">{selectedTeacher.publications} bài báo</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Dự Án Nghiên Cứu</h5>
                    <p className="text-gray-600">{selectedTeacher.projects} dự án</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
