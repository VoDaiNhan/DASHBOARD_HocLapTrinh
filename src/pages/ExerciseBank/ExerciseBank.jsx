import { useState } from 'react';
import { BookOpen, CheckCircle, Send, Shield, Database, HelpCircle } from 'lucide-react';
import { EXERCISE_BANK } from './data';
import { PENDING_EXERCISES } from './mockPendingData';
import CourseDetail from './components/CourseDetail';
import CourseList from './components/CourseList';
import ApprovalPanel from './components/ApprovalPanel';
import TeacherSubmissionForm from './components/TeacherSubmissionForm';
import AuditLogDashboard from './components/AuditLogDashboard';
import AddressingStats from './components/AddressingStats';
import IntegrationGuide from './components/IntegrationGuide';
import { createAuditLog, createNewVersion, VERSION_TYPES } from './versioning';

const ExerciseBank = () => {
  const [sel, setSel] = useState(null);
  const [exerciseBank, setExerciseBank] = useState(EXERCISE_BANK);
  const [showApprovalPanel, setShowApprovalPanel] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [showAddressingStats, setShowAddressingStats] = useState(false);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);
  const [pendingExercises, setPendingExercises] = useState(PENDING_EXERCISES);
  const [currentUserRole, setCurrentUserRole] = useState('manager'); // Mặc định là manager
  const handleSubmitExercise = (newExercise) => {
    setPendingExercises(prev => [newExercise, ...prev]);
    
    // Tạo audit log
    createAuditLog(newExercise.id, VERSION_TYPES.CREATED, {
      id: 'teacher_003',
      name: newExercise.teacherName,
      role: 'teacher',
      email: newExercise.teacherEmail
    }, {
      courseName: newExercise.courseName,
      chapterTitle: newExercise.chapterTitle,
      level: newExercise.level
    });
    
    console.log(`Bài tập "${newExercise.title}" đã được nộp và chờ phê duyệt`);
  };

  const handleApproveExercise = (exerciseId) => {
    const exercise = pendingExercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    // Generate new exercise ID for the approved exercise
    const newExercise = {
      id: `approved_${Date.now()}`,
      title: exercise.title,
      goal: exercise.goal,
      score: null,
      tags: exercise.tags || [],
      activeSemester: false
    };

    // Add to exercise bank
    setExerciseBank(prev => {
      const updated = { ...prev };
      
      // Find the course and chapter
      const course = updated[exercise.courseName];
      if (course) {
        const chapter = course.chapters.find(ch => ch.title === exercise.chapterTitle);
        if (chapter) {
          if (!chapter[exercise.level]) {
            chapter[exercise.level] = [];
          }
          chapter[exercise.level].push(newExercise);
        }
      }
      
      return updated;
    });

    // Remove from pending exercises
    setPendingExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    
    // Tạo version history và audit log
    createNewVersion(newExercise.id, [], {
      id: 'manager_001',
      name: 'PGS. Trần Thị Bình',
      role: 'manager',
      email: 'binh.tt@university.edu.vn'
    }, VERSION_TYPES.APPROVED);
    
    createAuditLog(newExercise.id, VERSION_TYPES.APPROVED, {
      id: 'manager_001',
      name: 'PGS. Trần Thị Bình',
      role: 'manager',
      email: 'binh.tt@university.edu.vn'
    }, {
      originalId: exerciseId,
      courseName: exercise.courseName,
      chapterTitle: exercise.chapterTitle,
      level: exercise.level
    });
    
    // Show success notification (you can implement a toast notification here)
    console.log(`Bài tập "${exercise.title}" đã được phê duyệt và thêm vào ngân hàng bài tập`);
  };

  const handleFeedbackExercise = (exerciseId, feedback) => {
    // In a real app, this would send feedback to the teacher
    // For now, we'll just remove it from pending and log the feedback
    const exercise = pendingExercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    setPendingExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    
    // Tạo audit log cho feedback
    createAuditLog(exerciseId, VERSION_TYPES.REJECTED, {
      id: 'manager_001',
      name: 'PGS. Trần Thị Bình',
      role: 'manager',
      email: 'binh.tt@university.edu.vn'
    }, {
      feedback: feedback,
      teacherName: exercise.teacherName,
      teacherEmail: exercise.teacherEmail
    });
    
    // Show success notification
    console.log(`Phản hồi đã được gửi cho giáo viên ${exercise.teacherName}:`, feedback);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <BookOpen className="h-6 w-6 text-white"/>
              </div>
              Ngân hàng bài tập
            </h1>
          </div>
          
          {!sel && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowApprovalPanel(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors relative"
              >
                <CheckCircle className="h-4 w-4" />
                Phê duyệt
                {pendingExercises.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingExercises.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowAuditLog(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Nhật ký
              </button>
              <button
                onClick={() => setShowAddressingStats(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Database className="h-4 w-4" />
                Thống kê mã định danh
              </button>
              <button
                onClick={() => setShowIntegrationGuide(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                Hướng dẫn tích hợp
              </button>
            </div>
          )}
        </div>
      </div>
      
      {sel ? (
        <CourseDetail 
          name={sel.name} 
          initialLk={sel.lk} 
          onBack={() => setSel(null)} 
          exerciseBank={exerciseBank} 
          setExerciseBank={setExerciseBank}
          currentUserRole={currentUserRole}
        />
      ) : (
        <CourseList 
          onSelect={(name, lk) => setSel({name, lk})} 
          exerciseBank={exerciseBank}
        />
      )}
      
      {/* Hiển thị tất cả modals không phụ thuộc vào role */}
      {showSubmissionForm && (
        <TeacherSubmissionForm
          exerciseBank={exerciseBank}
          onSubmit={handleSubmitExercise}
          onClose={() => setShowSubmissionForm(false)}
        />
      )}
      
      {showApprovalPanel && (
        <ApprovalPanel
          pendingExercises={pendingExercises}
          onApprove={handleApproveExercise}
          onFeedback={handleFeedbackExercise}
          onClose={() => setShowApprovalPanel(false)}
        />
      )}
      
      {showAuditLog && (
        <AuditLogDashboard
          onClose={() => setShowAuditLog(false)}
        />
      )}
      
      {showAddressingStats && (
        <AddressingStats
          exerciseBank={exerciseBank}
          onClose={() => setShowAddressingStats(false)}
        />
      )}
      
      {showIntegrationGuide && (
        <IntegrationGuide
          onClose={() => setShowIntegrationGuide(false)}
        />
      )}
    </div>
  );
};

export default ExerciseBank;