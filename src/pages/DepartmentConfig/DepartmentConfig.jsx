import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Award, AlertCircle, TrendingUp, Users } from 'lucide-react';

const DepartmentConfig = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('departmentConfig');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading config:', e);
    }
    return {
      minProgress: 70,
      minGPA: 7.0,
      rankingCriteria: 'gpa',
      topCount: 3,
      warningGPA: 8.0,
      warningProgress: 50,
    };
  };

  const [rankingConfig, setRankingConfig] = useState(loadConfig());
  const [config, setConfig] = useState({
    departmentName: 'Công nghệ Thông tin',
    departmentCode: 'CNTT',
  });

  const handleChange = (key, value) => {
    setRankingConfig(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('departmentConfig', JSON.stringify(rankingConfig));
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    const defaultConfig = {
      minProgress: 70,
      minGPA: 7.0,
      rankingCriteria: 'gpa',
      topCount: 3,
      warningGPA: 8.0,
      warningProgress: 50,
    };
    setRankingConfig(defaultConfig);
    localStorage.setItem('departmentConfig', JSON.stringify(defaultConfig));
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Settings className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cấu hình chuyên ngành</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Tùy chỉnh tiêu chí đánh giá và xếp hạng sinh viên
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Khôi phục mặc định
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saved && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="text-green-600 dark:text-green-400">✓</div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Cấu hình đã được lưu thành công!
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin chuyên ngành</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên chuyên ngành</label>
                  <input type="text" value={config.departmentName} onChange={(e) => setConfig(prev => ({ ...prev, departmentName: e.target.value }))}
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mã chuyên ngành</label>
                  <input type="text" value={config.departmentCode} onChange={(e) => setConfig(prev => ({ ...prev, departmentCode: e.target.value }))}
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cấu hình Sinh viên Xuất sắc</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tiến độ tối thiểu (%)</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="100" step="5" value={rankingConfig.minProgress}
                      onChange={(e) => handleChange('minProgress', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    <input type="number" min="0" max="100" value={rankingConfig.minProgress}
                      onChange={(e) => handleChange('minProgress', parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">%</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Chỉ xếp hạng sinh viên có tiến độ ≥ {rankingConfig.minProgress}%</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPA tối thiểu</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="10" step="0.1" value={rankingConfig.minGPA}
                      onChange={(e) => handleChange('minGPA', parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    <input type="number" min="0" max="10" step="0.1" value={rankingConfig.minGPA}
                      onChange={(e) => handleChange('minGPA', parseFloat(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">/10</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Chỉ xếp hạng sinh viên có GPA ≥ {rankingConfig.minGPA}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tiêu chí xếp hạng (chỉ chọn 1)</label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      style={{ borderColor: rankingConfig.rankingCriteria === 'gpa' ? '#10b981' : '#e5e7eb', backgroundColor: rankingConfig.rankingCriteria === 'gpa' ? '#f0fdf4' : 'transparent' }}>
                      <input type="radio" name="rankingCriteria" value="gpa" checked={rankingConfig.rankingCriteria === 'gpa'}
                        onChange={(e) => handleChange('rankingCriteria', e.target.value)} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">GPA cao nhất</span>
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Khuyến nghị</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ưu tiên chất lượng học tập. Phù hợp cho học bổng, khen thưởng.</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      style={{ borderColor: rankingConfig.rankingCriteria === 'progress' ? '#10b981' : '#e5e7eb', backgroundColor: rankingConfig.rankingCriteria === 'progress' ? '#f0fdf4' : 'transparent' }}>
                      <input type="radio" name="rankingCriteria" value="progress" checked={rankingConfig.rankingCriteria === 'progress'}
                        onChange={(e) => handleChange('rankingCriteria', e.target.value)} className="mt-1" />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Tiến độ cao nhất</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ưu tiên số lượng bài làm. Phù hợp để động viên sinh viên chăm chỉ.</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Số lượng hiển thị</label>
                  <select value={rankingConfig.topCount} onChange={(e) => handleChange('topCount', parseInt(e.target.value))}
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value={3}>3 sinh viên</option>
                    <option value={5}>5 sinh viên</option>
                    <option value={10}>10 sinh viên</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Số lượng sinh viên xuất sắc hiển thị trong bảng xếp hạng</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cấu hình Cảnh báo</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPA tối thiểu cho cảnh báo</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="10" step="0.1" value={rankingConfig.warningGPA}
                      onChange={(e) => handleChange('warningGPA', parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    <input type="number" min="0" max="10" step="0.1" value={rankingConfig.warningGPA}
                      onChange={(e) => handleChange('warningGPA', parseFloat(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">/10</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Cảnh báo sinh viên có GPA ≥ {rankingConfig.warningGPA} nhưng tiến độ thấp</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tiến độ tối đa cho cảnh báo (%)</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="100" step="5" value={rankingConfig.warningProgress}
                      onChange={(e) => handleChange('warningProgress', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    <input type="number" min="0" max="100" value={rankingConfig.warningProgress}
                      onChange={(e) => handleChange('warningProgress', parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">%</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Cảnh báo sinh viên có GPA cao nhưng tiến độ &lt; {rankingConfig.warningProgress}%</p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-900 dark:text-amber-100 font-medium mb-2">⚡ Cảnh báo bất thường</p>
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    Hệ thống sẽ cảnh báo sinh viên có <span className="font-semibold">GPA ≥ {rankingConfig.warningGPA}</span> nhưng 
                    <span className="font-semibold"> tiến độ &lt; {rankingConfig.warningProgress}%</span>. 
                    Đây là dấu hiệu sinh viên có năng lực nhưng ít tham gia làm bài tập.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Xem trước</h2>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👍</span>
                    <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">Sinh viên có tiến độ tốt nhất</h3>
                  </div>
                  <span className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">? đủ điều kiện</span>
                </div>
                <div className="mb-3 p-2 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Điều kiện:</span> Tiến độ ≥{rankingConfig.minProgress}% và GPA ≥{rankingConfig.minGPA}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    Xếp hạng theo: <span className="font-semibold text-green-600 dark:text-green-400">
                      {rankingConfig.rankingCriteria === 'gpa' ? 'GPA cao nhất' : 'Tiến độ cao nhất'}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: Math.min(rankingConfig.topCount, 3) }).map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">#{idx + 1}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Sinh viên {idx + 1}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                          {rankingConfig.rankingCriteria === 'gpa' ? '8.5' : '85%'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {rankingConfig.rankingCriteria === 'gpa' ? 'GPA' : 'Tiến độ'}
                        </div>
                      </div>
                    </div>
                  ))}
                  {rankingConfig.topCount > 3 && (
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">+{rankingConfig.topCount - 3} sinh viên khác</div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-900 dark:text-blue-100 font-medium mb-2">💡 Lưu ý</p>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Cấu hình áp dụng cho tất cả lớp trong chuyên ngành</li>
                  <li>• Thay đổi có hiệu lực ngay sau khi lưu</li>
                  <li>• Có thể khôi phục cấu hình mặc định bất kỳ lúc nào</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentConfig;
