import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { calculateSmartDifficulty, getDifficultyColors, getDifficultyLabel } from '../analytics';

const DifficultyAnalytics = ({ exerciseId, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const difficultyData = calculateSmartDifficulty(exerciseId);
  const colors = getDifficultyColors(difficultyData.level);
  
  if (difficultyData.level === 'unknown') {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6"
          onClick={e => e.stopPropagation()}>
          
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Chưa có dữ liệu phân tích
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Bài tập này chưa có đủ dữ liệu từ sinh viên để phân tích độ khó thông minh.
              Cần ít nhất 20 lượt làm bài để có kết quả chính xác.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'factors', label: 'Yếu tố ảnh hưởng', icon: Target },
    { id: 'recommendations', label: 'Đề xuất', icon: TrendingUp }
  ];
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Phân tích độ khó thông minh</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dựa trên dữ liệu thực tế từ {difficultyData.sampleSize} sinh viên
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-gray-500 text-xl leading-none">×</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Difficulty Level Card */}
              <div className={`p-6 rounded-xl border-2 ${colors.border} ${colors.bg}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.text}`}>
                      {getDifficultyLabel(difficultyData.level)}
                    </h3>
                    <p className="text-sm opacity-75">
                      {difficultyData.sampleSize < 50 ? 'Độ tin cậy: Thấp' :
                       difficultyData.sampleSize < 100 ? 'Độ tin cậy: Trung bình' :
                       'Độ tin cậy: Cao'} ({difficultyData.sampleSize} sinh viên)
                    </p>
                  </div>
                  <div className="text-right group relative">
                    <div className={`text-3xl font-bold ${colors.text} cursor-help`}>
                      {difficultyData.score.toFixed(1)}/5
                    </div>
                    <p className="text-xs opacity-75">Điểm độ khó</p>
                    
                    {/* Tooltip */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-xl">
                      <div className="font-semibold mb-2">Cách tính điểm độ khó:</div>
                      <div className="space-y-1">
                        <div>• 40% - Tỷ lệ làm đúng</div>
                        <div>• 30% - Thời gian làm bài</div>
                        <div>• 20% - Số lần thử lại</div>
                        <div>• 10% - Phân bố điểm số</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-700 text-gray-300">
                        Điểm càng cao = bài càng khó
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                    style={{ width: `${(difficultyData.score / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tỷ lệ làm đúng</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(difficultyData.factors.find(f => f.name.includes('hoàn thành') || f.name.includes('làm đúng'))?.value || 'N/A')}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Thời gian trung bình</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {difficultyData.factors.find(f => f.name.includes('Thời gian'))?.value || 'N/A'}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Số lần thử</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {difficultyData.factors.find(f => f.name.includes('lần thử'))?.value || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Sample Size Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Dữ liệu đáng tin cậy</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Phân tích dựa trên <strong>{difficultyData.sampleSize} lượt làm bài</strong> từ sinh viên thực tế.
                  Độ tin cậy <strong>{(difficultyData.confidence * 100).toFixed(1)}%</strong> - 
                  {difficultyData.confidence > 0.8 ? ' Rất đáng tin cậy' : 
                   difficultyData.confidence > 0.6 ? ' Khá đáng tin cậy' : ' Cần thêm dữ liệu'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'factors' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Các yếu tố ảnh hưởng đến độ khó
              </h3>
              
              {difficultyData.factors.map((factor, index) => {
                const impactColors = {
                  'easy': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                  'medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
                  'hard': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                  'very-hard': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                };
                
                return (
                  <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{factor.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[factor.impact]}`}>
                        {factor.impact === 'easy' ? 'Dễ' :
                         factor.impact === 'medium' ? 'Trung bình' :
                         factor.impact === 'hard' ? 'Khó' : 'Rất khó'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {factor.value}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {factor.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đề xuất cải thiện dựa trên dữ liệu
              </h3>
              
              {/* Data-driven recommendations */}
              {difficultyData.recommendations && difficultyData.recommendations.length > 0 && (
                <div className="space-y-3">
                  {difficultyData.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${
                      rec.type === 'increase_complexity' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                      rec.type === 'add_hints' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
                      rec.type === 'add_challenge' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    }`}>
                      <p className={`text-sm font-medium ${
                        rec.type === 'increase_complexity' ? 'text-blue-800 dark:text-blue-200' :
                        rec.type === 'add_hints' ? 'text-orange-800 dark:text-orange-200' :
                        rec.type === 'add_challenge' ? 'text-purple-800 dark:text-purple-200' :
                        'text-yellow-800 dark:text-yellow-200'
                      }`}>
                        💡 {rec.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Level-based recommendations */}
              {difficultyData.level === 'very-easy' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Bài tập quá dễ</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Thêm yêu cầu phức tạp hơn (edge cases, optimization)</li>
                    <li>• Tăng kích thước input hoặc constraints</li>
                    <li>• Kết hợp với các concepts khác</li>
                    <li>• Yêu cầu implement multiple solutions</li>
                  </ul>
                </div>
              )}
              
              {difficultyData.level === 'very-hard' && (
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Bài tập quá khó</h4>
                  <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                    <li>• Thêm hints và gợi ý chi tiết hơn</li>
                    <li>• Chia nhỏ thành các bước con</li>
                    <li>• Cung cấp template code hoặc skeleton</li>
                    <li>• Thêm test cases mẫu</li>
                  </ul>
                </div>
              )}
              
              {['easy', 'medium', 'hard'].includes(difficultyData.level) && !difficultyData.recommendations?.length && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">✓ Độ khó phù hợp</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Bài tập có độ khó phù hợp với mức độ hiện tại. Tiếp tục theo dõi để điều chỉnh nếu cần.
                  </p>
                </div>
              )}
              
              {/* General Recommendations */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Đề xuất chung</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Cải thiện engagement:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Thêm context thực tế, gamification elements, hoặc competitive programming aspects
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theo dõi liên tục:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cập nhật phân tích sau mỗi 50 lượt làm bài để có dữ liệu chính xác hơn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DifficultyAnalytics;