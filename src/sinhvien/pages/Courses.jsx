import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { availableCourses } from '../data/data';
import Toast from '../components/Toast';

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEnrollModal, setShowEnrollModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Load enrolled courses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c.id === courseId);
  };

  const handleEnroll = (course) => {
    setShowEnrollModal(course);
  };

  const confirmEnroll = () => {
    if (showEnrollModal) {
      const newCourse = {
        ...showEnrollModal,
        enrolledDate: new Date().toISOString(),
        progress: 0,
        grade: 0,
        attendance: 0,
        assignments: {
          completed: 0,
          total: 15
        },
        topics: showEnrollModal.topics.map(topic => ({
          ...topic,
          progress: 0,
          status: 'not-started'
        }))
      };
      setEnrolledCourses([...enrolledCourses, newCourse]);
      setShowEnrollModal(null);
      
      // Show success notification
      setToast({
        message: `Đăng ký thành công khóa học: ${showEnrollModal.name}`,
        type: 'success'
      });
    }
  };

  const handleStartLearning = (courseId) => {
    const courseName = availableCourses.find(c => c.id === courseId)?.name;
    setToast({
      message: `Chuyển đến trang học khóa "${courseName}"... (Tính năng đang phát triển)`,
      type: 'info'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = availableCourses.filter(course => {
    if (filterStatus === 'enrolled') return isEnrolled(course.id);
    if (filterStatus === 'available') return !isEnrolled(course.id);
    return true;
  });

  const coursesForChart = enrolledCourses.map(c => ({
    name: c.code,
    progress: c.progress
  }));

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Danh sách Khóa học</h1>
          <p className="text-gray-600">Đăng ký và quản lý các khóa học của bạn</p>
        </div>
        
        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({availableCourses.length})
          </button>
          <button
            onClick={() => setFilterStatus('enrolled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'enrolled'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đã đăng ký ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'available'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chưa đăng ký ({availableCourses.length - enrolledCourses.length})
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {enrolledCourses.length}
          </div>
          <div className="text-sm text-gray-600">Khóa học đã đăng ký</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {enrolledCourses.filter(c => c.progress === 100).length}
          </div>
          <div className="text-sm text-gray-600">Khóa học hoàn thành</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {enrolledCourses.reduce((sum, c) => sum + c.credits, 0)}
          </div>
          <div className="text-sm text-gray-600">Tổng tín chỉ đang học</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {enrolledCourses.length > 0 
              ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Tiến độ trung bình</div>
        </div>
      </div>

      {/* Progress Chart */}
      {coursesForChart.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tiến độ các Khóa học Đã Đăng ký</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursesForChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
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
                <Bar dataKey="progress" name="Tiến độ (%)">
                  {coursesForChart.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.progress >= 70 ? '#22c55e' : entry.progress >= 40 ? '#eab308' : '#3b82f6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Empty State */}
      {enrolledCourses.length === 0 && filterStatus === 'enrolled' && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có khóa học nào</h3>
          <p className="text-gray-600 mb-4">Bạn chưa đăng ký khóa học nào. Hãy chọn khóa học phù hợp để bắt đầu học!</p>
          <button
            onClick={() => setFilterStatus('available')}
            className="btn-primary"
          >
            Xem khóa học có sẵn
          </button>
        </div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          const enrolledCourse = enrolledCourses.find(c => c.id === course.id);
          
          return (
            <div
              key={course.id}
              className="card hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-4xl">{course.thumbnail}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                      {enrolled && (
                        <span className="badge bg-green-100 text-green-800">
                          ✓ Đã đăng ký
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{course.code}</strong> • {course.credits} tín chỉ
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <span className="badge bg-blue-100 text-blue-800">
                  {course.category}
                </span>
                <span className="badge bg-purple-100 text-purple-800">
                  ⏱️ {course.duration}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-4">{course.description}</p>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    👨‍🏫 {course.instructor}
                  </div>
                  <div className="flex items-center text-gray-600">
                    👥 {course.enrolled}/{course.maxStudents} SV
                  </div>
                  <div className="flex items-center text-gray-600">
                    📅 {course.schedule}
                  </div>
                  <div className="flex items-center text-gray-600">
                    🏫 {course.room}
                  </div>
                </div>

                {enrolled && enrolledCourse && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Tiến độ học tập</span>
                      <span className="text-sm font-bold text-gray-800">{enrolledCourse.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          enrolledCourse.progress === 100 ? 'bg-green-500' : 
                          enrolledCourse.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${enrolledCourse.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 btn-secondary text-sm"
                >
                  📄 Chi tiết
                </button>
                {enrolled ? (
                  <button
                    onClick={() => handleStartLearning(course.id)}
                    className="flex-1 btn-primary text-sm"
                  >
                    🎓 Vào học
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course)}
                    className="flex-1 btn-primary text-sm"
                  >
                    ✅ Đăng ký ngay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-5xl">{selectedCourse.thumbnail}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedCourse.name}</h2>
                    <p className="text-blue-100 mb-2">
                      {selectedCourse.code} • {selectedCourse.credits} tín chỉ • {selectedCourse.semester}
                    </p>
                    <p className="text-blue-100">👨‍🏫 {selectedCourse.instructor}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-white hover:text-gray-200 text-3xl font-bold ml-4"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Mô tả khóa học</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedCourse.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedCourse.credits}</div>
                  <div className="text-xs font-semibold text-blue-700 dark:text-gray-400 mt-1">Tín chỉ</div>
                </div>
                <div className="text-center p-4 rounded-lg border-2 border-green-200 dark:border-green-800" style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' }}>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedCourse.duration}</div>
                  <div className="text-xs font-semibold text-green-700 dark:text-gray-400 mt-1">Thời lượng</div>
                </div>
                <div className="text-center p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }}>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedCourse.enrolled}/{selectedCourse.maxStudents}</div>
                  <div className="text-xs font-semibold text-purple-700 dark:text-gray-400 mt-1">Sinh viên</div>
                </div>
                <div className="text-center p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800" style={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)' }}>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${getDifficultyColor(selectedCourse.difficulty)}`}>
                    {selectedCourse.difficulty}
                  </div>
                  <div className="text-xs font-semibold text-orange-700 dark:text-gray-400 mt-1">Độ khó</div>
                </div>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Nội dung Khóa học</h3>
                <div className="space-y-3">
                  {selectedCourse.topics.map((topic, idx) => (
                    <div 
                      key={idx} 
                      className="topic-item rounded-lg p-4 hover:shadow-lg transition-all hover:scale-[1.02] border-l-4 border-primary-500 dark:border-primary-400 dark:bg-gray-700/50"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="topic-number flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-1">{topic.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Info */}
              <div className="rounded-lg p-5 border-2 border-indigo-200 dark:border-gray-700" style={{ background: 'linear-gradient(145deg, #eef2ff 0%, #e0e7ff 100%)' }}>
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">📋</span> Thông tin Lịch học
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">📅 Lịch học:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{selectedCourse.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">🏫 Phòng học:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{selectedCourse.room}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">📚 Loại môn:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{selectedCourse.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">📊 Học kỳ:</span>
                    <span className="font-bold text-gray-800 dark:text-white">{selectedCourse.semester}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="btn-secondary"
              >
                Đóng
              </button>
              {isEnrolled(selectedCourse.id) ? (
                <button
                  onClick={() => {
                    setSelectedCourse(null);
                    handleStartLearning(selectedCourse.id);
                  }}
                  className="btn-primary"
                >
                  🎓 Vào học ngay
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedCourse(null);
                    handleEnroll(availableCourses.find(c => c.id === selectedCourse.id));
                  }}
                  className="btn-primary"
                >
                  ✅ Đăng ký khóa học
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enroll Confirmation Modal */}
      {showEnrollModal && (
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{showEnrollModal.thumbnail}</div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Xác nhận Đăng ký</h2>
                <p className="text-gray-600 dark:text-gray-400">Bạn có chắc chắn muốn đăng ký khóa học:</p>
                <p className="font-bold text-primary-600 dark:text-primary-400 mt-2">{showEnrollModal.name}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-r-lg mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Thông tin:</strong>
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>• Mã môn: {showEnrollModal.code}</li>
                  <li>• Tín chỉ: {showEnrollModal.credits}</li>
                  <li>• Giảng viên: {showEnrollModal.instructor}</li>
                  <li>• Lịch học: {showEnrollModal.schedule}</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowEnrollModal(null)}
                className="btn-secondary"
              >
                Hủy
              </button>
              <button
                onClick={confirmEnroll}
                className="btn-primary"
              >
                ✅ Xác nhận đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
