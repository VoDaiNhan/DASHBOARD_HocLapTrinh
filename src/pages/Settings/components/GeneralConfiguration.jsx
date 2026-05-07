import React, { useState } from 'react';
import { Save, AlertTriangle, CheckCircle, RefreshCw, Bell, Eye, BookOpen, Target } from 'lucide-react';

const GeneralConfiguration = () => {
  const [settings, setSettings] = useState({
    studentRiskThreshold: 60,
    studentScoreThreshold: 6.5,
    classCompletionThreshold: 80,
    classScoreThreshold: 7.0,
    updateCycle: 'daily',
    autoNotifications: true,
    hideCompletedClasses: false,
    // Quy chuẩn ngân hàng bài tập
    exerciseCompletionThreshold: 70,
    requireAllChapters: true,
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('Đã lưu cấu hình thành công!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Cấu hình chung</h2>
        <p className="text-sm text-gray-600">Thiết lập các ngưỡng và chế độ hoạt động cho hệ thống</p>
      </div>

      {/* Ngưỡng cảnh báo rủi ro sinh viên */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ngưỡng cảnh báo rủi ro sinh viên</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiến độ hoàn thành tối thiểu (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.studentRiskThreshold}
                onChange={(e) => handleChange('studentRiskThreshold', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-gray-900 w-16 text-right">
                &lt;{settings.studentRiskThreshold}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sinh viên có tiến độ dưới ngưỡng này sẽ được đánh dấu là có rủi ro
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điểm trung bình tối thiểu
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={settings.studentScoreThreshold}
                onChange={(e) => handleChange('studentScoreThreshold', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-gray-900 w-20 text-right">
                &lt;{settings.studentScoreThreshold.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sinh viên có điểm trung bình dưới ngưỡng này sẽ được đánh dấu là có rủi ro
            </p>
          </div>
        </div>
      </div>

      {/* Ngưỡng "đạt yêu cầu" của lớp học */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ngưỡng "đạt yêu cầu" của lớp học</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tỷ lệ hoàn thành tối thiểu (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.classCompletionThreshold}
                onChange={(e) => handleChange('classCompletionThreshold', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-gray-900 w-16 text-right">
                ≥{settings.classCompletionThreshold}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Lớp có tỷ lệ hoàn thành trên ngưỡng này được coi là đạt chuẩn
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điểm trung bình tối thiểu
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={settings.classScoreThreshold}
                onChange={(e) => handleChange('classScoreThreshold', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-gray-900 w-20 text-right">
                ≥{settings.classScoreThreshold.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Lớp có điểm trung bình trên ngưỡng này được coi là đạt chuẩn
            </p>
          </div>
        </div>
      </div>

      {/* Chu kỳ cập nhật dữ liệu */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Chu kỳ cập nhật dữ liệu</h3>
        </div>
        <div className="space-y-3">
          {['daily', 'weekly', 'manual'].map((cycle) => {
            const labels = {
              daily: 'Hàng ngày',
              weekly: 'Hàng tuần',
              manual: 'Thủ công'
            };
            return (
              <label key={cycle} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="updateCycle"
                  value={cycle}
                  checked={settings.updateCycle === cycle}
                  onChange={(e) => handleChange('updateCycle', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{labels[cycle]}</span>
              </label>
            );
          })}
          <p className="text-xs text-gray-500 mt-2">
            Hệ thống sẽ tự động đồng bộ dữ liệu theo chu kỳ đã chọn
          </p>
        </div>
      </div>

      {/* Toggle switches */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tùy chọn tự động</h3>
        <div className="space-y-4">
          {/* Thông báo tự động */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Thông báo tự động</p>
                <p className="text-xs text-gray-500">
                  Gửi thông báo cho giảng viên khi có lớp/sinh viên rủi ro
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChange('autoNotifications', !settings.autoNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Ẩn/hiện lớp đã kết thúc */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Hiển thị lớp đã kết thúc</p>
                <p className="text-xs text-gray-500">
                  Ẩn hoặc hiện các lớp học đã hoàn thành trong danh sách
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChange('hideCompletedClasses', !settings.hideCompletedClasses)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                !settings.hideCompletedClasses ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  !settings.hideCompletedClasses ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Quy chuẩn ngân hàng bài tập */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quy chuẩn ngân hàng bài tập</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4 ml-7">
          Sinh viên phải học hết tất cả các chương và hoàn thành đủ tỷ lệ bài tập yêu cầu
        </p>
        <div className="space-y-5">
          {/* Tỷ lệ hoàn thành bài tập tối thiểu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tỷ lệ hoàn thành bài tập tối thiểu mỗi chương (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.exerciseCompletionThreshold}
                onChange={(e) => handleChange('exerciseCompletionThreshold', parseInt(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="text-lg font-bold text-blue-600 w-16 text-right">
                ≥{settings.exerciseCompletionThreshold}%
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">
                Sinh viên cần hoàn thành ít nhất {settings.exerciseCompletionThreshold}% số bài tập trong mỗi chương
              </p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                settings.exerciseCompletionThreshold >= 70
                  ? 'bg-green-100 text-green-700'
                  : settings.exerciseCompletionThreshold >= 50
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {settings.exerciseCompletionThreshold >= 70 ? 'Khuyến nghị' : settings.exerciseCompletionThreshold >= 50 ? 'Trung bình' : 'Thấp'}
              </span>
            </div>
          </div>

          {/* Yêu cầu học hết tất cả chương */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Bắt buộc học hết tất cả chương</p>
                <p className="text-xs text-gray-500">
                  Sinh viên phải hoàn thành tất cả {settings.requireAllChapters ? '11' : 'các'} chương trong môn học mới được tính hoàn thành môn
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChange('requireAllChapters', !settings.requireAllChapters)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.requireAllChapters ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.requireAllChapters ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Preview box */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-2">📋 Quy chuẩn hiện tại:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Sinh viên phải hoàn thành <strong>≥{settings.exerciseCompletionThreshold}%</strong> bài tập trong mỗi chương</li>
              {settings.requireAllChapters && (
                <li>• Bắt buộc học <strong>tất cả các chương</strong> trong môn học</li>
              )}
              <li>• Chương nào chưa đạt ngưỡng sẽ được đánh dấu <strong className="text-red-600">chưa đạt</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="h-5 w-5" />
          Lưu cấu hình
        </button>
      </div>
    </div>
  );
};

export default GeneralConfiguration;

