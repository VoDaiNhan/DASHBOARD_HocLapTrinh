import { useState, useMemo } from 'react';
import { CheckCircle, Clock, User, BookOpen, ChevronRight, Filter, Search } from 'lucide-react';
import { LEVELS } from '../constants';
import { getLevelColors } from '../utils';
import PendingExerciseModal from './PendingExerciseModal';

const ApprovalPanel = ({ pendingExercises, onApprove, onFeedback, onClose }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('');

  // Get unique courses and teachers for filters
  const { courses, teachers } = useMemo(() => {
    const courseSet = new Set();
    const teacherSet = new Set();
    
    pendingExercises.forEach(ex => {
      courseSet.add(ex.courseName);
      teacherSet.add(ex.teacherName);
    });
    
    return {
      courses: Array.from(courseSet).sort(),
      teachers: Array.from(teacherSet).sort()
    };
  }, [pendingExercises]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return pendingExercises.filter(ex => {
      const matchesSearch = !searchTerm || 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.courseName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = !filterCourse || ex.courseName === filterCourse;
      const matchesTeacher = !filterTeacher || ex.teacherName === filterTeacher;
      
      return matchesSearch && matchesCourse && matchesTeacher;
    });
  }, [pendingExercises, searchTerm, filterCourse, filterTeacher]);

  // Group by course
  const groupedExercises = useMemo(() => {
    const groups = {};
    filteredExercises.forEach(ex => {
      if (!groups[ex.courseName]) {
        groups[ex.courseName] = [];
      }
      groups[ex.courseName].push(ex);
    });
    return groups;
  }, [filteredExercises]);

  const handleApprove = (exerciseId) => {
    onApprove(exerciseId);
    setSelectedExercise(null);
  };

  const handleFeedback = (exerciseId, feedback) => {
    onFeedback(exerciseId, feedback);
    setSelectedExercise(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCourse('');
    setFilterTeacher('');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Phê duyệt bài tập</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pendingExercises.length} bài tập chờ phê duyệt
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-gray-500 text-xl leading-none">×</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm bài tập, giáo viên..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Course Filter */}
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả môn học</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              {/* Teacher Filter */}
              <select
                value={filterTeacher}
                onChange={(e) => setFilterTeacher(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả giáo viên</option>
                {teachers.map(teacher => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(searchTerm || filterCourse || filterTeacher) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredExercises.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {pendingExercises.length === 0 ? 'Không có bài tập chờ phê duyệt' : 'Không tìm thấy kết quả'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {pendingExercises.length === 0 
                    ? 'Tất cả bài tập đã được xử lý'
                    : 'Thử thay đổi bộ lọc để xem thêm kết quả'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedExercises).map(([courseName, exercises]) => (
                  <div key={courseName} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {/* Course Header */}
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{courseName}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium rounded-full">
                          {exercises.length} bài
                        </span>
                      </div>
                    </div>

                    {/* Exercises List */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {exercises.map(exercise => {
                        const levelInfo = LEVELS.find(l => l.key === exercise.level);
                        const levelColors = getLevelColors(exercise.level);
                        
                        return (
                          <button
                            key={exercise.id}
                            onClick={() => setSelectedExercise(exercise)}
                            className="w-full px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {exercise.teacherName}
                                  </span>
                                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors.badge}`}>
                                    {levelInfo?.label}
                                  </span>
                                </div>
                                
                                <h4 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {exercise.title}
                                </h4>
                                
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {exercise.chapterTitle}
                                </p>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    Gửi {new Date(exercise.submittedAt).toLocaleDateString('vi-VN')}
                                  </span>
                                  {exercise.tags && exercise.tags.length > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{exercise.tags.length} tags</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <PendingExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onApprove={handleApprove}
          onFeedback={handleFeedback}
        />
      )}
    </>
  );
};

export default ApprovalPanel;