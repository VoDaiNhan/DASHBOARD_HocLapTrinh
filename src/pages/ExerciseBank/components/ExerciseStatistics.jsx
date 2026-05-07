import { useState, useEffect } from 'react';
import { BarChart3, Users, CheckCircle, Clock, TrendingUp, RefreshCw, X } from 'lucide-react';
import { getExerciseStatistics, LMS_API } from '../integration';

const ExerciseStatistics = ({ exerciseCode, exerciseTitle, onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(null); // null or {type: 'onTime'|'late'|'resubmissions'|'notSubmitted', students: []}

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const exerciseStats = getExerciseStatistics(exerciseCode);
      setStats(exerciseStats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStatistics();
    setRefreshing(false);
  };

  useEffect(() => {
    loadStatistics();
  }, [exerciseCode]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Đang tải thống kê...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!stats || !stats.isActive) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thống kê bài tập
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              Bài tập này chưa được giao cho lớp nào trong học kỳ hiện tại
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Mã bài tập: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{exerciseCode}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { statistics, usingClasses, totalStudents } = stats;
  
  // Mock data cho số lần nộp lại - trong thực tế sẽ lấy từ API
  const resubmissionCount = statistics.resubmissions || 8; // Số sinh viên nộp lại bài
  
  // Lấy ngưỡng hoàn thành từ settings (mock - trong thực tế lấy từ context/settings)
  const completionThreshold = 70; // 70%
  const isUnderThreshold = statistics.completionRate < completionThreshold;
  
  // Mock data chi tiết sinh viên theo từng loại
  const getStudentsByType = (type) => {
    const allSubmissions = stats.submissions || [];
    
    switch(type) {
      case 'onTime':
        return allSubmissions.filter(s => s.status === 'completed' && !s.isLate).slice(0, statistics.onTime);
      case 'late':
        return allSubmissions.filter(s => s.status === 'completed' && s.isLate).slice(0, statistics.late);
      case 'resubmissions':
        // Mock: sinh viên nộp lại nhiều lần
        return [
          { studentId: 'SV003', studentName: 'Lê Văn Cường', resubmitCount: 3, lastSubmit: '2024-09-22 14:30' },
          { studentId: 'SV007', studentName: 'Nguyễn Thị Giang', resubmitCount: 2, lastSubmit: '2024-09-21 16:45' },
          { studentId: 'SV012', studentName: 'Trần Văn Hùng', resubmitCount: 4, lastSubmit: '2024-09-23 09:15' },
          { studentId: 'SV018', studentName: 'Phạm Thị Lan', resubmitCount: 2, lastSubmit: '2024-09-20 11:20' },
          { studentId: 'SV025', studentName: 'Hoàng Văn Minh', resubmitCount: 3, lastSubmit: '2024-09-22 18:00' },
          { studentId: 'SV031', studentName: 'Đỗ Thị Nga', resubmitCount: 2, lastSubmit: '2024-09-21 13:30' },
          { studentId: 'SV036', studentName: 'Vũ Văn Phong', resubmitCount: 5, lastSubmit: '2024-09-23 15:45' },
          { studentId: 'SV042', studentName: 'Bùi Thị Quỳnh', resubmitCount: 2, lastSubmit: '2024-09-22 10:10' },
        ];
      case 'notSubmitted':
        return allSubmissions.filter(s => s.status === 'not_submitted' || !s.submittedAt).slice(0, statistics.notSubmitted);
      default:
        return [];
    }
  };
  
  const handleShowDetail = (type) => {
    const students = getStudentsByType(type);
    setShowDetailModal({ type, students });
  };
  
  const getDetailTitle = (type) => {
    switch(type) {
      case 'onTime': return 'Danh sách sinh viên nộp đúng hạn';
      case 'late': return 'Danh sách sinh viên nộp trễ';
      case 'resubmissions': return 'Danh sách sinh viên nộp lại bài';
      case 'notSubmitted': return 'Danh sách sinh viên chưa nộp';
      default: return 'Danh sách sinh viên';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Thống kê bài tập
            </h3>
            <p className="text-sm text-gray-500 mt-1">{exerciseTitle}</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-1 inline-block">
              {exerciseCode}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{statistics.submitted}</p>
                  <p className="text-sm text-blue-600/70">Học sinh đã làm</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{statistics.submitted}/{totalStudents}</p>
                  <p className="text-sm text-green-600/70">Số học sinh hoàn thành</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{statistics.correctSubmissions || statistics.onTime}</p>
                  <p className="text-sm text-purple-600/70">Số lượng bài làm đúng</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">25 phút</p>
                  <p className="text-sm text-orange-600/70">TB thời gian</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className={`rounded-lg p-4 ${
            isUnderThreshold 
              ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700' 
              : 'bg-gray-50 dark:bg-gray-700/50'
          }`}>
            <h4 className={`font-semibold mb-3 ${
              isUnderThreshold 
                ? 'text-red-900 dark:text-red-200' 
                : 'text-gray-900 dark:text-white'
            }`}>
              Chi tiết nộp bài
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => handleShowDetail('onTime')}
                className="w-full flex justify-between items-center hover:bg-white/50 dark:hover:bg-gray-600/30 rounded px-2 py-1 transition-colors cursor-pointer"
              >
                <span className={`text-sm ${
                  isUnderThreshold 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>Đã nộp đúng hạn:</span>
                <span className="font-medium text-green-600 hover:underline">{statistics.onTime}</span>
              </button>
              <button
                onClick={() => handleShowDetail('late')}
                className="w-full flex justify-between items-center hover:bg-white/50 dark:hover:bg-gray-600/30 rounded px-2 py-1 transition-colors cursor-pointer"
              >
                <span className={`text-sm ${
                  isUnderThreshold 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>Nộp trễ:</span>
                <span className="font-medium text-orange-600 hover:underline">{statistics.late}</span>
              </button>
              <button
                onClick={() => handleShowDetail('resubmissions')}
                className="w-full flex justify-between items-center hover:bg-white/50 dark:hover:bg-gray-600/30 rounded px-2 py-1 transition-colors cursor-pointer"
              >
                <span className={`text-sm ${
                  isUnderThreshold 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>Số sinh viên nộp lại bài:</span>
                <span className="font-medium text-yellow-600 hover:underline">{resubmissionCount}</span>
              </button>
              <button
                onClick={() => handleShowDetail('notSubmitted')}
                className="w-full flex justify-between items-center hover:bg-white/50 dark:hover:bg-gray-600/30 rounded px-2 py-1 transition-colors cursor-pointer"
              >
                <span className={`text-sm ${
                  isUnderThreshold 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>Chưa nộp:</span>
                <span className="font-medium text-red-600 hover:underline">{statistics.notSubmitted}</span>
              </button>
              <hr className={`${
                isUnderThreshold 
                  ? 'border-red-300 dark:border-red-700' 
                  : 'border-gray-300 dark:border-gray-600'
              }`} />
              <div className="flex justify-between items-center px-2 py-1">
                <span className={`text-sm font-medium ${
                  isUnderThreshold 
                    ? 'text-red-900 dark:text-red-200' 
                    : 'text-gray-900 dark:text-white'
                }`}>Tổng cộng:</span>
                <span className={`font-bold ${
                  isUnderThreshold 
                    ? 'text-red-900 dark:text-red-200' 
                    : 'text-gray-900 dark:text-white'
                }`}>{totalStudents}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className={`flex justify-between text-xs mb-1 ${
                isUnderThreshold 
                  ? 'text-red-700 dark:text-red-300' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                <span>Tiến độ hoàn thành</span>
                <span>{statistics.submitted}/{totalStudents}</span>
              </div>
              <div className={`w-full rounded-full h-2 ${
                isUnderThreshold 
                  ? 'bg-red-200 dark:bg-red-800' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isUnderThreshold 
                      ? 'bg-red-600' 
                      : 'bg-blue-600'
                  }`}
                  style={{ width: `${statistics.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            {/* Warning Message */}
            {isUnderThreshold && (
              <div className="mt-4 flex items-start gap-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-3">
                <span className="text-red-600 text-lg flex-shrink-0">⚠️</span>
                <div className="text-sm text-red-800 dark:text-red-200">
                  <p className="font-semibold mb-1">Cảnh báo: Không đạt chỉ tiêu</p>
                  <p>
                    Tỷ lệ hoàn thành hiện tại ({statistics.completionRate}%) thấp hơn chỉ tiêu đề ra ({completionThreshold}%). 
                    Cần có biện pháp hỗ trợ sinh viên hoặc xem xét lại độ khó của bài tập.
                  </p>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
      
      {/* Student Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getDetailTitle(showDetailModal.type)}
              </h4>
              <button
                onClick={() => setShowDetailModal(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {showDetailModal.students.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Không có dữ liệu
                </div>
              ) : (
                <div className="space-y-2">
                  {showDetailModal.type === 'resubmissions' ? (
                    // Special layout for resubmissions
                    showDetailModal.students.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-300 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{student.studentName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{student.studentId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                            {student.resubmitCount} lần nộp lại
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Lần cuối: {student.lastSubmit}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Standard layout for other types
                    showDetailModal.students.map((student, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                          showDetailModal.type === 'onTime' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          showDetailModal.type === 'late' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{student.studentName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{student.studentId}</p>
                        </div>
                        {student.submittedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(student.submittedAt).toLocaleString('vi-VN')}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tổng số: <span className="font-semibold text-gray-900 dark:text-white">{showDetailModal.students.length}</span> sinh viên
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseStatistics;