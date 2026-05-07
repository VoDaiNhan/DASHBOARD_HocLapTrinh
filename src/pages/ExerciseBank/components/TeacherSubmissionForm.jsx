import { useState } from 'react';
import { Send, Plus, X, Tag, BookOpen, Target, AlertTriangle } from 'lucide-react';
import { LEVELS } from '../constants';
import { getLevelColors } from '../utils';
import { detectDuplicates } from '../duplicateDetection';
import { createQuestionWithAddressing, getNextQuestionCode } from '../addressing';
import DuplicateWarning from './DuplicateWarning';

const TeacherSubmissionForm = ({ exerciseBank, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    goal: '',
    description: '',
    level: 'basic',
    courseName: '',
    chapterTitle: '',
    tags: [],
    hints: [''],
    teacherName: 'TS. Nguyễn Văn An', // Mock teacher name
    teacherEmail: 'an.nv@university.edu.vn'
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});
  const [duplicates, setDuplicates] = useState(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  // Get available courses and chapters
  const courses = Object.keys(exerciseBank);
  const chapters = formData.courseName ? exerciseBank[formData.courseName]?.chapters || [] : [];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Tiêu đề bài tập là bắt buộc';
    if (!formData.goal.trim()) newErrors.goal = 'Mục tiêu học tập là bắt buộc';
    if (!formData.courseName) newErrors.courseName = 'Vui lòng chọn môn học';
    if (!formData.chapterTitle) newErrors.chapterTitle = 'Vui lòng chọn chương';
    if (formData.tags.length === 0) newErrors.tags = 'Vui lòng thêm ít nhất 1 tag';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Tạo danh sách bài tập hiện có để kiểm tra trùng lặp
    const existingExercises = [];
    Object.entries(exerciseBank).forEach(([courseName, courseData]) => {
      courseData.chapters.forEach(chapter => {
        ['basic', 'advanced'].forEach(level => {
          if (chapter[level]) {
            chapter[level].forEach(exercise => {
              existingExercises.push({
                ...exercise,
                courseName,
                chapterTitle: chapter.title,
                level
              });
            });
          }
        });
      });
    });

    // Kiểm tra trùng lặp
    const detectedDuplicates = detectDuplicates(formData, existingExercises);
    
    if (detectedDuplicates.length > 0) {
      setDuplicates(detectedDuplicates);
      setShowDuplicateWarning(true);
      return;
    }

    // Nếu không có trùng lặp, tiếp tục nộp bài
    submitExercise();
  };

  const submitExercise = () => {
    // Tạo bài tập với addressing system
    const questionData = {
      ...formData,
      hints: formData.hints.filter(hint => hint.trim()),
      submittedAt: new Date().toISOString()
    };

    // Sử dụng addressing system để tạo question với code
    const newExercise = createQuestionWithAddressing(
      questionData,
      formData.courseName,
      parseInt(formData.chapterId),
      formData.level
    );

    // Thêm ID cho pending (sẽ được thay thế khi approve)
    newExercise.id = `pending_${Date.now()}`;

    console.log('📝 Created new exercise with addressing:', {
      code: newExercise.code,
      title: newExercise.title,
      addressing: newExercise.addressing
    });

    onSubmit(newExercise);
    onClose();
  };

  const handleDuplicateProceed = () => {
    setShowDuplicateWarning(false);
    submitExercise();
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateWarning(false);
    // Người dùng có thể tiếp tục chỉnh sửa form
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addHint = () => {
    setFormData(prev => ({
      ...prev,
      hints: [...prev.hints, '']
    }));
  };

  const updateHint = (index, value) => {
    setFormData(prev => ({
      ...prev,
      hints: prev.hints.map((hint, i) => i === index ? value : hint)
    }));
  };

  const removeHint = (index) => {
    if (formData.hints.length > 1) {
      setFormData(prev => ({
        ...prev,
        hints: prev.hints.filter((_, i) => i !== index)
      }));
    }
  };

  const levelInfo = LEVELS.find(l => l.key === formData.level);
  const levelColors = getLevelColors(formData.level);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nộp bài tập mới</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gửi bài tập để quản lý ngành phê duyệt
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Môn học *
              </label>
              <select
                value={formData.courseName}
                onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value, chapterTitle: '' }))}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.courseName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Chọn môn học</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chương *
              </label>
              <select
                value={formData.chapterTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, chapterTitle: e.target.value }))}
                disabled={!formData.courseName}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${
                  errors.chapterTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Chọn chương</option>
                {chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.title}>{chapter.title}</option>
                ))}
              </select>
              {errors.chapterTitle && <p className="text-red-500 text-xs mt-1">{errors.chapterTitle}</p>}
            </div>
          </div>

          {/* Level Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Mức độ khó *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEVELS.map(level => {
                const colors = getLevelColors(level.key);
                const Icon = level.icon;
                
                return (
                  <button
                    key={level.key}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, level: level.key }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.level === level.key
                        ? `${colors.ch} border-current`
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-semibold">{level.label}</span>
                    </div>
                    <p className="text-sm opacity-75">{level.goal}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Preview */}
          {formData.courseName && formData.chapterId && formData.level && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Mã định danh sẽ được tạo</span>
              </div>
              <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 px-3 py-2 rounded border">
                {getNextQuestionCode(formData.courseName, parseInt(formData.chapterId), formData.level)}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Mã này sẽ không thay đổi khi chỉnh sửa nội dung bài tập
              </p>
            </div>
          )}

          {/* Exercise Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tiêu đề bài tập *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="VD: Cài đặt Stack với Linked List"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mục tiêu học tập *
              </label>
              <input
                type="text"
                value={formData.goal}
                onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                placeholder="VD: Hiểu cách implement Stack sử dụng Linked List"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.goal ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết về bài tập, yêu cầu, đầu vào, đầu ra..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags *
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-full">
                  <Tag className="h-3 w-3" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Thêm tag (VD: stack, linked-list, data-structure)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
          </div>

          {/* Hints */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gợi ý cho sinh viên
            </label>
            <div className="space-y-2">
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => updateHint(index, e.target.value)}
                    placeholder={`Gợi ý ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.hints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHint(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addHint}
              className="mt-2 flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Thêm gợi ý
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              Nộp bài tập
            </button>
          </div>
        </div>
      </div>
      
      {/* Duplicate Warning Modal */}
      {showDuplicateWarning && (
        <DuplicateWarning
          duplicates={duplicates}
          onClose={() => setShowDuplicateWarning(false)}
          onProceed={handleDuplicateProceed}
          onCancel={handleDuplicateCancel}
        />
      )}
    </div>
  );
};

export default TeacherSubmissionForm;