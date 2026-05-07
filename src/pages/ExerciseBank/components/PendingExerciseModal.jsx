import { useState } from 'react';
import { X, CheckCircle, MessageCircle, User, BookOpen, Target, Tag, Calendar } from 'lucide-react';
import { LEVELS } from '../constants';
import { getLevelColors } from '../utils';

const PendingExerciseModal = ({ exercise, onClose, onApprove, onFeedback }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('content');

  const levelInfo = LEVELS.find(l => l.key === exercise.level);
  const levelColors = getLevelColors(exercise.level);

  const handleApprove = () => {
    onApprove(exercise.id);
    onClose();
  };

  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      onFeedback(exercise.id, {
        type: feedbackType,
        message: feedbackText,
        timestamp: new Date().toISOString()
      });
      onClose();
    }
  };

  const feedbackTypes = [
    { key: 'content', label: 'Nội dung bài tập', desc: 'Đề bài, mục tiêu học tập' },
    { key: 'difficulty', label: 'Mức độ khó', desc: 'Phân loại cơ bản/nâng cao' },
    { key: 'category', label: 'Phân loại', desc: 'Môn học, chương, tags' },
    { key: 'quality', label: 'Chất lượng', desc: 'Tính thực tế, độ rõ ràng' },
    { key: 'other', label: 'Khác', desc: 'Vấn đề khác cần chỉnh sửa' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Phê duyệt bài tập</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đánh giá và kiểm soát chất lượng nội dung
                  </p>
                </div>
              </div>
              
              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium rounded-full">
                  Chờ phê duyệt
                </span>
                <span className="text-xs text-gray-400">
                  Gửi lúc {new Date(exercise.submittedAt).toLocaleString('vi-VN')}
                </span>
              </div>
            </div>
            
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Exercise Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Giáo viên:</span>
                <span className="text-gray-900 dark:text-white">{exercise.teacherName}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Môn học:</span>
                <span className="text-gray-900 dark:text-white">{exercise.courseName}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Chương:</span>
                <span className="text-gray-900 dark:text-white">{exercise.chapterTitle}</span>
              </div>
            </div>

            {/* Level & Tags */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 flex items-center justify-center">
                  {levelInfo && <levelInfo.icon className="h-3.5 w-3.5 text-gray-500" />}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Mức độ:</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors.badge}`}>
                  {levelInfo?.label}
                </span>
              </div>
              
              <div className="flex items-start gap-2 text-sm">
                <Tag className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {exercise.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Ngày gửi:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(exercise.submittedAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          {/* Exercise Content */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Nội dung bài tập</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiêu đề:</label>
                <p className="text-gray-900 dark:text-white mt-1">{exercise.title}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mục tiêu học tập:</label>
                <p className="text-gray-900 dark:text-white mt-1">{exercise.goal}</p>
              </div>
              
              {exercise.description && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả chi tiết:</label>
                  <p className="text-gray-900 dark:text-white mt-1 whitespace-pre-wrap">{exercise.description}</p>
                </div>
              )}
              
              {exercise.hints && exercise.hints.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gợi ý:</label>
                  <ul className="mt-1 space-y-1">
                    {exercise.hints.map((hint, index) => (
                      <li key={index} className="text-gray-900 dark:text-white text-sm">
                        • {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Form */}
          {showFeedbackForm && (
            <div className="border border-orange-200 dark:border-orange-700 rounded-xl p-4 bg-orange-50 dark:bg-orange-900/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-orange-600" />
                Phản hồi cho giáo viên
              </h4>
              
              {/* Feedback Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loại phản hồi:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {feedbackTypes.map(type => (
                    <button
                      key={type.key}
                      onClick={() => setFeedbackType(type.key)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        feedbackType === type.key
                          ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Feedback Message */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nội dung phản hồi:
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Nhập góp ý, đề xuất chỉnh sửa cho giáo viên..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          {!showFeedbackForm ? (
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Phản hồi
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                Chấp thuận
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={!feedbackText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="h-4 w-4" />
                Gửi phản hồi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingExerciseModal;