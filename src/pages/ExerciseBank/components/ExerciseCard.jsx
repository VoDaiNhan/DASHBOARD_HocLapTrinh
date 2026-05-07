import { useState } from 'react';
import { 
  Tag, 
  Trash2, 
  BarChart3, 
  Settings, 
  Users, 
  Clock, 
  TrendingUp,
  Play
} from 'lucide-react';
import DrillPanel from './DrillPanel';
import DifficultyAnalytics from './DifficultyAnalytics';
import VersionManagement from './VersionManagement';
import ExerciseStatistics from './ExerciseStatistics';
import { calculateSmartDifficulty, getDifficultyColors, getDifficultyLabel } from '../analytics';
import { hasPendingVersion } from '../versioning';
import { getExerciseStatistics } from '../integration';

const ExerciseCard = ({ 
  exercise, 
  lk, 
  chapterId, 
  chapterTitle, 
  courseKey, 
  exerciseBank, 
  currentUserRole = 'teacher',
  onDelete, 
  onUpdate, 
  onToggleActiveSemester,
  showActiveSemesterToggle = false,
  searchTerm 
}) => {
  const [showDrills, setShowDrills] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVersionManagement, setShowVersionManagement] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  
  // Tính toán độ khó thông minh
  const difficultyData = calculateSmartDifficulty(exercise.id);
  const difficultyColors = getDifficultyColors(difficultyData.level);
  
  // Kiểm tra có version pending không
  const hasPending = hasPendingVersion(exercise.id);
  
  // Kiểm tra bài tập có đang được sử dụng không và lấy thống kê
  const exerciseStats = exercise.code ? getExerciseStatistics(exercise.code) : null;
  const isActiveInSemester = exerciseStats?.isActive || false;
  
  // Mock statistics cho demo - trong thực tế sẽ lấy từ exerciseStats
  const mockStats = isActiveInSemester ? {
    totalStudents: exerciseStats?.totalStudents || 45,
    completedStudents: exerciseStats?.statistics?.submitted || 38,
    completionRate: exerciseStats?.statistics?.completionRate || 84.4,
    averageTime: '25 phút' // Thời gian làm trung bình
  } : null;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa bài tập "${exercise.title}"?`)) {
      onDelete(courseKey, chapterId, lk, exercise.id);
    }
  };

  const handleAnalytics = (e) => {
    e.stopPropagation();
    setShowAnalytics(true);
  };

  const handleVersionManagement = (e) => {
    e.stopPropagation();
    setShowVersionManagement(true);
  };

  const handleStatistics = (e) => {
    e.stopPropagation();
    setShowStatistics(true);
  };

  const handleToggleSemester = (e) => {
    e.stopPropagation();
    if (onToggleActiveSemester) {
      onToggleActiveSemester(courseKey, chapterId, lk, exercise.id);
    }
  };

  const handleStartDrill = () => {
    setShowDrills(true);
  };

  // Highlight search term
  const highlightText = (text, term) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group ${
        isActiveInSemester 
          ? 'ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800' 
          : 'border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
      }`}>
        {/* Card Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {highlightText(exercise.title, searchTerm)}
                </h4>
                
                {/* Active Semester Indicator */}
                {isActiveInSemester && (
                  <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" 
                       title="Đang sử dụng trong học kỳ này"></div>
                )}
              </div>
              
              {/* Exercise Code */}
              {exercise.code && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-mono bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded">
                    {exercise.code}
                  </span>
                  
                  {/* Smart Difficulty Badge */}
                  {difficultyData.level !== 'unknown' && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors.badge}`}>
                      {getDifficultyLabel(difficultyData.level)}
                    </span>
                  )}
                </div>
              )}
              
              {/* Goal */}
              {exercise.goal && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {highlightText(exercise.goal, searchTerm)}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 ml-2">
              {/* Statistics Button */}
              {exercise.code && isActiveInSemester && (
                <button
                  onClick={handleStatistics}
                  className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Xem thống kê sinh viên"
                >
                  <Users className="h-4 w-4 text-green-600" />
                </button>
              )}

              {/* Analytics Button */}
              <button
                onClick={handleAnalytics}
                className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Phân tích độ khó"
              >
                <BarChart3 className="h-4 w-4 text-blue-500" />
              </button>

              {/* Version Management Button */}
              <button
                onClick={handleVersionManagement}
                className={`p-1.5 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100 ${
                  hasPending ? 'opacity-100' : ''
                }`}
                title={hasPending ? 'Có version chờ duyệt' : 'Quản lý phiên bản'}
              >
                <Settings className={`h-4 w-4 ${hasPending ? 'text-yellow-500' : 'text-purple-500'}`} />
              </button>

              {/* Delete Button */}
              {currentUserRole === 'manager' && (
                <button
                  onClick={handleDelete}
                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Xóa bài tập"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          {exercise.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {exercise.tags.slice(0, 3).map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                  <Tag className="h-2.5 w-2.5"/>
                  {tag}
                </span>
              ))}
              {exercise.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded-full">
                  +{exercise.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Statistics Section - Chỉ hiển thị khi bài tập đang được sử dụng */}
        {isActiveInSemester && mockStats && (
          <div className="px-4 pb-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-700 dark:text-green-300 font-medium">📊 Thống kê học kỳ</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  {mockStats.completedStudents}/{mockStats.totalStudents} hoàn thành
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                    <Users className="h-3 w-3" />
                    <span className="font-semibold">{mockStats.completedStudents}</span>
                  </div>
                  <div className="text-green-700 dark:text-green-300">đã làm</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-semibold">{mockStats.completedStudents}/{mockStats.totalStudents}</span>
                  </div>
                  <div className="text-green-700 dark:text-green-300">hoàn thành</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                    <Clock className="h-3 w-3" />
                    <span className="font-semibold">{mockStats.averageTime}</span>
                  </div>
                  <div className="text-green-700 dark:text-green-300">TB thời gian</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${mockStats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Card Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={handleStartDrill}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              isActiveInSemester
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Play className="h-4 w-4" />
            Các bài tập
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {hasPending && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
              Chờ duyệt
            </span>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDrills && (
        <DrillPanel 
          ex={exercise} 
          chapterId={chapterId} 
          courseKey={courseKey} 
          lk={lk} 
          onClose={() => setShowDrills(false)} 
        />
      )}
      
      {showAnalytics && (
        <DifficultyAnalytics
          exerciseId={exercise.id}
          onClose={() => setShowAnalytics(false)}
        />
      )}
      
      {showVersionManagement && (
        <VersionManagement
          exerciseId={exercise.id}
          onClose={() => setShowVersionManagement(false)}
          currentUserRole={currentUserRole}
        />
      )}
      
      {showStatistics && exercise.code && (
        <ExerciseStatistics
          exerciseCode={exercise.code}
          exerciseTitle={exercise.title}
          onClose={() => setShowStatistics(false)}
        />
      )}
    </>
  );
};

export default ExerciseCard;