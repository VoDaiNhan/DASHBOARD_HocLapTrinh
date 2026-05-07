import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LEVELS } from '../constants';
import { getLvColor, getLevelColors } from '../utils';
import ChapterTabs from './ChapterTabs';
import SearchAndFilter from './SearchAndFilter';
import { syncActiveSemesterStatus } from '../integration';

// Ngưỡng hoàn thành mặc định (có thể lấy từ settings sau)
const COMPLETION_THRESHOLD = 70;

const CourseDetail = ({ name, initialLk, onBack, exerciseBank, setExerciseBank, currentUserRole = 'teacher' }) => {
  const [lk, setLk] = useState(initialLk || 'basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ tags: [] });
  
  if (!exerciseBank || !exerciseBank[name]) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-4">
          <ArrowLeft className="h-4 w-4"/> Quay lại
        </button>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Không tìm thấy dữ liệu môn học "{name}"</p>
        </div>
      </div>
    );
  }
  
  const course = exerciseBank[name];
  const lm = LEVELS.find(l => l.key === lk);
  const lc = getLevelColors(lk);
  const LI = lm.icon;
  
  const stats = useMemo(() => {
    let total = 0;
    let filtered = 0;
    let activeSemester = 0;
    let chapterProgress = [];

    if (course && course.chapters) {
      course.chapters.forEach(ch => {
        // Bài tập theo level hiện tại
        const exercises = ch[lk] || [];
        total += exercises.length;
        activeSemester += exercises.filter(ex => ex.activeSemester).length;

        const filteredExercises = exercises.filter(ex => {
          if (searchTerm && !ex.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !ex.goal?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
          if (filters.tags.length > 0 && !filters.tags.some(tag => ex.tags?.includes(tag))) return false;
          return true;
        });
        filtered += filteredExercises.length;

        // Kiểm tra xem chương có sinh viên đang học không (có bài tập activeSemester)
        const hasStudents = exercises.some(ex => ex.activeSemester);

        chapterProgress.push({
          id: ch.id,
          title: ch.title,
          hasStudents, // Green if has students, gray if not
        });
      });
    }

    return { total, filtered, activeSemester, chapterProgress };
  }, [course, lk, searchTerm, filters]);

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilter = (newFilters) => setFilters(newFilters);
  const handleClearFilters = () => { setSearchTerm(''); setFilters({ tags: [] }); };
  const hasActiveFilters = searchTerm || filters.tags.length > 0;
  
  useEffect(() => {
    const syncedBank = syncActiveSemesterStatus(exerciseBank);
    if (JSON.stringify(syncedBank) !== JSON.stringify(exerciseBank)) {
      setExerciseBank(syncedBank);
    }
  }, []);
  
  const handleAddExercise = (courseKey, chapterId, level, newExercise) => {
    setExerciseBank(prev => {
      const updated = { ...prev };
      const chapter = updated[courseKey].chapters.find(ch => ch.id === chapterId);
      if (!chapter[level]) chapter[level] = [];
      chapter[level].push(newExercise);
      return updated;
    });
  };

  const handleDeleteExercise = (courseKey, chapterId, level, exerciseId) => {
    setExerciseBank(prev => {
      const updated = { ...prev };
      const chapter = updated[courseKey].chapters.find(ch => ch.id === chapterId);
      if (chapter[level]) chapter[level] = chapter[level].filter(ex => ex.id !== exerciseId);
      return updated;
    });
  };

  const handleToggleActiveSemester = (courseKey, chapterId, level, exerciseId) => {
    setExerciseBank(prev => {
      const updated = { ...prev };
      const chapter = updated[courseKey].chapters.find(ch => ch.id === chapterId);
      if (chapter[level]) {
        const exercise = chapter[level].find(ex => ex.id === exerciseId);
        if (exercise) exercise.activeSemester = !exercise.activeSemester;
      }
      return updated;
    });
  };

  return (
    <div>
      {/* Back + tên môn */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          <ArrowLeft className="h-4 w-4"/> Quay lại
        </button>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h2>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${lc.badge}`}>
          {course.chapters.length} chương · {stats.filtered}/{stats.total} bài
          {hasActiveFilters && <span className="ml-1">📍</span>}
        </span>
      </div>

      {/* Search and filters */}
      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} filters={filters} onClearFilters={handleClearFilters} />

      {/* Chapters */}
      {course && course.chapters && (
        <ChapterTabs
          chapters={course.chapters}
          lk={lk}
          courseKey={name}
          exerciseBank={exerciseBank}
          currentUserRole={currentUserRole}
          onAddExercise={handleAddExercise}
          onDeleteExercise={handleDeleteExercise}
          onUpdateExercise={setExerciseBank}
          onToggleActiveSemester={handleToggleActiveSemester}
          searchTerm={searchTerm}
          filters={filters}
          completionThreshold={COMPLETION_THRESHOLD}
          chapterProgress={stats.chapterProgress}
        />
      )}
    </div>
  );
};

export default CourseDetail;
