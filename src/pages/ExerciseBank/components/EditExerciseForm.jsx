import { useState, useEffect } from 'react';
import { Edit3, Save, X, AlertTriangle, Info, Plus } from 'lucide-react';
import { LEVELS } from '../constants';
import { getLevelColors } from '../utils';
import { getActiveVersion, createNewVersion, VERSION_TYPES, EDIT_SEVERITY } from '../versioning';

const EditExerciseForm = ({ exerciseId, exerciseData, exerciseBank, onSave, onClose }) => {
  // State declarations - always in the same order
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    goal: '',
    description: '',
    level: 'basic',
    courseName: '',
    chapterTitle: '',
    tags: [],
    hints: ['']
  });
  const [originalData, setOriginalData] = useState(null);
  const [changeNote, setChangeNote] = useState('');
  const [errors, setErrors] = useState({});

  // Initialize data
  useEffect(() => {
    let isMounted = true;
    
    const initializeData = () => {
      try {
        let content = null;
        
        if (exerciseData) {
          content = {
            title: exerciseData.title || '',
            goal: exerciseData.goal || '',
            description: exerciseData.description || '',
            level: exerciseData.level || 'basic',
            courseName: exerciseData.courseName || '',
            chapterTitle: exerciseData.chapterTitle || '',
            tags: exerciseData.tags || [],
            hints: exerciseData.hints || ['']
          };
        } else {
          content = {
            title: 'Bài tập mẫu',
            goal: 'Mục tiêu học tập',
            description: '',
            level: 'basic',
            courseName: '',
            chapterTitle: '',
            tags: [],
            hints: ['']
          };
        }
        
        if (isMounted) {
          setFormData(content);
          setOriginalData(content);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeData();
    
    return () => {
      isMounted = false;
    };
  }, [exerciseData]);

  // Helper functions
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Tiêu đề bài tập là bắt buộc';
    if (!formData.goal.trim()) newErrors.goal = 'Mục tiêu học tập là bắt buộc';
    if (!changeNote.trim()) newErrors.changeNote = 'Vui lòng nhập lý do chỉnh sửa';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const detectChanges = () => {
    if (!originalData) return [];
    
    const changes = [];
    
    if (formData.title !== originalData.title) {
      changes.push({
        field: 'title',
        oldValue: originalData.title,
        newValue: formData.title,
        severity: EDIT_SEVERITY.MINOR
      });
    }
    
    if (formData.goal !== originalData.goal) {
      changes.push({
        field: 'goal',
        oldValue: originalData.goal,
        newValue: formData.goal,
        severity: EDIT_SEVERITY.MAJOR
      });
    }
    
    if (formData.description !== originalData.description) {
      changes.push({
        field: 'description',
        oldValue: originalData.description,
        newValue: formData.description,
        severity: EDIT_SEVERITY.MAJOR
      });
    }
    
    return changes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const changes = detectChanges();
    
    if (changes.length === 0) {
      alert('Không có thay đổi nào được phát hiện');
      return;
    }
    
    try {
      const newVersion = createNewVersion(
        exerciseId,
        changes,
        {
          id: 'teacher_003',
          name: 'TS. Nguyễn Văn An',
          role: 'teacher',
          email: 'an.nv@university.edu.vn'
        },
        VERSION_TYPES.EDITED,
        formData,
        changeNote
      );
      
      if (onSave) {
        onSave(exerciseId, newVersion);
      }
      
      // Close modal first
      onClose();
      
      // Show success message
      setTimeout(() => {
        alert(`Version mới ${newVersion.version} đã được tạo và chờ phê duyệt!`);
      }, 100);
      
    } catch (error) {
      console.error('Error creating version:', error);
      alert('Có lỗi xảy ra: ' + error.message);
    }
  };

  const addTag = (tag) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Get available data
  const courses = exerciseBank ? Object.keys(exerciseBank) : [];
  const chapters = (formData.courseName && exerciseBank && exerciseBank[formData.courseName]) 
    ? exerciseBank[formData.courseName].chapters || [] 
    : [];

  const changes = detectChanges();
  const hasCriticalChanges = changes.some(c => c.severity === EDIT_SEVERITY.CRITICAL);
  const hasMajorChanges = changes.some(c => c.severity === EDIT_SEVERITY.MAJOR);

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Edit3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chỉnh sửa bài tập</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tạo version mới - sẽ cần phê duyệt trước khi áp dụng
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

        {/* Warning for changes */}
        {hasMajorChanges && (
          <div className="px-6 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium">
                Thay đổi lớn phát hiện - sẽ tạo version mới cần phê duyệt
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Môn học
              </label>
              <select
                value={formData.courseName}
                onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value, chapterTitle: '' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Chọn môn học</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chương
              </label>
              <select
                value={formData.chapterTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, chapterTitle: e.target.value }))}
                disabled={!formData.courseName}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Chọn chương</option>
                {chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.title}>{chapter.title}</option>
                ))}
              </select>
            </div>
          </div>

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
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
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
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
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
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm rounded-full">
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
                placeholder="Thêm tag (VD: stack, linked-list)"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.target.parentElement.querySelector('input');
                  addTag(input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
            </div>
          </div>

          {/* Change Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lý do chỉnh sửa *
            </label>
            <textarea
              value={changeNote}
              onChange={(e) => setChangeNote(e.target.value)}
              placeholder="Mô tả lý do và nội dung thay đổi..."
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                errors.changeNote ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.changeNote && <p className="text-red-500 text-xs mt-1">{errors.changeNote}</p>}
          </div>

          {/* Changes Preview */}
          {changes.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Thay đổi sẽ được áp dụng ({changes.length}):
              </h4>
              <div className="space-y-2">
                {changes.map((change, index) => (
                  <div key={index} className="p-2 rounded text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                    <span className="font-medium capitalize">{change.field}</span>
                    <span className="ml-2">
                      ({change.severity === EDIT_SEVERITY.CRITICAL ? 'Quan trọng' :
                        change.severity === EDIT_SEVERITY.MAJOR ? 'Lớn' : 'Nhỏ'})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {changes.length > 0 ? 
                `${changes.length} thay đổi sẽ tạo version mới cần phê duyệt` :
                'Chưa có thay đổi nào'
              }
            </p>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={changes.length === 0}
                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExerciseForm;