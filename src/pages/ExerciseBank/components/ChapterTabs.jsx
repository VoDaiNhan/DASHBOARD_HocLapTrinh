import { useState, useEffect, useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import AddExerciseModal from './AddExerciseModal';

const ChapterTabs = ({ 
  chapters, 
  lk, 
  courseKey, 
  exerciseBank, 
  onAddExercise, 
  onDeleteExercise, 
  onUpdateExercise, 
  onToggleActiveSemester,
  showActiveSemesterToggle = false,
  searchTerm, 
  filters, 
  currentUserRole,
  completionThreshold = 70,
  chapterProgress = [],
}) => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);

  const activeChapterData = chapters.find(ch => ch.id === activeChapter);
  const currentChapterIndex = chapters.findIndex(ch => ch.id === activeChapter);
  const allExs = activeChapterData ? (activeChapterData[lk] || []) : [];
  
  // Navigation functions
  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setActiveChapter(chapters[currentChapterIndex - 1].id);
    }
  };
  
  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setActiveChapter(chapters[currentChapterIndex + 1].id);
    }
  };
  
  const canGoPrevious = currentChapterIndex > 0;
  const canGoNext = currentChapterIndex < chapters.length - 1;

  // Auto-scroll active tab into view
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const activeTab = activeTabRef.current;
      const tabsContainer = tabsRef.current;
      
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = tabsContainer.getBoundingClientRect();
      
      // Check if tab is outside the visible area
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        // Calculate scroll position to center the active tab
        const scrollLeft = activeTab.offsetLeft - (tabsContainer.clientWidth / 2) + (activeTab.clientWidth / 2);
        
        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeChapter]);
  
  // Filter exercises based on search and filters
  const filteredExs = allExs.filter(ex => {
    // Search filter
    if (searchTerm && !ex.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !ex.goal?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Tag filter
    if (filters?.tags?.length > 0 && !filters.tags.some(tag => ex.tags?.includes(tag))) {
      return false;
    }
    
    return true;
  });

  const handleAddExercise = (newExercise) => {
    onAddExercise(courseKey, activeChapter, lk, newExercise);
    setShowAddModal(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle arrow keys when no modal is open and not typing in input
      if (showAddModal || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }
      
      if (event.key === 'ArrowLeft' && canGoPrevious) {
        event.preventDefault();
        goToPreviousChapter();
      } else if (event.key === 'ArrowRight' && canGoNext) {
        event.preventDefault();
        goToNextChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoPrevious, canGoNext, showAddModal]);

  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Không có chương nào.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chapter Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 relative">
        {/* Fade effect containers */}
        <div className="absolute left-12 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-12 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            onClick={goToPreviousChapter}
            disabled={!canGoPrevious}
            className={`flex-shrink-0 p-3 transition-colors ${
              canGoPrevious
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                : 'text-gray-300 cursor-not-allowed dark:text-gray-600'
            }`}
            title={canGoPrevious ? `Chuyển đến ${chapters[currentChapterIndex - 1]?.title}` : 'Không có chương trước'}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Chapter Tabs */}
          <nav ref={tabsRef} className="flex space-x-8 overflow-x-auto scrollbar-hide px-4 flex-1">
            {chapters.map((chapter) => {
              const chapterExercises = chapter[lk] || [];
              const filteredCount = chapterExercises.filter(ex => {
                if (searchTerm && !ex.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                    !ex.goal?.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return false;
                }
                if (filters?.tags?.length > 0 && !filters.tags.some(tag => ex.tags?.includes(tag))) {
                  return false;
                }
                return true;
              }).length;

              const isActive = activeChapter === chapter.id;
              const progress = chapterProgress.find(p => p.id === chapter.id);

              return (
                <button
                  key={chapter.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => setActiveChapter(chapter.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex-shrink-0 ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {/* Status dot: Green = has students, Gray = no students */}
                    {progress && (
                      <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        progress.hasStudents ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    )}
                    {chapter.title}
                    <span className="ml-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                      {filteredCount}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
          
          {/* Next Button */}
          <button
            onClick={goToNextChapter}
            disabled={!canGoNext}
            className={`flex-shrink-0 p-3 transition-colors ${
              canGoNext
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                : 'text-gray-300 cursor-not-allowed dark:text-gray-600'
            }`}
            title={canGoNext ? `Chuyển đến ${chapters[currentChapterIndex + 1]?.title}` : 'Không có chương tiếp theo'}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chapter Content */}
      {activeChapterData && (
        <div>
          {/* Chapter Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activeChapterData.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredExs.length} bài tập
                {allExs.length !== filteredExs.length && ` (lọc từ ${allExs.length})`}
                <span className="ml-2 text-xs">• Chương {currentChapterIndex + 1}/{chapters.length}</span>
              </p>
            </div>
          </div>

          {/* Exercise Cards Grid */}
          {filteredExs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filters?.tags?.length > 0 
                  ? 'Không có bài tập nào phù hợp với bộ lọc.'
                  : 'Chưa có bài tập nào trong chương này.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExs.map(ex => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  lk={lk}
                  chapterId={activeChapter}
                  chapterTitle={activeChapterData.title}
                  courseKey={courseKey}
                  exerciseBank={exerciseBank}
                  currentUserRole={currentUserRole}
                  onDelete={onDeleteExercise}
                  onUpdate={onUpdateExercise}
                  onToggleActiveSemester={onToggleActiveSemester}
                  showActiveSemesterToggle={showActiveSemesterToggle}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddModal && activeChapterData && (
        <AddExerciseModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddExercise}
          courseKey={courseKey}
          chapterId={activeChapter}
          level={lk}
        />
      )}
    </div>
  );
};

export default ChapterTabs;