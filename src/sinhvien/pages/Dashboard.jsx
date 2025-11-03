import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KPICard from '../components/KPICard';
import AlertCard from '../components/AlertCard';
import CountUp from '../components/CountUp';
import { studentInfo, alerts, generateProgressData, sampleProgressData } from '../data/data';

  const Dashboard = ({ setCurrentPage }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  // Tạo dữ liệu tiến độ có ý nghĩa
  const progressData = enrolledCourses.length > 0 
    ? generateProgressData(enrolledCourses) 
    : sampleProgressData;

  // Calculate KPI data from enrolled courses
  const totalAssignments = enrolledCourses.reduce((sum, c) => sum + c.assignments.total, 0);
  const completedAssignments = enrolledCourses.reduce((sum, c) => sum + c.assignments.completed, 0);
  const avgProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
    : 0;
  const avgGrade = enrolledCourses.length > 0
    ? (enrolledCourses.reduce((sum, c) => sum + c.grade, 0) / enrolledCourses.length).toFixed(1)
    : 0;
  const studyHoursPerWeek = enrolledCourses.length * 3; // Estimate 3 hours per course per week

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tổng quan Dashboard</h1>
        <p className="text-gray-600">Theo dõi tiến độ học tập và các chỉ số quan trọng</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <>
          {/* Welcome Hero Section */}
          <div className="card text-center py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ 
              backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            <div className="relative z-10">
              <div className="text-7xl mb-4 animate-bounce">🎓</div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Chào mừng đến với Student Learning Dashboard!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Hệ thống quản lý tiến độ học tập thông minh giúp bạn theo dõi khóa học, 
                bài tập, kỹ năng và phát triển toàn diện
              </p>
              <button 
                onClick={() => setCurrentPage('courses')}
                className="btn-primary text-lg px-8 py-3"
              >
                📖 Khám phá Khóa học ngay
              </button>
            </div>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Khóa học đa dạng</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hơn 8 khóa học chất lượng từ cơ bản đến nâng cao
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Theo dõi tiến độ</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Biểu đồ trực quan giúp bạn nắm rõ tiến độ học tập
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Gợi ý thông minh</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bài tập và lộ trình được cá nhân hóa theo trình độ
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">🐛</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Phân tích lỗi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phản hồi chi tiết và gợi ý cách sửa lỗi
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Kỹ năng mềm</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đánh giá và phát triển kỹ năng làm việc nhóm
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Thành tích</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nhận badges và theo dõi thành tích học tập
              </p>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🚀</span> Hướng dẫn Bắt đầu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="pl-8">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Đăng ký khóa học</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Truy cập trang "Khóa học" và chọn các môn học phù hợp với bạn
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="pl-8">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Làm bài tập</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hoàn thành các bài tập được gợi ý để nâng cao kỹ năng
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="pl-8">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Theo dõi tiến độ</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Xem thống kê, biểu đồ và cải thiện kết quả học tập
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                <CountUp end={8} duration={2000} suffix="+" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Khóa học chất lượng</div>
            </div>
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                <CountUp end={40} duration={2500} suffix="+" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Bài tập thực hành</div>
            </div>
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hỗ trợ học tập</div>
            </div>
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                <CountUp end={100} duration={2500} suffix="%" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Miễn phí sử dụng</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Tiến độ học tập"
              value={`${avgProgress}%`}
              subtitle="Trung bình các khóa học"
              icon="📈"
              color="blue"
            />
            <KPICard
              title="Bài tập"
              value={`${completedAssignments}/${totalAssignments}`}
              subtitle="Đã nộp / Tổng số"
              icon="📝"
              color="green"
            />
            <KPICard
              title="Điểm trung bình"
              value={avgGrade}
              subtitle={`Từ ${enrolledCourses.length} khóa học`}
              icon="⭐"
              color="purple"
            />
            <KPICard
              title="Giờ học / tuần"
              value={studyHoursPerWeek}
              subtitle="Giờ học ước tính"
              icon="⏰"
              color="orange"
            />
          </div>
        </>
      )}

      {/* Biểu đồ tiến độ */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">📊 Biểu đồ Tiến độ Học tập</h2>
          {enrolledCourses.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {progressData[progressData.length - 1]?.completedExercises || 0}
              </span>
              <span className="mx-1">/</span>
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {progressData[progressData.length - 1]?.totalExercises || 0}
              </span>
              <span className="ml-1">bài tập hoàn thành</span>
            </div>
          )}
        </div>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Chưa có dữ liệu tiến độ
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Đăng ký khóa học để theo dõi tiến độ học tập của bạn
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">📊 Biểu đồ sẽ hiển thị:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Tiến độ hoàn thành bài tập theo tuần</li>
                <li>• So sánh với mục tiêu học tập</li>
                <li>• Xu hướng học tập và cải thiện</li>
                <li>• Dự đoán khả năng hoàn thành khóa học</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-full h-80">
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
                    fontSize: '16px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'progress') return [`${value}%`, 'Tiến độ thực tế'];
                    if (name === 'target') return [`${value}%`, 'Mục tiêu'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Tiến độ thực tế"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                  name="Mục tiêu"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {/* Thông tin insight */}
        {enrolledCourses.length > 0 && progressData.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">🎯 Hiệu suất</div>
              <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                {Math.round((progressData[progressData.length - 1]?.progress || 0) / (progressData[progressData.length - 1]?.target || 1) * 100)}%
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300">so với mục tiêu</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-sm font-semibold text-green-800 dark:text-green-200">📈 Xu hướng</div>
              <div className="text-lg font-bold text-green-900 dark:text-green-100">
                {progressData[progressData.length - 1]?.progress > progressData[progressData.length - 2]?.progress ? 'Tăng' : 'Ổn định'}
              </div>
              <div className="text-xs text-green-600 dark:text-green-300">tuần này</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">⏱️ Dự kiến</div>
              <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                {Math.max(0, Math.round((100 - (progressData[progressData.length - 1]?.progress || 0)) / 10))} tuần
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-300">để hoàn thành</div>
            </div>
          </div>
        )}
      </div>

      {/* Cảnh báo và Khóa học */}
      {enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Cảnh báo & Thông báo</h2>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Khóa học của tôi</h2>
            <div className="space-y-3">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{course.name}</h3>
                    <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        course.progress === 100 ? 'bg-green-500' :
                        course.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {course.code} • {course.assignments.completed}/{course.assignments.total} bài tập
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

