import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Users, Plus, Upload, Download, Search, X, Edit, Trash2, Eye, AlertCircle, ChevronDown, ChevronUp, Mail, CheckCircle } from 'lucide-react';
import { mockClassData } from '../../data/mockData';

// Add stable scrollbar styles
const scrollbarStyles = `
  .scrollbar-gutter-stable {
    scrollbar-gutter: stable;
  }
  
  /* Custom scrollbar for better appearance */
  .scrollbar-gutter-stable::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .scrollbar-gutter-stable::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-gutter-stable::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  .dark .scrollbar-gutter-stable::-webkit-scrollbar-thumb {
    background: #475569;
  }
  
  .scrollbar-gutter-stable::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  .dark .scrollbar-gutter-stable::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
`;

const ClassDetailManagement = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // name, mssv, status, progress, gpa
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [showEligibleList, setShowEligibleList] = useState(false);
  
  // Collapse states for all 3 cards
  const [isTopCardExpanded, setIsTopCardExpanded] = useState(true);
  const [isBottomCardExpanded, setIsBottomCardExpanded] = useState(true);
  const [isWarningCardExpanded, setIsWarningCardExpanded] = useState(true);

  // Find class data FIRST
  const classData = mockClassData.classes.find(c => c.id === parseInt(classId));

  // Load config from localStorage
  const getConfig = () => {
    try {
      const saved = localStorage.getItem('departmentConfig');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading config:', e);
    }
    // Default config
    return {
      minProgress: 70,
      minGPA: 7.0,
      rankingCriteria: 'gpa',
      topCount: 3,
      warningGPA: 8.0,
      warningProgress: 50
    };
  };

  const config = getConfig();
  
  // Generate academic years based on cohort (4 years program)
  // Example: Cohort 2022 → 2022-2023, 2023-2024, 2024-2025, 2025-2026
  const academicYears = useMemo(() => {
    if (!classData) return [];
    const cohort = classData.cohort;
    const years = [];
    for (let i = 0; i < 4; i++) {
      const startYear = cohort + i;
      const endYear = startYear + 1;
      years.push(`${startYear}-${endYear}`);
    }
    return years;
  }, [classData]);
  
  const terms = ['HK1', 'HK2'];
  
  // Semester filters - default to first year of cohort
  const defaultYear = classData ? `${classData.cohort}-${classData.cohort + 1}` : '2025-2026';
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedTerm, setSelectedTerm] = useState('HK1');
  
  // Check if selected semester has data (is in the past or current)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  const isSemesterAvailable = useMemo(() => {
    const [startYear] = selectedYear.split('-').map(Number);
    const selectedTermNum = selectedTerm === 'HK1' ? 1 : 2;
    
    // IMPORTANT: Academic year start dates
    // Year 1 (Freshman): Starts in October (month 10)
    // Year 2, 3, 4: Starts in August (month 8)
    
    const cohortYear = classData.cohort;
    
    // Determine which academic year this is for the cohort
    const yearInProgram = startYear - cohortYear + 1; // 1, 2, 3, or 4
    
    // Year 1: Enrollment starts in October of cohort year
    // Year 2+: Academic year starts in August
    let academicYearStartDate;
    if (yearInProgram === 1) {
      // Freshman year starts in October
      academicYearStartDate = new Date(cohortYear, 9, 1); // October 1st (month 9 = October in JS)
    } else {
      // Sophomore, Junior, Senior years start in August
      academicYearStartDate = new Date(startYear, 7, 1); // August 1st (month 7 = August in JS)
    }
    
    // If current date is before academic year start, no data yet
    if (currentDate < academicYearStartDate) {
      return false;
    }
    
    // HK1: October-February for Year 1, August-December for Year 2+
    // HK2: March-July for all years
    
    if (startYear < currentYear) {
      // Past year - always has data (if academic year has started)
      return true;
    } else if (startYear === currentYear) {
      // Current year - check term and month
      if (selectedTermNum === 1) {
        // HK1
        if (yearInProgram === 1) {
          // Year 1: HK1 starts in October
          return currentMonth >= 10;
        } else {
          // Year 2+: HK1 starts in August
          return currentMonth >= 8;
        }
      } else {
        // HK2: Starts in March for all years
        return currentMonth >= 3;
      }
    } else {
      // Future year - no data yet
      return false;
    }
  }, [selectedYear, selectedTerm, currentYear, currentMonth, classData]);

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Không tìm thấy lớp</h2>
          <button onClick={() => navigate('/classes')} className="mt-4 text-blue-600 hover:underline">
            Quay lại danh sách lớp
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = Math.round((classData.submittedAssignments / (classData.enrolledStudents * classData.totalAssignments)) * 100);

  // Generate mock students based on semester
  const students = useMemo(() => {
    // If semester is not available yet (future), return empty array
    if (!isSemesterAvailable) {
      return [];
    }
    
    // Create a seed based on semester to generate different data per semester
    const semesterSeed = `${selectedYear}-${selectedTerm}`;
    const seedHash = semesterSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return Array.from({ length: classData.enrolledStudents }, (_, i) => {
      // Use semester seed to generate consistent but different data per semester
      const studentSeed = (seedHash + i * 7) % 100;
      
      // Tạo phân bố thực tế hơn:
      // - 5% sinh viên điểm cao nhưng ít tham gia (GPA cao, progress thấp)
      // - 10% sinh viên yếu (progress < 40%)
      // - 30% sinh viên trung bình (40-70%)
      // - 55% sinh viên tốt (70-90%)
      let progress;
      let gpa;
      const rand = (studentSeed + i) % 100 / 100;
      
      if (rand < 0.05) {
        // 5% sinh viên điểm cao nhưng ít tham gia: GPA 8.0-9.5, Progress 20-49%
        progress = Math.floor((studentSeed * 3 + i * 5) % 30) + 20;
        gpa = ((studentSeed * 0.15 + i * 0.1) % 1.5 + 8.0).toFixed(1);
      } else if (rand < 0.15) {
        // 10% sinh viên yếu: progress 15-39%, GPA 4.0-7.0
        progress = Math.floor((studentSeed * 2.5 + i * 7) % 25) + 15;
        gpa = ((studentSeed * 0.3 + i * 0.2) % 3 + 4).toFixed(1);
      } else if (rand < 0.45) {
        // 30% sinh viên trung bình: progress 40-69%, GPA 5.5-8.0
        progress = Math.floor((studentSeed * 3 + i * 4) % 30) + 40;
        gpa = ((studentSeed * 0.25 + i * 0.15) % 2.5 + 5.5).toFixed(1);
      } else {
        // 55% sinh viên tốt: progress 70-95%, GPA 6.5-9.5
        progress = Math.floor((studentSeed * 2.6 + i * 3) % 26) + 70;
        gpa = ((studentSeed * 0.3 + i * 0.2) % 3 + 6.5).toFixed(1);
      }
      
      const assignmentsDone = Math.round((progress / 100) * classData.totalAssignments);
      
      const statuses = ['active', 'active', 'active', 'active', 'reserved', 'dropped'];
      const status = statuses[Math.floor((studentSeed + i * 3) % statuses.length)];
      
      // Weighted score: Combines progress and GPA
      // Formula: (progress * 0.6) + (gpa * 10 * 0.4)
      const weightedScore = (progress * 0.6) + (parseFloat(gpa) * 10 * 0.4);
      
      // Xếp loại học lực theo GPA (Đại học Lạc Hồng)
      const gpaValue = parseFloat(gpa);
      let ranking = "Yếu";
      if (gpaValue >= 9.0) ranking = "Xuất sắc";
      else if (gpaValue >= 8.0) ranking = "Giỏi";
      else if (gpaValue >= 7.0) ranking = "Khá";
      else if (gpaValue >= 6.0) ranking = "Trung bình Khá";
      else if (gpaValue >= 5.0) ranking = "Trung bình";
      
      return {
        id: i + 1,
        mssv: `${classData.cohort}${String(i + 1).padStart(3, '0')}`,
        name: `Sinh viên ${i + 1}`,
        status: status,
        progress: progress,
        assignmentsDone: assignmentsDone,
        gpa: gpaValue,
        ranking: ranking,
        weightedScore: Math.round(weightedScore * 10) / 10, // Round to 1 decimal
        semester: semesterSeed // Track which semester this data is for
      };
    });
  }, [classData, selectedYear, selectedTerm, isSemesterAvailable]);

  // Filter students
  const filteredStudents = useMemo(() => {
    let filtered = students.filter(student => {
      if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !student.mssv.includes(searchTerm)) {
        return false;
      }
      if (statusFilter !== 'all' && student.status !== statusFilter) {
        return false;
      }
      if (progressFilter === 'low' && student.progress >= 50) return false;
      if (progressFilter === 'medium' && (student.progress < 50 || student.progress >= 80)) return false;
      if (progressFilter === 'high' && student.progress < 80) return false;
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'mssv') {
        comparison = a.mssv.localeCompare(b.mssv);
      } else if (sortBy === 'name') {
        // Natural sort for names with numbers (Sinh viên 1, 2, 10, 11...)
        comparison = a.name.localeCompare(b.name, 'vi', { numeric: true, sensitivity: 'base' });
      } else if (sortBy === 'status') {
        // Sort order: active > reserved > dropped
        const statusOrder = { active: 1, reserved: 2, dropped: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === 'progress') {
        comparison = a.progress - b.progress;
      } else if (sortBy === 'gpa') {
        comparison = a.gpa - b.gpa;
      } else {
        // Default: name with natural sort
        comparison = a.name.localeCompare(b.name, 'vi', { numeric: true, sensitivity: 'base' });
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [students, searchTerm, statusFilter, progressFilter, sortBy, sortOrder]);

  // Insights
  const insights = useMemo(() => {
    const high = students.filter(s => s.progress >= 70).length;
    const medium = students.filter(s => s.progress >= 40 && s.progress < 70).length;
    const low = students.filter(s => s.progress < 40).length;
    
    // BƯỚC 1: FILTER - Chỉ lấy sinh viên đủ điều kiện
    // Sử dụng config từ localStorage
    const eligibleStudents = students.filter(s => s.progress >= config.minProgress && s.gpa >= config.minGPA);
    
    // BƯỚC 2: RANK - Sort theo tiêu chí từ config
    const rankingCriteria = config.rankingCriteria || 'gpa';
    
    const sortedEligible = [...eligibleStudents].sort((a, b) => {
      if (rankingCriteria === 'gpa') {
        return b.gpa - a.gpa; // GPA cao nhất trước
      } else {
        return b.progress - a.progress; // Progress cao nhất trước
      }
    });
    
    const topCount = config.topCount || 3;
    const top3 = sortedEligible.slice(0, topCount);
    
    // Bottom 3: Danh sách cần hỗ trợ
    // Sort theo mức độ nguy hiểm: Progress thấp nhất → GPA thấp nhất
    const sortedByDanger = [...students].sort((a, b) => {
      // Ưu tiên 1: Progress thấp hơn lên trước
      if (a.progress !== b.progress) {
        return a.progress - b.progress; // Tăng dần (thấp nhất lên đầu)
      }
      // Ưu tiên 2: Nếu progress bằng nhau, GPA thấp hơn lên trước
      return a.gpa - b.gpa; // Tăng dần (thấp nhất lên đầu)
    });
    const bottom3 = sortedByDanger.slice(0, 3);
    
    // Students with high GPA but low participation (GPA ≥8.0 AND Progress <50%)
    const warningGPA = config.warningGPA || 8.0;
    const warningProgress = config.warningProgress || 50;
    const highGpaLowProgress = students.filter(s => s.gpa >= warningGPA && s.progress < warningProgress);
    
    return { 
      high, 
      medium, 
      low, 
      top3, 
      bottom3, 
      highGpaLowProgress, 
      eligibleCount: eligibleStudents.length,
      allEligible: sortedEligible
    };
  }, [students, config]);

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Inject scrollbar styles */}
      <style>{scrollbarStyles}</style>
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Import/Export buttons - Top right */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Upload className="h-4 w-4" />
                Import Excel
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Download className="h-4 w-4" />
                Xuất danh sách
              </button>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/classes')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách lớp
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <GraduationCap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{classData.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Khóa {classData.cohort}</span>
                <span>•</span>
                <span>{classData.enrolledStudents} sinh viên</span>
                <span>•</span>
                <span className={classData.status === 'active' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}>
                  {classData.status === 'active' ? '🔵 Đang học' : '⚪ Đã kết thúc'}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tiến độ tổng của lớp</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Cố vấn: {classData.instructor} • {classData.totalAssignments} bài tập đã giao • {selectedYear} - {selectedTerm}
                </p>
              </div>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-white dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  overallProgress >= 75 ? 'bg-green-500' : 
                  overallProgress >= 50 ? 'bg-blue-500' : 
                  'bg-yellow-500'
                }`}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* No Data Banner for Future Semesters */}
        {!isSemesterAvailable && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📅</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Chưa có dữ liệu cho học kỳ này
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Năm học <span className="font-semibold">{selectedYear}</span> - <span className="font-semibold">{selectedTerm}</span> chưa diễn ra. 
                  Dữ liệu sẽ được cập nhật khi học kỳ bắt đầu.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                  💡 Vui lòng chọn học kỳ khác để xem dữ liệu
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Show content only if semester has data */}
        {isSemesterAvailable && (
          <>
        {/* Overall Class Assessment Banner */}
        {(() => {
          const totalStudents = students.length;
          const lowPercent = (insights.low / totalStudents) * 100;
          const highPercent = (insights.high / totalStudents) * 100;
          
          let alertConfig = null;
          
          if (lowPercent >= 30) {
            // Nhiều sinh viên yếu (≥30%)
            alertConfig = {
              icon: '🔴',
              bg: 'bg-red-50 dark:bg-red-900/20',
              border: 'border-red-200 dark:border-red-800',
              textColor: 'text-red-900 dark:text-red-100',
              title: 'Cần chú ý khẩn cấp',
              message: `${insights.low} sinh viên (${Math.round(lowPercent)}%) có tiến độ dưới 40%. Cần hỗ trợ ngay.`
            };
          } else if (lowPercent >= 15) {
            // Có một số sinh viên yếu (15-30%)
            alertConfig = {
              icon: '🟠',
              bg: 'bg-orange-50 dark:bg-orange-900/20',
              border: 'border-orange-200 dark:border-orange-800',
              textColor: 'text-orange-900 dark:text-orange-100',
              title: 'Cần theo dõi',
              message: `${insights.low} sinh viên (${Math.round(lowPercent)}%) có tiến độ dưới 40%. Nên hỗ trợ thêm.`
            };
          } else if (highPercent >= 60) {
            // Lớp tốt (≥60% sinh viên tốt)
            alertConfig = {
              icon: '🟢',
              bg: 'bg-green-50 dark:bg-green-900/20',
              border: 'border-green-200 dark:border-green-800',
              textColor: 'text-green-900 dark:text-green-100',
              title: 'Lớp đang học tốt',
              message: `${insights.high} sinh viên (${Math.round(highPercent)}%) có tiến độ trên 70%. Tiếp tục duy trì!`
            };
          } else if (highPercent >= 40) {
            // Lớp khá (40-60% sinh viên tốt)
            alertConfig = {
              icon: '🟡',
              bg: 'bg-yellow-50 dark:bg-yellow-900/20',
              border: 'border-yellow-200 dark:border-yellow-800',
              textColor: 'text-yellow-900 dark:text-yellow-100',
              title: 'Tiến độ lớp ở mức trung bình',
              message: `${insights.high} sinh viên tốt, ${insights.medium} sinh viên trung bình. Cần động viên thêm.`
            };
          } else {
            // Lớp yếu (< 40% sinh viên tốt)
            alertConfig = {
              icon: '🟡',
              bg: 'bg-yellow-50 dark:bg-yellow-900/20',
              border: 'border-yellow-200 dark:border-yellow-800',
              textColor: 'text-yellow-900 dark:text-yellow-100',
              title: 'Tiến độ lớp cần cải thiện',
              message: `Chỉ ${insights.high} sinh viên (${Math.round(highPercent)}%) đạt tiến độ tốt. Cần tăng cường hỗ trợ.`
            };
          }

          return alertConfig && (
            <div className={`${alertConfig.bg} border ${alertConfig.border} rounded-xl p-4 mb-6`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">{alertConfig.icon}</div>
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${alertConfig.textColor}`}>
                    {alertConfig.title}
                  </h3>
                  <p className={`text-sm ${alertConfig.textColor} mt-1 opacity-90`}>
                    {alertConfig.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tiến độ tốt (≥70%)</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{insights.high}</p>
              </div>
              <div className="text-3xl">🟢</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tiến độ trung bình (40-70%)</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{insights.medium}</p>
              </div>
              <div className="text-3xl">🟡</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cần hỗ trợ (&lt;40%)</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{insights.low}</p>
              </div>
              <div className="text-3xl">🔴</div>
            </div>
          </div>
        </div>

        {/* Top 3 & Bottom 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Top 3 */}
          <div className={`bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 transition-all ${isTopCardExpanded ? 'p-4' : 'p-3'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👍</span>
                <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">Sinh viên có tiến độ tốt nhất</h3>
              </div>
              <div className="flex items-center gap-2">
                {insights.eligibleCount > 0 && isTopCardExpanded && (
                  <button
                    onClick={() => setShowEligibleList(!showEligibleList)}
                    className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
                  >
                    {insights.eligibleCount} đủ điều kiện
                  </button>
                )}
                <button
                  onClick={() => setIsTopCardExpanded(!isTopCardExpanded)}
                  className="p-1 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 rounded transition-colors"
                  title={isTopCardExpanded ? "Thu gọn" : "Mở rộng"}
                >
                  {isTopCardExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {isTopCardExpanded && (
              <div className="mt-3">
                {/* Top N students */}
                {!showEligibleList && insights.top3.length > 0 && (
                  <div className="space-y-2">
                    {insights.top3.map((student, idx) => (
                      <div key={student.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400 flex-shrink-0">#{idx + 1}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">{student.progress}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">GPA: {student.gpa}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Empty state */}
                {!showEligibleList && insights.top3.length === 0 && insights.eligibleCount === 0 && (
                  <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
                    Chưa có sinh viên đạt tiêu chí xếp hạng
                  </div>
                )}
                
                {/* All eligible students (expanded) */}
                {showEligibleList && insights.allEligible.length > 0 && (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {insights.allEligible.map((student, idx) => (
                      <div key={student.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm font-bold text-green-600 dark:text-green-400 flex-shrink-0">#{idx + 1}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">{student.progress}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">GPA: {student.gpa}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom 3 */}
          <div className={`bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800 transition-all ${isBottomCardExpanded ? 'p-4' : 'p-3'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">Danh sách cần hỗ trợ</h3>
              </div>
              <button
                onClick={() => setIsBottomCardExpanded(!isBottomCardExpanded)}
                className="p-1 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded transition-colors"
                title={isBottomCardExpanded ? "Thu gọn" : "Mở rộng"}
              >
                {isBottomCardExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            {isBottomCardExpanded && (
              <div className="mt-3">
                {insights.bottom3.length > 0 ? (
                  <div className="space-y-2">
                    {insights.bottom3.map((student, idx) => (
                      <div key={student.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-lg font-bold text-red-600 dark:text-red-400 flex-shrink-0">#{idx + 1}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-sm font-bold text-red-600 dark:text-red-400">{student.progress}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">GPA: {student.gpa}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
                    Không có sinh viên nào cần hỗ trợ
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Warning: High GPA but Low Participation - Always show */}
        <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl transition-all ${isWarningCardExpanded ? 'p-4' : 'p-3'} mb-6`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚡</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                  Cảnh báo: Sinh viên có điểm cao nhưng mức độ tham gia thấp
                </h3>
                <button
                  onClick={() => setIsWarningCardExpanded(!isWarningCardExpanded)}
                  className="p-1 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded transition-colors flex-shrink-0"
                  title={isWarningCardExpanded ? "Thu gọn" : "Mở rộng"}
                >
                  {isWarningCardExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              
              {isWarningCardExpanded && (
                <div className="mt-2">
                  {insights.highGpaLowProgress.length > 0 ? (
                    <>
                      <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                        {insights.highGpaLowProgress.length} sinh viên có GPA ≥{config.warningGPA || 8.0} nhưng tiến độ &lt;{config.warningProgress || 50}%. Cần kiểm tra và động viên làm đủ bài tập.
                      </p>
                      <div className="space-y-2">
                        {insights.highGpaLowProgress.slice(0, 5).map((student) => (
                          <div key={student.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</span>
                              <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full flex-shrink-0">
                                ⚠️ Điểm cao / ít tham gia
                              </span>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                GPA: <span className="font-semibold text-green-600 dark:text-green-400">{student.gpa}</span>
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                Tiến độ: <span className="font-semibold text-amber-600 dark:text-amber-400">{student.progress}%</span>
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {student.assignmentsDone}/{classData.totalAssignments} bài
                              </div>
                            </div>
                          </div>
                        ))}
                        {insights.highGpaLowProgress.length > 5 && (
                          <p className="text-xs text-amber-700 dark:text-amber-300 text-center pt-1">
                            +{insights.highGpaLowProgress.length - 5} sinh viên khác
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
                      Không phát hiện bất thường
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo MSSV hoặc tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang học</option>
                <option value="reserved">Bảo lưu</option>
                <option value="dropped">Nghỉ học</option>
              </select>

              <select
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả tiến độ</option>
                <option value="high">≥80%</option>
                <option value="medium">40-80%</option>
                <option value="low">&lt;40%</option>
              </select>
              
              {/* Year and Term Selectors */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {academicYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Thêm sinh viên
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Đã chọn {selectedStudents.length} sinh viên
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                    Xuất danh sách
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    Xóa khỏi lớp
                  </button>
                  <button
                    onClick={() => setSelectedStudents([])}
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student Table - Stable Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          {/* Fixed height container with stable scrollbar */}
          <div className="overflow-x-auto overflow-y-auto scrollbar-gutter-stable" style={{ minHeight: '500px', maxHeight: '70vh' }}>
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700" style={{ tableLayout: 'fixed' }}>
              <thead className="bg-gray-50 dark:bg-gray-900/50 sticky top-0 z-10">
                <tr>
                  {/* Fixed width columns */}
                  <th className="px-6 py-3 text-left" style={{ width: '60px' }}>
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '120px' }}>
                    <button
                      onClick={() => {
                        if (sortBy === 'mssv') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('mssv');
                          setSortOrder('asc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                    >
                      <span className="truncate">MSSV</span>
                      <span className="flex-shrink-0 w-4">
                        {sortBy === 'mssv' && (
                          <span className="text-blue-600 dark:text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '200px' }}>
                    <button
                      onClick={() => {
                        if (sortBy === 'name') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('name');
                          setSortOrder('asc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                    >
                      <span className="truncate">Tên sinh viên</span>
                      <span className="flex-shrink-0 w-4">
                        {sortBy === 'name' && (
                          <span className="text-blue-600 dark:text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '140px' }}>
                    <button
                      onClick={() => {
                        if (sortBy === 'status') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('status');
                          setSortOrder('asc'); // Default: active first
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors mx-auto"
                    >
                      <span className="truncate">Trạng thái</span>
                      <span className="flex-shrink-0 w-4">
                        {sortBy === 'status' && (
                          <span className="text-blue-600 dark:text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '240px' }}>
                    <button
                      onClick={() => {
                        if (sortBy === 'progress') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('progress');
                          setSortOrder('desc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                    >
                      <span className="truncate">Tiến độ cá nhân</span>
                      <span className="flex-shrink-0 w-4">
                        {sortBy === 'progress' && (
                          <span className="text-blue-600 dark:text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '100px' }}>
                    <button
                      onClick={() => {
                        if (sortBy === 'gpa') {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('gpa');
                          setSortOrder('desc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors mx-auto"
                    >
                      <span className="truncate">Điểm TB</span>
                      <span className="flex-shrink-0 w-4">
                        {sortBy === 'gpa' && (
                          <span className="text-blue-600 dark:text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '140px' }}>
                    <div className="truncate">Xếp loại</div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ width: '140px' }}>
                    <div className="truncate">Hành động</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {filteredStudents.map((student) => {
                    const statusConfig = {
                      active: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Đang học' },
                      reserved: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Bảo lưu' },
                      dropped: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: 'Nghỉ học' }
                    };
                    const status = statusConfig[student.status] || statusConfig.active;

                    // Row background based on progress
                    let rowBgClass = 'hover:bg-gray-50 dark:hover:bg-gray-700/50';
                    if (student.progress < 40) {
                      rowBgClass = 'bg-red-50/50 dark:bg-red-900/10 hover:bg-red-100/70 dark:hover:bg-red-900/20';
                    } else if (student.progress < 70) {
                      rowBgClass = 'bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-100/70 dark:hover:bg-yellow-900/20';
                    } else {
                      rowBgClass = 'bg-green-50/30 dark:bg-green-900/10 hover:bg-green-100/50 dark:hover:bg-green-900/20';
                    }

                    return (
                      <tr key={student.id} className={`${rowBgClass} transition-colors group`} style={{ height: '73px' }}>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ width: '60px' }}>
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ width: '120px' }}>
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">
                            {student.mssv}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ width: '200px' }}>
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowStudentDetailModal(true);
                            }}
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline truncate block text-left w-full"
                          >
                            {student.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center" style={{ width: '140px' }}>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.text} truncate max-w-full`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4" style={{ width: '240px' }}>
                          <div className="flex items-center gap-3 group/progress">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative min-w-0">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  student.progress >= 70 ? 'bg-green-500' : 
                                  student.progress >= 40 ? 'bg-yellow-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              />
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {student.assignmentsDone} / {classData.totalAssignments} bài đã làm
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white flex-shrink-0" style={{ width: '45px' }}>
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center" style={{ width: '100px' }}>
                          <span className={`text-sm font-semibold ${
                            student.gpa >= 8 ? 'text-green-600 dark:text-green-400' :
                            student.gpa >= 7 ? 'text-blue-600 dark:text-blue-400' :
                            'text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {student.gpa}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center" style={{ width: '140px' }}>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                            student.ranking === 'Xuất sắc' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                            student.ranking === 'Giỏi' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            student.ranking === 'Khá' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                            student.ranking === 'Trung bình Khá' ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300' :
                            student.ranking === 'Trung bình' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          } truncate max-w-full`}>
                            {student.ranking}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right" style={{ width: '140px' }}>
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowStudentDetailModal(true);
                              }}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors flex-shrink-0"
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setStudentToEdit(student);
                                setShowEditStudentModal(true);
                              }}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors flex-shrink-0"
                              title="Sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setStudentToDelete(student);
                                setShowDeleteConfirmModal(true);
                              }}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Empty rows to maintain height when filtered */}
                  {filteredStudents.length < 10 && Array.from({ length: 10 - filteredStudents.length }).map((_, idx) => (
                    <tr key={`empty-${idx}`} style={{ height: '73px' }} className="bg-white dark:bg-gray-800">
                      <td colSpan="8" className="px-6 py-4"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            {/* Empty state overlay */}
            {filteredStudents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {students.length === 0 ? 'Chưa có sinh viên trong lớp' : 'Không tìm thấy sinh viên'}
                  </p>
                  {students.length === 0 && (
                    <button 
                      onClick={() => setShowAddStudentModal(true)}
                      className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Thêm sinh viên hoặc Import Excel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
        )}
      </div>

      {/* Student Detail Modal */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowStudentDetailModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Chi tiết sinh viên: {selectedStudent.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      MSSV: {selectedStudent.mssv} • Lớp: {classData.name}
                    </p>
                  </div>
                  <button onClick={() => setShowStudentDetailModal(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Year and Term Selectors */}
                <div className="flex items-center gap-3">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {academicYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {terms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                  
                  {!isSemesterAvailable && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                      Chưa có dữ liệu
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* No Data Message for Future Semesters */}
                {!isSemesterAvailable ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Chưa có dữ liệu cho học kỳ này
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Năm học <span className="font-semibold">{selectedYear}</span> - <span className="font-semibold">{selectedTerm}</span> chưa diễn ra.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      Vui lòng chọn học kỳ khác để xem dữ liệu
                    </p>
                  </div>
                ) : (
                  <>
                {/* Overall Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tiến độ tổng</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedStudent.progress}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Điểm TB</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedStudent.gpa}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Trạng thái</p>
                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {selectedStudent.status === 'active' ? 'Đang học' : selectedStudent.status === 'reserved' ? 'Bảo lưu' : 'Nghỉ học'}
                    </p>
                  </div>
                </div>

                {/* Progress by Subject */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">📊 Tiến độ theo môn học</h4>
                  <div className="space-y-3">
                    {(() => {
                      const currentYear = new Date().getFullYear();
                      const yearInProgram = currentYear - classData.cohort + 1;
                      
                      let subjects = [];
                      if (yearInProgram === 1) {
                        subjects = [
                          { name: 'Nhập môn lập trình', progress: Math.min(100, selectedStudent.progress + 10), score: (selectedStudent.gpa + 0.3).toFixed(1), assignments: { done: 8, total: 10 } },
                          { name: 'Toán rời rạc', progress: Math.max(0, selectedStudent.progress - 5), score: (selectedStudent.gpa - 0.2).toFixed(1), assignments: { done: 6, total: 8 } },
                          { name: 'Cấu trúc dữ liệu', progress: Math.max(0, selectedStudent.progress - 10), score: (selectedStudent.gpa - 0.4).toFixed(1), assignments: { done: 5, total: 9 } }
                        ];
                      } else if (yearInProgram === 2) {
                        subjects = [
                          { name: 'Lập trình hướng đối tượng', progress: Math.min(100, selectedStudent.progress + 8), score: (selectedStudent.gpa + 0.2).toFixed(1), assignments: { done: 9, total: 10 } },
                          { name: 'Cơ sở dữ liệu', progress: selectedStudent.progress, score: selectedStudent.gpa.toFixed(1), assignments: { done: 7, total: 10 } },
                          { name: 'Mạng máy tính', progress: Math.max(0, selectedStudent.progress - 8), score: (selectedStudent.gpa - 0.3).toFixed(1), assignments: { done: 6, total: 10 } }
                        ];
                      } else if (yearInProgram === 3) {
                        subjects = [
                          { name: 'Phát triển Web', progress: Math.min(100, selectedStudent.progress + 5), score: (selectedStudent.gpa + 0.1).toFixed(1), assignments: { done: 8, total: 9 } },
                          { name: 'Công nghệ phần mềm', progress: selectedStudent.progress, score: selectedStudent.gpa.toFixed(1), assignments: { done: 7, total: 10 } },
                          { name: 'Trí tuệ nhân tạo', progress: Math.max(0, selectedStudent.progress - 12), score: (selectedStudent.gpa - 0.5).toFixed(1), assignments: { done: 5, total: 11 } }
                        ];
                      } else {
                        subjects = [
                          { name: 'Đồ án tốt nghiệp', progress: selectedStudent.progress, score: selectedStudent.gpa.toFixed(1), assignments: { done: 3, total: 5 } },
                          { name: 'Thực tập doanh nghiệp', progress: Math.min(100, selectedStudent.progress + 8), score: (selectedStudent.gpa + 0.2).toFixed(1), assignments: { done: 4, total: 4 } },
                          { name: 'Chuyên đề nâng cao', progress: Math.max(0, selectedStudent.progress - 5), score: (selectedStudent.gpa - 0.1).toFixed(1), assignments: { done: 6, total: 8 } }
                        ];
                      }
                      
                      return subjects.map((subject, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {subject.name}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {subject.assignments.done}/{subject.assignments.total} bài đã làm • Điểm TB: {subject.score}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {subject.progress}%
                              </span>
                              {subject.progress < 50 && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                                  Yếu
                                </span>
                              )}
                              {subject.progress >= 50 && subject.progress < 75 && (
                                <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
                                  TB
                                </span>
                              )}
                              {subject.progress >= 75 && (
                                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                  Tốt
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                subject.progress >= 75 ? 'bg-green-500' : 
                                subject.progress >= 50 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Đề xuất hỗ trợ
                      </h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        {selectedStudent.progress < 40 && (
                          <>
                            <li>• Cần gặp gỡ và tư vấn cá nhân ngay</li>
                            <li>• Xem xét giảm tải học tập hoặc bảo lưu</li>
                            <li>• Kết nối với sinh viên giỏi để hỗ trợ</li>
                          </>
                        )}
                        {selectedStudent.progress >= 40 && selectedStudent.progress < 70 && (
                          <>
                            <li>• Tăng cường theo dõi tiến độ hàng tuần</li>
                            <li>• Khuyến khích tham gia nhóm học tập</li>
                            <li>• Cung cấp tài liệu bổ trợ cho môn yếu</li>
                          </>
                        )}
                        {selectedStudent.progress >= 70 && (
                          <>
                            <li>• Tiếp tục duy trì động lực học tập</li>
                            <li>• Khuyến khích tham gia dự án nâng cao</li>
                            <li>• Có thể làm mentor cho sinh viên khác</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowStudentDetailModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowEmailSentModal(true);
                    // Simulate sending email
                    setTimeout(() => {
                      // Email sent successfully
                    }, 1000);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Gửi email nhắc nhở
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowAddStudentModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Thêm sinh viên vào lớp
                </h3>
                <button onClick={() => setShowAddStudentModal(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                alert('Chức năng thêm sinh viên sẽ được triển khai với backend');
                setShowAddStudentModal(false);
              }} className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    MSSV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 2026001"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Ví dụ: student@university.edu.vn"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0901234567"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trạng thái
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Đang học</option>
                    <option value="reserved">Bảo lưu</option>
                    <option value="dropped">Nghỉ học</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowAddStudentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Thêm sinh viên
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditStudentModal && studentToEdit && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowEditStudentModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sửa thông tin sinh viên
                </h3>
                <button onClick={() => setShowEditStudentModal(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Chức năng sửa thông tin sinh viên sẽ được triển khai với backend');
                setShowEditStudentModal(false);
              }} className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    MSSV
                  </label>
                  <input
                    type="text"
                    defaultValue={studentToEdit.mssv}
                    disabled
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">MSSV không thể thay đổi</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={studentToEdit.name}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="student@university.edu.vn"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0901234567"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trạng thái
                  </label>
                  <select
                    defaultValue={studentToEdit.status}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Đang học</option>
                    <option value="reserved">Bảo lưu</option>
                    <option value="dropped">Nghỉ học</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowEditStudentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && studentToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowDeleteConfirmModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Xác nhận xóa sinh viên
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Bạn có chắc chắn muốn xóa sinh viên <span className="font-semibold text-gray-900 dark:text-white">{studentToDelete.name}</span> (MSSV: {studentToDelete.mssv}) khỏi lớp?
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-xs text-amber-800 dark:text-amber-200">
                        ⚠️ Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến sinh viên trong lớp này sẽ bị xóa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowDeleteConfirmModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert(`Đã xóa sinh viên ${studentToDelete.name} khỏi lớp. Chức năng sẽ được triển khai với backend.`);
                    setShowDeleteConfirmModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa sinh viên
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Sent Success Modal */}
      {showEmailSentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowEmailSentModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-6 py-6">
                <div className="flex flex-col items-center text-center">
                  {/* Success Icon with Animation */}
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Email đã được gửi!
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Email nhắc nhở đã được gửi thành công đến sinh viên
                  </p>

                  {/* Student Info Card */}
                  <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-4 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedStudent.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          MSSV: {selectedStudent.mssv}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Tiến độ hiện tại:</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedStudent.progress}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Điểm TB:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{selectedStudent.gpa}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Xếp loại:</span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">{selectedStudent.ranking}</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Content Preview */}
                  <div className="w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4 text-left">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📧 Nội dung email:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>✓ Báo cáo tiến độ học tập</li>
                      <li>✓ Các môn cần cải thiện</li>
                      <li>✓ Đề xuất hỗ trợ từ cố vấn</li>
                      <li>✓ Lịch hẹn tư vấn (nếu cần)</li>
                    </ul>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    💡 Sinh viên sẽ nhận được email trong vài phút tới
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowEmailSentModal(false)}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetailManagement;
