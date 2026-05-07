import { useState } from 'react';
import { Tag, Trash2, BarChart3, History, TrendingUp, Edit3, Settings, CheckCircle2, Circle, Users } from 'lucide-react';
import DrillPanel from './DrillPanel';
import DifficultyAnalytics from './DifficultyAnalytics';
import VersionManagement from './VersionManagement';
import EditExerciseForm from './EditExerciseForm';
import ExerciseStatistics from './ExerciseStatistics';
import { calculateSmartDifficulty, getDifficultyColors, getDifficultyLabel } from '../analytics';
import { hasPendingVersion } from '../versioning';
import { getExerciseStatistics } from '../integration';

const ExerciseItem = ({ 
  ex, 
  lk, 
  chapterId, 
  courseKey, 
  chapterTitle, 
  onDelete, 
  onUpdate, 
  onToggleActiveSemester,
  showActiveSemesterToggle = false,
  searchTerm, 
  exerciseBank, 
  currentUserRole = 'teacher' 
}) => {
  const [showDrills, setShowDrills] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showVersionManagement, setShowVersionManagement] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const isAdv = lk === 'advanced';
  
  // Tính toán độ khó thông minh
  const difficultyData = calculateSmartDifficulty(ex.id);
  const difficultyColors = getDifficultyColors(difficultyData.level);
  
  // Kiểm tra có version pending không
  const hasPending = hasPendingVersion(ex.id);
  
  // Kiểm tra bài tập có đang được sử dụng không
  const exerciseStats = ex.code ? getExerciseStatistics(ex.code) : null;
  const isActiveInSemester = exerciseStats?.isActive || false;
  
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa bài tập "${ex.title}"?`)) {
      onDelete(courseKey, chapterId, lk, ex.id);
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

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditForm(true);
  };

  const handleToggleSemester = (e) => {
    e.stopPropagation();
    if (onToggleActiveSemester) {
      onToggleActiveSemester(courseKey, chapterId, lk, ex.id);
    }
  };

  const handleStatistics = (e) => {
    e.stopPropagation();
    setShowStatistics(true);
  };

  const handleSaveEdit = (exerciseId, newVersion) => {
    // Trong thực tế sẽ gọi API để lưu version mới
    console.log(`Created new version for exercise ${exerciseId}:`, newVersion);
    if (onUpdate) {
      onUpdate(exerciseId, newVersion);
    }
  };

  const handleRollback = (version) => {
    // Trong thực tế sẽ gọi API để rollback
    console.log(`Rollback exercise ${ex.id} to version ${version}`);
    setShowVersionManagement(false);
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
      <div
        onClick={() => setShowDrills(true)}
        className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {highlightText(ex.title, searchTerm)}
              </p>
              
              {/* Question Code Badge */}
              {ex.code && (
                <span className="px-2 py-0.5 text-xs font-mono bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded border">
                  {ex.code}
                </span>
              )}
              
              {/* Smart Difficulty Badge */}
              {difficultyData.level !== 'unknown' && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${difficultyColors.badge}`}>
                  {getDifficultyLabel(difficultyData.level)}
                </span>
              )}
              
              {/* Pending Version Badge */}
              {hasPending && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Chờ duyệt
                </span>
              )}
              
              {/* Active in Semester Badge */}
              {isActiveInSemester && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  Đang dùng HK
                </span>
              )}
            </div>
            
            {ex.goal && (
              <p className="text-xs italic text-gray-400 mt-0.5">
                {highlightText(ex.goal, searchTerm)}
              </p>
            )}
            {ex.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {ex.tags.map(t => (
                  <span key={t} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded-full">
                    <Tag className="h-2.5 w-2.5"/>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Active Semester Toggle */}
            {showActiveSemesterToggle && (
              <button
                onClick={handleToggleSemester}
                className={`p-1 rounded-md transition-colors ${
                  ex.activeSemester 
                    ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30' 
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={ex.activeSemester ? 'Đang sử dụng học kỳ này' : 'Đánh dấu cho học kỳ này'}
              >
                {ex.activeSemester ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
            )}
            
            {/* Statistics Button - Chỉ hiển thị nếu có code và đang được sử dụng */}
            {ex.code && isActiveInSemester && (
              <button
                onClick={handleStatistics}
                className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Xem thống kê sinh viên"
              >
                <Users className="h-3.5 w-3.5 text-green-600" />
              </button>
            )}
            
            {/* Edit Button - Tạm thời disable */}
            {currentUserRole === 'teacher' && false && (
              <button
                onClick={handleEdit}
                className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Chỉnh sửa bài tập (Đang phát triển)"
              >
                <Edit3 className="h-3.5 w-3.5 text-gray-400" />
              </button>
            )}
            
            {/* Analytics Button */}
            <button
              onClick={handleAnalytics}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              title="Phân tích độ khó"
            >
              <BarChart3 className="h-3.5 w-3.5 text-blue-500" />
            </button>
            
            {/* Version Management Button */}
            <button
              onClick={handleVersionManagement}
              className={`p-1 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100 ${
                hasPending ? 'opacity-100' : ''
              }`}
              title={hasPending ? 'Có version chờ duyệt' : 'Quản lý phiên bản'}
            >
              <Settings className={`h-3.5 w-3.5 ${hasPending ? 'text-yellow-500' : 'text-purple-500'}`} />
            </button>
            
            {/* Delete Button - Chỉ hiển thị cho quản lý */}
            {currentUserRole === 'manager' && (
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Xóa bài tập"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </button>
            )}
            
            <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors ml-2">
              Luyện tập →
            </span>
          </div>
        </div>
        
        {/* Smart Difficulty Info */}
        {difficultyData.level !== 'unknown' && difficultyData.confidence > 0.6 && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <TrendingUp className="h-3 w-3" />
                <span>
                  {difficultyData.sampleSize} sinh viên • 
                  Độ tin cậy {(difficultyData.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className={`text-xs font-medium ${difficultyColors.text}`}>
                Điểm khó: {difficultyData.score.toFixed(1)}/5
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      {showDrills && (
        <DrillPanel 
          ex={ex} 
          chapterId={chapterId} 
          courseKey={courseKey} 
          lk={lk} 
          onClose={() => setShowDrills(false)} 
        />
      )}
      
      {showAnalytics && (
        <DifficultyAnalytics
          exerciseId={ex.id}
          onClose={() => setShowAnalytics(false)}
        />
      )}
      
      {showVersionManagement && (
        <VersionManagement
          exerciseId={ex.id}
          onClose={() => setShowVersionManagement(false)}
          currentUserRole={currentUserRole}
        />
      )}
      
      {showStatistics && ex.code && (
        <ExerciseStatistics
          exerciseCode={ex.code}
          exerciseTitle={ex.title}
          onClose={() => setShowStatistics(false)}
        />
      )}
      
      {/* Tạm thời disable EditExerciseForm để tránh crash */}
      {showEditForm && false && (
        <EditExerciseForm
          exerciseId={ex.id}
          exerciseData={{
            title: ex.title,
            goal: ex.goal,
            description: ex.description,
            level: lk,
            courseName: courseKey,
            chapterTitle: chapterTitle || `Chương ${chapterId}`,
            tags: ex.tags || [],
            hints: ex.hints || ['']
          }}
          exerciseBank={exerciseBank}
          onSave={handleSaveEdit}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default ExerciseItem;