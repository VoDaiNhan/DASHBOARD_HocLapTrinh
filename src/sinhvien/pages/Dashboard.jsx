import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateProgressData, competencyByCourse, competencyAssessment, courseExercises } from '../data/data';

  const Dashboard = ({ setCurrentPage }) => {
  const [userName, setUserName] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.full_name || '');
    }

    const savedCourses = sessionStorage.getItem('enrolledCourses');
    if (savedCourses) {
      setEnrolledCourses(JSON.parse(savedCourses));
    }
  }, []);

  // Tạo dữ liệu cho biểu đồ tiến độ
  const progressData = enrolledCourses.length > 0 
    ? generateProgressData(enrolledCourses) 
    : [];

  // Màu sắc cho từng khóa học (để phân biệt các đường trên biểu đồ)
  const courseColors = [
    '#3f51b5', // Primary Blue
    '#ff9800', // Accent Orange
    '#22c55e', // Success Green
    '#ef4444', // Danger Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f59e0b'  // Warning Amber
  ];

  // Hàm xác định mức độ dựa trên điểm số
  const getLevel = (score) => {
    if (score >= 90) return { level: 'Giỏi', color: 'bg-success-500', textColor: 'text-success-700' };
    if (score >= 80) return { level: 'Khá', color: 'bg-primary-500', textColor: 'text-primary-700' };
    if (score >= 60) return { level: 'Trung bình', color: 'bg-warning-500', textColor: 'text-warning-700' };
    return { level: 'Yếu', color: 'bg-danger-500', textColor: 'text-danger-700' };
  };

  return (
    <div className="space-y-6">
      {/* Tiêu đề chào mừng */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary-500 dark:text-primary-400">
          Chào mừng sinh viên {userName || 'Sinh viên'} quay lại dashboard!
        </h1>
      </div>

      {/* Hàng 1: Khung môn học + Biểu đồ tiến độ */}
      {enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Khung hiển thị các môn đã đăng ký */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
            style={{ height: '500px', overflowY: 'auto' }}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Các môn đã đăng ký
            </h2>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {course.name}
                    </h3>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      {course.progress || 0}%
                    </span>
                </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        course.progress === 100 ? 'bg-success-500' :
                        course.progress >= 50 ? 'bg-primary-500' : 'bg-warning-500'
                      }`}
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                </div>
                  {course.code && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.code}
                  </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Biểu đồ tiến độ học tập */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" style={{ height: '500px' }}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              📊 Biểu đồ Tiến độ Học tập
            </h2>
            {progressData.length > 0 ? (
              <div className="w-full h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280" 
                  className="dark:stroke-gray-400"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280" 
                  className="dark:stroke-gray-400"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #3f51b5',
                        borderRadius: '8px',
                  }}
                  formatter={(value, name) => {
                    if (name === 'target') return [`${value}%`, 'Mục tiêu'];
                        // Tìm tên khóa học từ enrolledCourses
                        const course = enrolledCourses.find(c => {
                          const courseKey = c.name.replace(/[^a-zA-Z0-9]/g, '_');
                          return courseKey === name;
                        });
                        return [`${value}%`, course?.name || name];
                  }}
                />
                    {/* Đường Mục tiêu - Render đầu tiên để hiển thị đầu tiên trong legend */}
                <Line 
                  type="monotone" 
                  dataKey="target" 
                      stroke="#ff9800" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                      dot={{ fill: '#ff9800', strokeWidth: 2, r: 5 }}
                      name="Mục tiêu (theo tuần)"
                    />
                    {/* Đường cho từng khóa học - Render sau */}
                    {enrolledCourses.map((course, index) => {
                      const courseKey = course.name.replace(/[^a-zA-Z0-9]/g, '_');
                      const color = courseColors[index % courseColors.length];
                      return (
                        <Line
                          key={course.id}
                          type="monotone"
                          dataKey={courseKey}
                          stroke={color}
                          strokeWidth={3}
                          dot={{ fill: color, strokeWidth: 2, r: 6 }}
                          name={course.name}
                        />
                      );
                    })}
                    <Legend 
                      content={({ payload }) => {
                        if (!payload || !payload.length) return null;
                        // Sắp xếp: Mục tiêu đứng đầu, sau đó là các khóa học
                        const sortedPayload = [...payload].sort((a, b) => {
                          if (a.dataKey === 'target') return -1;
                          if (b.dataKey === 'target') return 1;
                          return 0;
                        });
                        return (
                          <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {sortedPayload.map((entry, index) => (
                              <div key={index} className="flex items-center gap-2">
                                {entry.dataKey === 'target' ? (
                                  <svg width="16" height="4" className="flex-shrink-0">
                                    <line 
                                      x1="0" 
                                      y1="2" 
                                      x2="16" 
                                      y2="2" 
                                      stroke="#ff9800" 
                                      strokeWidth="2" 
                                      strokeDasharray="4 4"
                                    />
                                  </svg>
                                ) : (
                                  <div 
                                    className="w-4 h-1 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: entry.color }}
                                  />
                                )}
                                <span className="text-sm" style={{ color: entry.color }}>
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                />
              </LineChart>
            </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Chưa có dữ liệu tiến độ
              </div>
            )}
            </div>
          </div>
        )}

      {/* Hàng 2: Phân loại năng lực theo từng môn */}
      {enrolledCourses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            📊 Phân loại năng lực theo từng môn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => {
              const competencies = competencyByCourse[course.id] || {};
              return (
                <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
                    {course.name}
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(competencies).map(([name, score]) => {
                      const levelInfo = getLevel(score);
                      return (
                        <div key={name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {name}
                            </span>
                            <span className={`text-sm font-bold ${levelInfo.textColor}`}>
                              {score}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${levelInfo.color}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs ${levelInfo.textColor} font-semibold`}>
                            {levelInfo.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
            </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hàng 3: Đánh giá tổng hợp theo tiêu chí/năng lực */}
      {enrolledCourses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            🎯 Đánh giá tổng hợp theo tiêu chí/năng lực
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(competencyAssessment).map(([key, assessment]) => {
              const levelInfo = getLevel(assessment.score);
              return (
                <div
                  key={key}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                      {key}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      levelInfo.level === 'Giỏi' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      levelInfo.level === 'Khá' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      levelInfo.level === 'Trung bình' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {assessment.level}
                    </span>
                  </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Tỉ lệ đạt</span>
                        <span className="text-lg font-bold text-primary-500 dark:text-primary-400">
                          {assessment.score}%
                        </span>
                      </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${levelInfo.color}`}
                        style={{ width: `${assessment.score}%` }}
                    ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {assessment.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    <span className="font-semibold">Môn học:</span> {assessment.courses.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Thông báo khi chưa có khóa học */}
      {enrolledCourses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Chưa có khóa học nào được đăng ký
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
