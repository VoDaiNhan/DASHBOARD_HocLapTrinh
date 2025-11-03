import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { errorStats, submissions } from '../data/data';

const Feedback = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'passed':
        return 'Đạt';
      case 'partial':
        return 'Đạt một phần';
      case 'failed':
        return 'Chưa đạt';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Lỗi & Phản hồi</h1>
        <p className="text-gray-600 dark:text-gray-400">Phân tích lỗi và gợi ý cải thiện</p>
      </div>

      {/* Error Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Thống kê Lỗi</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {errorStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Biểu đồ Số lượng Lỗi</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="type" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '2px solid #6366f1',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
                    padding: '12px 16px',
                    fontWeight: '600'
                  }}
                  itemStyle={{
                    color: '#1f2937',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                  labelStyle={{
                    color: '#6366f1',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                />
                <Bar dataKey="count" name="Số lỗi">
                  {errorStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Danh sách Bài nộp Gần đây</h2>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{submission.assignmentName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nộp lúc: {submission.submittedAt}</p>
                </div>
                <div className="text-right">
                  <span className={`badge ${getStatusColor(submission.status)}`}>
                    {getStatusLabel(submission.status)}
                  </span>
                  <p className="text-lg font-bold text-gray-800 dark:text-white mt-2">
                    {submission.score} điểm
                  </p>
                </div>
              </div>

              {/* Test Results */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Test Cases</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {submission.testsPassed}/{submission.testsTotal} passed
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      submission.testsPassed === submission.testsTotal
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(submission.testsPassed / submission.testsTotal) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Errors and Suggestions */}
              {submission.errors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Lỗi & Gợi ý sửa:</h4>
                  {submission.errors.map((error, idx) => (
                    <div key={idx} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-3 rounded-r">
                      <div className="flex items-start space-x-2">
                        <span className="text-red-600 dark:text-red-400 font-medium text-sm">{error.type}:</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">{error.description}</p>
                          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-2 rounded-r">
                            <p className="text-xs text-green-800 dark:text-green-300">
                              💡 <strong>Gợi ý:</strong> {error.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {submission.errors.length === 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-3 rounded-r">
                  <p className="text-sm text-green-800 dark:text-green-300 flex items-center">
                    <span className="mr-2">🎉</span>
                    Tuyệt vời! Bài làm của bạn hoàn hảo, không có lỗi nào.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Common Errors Tips */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">💡 Mẹo tránh lỗi thường gặp</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Syntax Error:</strong> Luôn kiểm tra dấu ngoặc, dấu chấm phẩy và cú pháp trước khi chạy code.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Logic Error:</strong> Test code với nhiều trường hợp khác nhau, đặc biệt là edge cases.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Runtime Error:</strong> Kiểm tra null/undefined trước khi truy cập thuộc tính của object.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Best Practice:</strong> Sử dụng console.log() để debug và hiểu rõ flow của chương trình.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Feedback;

