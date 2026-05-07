import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { getLevelColors } from '../utils';
import ExerciseItem from './ExerciseItem';
import AddExerciseModal from './AddExerciseModal';

const ChapterAccordion = ({ 
  chapter, 
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
  currentUserRole 
}) => {
  const [open, setOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const lc = getLevelColors(lk);
  const allExs = chapter[lk] || [];
  
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
  
  // Don't render chapter if no exercises match filters
  if (filteredExs.length === 0 && (searchTerm || filters?.tags?.length > 0)) {
    return null;
  }
  
  const handleAddExercise = (newExercise) => {
    onAddExercise(courseKey, chapter.id, lk, newExercise);
    setShowAddModal(false);
  };
  
  return (
    <>
      <div className={`border rounded-xl overflow-hidden mb-3 ${lc.ch}`}>
        <button 
          onClick={() => setOpen(!open)} 
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            {open ? (
              <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0"/>
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0"/>
            )}
            <span className="font-semibold text-gray-900 dark:text-white text-sm text-left">
              {chapter.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 flex-shrink-0">
              {filteredExs.length}{allExs.length !== filteredExs.length && `/${allExs.length}`} chủ đề
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddModal(true);
              }}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
              title="Thêm bài tập"
            >
              <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </button>
        
        {open && (
          <div className="px-5 pb-5 space-y-2">
            {filteredExs.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-2">
                {searchTerm || filters?.tags?.length > 0 
                  ? 'Không có bài tập nào phù hợp với bộ lọc.'
                  : 'Chưa có bài tập.'
                }
              </p>
            ) : (
              filteredExs.map(ex => (
                <ExerciseItem 
                  key={ex.id} 
                  ex={ex} 
                  lk={lk} 
                  chapterId={chapter.id}
                  chapterTitle={chapter.title}
                  courseKey={courseKey}
                  exerciseBank={exerciseBank}
                  currentUserRole={currentUserRole}
                  onDelete={onDeleteExercise}
                  onUpdate={onUpdateExercise}
                  onToggleActiveSemester={onToggleActiveSemester}
                  showActiveSemesterToggle={showActiveSemesterToggle}
                  searchTerm={searchTerm}
                />
              ))
            )}
          </div>
        )}
      </div>
      
      {showAddModal && (
        <AddExerciseModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddExercise}
          courseKey={courseKey}
          chapterId={chapter.id}
          level={lk}
        />
      )}
    </>
  );
};

export default ChapterAccordion;