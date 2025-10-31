import React, { useState, useEffect } from 'react';
import { studentInfo, achievements } from '../data/data';

const Profile = () => {
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  // Calculate stats from enrolled courses
  const totalAssignments = enrolledCourses.reduce((sum, c) => sum + c.assignments.total, 0);
  const completedAssignments = enrolledCourses.reduce((sum, c) => sum + c.assignments.completed, 0);
  const totalProjects = enrolledCourses.length;
  const completedProjects = enrolledCourses.filter(c => c.progress === 100).length;
  const totalStudyHours = enrolledCourses.length * 42; // 15 weeks * 3 hours per week average
  const averageScore = enrolledCourses.length > 0
    ? (enrolledCourses.reduce((sum, c) => sum + c.grade, 0) / enrolledCourses.length).toFixed(1)
    : 0;
  const highestScore = enrolledCourses.length > 0
    ? Math.max(...enrolledCourses.map(c => c.grade))
    : 0;
  const lowestScore = enrolledCourses.length > 0
    ? Math.min(...enrolledCourses.map(c => c.grade))
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">👤 Hồ sơ Học tập</h1>
        <p className="text-gray-600 dark:text-gray-400">Tổng kết thành tích và tiến độ học tập của bạn</p>
      </div>

      {/* Student Profile Card */}
      <div className="card relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
        ></div>
        <div className="relative z-10 text-white">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={studentInfo.avatar}
                  alt={studentInfo.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{studentInfo.name}</h2>
                <p className="text-blue-100 text-sm">MSSV: {studentInfo.studentId}</p>
                <p className="text-blue-100 text-sm">{studentInfo.class} • {studentInfo.currentSemester}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                    {studentInfo.level}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    studentInfo.riskLevel === 'Low' ? 'bg-green-500/80' :
                    studentInfo.riskLevel === 'Medium' ? 'bg-yellow-500/80' :
                    'bg-red-500/80'
                  }`}>
                    Nguy cơ: {studentInfo.riskLevel}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowReportPreview(true)}
              className="bg-white/90 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              📄 Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Study Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center hover:scale-105 transition-transform duration-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"></div>
          <div className="relative z-10">
            <div className="text-5xl mb-3">📝</div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{completedAssignments}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bài tập hoàn thành</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              / {totalAssignments} tổng số
            </div>
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform duration-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"></div>
          <div className="relative z-10">
            <div className="text-5xl mb-3">⭐</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{averageScore || 0}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Điểm trung bình</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {highestScore > 0 ? `Cao nhất: ${highestScore}` : 'Chưa có điểm'}
            </div>
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform duration-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"></div>
          <div className="relative z-10">
            <div className="text-5xl mb-3">⏰</div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{totalStudyHours}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tổng giờ học</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Trong học kỳ
            </div>
          </div>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform duration-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"></div>
          <div className="relative z-10">
            <div className="text-5xl mb-3">🎓</div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{enrolledCourses.length}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Khóa học</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Đã đăng ký
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">🏆 Thành tích</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-400 dark:border-yellow-500 shadow-md'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-300 dark:border-gray-600 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`text-6xl mb-4 transition-transform duration-300 ${
                  achievement.earned ? 'animate-bounce' : 'grayscale'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${
                  achievement.earned 
                    ? 'text-gray-800 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  achievement.earned 
                    ? 'text-gray-600 dark:text-gray-300' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned ? (
                  <div className="space-y-2">
                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                      ✓ Đã đạt
                    </span>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {achievement.earnedDate}
                    </div>
                  </div>
                ) : (
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-semibold">
                    🔒 Chưa đạt
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">📊 Tổng kết Học tập</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📝</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Tổng số bài tập:</span>
              </div>
              <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">{totalAssignments}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Đã hoàn thành:</span>
              </div>
              <span className="font-bold text-2xl text-green-600 dark:text-green-400">{completedAssignments}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎓</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Tổng số khóa học:</span>
              </div>
              <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">{totalProjects}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏆</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Khóa học hoàn thành:</span>
              </div>
              <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">{completedProjects}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg border-l-4 border-indigo-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Điểm trung bình:</span>
              </div>
              <span className="font-bold text-3xl text-indigo-600 dark:text-indigo-400">{averageScore || 0}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg border-l-4 border-pink-500">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Cấp độ hiện tại:</span>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg">
                {studentInfo.level}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">🎯 Mục tiêu & Tiến độ</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎓</span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Hoàn thành khóa học</span>
                </div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studentInfo.progress}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${studentInfo.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📝</span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Bài tập</span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏆</span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Khóa học</span>
                </div>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className={`mt-6 p-6 rounded-xl border-l-4 ${
              studentInfo.riskLevel === 'Low' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500' 
                : studentInfo.riskLevel === 'Medium'
                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-500'
                : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-500'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">
                  {studentInfo.riskLevel === 'Low' ? '✅' : 
                   studentInfo.riskLevel === 'Medium' ? '⚠️' : '🚨'}
                </span>
                <div>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    Nguy cơ học kém: 
                    <span className={`ml-2 ${
                      studentInfo.riskLevel === 'Low' ? 'text-green-600 dark:text-green-400' :
                      studentInfo.riskLevel === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {studentInfo.riskLevel}
                    </span>
                  </p>
                </div>
              </div>
              <p className={`text-sm font-medium ${
                studentInfo.riskLevel === 'Low' 
                  ? 'text-green-700 dark:text-green-300' 
                  : studentInfo.riskLevel === 'Medium'
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {studentInfo.riskLevel === 'Low' 
                  ? '🎉 Tiến độ học tập tốt! Hãy duy trì nhịp độ này.' 
                  : studentInfo.riskLevel === 'Medium'
                  ? '⚠️ Cần chú ý hơn đến việc học. Hãy nộp bài đúng hạn.'
                  : '🚨 Cảnh báo! Cần cải thiện tiến độ học tập ngay.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportPreview && (
        <div 
          className="bg-black bg-opacity-60 flex items-center justify-center p-4" 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 9999,
            margin: 0,
            padding: '1rem'
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Báo cáo Học tập Cá nhân</h2>
                <button
                  onClick={() => setShowReportPreview(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
                <img
                  src={studentInfo.avatar}
                  alt={studentInfo.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500"
                />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{studentInfo.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">MSSV: {studentInfo.studentId}</p>
                <p className="text-gray-600 dark:text-gray-400">{studentInfo.class}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Tổng quan</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                    <p className="text-gray-600 dark:text-gray-400">Điểm TB:</p>
                    <p className="font-bold text-lg text-primary-600 dark:text-primary-400">{averageScore || 0}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                    <p className="text-gray-600 dark:text-gray-400">Tiến độ:</p>
                    <p className="font-bold text-lg text-green-600 dark:text-green-400">
                      {enrolledCourses.length > 0 
                        ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
                        : 0}%
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                    <p className="text-gray-600 dark:text-gray-400">Bài hoàn thành:</p>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{completedAssignments}/{totalAssignments}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                    <p className="text-gray-600 dark:text-gray-400">Giờ học:</p>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{totalStudyHours}h</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Thành tích đã đạt</h4>
                <div className="flex flex-wrap gap-2">
                  {achievements.filter(a => a.earned).map(achievement => (
                    <span key={achievement.id} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-yellow-300">
                      {achievement.icon} {achievement.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Báo cáo được tạo tự động • {new Date().toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowReportPreview(false)}
                className="btn-secondary"
              >
                Đóng
              </button>
              <button className="btn-primary">
                📥 Tải xuống PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

