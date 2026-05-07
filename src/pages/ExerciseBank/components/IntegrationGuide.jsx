import { useState } from 'react';
import { X, Info, Database, Users, RefreshCw, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { CURRENT_SEMESTER } from '../integration';

const IntegrationGuide = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Info },
    { id: 'sync', label: 'Đồng bộ dữ liệu', icon: RefreshCw },
    { id: 'statistics', label: 'Thống kê', icon: Database },
    { id: 'workflow', label: 'Quy trình', icon: BookOpen }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              🔗 Hướng dẫn tích hợp hệ thống
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Cách Ngân hàng bài tập kết nối với hệ thống học tập
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🎯 Mục tiêu hệ thống
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Kết nối Ngân hàng bài tập với hệ thống quản lý học tập (LMS) để tự động theo dõi 
                  việc sử dụng bài tập và thu thập thống kê từ sinh viên.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h5 className="font-medium text-gray-900 dark:text-white">Tự động đánh dấu</h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Hệ thống tự động đánh dấu bài tập nào đang được sử dụng trong học kỳ hiện tại 
                    dựa trên dữ liệu từ LMS.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-5 w-5 text-blue-600" />
                    <h5 className="font-medium text-gray-900 dark:text-white">Thống kê thời gian thực</h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Xem số liệu chi tiết về sinh viên đã làm, hoàn thành, điểm số và tỷ lệ hoàn thành 
                    cho từng bài tập.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <h5 className="font-medium text-gray-900 dark:text-white">Theo dõi lớp học</h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Biết được bài tập nào đang được giao cho lớp nào, với bao nhiêu sinh viên, 
                    và tiến độ của từng lớp.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="h-5 w-5 text-orange-600" />
                    <h5 className="font-medium text-gray-900 dark:text-white">Đồng bộ tự động</h5>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Dữ liệu được cập nhật tự động từ LMS, không cần can thiệp thủ công từ giáo viên 
                    hay quản lý.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200">Lưu ý quan trọng</h5>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Hiện tại đang sử dụng dữ liệu mô phỏng (mock data). Trong thực tế, hệ thống sẽ 
                      kết nối với API của LMS thông qua các endpoint được cấu hình.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sync Tab */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  🔄 Cơ chế đồng bộ dữ liệu
                </h4>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Học kỳ hiện tại: <strong>{CURRENT_SEMESTER.name}</strong> ({CURRENT_SEMESTER.id})
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">1. Đồng bộ tự động</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Hệ thống tự động kiểm tra và cập nhật trạng thái bài tập mỗi 30 giây.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-xs font-mono">
                    <div className="text-green-600">✓ Kết nối LMS API</div>
                    <div className="text-green-600">✓ Lấy danh sách bài tập được giao</div>
                    <div className="text-green-600">✓ Cập nhật trạng thái activeSemester</div>
                    <div className="text-green-600">✓ Đồng bộ thống kê sinh viên</div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">2. Đồng bộ thủ công</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Giáo viên có thể bấm nút "Làm mới" để cập nhật dữ liệu ngay lập tức.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-xs">
                    <code>LMS_API.getAssignedExercises() → syncActiveSemesterStatus()</code>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">3. Xử lý lỗi</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Khi mất kết nối với LMS, hệ thống sẽ giữ nguyên trạng thái cuối cùng và thông báo lỗi.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 text-xs text-red-700 dark:text-red-300">
                    ⚠️ Fallback: Sử dụng cache local khi API không khả dụng
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  📊 Các loại thống kê có sẵn
                </h4>
                <p className="text-purple-800 dark:text-purple-200 text-sm">
                  Hệ thống cung cấp nhiều mức độ thống kê từ tổng quan đến chi tiết.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">📈 Thống kê bài tập</h5>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Tổng số sinh viên được giao</li>
                    <li>• Số lượng đã nộp bài</li>
                    <li>• Tỷ lệ hoàn thành (%)</li>
                    <li>• Điểm trung bình</li>
                    <li>• Số bài nộp đúng hạn/trễ</li>
                    <li>• Danh sách lớp đang sử dụng</li>
                    <li>• Chi tiết từng sinh viên</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">🎓 Thống kê môn học</h5>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Tổng số lớp học</li>
                    <li>• Tổng số sinh viên</li>
                    <li>• Số bài tập đang sử dụng</li>
                    <li>• Tỷ lệ hoàn thành trung bình</li>
                    <li>• Thống kê theo chương</li>
                    <li>• Tỷ lệ sử dụng bài tập</li>
                    <li>• Gợi ý cải thiện</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">🔍 Cách xem thống kê</h5>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span>Nút <strong>👥</strong> trên bài tập → Thống kê chi tiết bài tập</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Nút <strong>"Thống kê môn học"</strong> → Tổng quan toàn môn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Badge <strong>"Đang dùng HK"</strong> → Bài tập đang được sử dụng</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Tab */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  🔄 Quy trình hoạt động
                </h4>
                <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                  Từ khi tạo bài tập đến khi theo dõi kết quả sinh viên.
                </p>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Tạo bài tập trong Ngân hàng</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Giáo viên tạo bài tập mới hoặc chỉnh sửa bài tập có sẵn. Hệ thống tự động tạo mã định danh (code).
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-xs">
                      <code>Ví dụ: PROG-CH01-BASIC-001</code>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Giao bài tập trong LMS</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Giáo viên sử dụng mã bài tập để giao cho lớp học trong hệ thống LMS.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-xs">
                      LMS Assignment: Exercise Code = PROG-CH01-BASIC-001
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Đồng bộ tự động</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Hệ thống tự động phát hiện bài tập đã được giao và đánh dấu "activeSemester = true".
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-2 text-xs">
                      ✓ Badge "Đang dùng HK" xuất hiện trên bài tập
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Sinh viên làm bài</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sinh viên nộp bài trong LMS. Dữ liệu được thu thập và đồng bộ về Ngân hàng bài tập.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2 text-xs">
                      Submission Data: StudentID, Score, SubmittedAt, Status
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-1">Xem thống kê</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Giáo viên và quản lý có thể xem thống kê chi tiết về tiến độ và kết quả của sinh viên.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-xs">
                      📊 Real-time statistics & analytics
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">🔧 Cấu hình kỹ thuật</h5>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <div><strong>API Endpoints:</strong> /api/assignments, /api/submissions</div>
                  <div><strong>Sync Interval:</strong> 30 seconds (configurable)</div>
                  <div><strong>Data Format:</strong> JSON REST API</div>
                  <div><strong>Authentication:</strong> JWT Token based</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationGuide;