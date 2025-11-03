import React, { useState, useEffect } from 'react';
import { courseExercises, learningPath } from '../data/data';

const Exercises = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      setEnrolledCourses(JSON.parse(saved));
    }
  }, []);

  // Lấy tất cả bài tập từ các khóa học đã đăng ký
  const allExercises = enrolledCourses.flatMap(course => 
    courseExercises[course.id] || []
  );

  const filteredExercises = allExercises.filter((exercise) => {
    const levelMatch = selectedLevel === 'all' || exercise.level === selectedLevel;
    const courseMatch = selectedCourse === 'all' || exercise.courseId === parseInt(selectedCourse);
    return levelMatch && courseMatch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bài tập Gợi ý</h1>
        <p className="text-gray-600">Danh sách bài tập được cá nhân hóa dựa trên khóa học của bạn</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có bài tập</h3>
          <p className="text-gray-600 mb-4">
            Bạn cần đăng ký khóa học trước để có bài tập gợi ý
          </p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="card">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Khóa học:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[200px]"
                >
                  <option value="all">Tất cả khóa học</option>
                  {enrolledCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Độ khó:</label>
                <div className="flex gap-2">
                  {['all', 'Easy', 'Medium', 'Hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedLevel === level
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level === 'all' ? 'Tất cả' : level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{allExercises.length}</div>
              <div className="text-sm text-gray-600">Tổng số bài tập</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allExercises.filter(e => e.completed).length}
              </div>
              <div className="text-sm text-gray-600">Đã hoàn thành</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {allExercises.length - allExercises.filter(e => e.completed).length}
              </div>
              <div className="text-sm text-gray-600">Còn lại</div>
            </div>
          </div>

          {/* Exercise Cards by Course */}
          {selectedCourse === 'all' ? (
            // Nhóm theo khóa học
            enrolledCourses.map(course => {
              const courseExs = courseExercises[course.id] || [];
              const filteredCourseExs = courseExs.filter(ex => 
                selectedLevel === 'all' || ex.level === selectedLevel
              );

              if (filteredCourseExs.length === 0) return null;

              return (
                <div key={course.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                      {course.thumbnail} {course.name}
                    </h2>
                    <span className="text-sm text-gray-600">
                      {filteredCourseExs.length} bài tập
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCourseExs.map((exercise) => (
                      <div key={exercise.id} className="card hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{exercise.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                          </div>
                          {exercise.completed && (
                            <span className="text-2xl ml-2">✅</span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`badge ${getLevelColor(exercise.level)}`}>
                            {exercise.level}
                          </span>
                          <span className="badge bg-blue-100 text-blue-800">
                            {exercise.fitPercent}% phù hợp
                          </span>
                          <span className="badge bg-purple-100 text-purple-800">
                            {exercise.points} điểm
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {exercise.skills.map((skill, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-sm text-gray-600">⏱️ {exercise.estimatedTime}</span>
                          <button className="btn-primary text-sm">
                            {exercise.completed ? 'Làm lại' : 'Làm bài ngay'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Hiển thị bài tập của khóa học được chọn
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExercises.map((exercise) => (
                <div key={exercise.id} className="card hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{exercise.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    </div>
                    {exercise.completed && (
                      <span className="text-2xl ml-2">✅</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`badge ${getLevelColor(exercise.level)}`}>
                      {exercise.level}
                    </span>
                    <span className="badge bg-blue-100 text-blue-800">
                      {exercise.fitPercent}% phù hợp
                    </span>
                    <span className="badge bg-purple-100 text-purple-800">
                      {exercise.points} điểm
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">⏱️ {exercise.estimatedTime}</span>
                    <button className="btn-primary text-sm">
                      {exercise.completed ? 'Làm lại' : 'Làm bài ngay'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Learning Path */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Lộ trình Học tập</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>
              <div className="space-y-6">
                {learningPath.map((path, index) => (
                  <div key={path.id} className="relative flex items-start">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 ${
                        path.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : path.status === 'current'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {path.status === 'completed' ? '✓' : index + 1}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-colors">
                        <h3 className="font-bold text-gray-800 mb-1">{path.title}</h3>
                        <p className="text-sm text-gray-600">{path.date}</p>
                        {path.status === 'current' && (
                          <span className="inline-block mt-2 text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                            Đang học
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Exercises;
