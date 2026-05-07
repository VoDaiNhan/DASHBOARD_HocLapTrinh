import { useState, useEffect } from 'react';
import { BarChart3, Users, BookOpen, TrendingUp, RefreshCw, X, Clock, CheckCircle } from 'lucide-react';
import { getCourseStatistics, getActiveExercisesInSemester, CURRENT_SEMESTER } from '../integration';

const CourseStatsDashboard = ({ courseName, exerciseBank, onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      
      // Lấy thống kê tổng quan môn học
      const courseStats = getCourseStatistics(courseName);
      
      // Lấy danh sách bài tập đang active
      const activeExercises = getActiveExercisesInSemester();
      
      // Phân tích chi tiết từ exercise bank
      const course = exerciseBank[courseName];
      let totalExercises = 0;
      let activeCount = 0;
      let chapterStats = [];
      
      if (course && course.chapters) {
        course.chapters.forEach(chapter => {
          let chapterTotal = 0;
          let chapterActive = 0;
          
          ['basic', 'advanced'].forEach(level => {
            if (chapter[level]) {
              const exercises = chapter[level];
              chapterTotal += exercises.length;
              totalExercises += exercises.length;
              
              exercises.forEach(ex => {
                if (ex.code && activeExercises.includes(ex.code)) {
                  chapterActive++;
                  activeCount++;
                }
              });
            }
          });
          
          chapterStats.push({
            id: chapter.id,
            title: chapter.title,
            total: chapterTotal,
            active: chapterActive,
            usage: chapterTotal > 0 ? ((chapterActive / chapterTotal) * 100).toFixed(1) : 0
          });
        });
      }
      
      setStats({
        ...courseStats,
        totalExercises,
        activeCount,
        chapterStats,
        usageRate: totalExercises > 0 ? ((activeCount / totalExercises) * 100).toFixed(1) : 0
      });
      
    } catch (error) {
      console.error('Error loading course statistics:', error);
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
  }, [courseName]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Đang tải thống kê môn học...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Thống kê môn học: {courseName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {CURRENT_SEMESTER.name}
            </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalClasses}</p>
                  <p className="text-sm text-blue-600/70">Lớp học</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.totalStudents}</p>
                  <p className="text-sm text-green-600/70">Sinh viên</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.activeCount}/{stats.totalExercises}</p>
                  <p className="text-sm text-orange-600/70">Bài tập đang dùng</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{stats.averageCompletion}%</p>
                  <p className="text-sm text-purple-600/70">Hoàn thành TB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tổng quan sử dụng bài tập
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.usageRate}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Tỷ lệ sử dụng</div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.usageRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Bài đang sử dụng</div>
                <div className="text-xs text-gray-500 mt-1">
                  Trong tổng số {stats.totalExercises} bài
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalExercises - stats.activeCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Bài chưa sử dụng</div>
                <div className="text-xs text-gray-500 mt-1">
                  Có thể giao thêm
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Thống kê theo chương
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      Chương
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Tổng bài tập
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Đang sử dụng
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Tỷ lệ hoàn thành
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {stats.chapterStats.map((chapter) => (
                    <tr key={chapter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {chapter.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {chapter.total}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-blue-600">
                          {chapter.active}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-medium ${
                          chapter.usage >= 70 ? 'text-green-600' :
                          chapter.usage >= 40 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {chapter.usage}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                chapter.usage >= 70 ? 'bg-green-500' :
                                chapter.usage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${chapter.usage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              💡 Gợi ý cải thiện
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              {stats.usageRate < 50 && (
                <li>• Tỷ lệ sử dụng bài tập còn thấp ({stats.usageRate}%), có thể giao thêm bài tập cho sinh viên</li>
              )}
              {stats.averageCompletion < 70 && (
                <li>• Tỷ lệ hoàn thành trung bình thấp ({stats.averageCompletion}%), cần xem xét độ khó của bài tập</li>
              )}
              {stats.chapterStats.some(ch => ch.usage === 0) && (
                <li>• Có chương chưa giao bài tập nào, cần cân bằng lại chương trình học</li>
              )}
              {stats.totalClasses === 0 && (
                <li>• Môn học này chưa có lớp nào trong học kỳ hiện tại</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStatsDashboard;