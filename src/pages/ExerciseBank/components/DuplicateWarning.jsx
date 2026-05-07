import { useState } from 'react';
import { AlertTriangle, Copy, Eye, EyeOff, Lightbulb, X } from 'lucide-react';
import { getDuplicateColors, getDuplicateLabel, generateDuplicateAvoidanceSuggestions } from '../duplicateDetection';

const DuplicateWarning = ({ duplicates, onClose, onProceed, onCancel }) => {
  const [showDetails, setShowDetails] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  if (!duplicates || duplicates.length === 0) return null;
  
  const topDuplicate = duplicates[0];
  const suggestions = generateDuplicateAvoidanceSuggestions(duplicates);
  
  const toggleDetails = (index) => {
    setShowDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const getSeverityColor = (similarity) => {
    if (similarity >= 0.9) return 'text-red-600 dark:text-red-400';
    if (similarity >= 0.8) return 'text-orange-600 dark:text-orange-400';
    if (similarity >= 0.7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-blue-600 dark:text-blue-400';
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Phát hiện bài tập tương tự</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tìm thấy {duplicates.length} bài tập có nội dung tương tự
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Warning Summary */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  Cảnh báo trùng lặp nội dung
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                  Bài tập bạn đang nộp có <strong>{(topDuplicate.similarity.overall * 100).toFixed(1)}%</strong> độ 
                  tương tự với bài tập đã có trong hệ thống. Điều này có thể gây nhầm lẫn cho sinh viên.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getSeverityColor(topDuplicate.similarity.title)}`}>
                      {(topDuplicate.similarity.title * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Tiêu đề</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getSeverityColor(topDuplicate.similarity.goal)}`}>
                      {(topDuplicate.similarity.goal * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Mục tiêu</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getSeverityColor(topDuplicate.similarity.description)}`}>
                      {(topDuplicate.similarity.description * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Mô tả</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getSeverityColor(topDuplicate.similarity.tags)}`}>
                      {(topDuplicate.similarity.tags * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">Tags</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Duplicate Exercises List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Bài tập tương tự ({duplicates.length})
            </h3>
            
            <div className="space-y-4">
              {duplicates.map((duplicate, index) => {
                const colors = getDuplicateColors(duplicate.type);
                
                return (
                  <div key={index} className={`border-2 rounded-xl overflow-hidden ${colors.border}`}>
                    {/* Duplicate Header */}
                    <div className={`p-4 ${colors.bg}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Copy className={`h-5 w-5 ${colors.text}`} />
                          <div>
                            <h4 className={`font-semibold ${colors.text}`}>
                              {duplicate.exercise.title}
                            </h4>
                            <p className="text-sm opacity-75">
                              {getDuplicateLabel(duplicate.type)} • {(duplicate.similarity.overall * 100).toFixed(1)}% tương tự
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleDetails(index)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${colors.text} hover:bg-black/10`}
                        >
                          {showDetails[index] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {showDetails[index] ? 'Ẩn' : 'Xem'} chi tiết
                        </button>
                      </div>
                    </div>
                    
                    {/* Duplicate Details */}
                    {showDetails[index] && (
                      <div className="p-4 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Bài tập hiện có</h5>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Tiêu đề:</span>
                                <p className="text-gray-900 dark:text-white">{duplicate.exercise.title}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Mục tiêu:</span>
                                <p className="text-gray-900 dark:text-white">{duplicate.exercise.goal}</p>
                              </div>
                              {duplicate.exercise.tags && (
                                <div>
                                  <span className="font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {duplicate.exercise.tags.map(tag => (
                                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Cảnh báo chi tiết</h5>
                            <div className="space-y-2">
                              {duplicate.warnings.map((warning, wIndex) => (
                                <div key={wIndex} className={`p-2 rounded-lg text-sm ${
                                  warning.severity === 'high' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                                  warning.severity === 'medium' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                                  'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <span>{warning.message}</span>
                                    <span className="font-mono text-xs">
                                      {(warning.similarity * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors mb-4"
              >
                <Lightbulb className="h-5 w-5" />
                <span className="font-medium">
                  {showSuggestions ? 'Ẩn' : 'Xem'} gợi ý tránh trùng lặp ({suggestions.length})
                </span>
              </button>
              
              {showSuggestions && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div key={index}>
                        <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                          {suggestion.message}
                        </h5>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {suggestion.example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bạn có thể tiếp tục nộp bài hoặc quay lại chỉnh sửa để tránh trùng lặp
            </p>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                onClick={onProceed}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Vẫn tiếp tục nộp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuplicateWarning;