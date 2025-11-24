import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { availableCourses, generateProgressData, studyGroups, groupAssignments, courseLessons } from '../data/data';
import Toast from '../components/Toast';

// Load Highcharts More module - cần thiết cho gauge chart
let moreModuleInitialized = false;

const initMoreModule = async () => {
  if (moreModuleInitialized) return;
  
  try {
    // Highcharts cần highcharts-more module để hỗ trợ gauge chart
    const moreModule = await import('highcharts/highcharts-more.js');
    const initMore = moreModule.default || moreModule;
    if (typeof initMore === 'function') {
      initMore(Highcharts);
      moreModuleInitialized = true;
    }
  } catch (err) {
    console.error('Failed to load highcharts-more module:', err);
  }
};

// Component Gauge Chart sử dụng Highcharts
const GaugeChart = ({ value, courseName, size = 250 }) => {
  const chartRef = useRef(null);
  const percentage = Math.min(100, Math.max(0, value));
  
  // Màu sắc dựa trên giá trị
  let gaugeColor = '#ef4444'; // Red
  if (percentage >= 75) gaugeColor = '#22c55e'; // Green
  else if (percentage >= 50) gaugeColor = '#f59e0b'; // Yellow/Orange
  
  const options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%'
    },
    credits: {
      enabled: false // Tắt watermark "Highcharts.com"
    },
    title: {
      text: null // Bỏ title vì đã có tên khóa học ở ngoài
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9, // Giống mẫu để đảm bảo labels nằm đúng trên đường cong
      background: null,
      center: ['50%', '75%'],
      size: '110%'
    },
    // Trục giá trị - từ 0 đến 100%
    yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: null, // Tắt auto tick để dùng tickPositions
      tickPosition: 'inside',
      tickColor: '#FFFFFF',
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      tickPositions: [0, 25, 50, 75, 100], // Chỉ hiển thị các mốc này
      labels: {
        distance: 10, // Giảm distance để labels nằm sát trên đường cong
        style: {
          fontSize: '14px',
          color: '#666'
        },
        formatter: function() {
          return this.value + '%';
        }
      },
      lineWidth: 0,
      // Các vùng màu: Red (0-50%), Yellow (50-75%), Green (75-100%)
      plotBands: [{
        from: 0,
        to: 50,
        color: '#ef4444', // Red
        thickness: 20,
        borderRadius: '50%'
      }, {
        from: 50,
        to: 75,
        color: '#f59e0b', // Yellow/Orange
        thickness: 20,
        borderRadius: '50%'
      }, {
        from: 75,
        to: 100,
        color: '#22c55e', // Green
        thickness: 20,
        borderRadius: '50%'
      }]
    },
    series: [{
      name: 'Tiến độ',
      data: [percentage],
      tooltip: {
        valueSuffix: ' %'
      },
      dataLabels: {
        enabled: false // Tắt số phần trăm dưới cây kim
      },
      dial: {
        radius: '80%',
        backgroundColor: '#1f2937',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: '#1f2937',
        radius: 6
      }
    }]
  };
  
  return (
    <div style={{ width: '100%', height: `${size * 0.6}px`, maxWidth: `${size}px`, margin: '0 auto', overflow: 'hidden' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    // Khởi tạo state từ sessionStorage ngay từ đầu
    const saved = sessionStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEnrollModal, setShowEnrollModal] = useState(null);
  const [toast, setToast] = useState(null);
  const isFirstRender = useRef(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupForAssignments, setSelectedGroupForAssignments] = useState(null);
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState(null);
  const [learningLessons, setLearningLessons] = useState({}); // { lessonId: { startTime, timer } }
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = sessionStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [joinedGroups, setJoinedGroups] = useState(() => {
    // Khởi tạo state từ sessionStorage
    const saved = sessionStorage.getItem('joinedGroups');
    return saved ? JSON.parse(saved) : [];
  });
  const [gaugeReady, setGaugeReady] = useState(false);

  // Initialize Highcharts More module khi component mount (cần cho gauge chart)
  useEffect(() => {
    initMoreModule().then(() => {
      setGaugeReady(true);
    });
  }, []);

  // Lấy thông tin user hiện tại
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  // Save to sessionStorage whenever enrolledCourses changes (bỏ qua lần render đầu tiên)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    sessionStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Save to sessionStorage whenever joinedGroups changes
  useEffect(() => {
    sessionStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
  }, [joinedGroups]);

  // Kiểm tra user đã tham gia nhóm chưa
  const isUserJoinedGroup = (groupId) => {
    return joinedGroups.some(g => g.id === groupId);
  };

  // Xử lý tham gia nhóm
  const handleJoinGroup = (group) => {
    if (!currentUser) {
      setToast({
        message: 'Vui lòng đăng nhập để tham gia nhóm',
        type: 'warning'
      });
      return;
    }

    if (isUserJoinedGroup(group.id)) {
      setToast({
        message: 'Bạn đã tham gia nhóm này rồi',
        type: 'info'
      });
      return;
    }

    // Lưu vào joinedGroups (chỉ lưu id và thời gian tham gia)
    setJoinedGroups([...joinedGroups, { 
      id: group.id, 
      joinedAt: new Date().toISOString(),
      userInfo: {
        id: currentUser.id || Date.now(),
        name: currentUser.full_name || 'User',
        mssv: currentUser.mssv,
        role: 'Member'
      }
    }]);

    setToast({
      message: `Đã tham gia nhóm "${group.name}" thành công!`,
      type: 'success'
    });

    // Đóng modal
    setSelectedGroup(null);
  };

  // Lấy danh sách thành viên kèm user đã tham gia
  const getGroupMembersWithJoined = (group) => {
    const joinedGroup = joinedGroups.find(g => g.id === group.id);
    const isUserInOriginalMembers = currentUser && group.members.some(m => m.mssv === currentUser.mssv);
    
    // Nếu user đã tham gia và chưa có trong danh sách gốc
    if (joinedGroup && !isUserInOriginalMembers && joinedGroup.userInfo) {
      return [...group.members, joinedGroup.userInfo];
    }
    
    return group.members;
  };

  // Xử lý rời nhóm
  const handleLeaveGroup = (groupId) => {
    setJoinedGroups(joinedGroups.filter(g => g.id !== groupId));
    setToast({
      message: 'Đã rời nhóm thành công',
      type: 'success'
    });
    setSelectedGroup(null);
  };

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
    const course = availableCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForLessons(course);
    }
  };

  // Xử lý bắt đầu học bài
  const handleStartLesson = (lessonId) => {
    const startTime = Date.now();
    const lesson = Object.values(courseLessons).flat().find(l => l.id === lessonId);
    if (!lesson) return;

    // Đếm ngược 5 phút (300 giây) cho demo
    const demoTime = 300; // 5 phút = 300 giây
    let remaining = demoTime;

    // Tạo timer
    const timer = setInterval(() => {
      remaining -= 1;
      
      setLearningLessons(prev => {
        if (prev[lessonId]) {
          return {
            ...prev,
            [lessonId]: {
              ...prev[lessonId],
              remainingTime: remaining
            }
          };
        }
        return prev;
      });

      if (remaining <= 0) {
        clearInterval(timer);
        // Tự động hoàn thành bài học
        handleCompleteLesson(lessonId);
      }
    }, 1000);

    // Set trạng thái đang học với timer
    setLearningLessons(prev => ({
      ...prev,
      [lessonId]: {
        startTime,
        remainingTime: demoTime,
        lesson,
        timer
      }
    }));
  };

  // Tính tiến độ khóa học dựa trên số bài học đã hoàn thành
  const calculateCourseProgress = (courseId, completedLessonsList) => {
    const lessons = courseLessons[courseId] || [];
    if (lessons.length === 0) return 0;
    
    const completedCount = lessons.filter(l => completedLessonsList.includes(l.id)).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  // Update tiến độ khóa học trong enrolledCourses
  const updateCourseProgress = (courseId, completedLessonsList) => {
    const newProgress = calculateCourseProgress(courseId, completedLessonsList);
    setEnrolledCourses(prev => {
      const updated = prev.map(course => 
        course.id === courseId 
          ? { ...course, progress: newProgress }
          : course
      );
      // Lưu vào sessionStorage ngay lập tức
      sessionStorage.setItem('enrolledCourses', JSON.stringify(updated));
      // Dispatch custom event để Dashboard có thể cập nhật
      window.dispatchEvent(new Event('coursesUpdated'));
      return updated;
    });
  };

  // Xử lý hoàn thành bài học
  const handleCompleteLesson = (lessonId) => {
    // Xóa khỏi learningLessons
    setLearningLessons(prev => {
      const newState = { ...prev };
      if (newState[lessonId]?.timer) {
        clearInterval(newState[lessonId].timer);
      }
      delete newState[lessonId];
      return newState;
    });

    // Thêm vào completedLessons
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      sessionStorage.setItem('completedLessons', JSON.stringify(newCompleted));
      
      // Tìm courseId từ lesson
      const lesson = Object.values(courseLessons).flat().find(l => l.id === lessonId);
      if (lesson) {
        // Update tiến độ khóa học với danh sách completed mới
        updateCourseProgress(lesson.courseId, newCompleted);
      }
    }

    setToast({
      message: 'Hoàn thành bài học!',
      type: 'success'
    });
  };

  // Format thời gian đếm ngược
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup timers khi component unmount
  useEffect(() => {
    return () => {
      Object.values(learningLessons).forEach(lesson => {
        if (lesson.timer) {
          clearInterval(lesson.timer);
        }
      });
    };
  }, []);

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

  // Tạo dữ liệu cho biểu đồ tiến độ (mỗi khóa học 1 đường)
  const progressData = enrolledCourses.length > 0 
    ? generateProgressData(enrolledCourses) 
    : [];

  // Màu sắc cho từng khóa học
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

  // Nếu đang xem bài học, hiển thị trang bài học
  if (selectedCourseForLessons) {
    const lessons = courseLessons[selectedCourseForLessons.id] || [];
    const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
    const inProgressCount = Object.keys(learningLessons).filter(lessonId => 
      lessons.some(l => l.id === parseInt(lessonId))
    ).length;

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

        {/* Button Quay lại và Tiêu đề */}
        <div className="relative">
          <button
            onClick={() => setSelectedCourseForLessons(null)}
            className="btn-secondary flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200"
          >
            <span>←</span> Quay lại
          </button>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              📖 Bài học: {selectedCourseForLessons.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {selectedCourseForLessons.code} • {selectedCourseForLessons.instructor}
            </p>
          </div>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-500 mb-2">{lessons.length}</div>
            <div className="text-sm text-gray-600">Tổng số bài học</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-warning-500 mb-2">{inProgressCount}</div>
            <div className="text-sm text-gray-600">Đang học</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-success-500 mb-2">{completedCount}</div>
            <div className="text-sm text-gray-600">Đã hoàn thành</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gray-500 mb-2">
              {lessons.length - completedCount - inProgressCount}
            </div>
            <div className="text-sm text-gray-600">Chưa bắt đầu</div>
          </div>
        </div>

        {/* Danh sách bài học */}
        <div className="space-y-4">
          {lessons.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Chưa có bài học</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Khóa học này chưa có bài học nào.
              </p>
            </div>
          ) : (
            lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isLearning = learningLessons[lesson.id];
              const remainingTime = isLearning ? learningLessons[lesson.id].remainingTime : 0;

              return (
                <div 
                  key={lesson.id} 
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span className="badge bg-success-100 text-success-800">
                            ✓ Đã hoàn thành
                          </span>
                        )}
                        {isLearning && !isCompleted && (
                          <span className="badge bg-warning-100 text-warning-800 animate-pulse">
                            ⏱️ Đang học
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>⏱️ Thời lượng:</strong> {lesson.duration} phút
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>📚 Loại:</strong> 
                        <span className="ml-2 badge bg-primary-100 text-primary-800">
                          {lesson.type === 'video' ? 'Video' : lesson.type === 'reading' ? 'Đọc' : 'Thực hành'}
                        </span>
                      </p>
                      {isLearning && (
                        <p className="text-sm font-semibold text-warning-600 mt-2">
                          ⏳ Còn lại: {formatTime(remainingTime)}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>📝 Nội dung:</strong>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {lesson.content}
                      </p>
                    </div>
                  </div>

                  {/* Button Học bài */}
                  <div className="flex justify-end gap-3">
                    {isCompleted ? (
                      <button
                        disabled
                        className="btn btn-success opacity-75 cursor-not-allowed"
                      >
                        ✓ Đã hoàn thành
                      </button>
                    ) : isLearning ? (
                      <>
                        <button
                          onClick={() => handleCompleteLesson(lesson.id)}
                          className="btn btn-success flex items-center gap-2"
                        >
                          ✓ Hoàn thành
                        </button>
                        <button
                          disabled
                          className="btn btn-warning flex items-center gap-2"
                        >
                          <span className="animate-spin">⏱️</span>
                          Đang học ({formatTime(remainingTime)})
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartLesson(lesson.id)}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        📖 Học bài
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // Nếu đang xem bài tập nhóm, hiển thị trang bài tập nhóm
  if (selectedGroupForAssignments) {
    const assignments = groupAssignments[selectedGroupForAssignments.id] || [];
    const getStatusColor = (status) => {
      switch (status) {
        case 'not-started':
          return 'bg-gray-100 text-gray-800';
        case 'in-progress':
          return 'bg-warning-100 text-warning-800';
        case 'submitted':
          return 'bg-primary-100 text-primary-800';
        case 'graded':
          return 'bg-success-100 text-success-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case 'not-started':
          return 'Chưa bắt đầu';
        case 'in-progress':
          return 'Đang làm';
        case 'submitted':
          return 'Đã nộp';
        case 'graded':
          return 'Đã chấm';
        default:
          return 'N/A';
      }
    };

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

        {/* Button Quay lại và Tiêu đề */}
        <div className="relative">
          <button
            onClick={() => setSelectedGroupForAssignments(null)}
            className="btn-secondary flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200"
          >
            <span>←</span> Quay lại
          </button>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              📚 Bài tập Nhóm: {selectedGroupForAssignments.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {availableCourses.find(c => c.id === selectedGroupForAssignments.courseId)?.name || selectedGroupForAssignments.courseName}
            </p>
          </div>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-500 mb-2">{assignments.length}</div>
            <div className="text-sm text-gray-600">Tổng số bài tập</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-warning-500 mb-2">
              {assignments.filter(a => a.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">Đang làm</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-success-500 mb-2">
              {assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length}
            </div>
            <div className="text-sm text-gray-600">Đã nộp</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-500 mb-2">
              {assignments.filter(a => a.status === 'not-started').length}
            </div>
            <div className="text-sm text-gray-600">Chưa bắt đầu</div>
          </div>
        </div>

        {/* Danh sách bài tập nhóm */}
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Chưa có bài tập nhóm</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nhóm này chưa có bài tập nào. Hãy chờ giảng viên hoặc leader tạo bài tập.
              </p>
            </div>
          ) : (
            assignments.map((assignment) => {
              const deadlineDate = new Date(assignment.deadline);
              const isOverdue = deadlineDate < new Date() && assignment.status !== 'submitted' && assignment.status !== 'graded';
              
              return (
                <div 
                  key={assignment.id} 
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {assignment.title}
                        </h3>
                        <span className={`badge ${getStatusColor(assignment.status)}`}>
                          {getStatusLabel(assignment.status)}
                        </span>
                        {isOverdue && (
                          <span className="badge bg-danger-100 text-danger-800">
                            ⚠️ Quá hạn
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {assignment.description}
                      </p>
                    </div>
                    {assignment.score !== null && (
                      <div className="text-right ml-4">
                        <div className="text-3xl font-bold text-primary-500">
                          {assignment.score}/{assignment.maxScore}
                        </div>
                        <div className="text-sm text-gray-600">Điểm</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>📅 Deadline:</strong> {deadlineDate.toLocaleDateString('vi-VN')} {deadlineDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>⏱️ Thời gian ước tính:</strong> {assignment.estimatedTime}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>📊 Độ khó:</strong> 
                        <span className={`ml-2 badge ${
                          assignment.level === 'Easy' ? 'bg-success-100 text-success-800' :
                          assignment.level === 'Medium' ? 'bg-warning-100 text-warning-800' :
                          'bg-danger-100 text-danger-800'
                        }`}>
                          {assignment.level}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>💼 Kỹ năng:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Yêu cầu */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      📋 Yêu cầu:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {assignment.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Đóng góp thành viên */}
                  {assignment.members && assignment.members.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        👥 Đóng góp thành viên:
                      </p>
                      <div className="space-y-2">
                        {assignment.members.map((member, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700 dark:text-gray-300">{member.name}</span>
                              <span className="text-xs text-gray-500">({member.contribution})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                  className="bg-primary-500 h-2 rounded-full"
                                  style={{ width: `${member.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">
                                {member.progress}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {assignment.status === 'not-started' && (
                      <button className="btn-primary text-sm">
                        🚀 Bắt đầu làm bài
                      </button>
                    )}
                    {assignment.status === 'in-progress' && (
                      <>
                        <button className="btn-primary text-sm flex-1">
                          ✏️ Tiếp tục làm bài
                        </button>
                        <button className="btn-accent text-sm">
                          📤 Nộp bài
                        </button>
                      </>
                    )}
                    {assignment.status === 'submitted' && (
                      <button className="btn-secondary text-sm">
                        👁️ Xem bài đã nộp
                      </button>
                    )}
                    {assignment.status === 'graded' && (
                      <button className="btn-primary text-sm">
                        📊 Xem kết quả
                      </button>
                    )}
                    <button className="btn-secondary text-sm">
                      💬 Thảo luận
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

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

      {/* Progress Chart - Gauge Chart */}
      {enrolledCourses.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tiến độ các Khóa học Đã Đăng ký</h2>
          {gaugeReady ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {enrolledCourses.map((course) => {
                const progress = course.progress || 0;
                const gaugeSize = 220; // Kích thước cho 4 cột trên 1 hàng
                
                return (
                  <div key={course.id} className="flex flex-col items-center justify-center p-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-center text-base">
                      {course.name}
                    </h3>
                    <div className="w-full flex justify-center">
                      <GaugeChart value={progress} courseName={course.name} size={gaugeSize} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[420px] text-gray-500 dark:text-gray-400">
              Đang tải biểu đồ...
            </div>
          )}
        </div>
      )}

      {/* DT056: Nhóm học tập - Chỉ hiển thị nhóm của khóa học đã đăng ký */}
      {(() => {
        // Lọc nhóm học tập dựa trên enrolledCourses
        const enrolledCourseIds = enrolledCourses.map(c => c.id);
        const filteredGroups = studyGroups.filter(group => enrolledCourseIds.includes(group.courseId));
        
        return filteredGroups.length > 0 ? (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">👥 Nhóm Học tập</h2>
            <div className="relative">
              {/* Button Prev mờ ở góc trái */}
              <button
                className="prev-button absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-white to-transparent flex items-center justify-start pl-2 opacity-0 transition-opacity duration-300"
                style={{ zIndex: 10, pointerEvents: 'none' }}
                onClick={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget.nextElementSibling;
                  if (container) {
                    container.scrollBy({ left: -300, behavior: 'smooth' });
                  }
                }}
              >
                <span className="text-4xl font-bold text-gray-400 bounce-arrow" style={{ fontFamily: 'Arial, sans-serif' }}>&lt;</span>
              </button>
              
              <div 
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                ref={(el) => {
                  if (el) {
                    let isDown = false;
                    let startX;
                    let scrollLeft;
                    
                    // Thêm event listener để ẩn/hiện button next và prev
                    const handleScroll = () => {
                      const nextButton = el.parentElement?.querySelector('.next-button');
                      const prevButton = el.parentElement?.querySelector('.prev-button');
                      
                      if (nextButton && prevButton) {
                        const isScrollable = el.scrollWidth > el.clientWidth;
                        const isAtStart = el.scrollLeft <= 10;
                        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
                        
                        // Button Next
                        nextButton.style.opacity = isScrollable && !isAtEnd ? '0.3' : '0';
                        nextButton.style.pointerEvents = isScrollable && !isAtEnd ? 'auto' : 'none';
                        
                        // Button Prev
                        prevButton.style.opacity = isScrollable && !isAtStart ? '0.3' : '0';
                        prevButton.style.pointerEvents = isScrollable && !isAtStart ? 'auto' : 'none';
                      }
                    };
                    
                    // Drag to scroll functionality
                    const handleMouseDown = (e) => {
                      // Prevent text selection
                      e.preventDefault();
                      isDown = true;
                      el.classList.add('cursor-grabbing');
                      el.classList.remove('cursor-grab');
                      startX = e.pageX - el.offsetLeft;
                      scrollLeft = el.scrollLeft;
                    };
                    
                    const handleMouseLeave = () => {
                      isDown = false;
                      el.classList.remove('cursor-grabbing');
                      el.classList.add('cursor-grab');
                    };
                    
                    const handleMouseUp = () => {
                      isDown = false;
                      el.classList.remove('cursor-grabbing');
                      el.classList.add('cursor-grab');
                    };
                    
                    const handleMouseMove = (e) => {
                      if (!isDown) return;
                      e.preventDefault();
                      const x = e.pageX - el.offsetLeft;
                      const walk = (x - startX) * 2; // Scroll speed multiplier
                      el.scrollLeft = scrollLeft - walk;
                    };
                    
                    // Touch events for mobile
                    let touchStartX = 0;
                    let touchScrollLeft = 0;
                    
                    const handleTouchStart = (e) => {
                      touchStartX = e.touches[0].pageX - el.offsetLeft;
                      touchScrollLeft = el.scrollLeft;
                    };
                    
                    const handleTouchMove = (e) => {
                      if (!touchStartX) return;
                      const x = e.touches[0].pageX - el.offsetLeft;
                      const walk = (x - touchStartX) * 2;
                      el.scrollLeft = touchScrollLeft - walk;
                    };
                    
                    const handleTouchEnd = () => {
                      touchStartX = 0;
                    };
                    
                    // Add event listeners
                    el.addEventListener('scroll', handleScroll);
                    el.addEventListener('mousedown', handleMouseDown);
                    el.addEventListener('mouseleave', handleMouseLeave);
                    el.addEventListener('mouseup', handleMouseUp);
                    el.addEventListener('mousemove', handleMouseMove);
                    el.addEventListener('touchstart', handleTouchStart);
                    el.addEventListener('touchmove', handleTouchMove);
                    el.addEventListener('touchend', handleTouchEnd);
                    
                    // Check initial state after a short delay to ensure layout is ready
                    setTimeout(handleScroll, 100);
                    // Also check on resize
                    window.addEventListener('resize', handleScroll);
                    
                    return () => {
                      window.removeEventListener('resize', handleScroll);
                      el.removeEventListener('scroll', handleScroll);
                      el.removeEventListener('mousedown', handleMouseDown);
                      el.removeEventListener('mouseleave', handleMouseLeave);
                      el.removeEventListener('mouseup', handleMouseUp);
                      el.removeEventListener('mousemove', handleMouseMove);
                      el.removeEventListener('touchstart', handleTouchStart);
                      el.removeEventListener('touchmove', handleTouchMove);
                      el.removeEventListener('touchend', handleTouchEnd);
                    };
                  }
                }}
              >
                {filteredGroups.map((group) => {
              const course = availableCourses.find(c => c.id === group.courseId);
              const nextMeetingDate = new Date(group.nextMeeting);
              const isUserLeader = currentUser && group.members.some(m => m.role === 'Leader' && m.mssv === currentUser.mssv);
              const isJoined = isUserJoinedGroup(group.id);
              const isUserInOriginalMembers = currentUser && group.members.some(m => m.mssv === currentUser.mssv);
              const isUserMember = isUserInOriginalMembers || isJoined;
              
              // Tính tiến độ nhóm từ bài tập (thay vì dùng group.progress hardcode)
              // Công thức: (Số bài tập đã hoàn thành / Tổng số bài tập) × 100
              const calculatedProgress = group.assignments.total > 0
                ? Math.round((group.assignments.completed / group.assignments.total) * 100)
                : 0;
              
              // Sử dụng calculatedProgress nếu có, nếu không thì dùng group.progress (fallback)
              const displayProgress = calculatedProgress || group.progress || 0;
              
              return (
                <div 
                  key={group.id} 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800 flex-shrink-0 select-none"
                  style={{ minWidth: '320px', maxWidth: '320px', userSelect: 'none', WebkitUserSelect: 'none' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course?.name || group.courseName}
                      </p>
                    </div>
                    <span className={`badge ${
                      group.status === 'active' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {group.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Tiến độ nhóm</span>
                      <span className="text-sm font-bold text-gray-800 dark:text-white">{displayProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${displayProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Dựa trên: {group.assignments.completed}/{group.assignments.total} bài tập hoàn thành
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Thành viên ({getGroupMembersWithJoined(group).length}):</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {getGroupMembersWithJoined(group).map((member) => (
                        <div key={member.id} className="text-xs">
                          <span className="text-gray-600 dark:text-gray-400">
                            {member.name}
                            {member.role === 'Leader' && <span className="text-accent-600 dark:text-accent-400 font-semibold ml-1">(Leader)</span>}
                            {currentUser && member.mssv === currentUser.mssv && <span className="text-primary-600 dark:text-primary-400 font-semibold ml-1">(Bạn)</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Bài tập:</strong> {group.assignments.completed}/{group.assignments.total} hoàn thành
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Buổi họp tiếp theo:</strong> {nextMeetingDate.toLocaleDateString('vi-VN')} {nextMeetingDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!isUserMember && !isJoined ? (
                      <>
                        <button 
                          onClick={() => setSelectedGroup(group)}
                          className="btn-primary text-sm flex-1"
                        >
                          📝 Xem chi tiết
                        </button>
                        <button 
                          onClick={() => handleJoinGroup(group)}
                          className="btn-accent text-sm"
                        >
                          ➕ Tham gia
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setSelectedGroupForAssignments(group)}
                        className="btn-primary text-sm w-full"
                      >
                        📚 Vào làm bài tập
                      </button>
                    )}
                    {isUserLeader && (isUserMember || isJoined) && (
                      <button className="btn-accent text-sm">
                        ⚙️ Quản lý
                      </button>
                    )}
                  </div>
                </div>
              );
                })}
              </div>
              {/* Button Next mờ ở góc phải */}
              <button
                className="next-button absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-white to-transparent flex items-center justify-end pr-2 opacity-0 transition-opacity duration-300"
                style={{ zIndex: 10, pointerEvents: 'auto' }}
                onClick={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget.previousElementSibling;
                  if (container) {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }}
              >
                <span className="text-4xl font-bold text-gray-400 bounce-arrow" style={{ fontFamily: 'Arial, sans-serif' }}>&gt;</span>
              </button>
            </div>
          </div>
        ) : null;
      })()}

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
              </div>

              <div className="h-16 mb-4 overflow-hidden">
                <p className="text-sm text-gray-700 line-clamp-3">{course.description}</p>
              </div>

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
                    className="flex-1 btn-accent text-sm"
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
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-t-lg">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                  <div className="text-2xl font-bold text-primary-500 dark:text-primary-400">{selectedCourse.credits}</div>
                  <div className="text-xs font-semibold text-blue-700 dark:text-gray-400 mt-1">Tín chỉ</div>
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
                  className="btn-accent"
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
                  className="btn-accent"
              >
                ✅ Xác nhận đăng ký
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Detail Modal */}
      {selectedGroup && (
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
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedGroup.name}</h2>
                  <p className="text-blue-100 mb-2">
                    {availableCourses.find(c => c.id === selectedGroup.courseId)?.name || selectedGroup.courseName}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${
                      selectedGroup.status === 'active' 
                        ? 'bg-success-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {selectedGroup.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                    <span className="text-blue-100">
                      👥 {getGroupMembersWithJoined(selectedGroup).length} thành viên
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-white hover:text-gray-200 text-3xl font-bold ml-4"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Tiến độ nhóm */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">📊 Tiến độ Nhóm</h3>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-800 dark:text-white font-semibold">Tiến độ hiện tại</span>
                    <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">
                      {selectedGroup.assignments.total > 0
                        ? Math.round((selectedGroup.assignments.completed / selectedGroup.assignments.total) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                    <div
                      className="bg-primary-500 h-4 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${selectedGroup.assignments.total > 0
                          ? Math.round((selectedGroup.assignments.completed / selectedGroup.assignments.total) * 100)
                          : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {selectedGroup.assignments.completed}/{selectedGroup.assignments.total} bài tập đã hoàn thành
                  </p>
                </div>
              </div>

              {/* Thành viên */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">👥 Thành viên</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getGroupMembersWithJoined(selectedGroup).map((member) => {
                    const isCurrentUser = currentUser && member.mssv === currentUser.mssv;
                    return (
                      <div 
                        key={member.id} 
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-white truncate">
                            {member.name}
                            {member.role === 'Leader' && <span className="text-accent-600 dark:text-accent-400 font-semibold ml-1">(Leader)</span>}
                            {isCurrentUser && <span className="text-primary-500 dark:text-primary-400 font-semibold ml-1">(Bạn)</span>}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">MSSV: {member.mssv}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Thông tin Bài tập */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">📝 Bài tập Nhóm</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg border-l-4 border-success-500">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Đã hoàn thành</p>
                    <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                      {selectedGroup.assignments.completed}
                    </p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border-l-4 border-primary-500">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tổng số</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {selectedGroup.assignments.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lịch họp */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">📅 Lịch Họp</h3>
                <div className="bg-accent-50 dark:bg-accent-900/20 p-4 rounded-lg border-l-4 border-accent-500">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buổi họp tiếp theo</p>
                  <p className="text-xl font-bold text-accent-600 dark:text-accent-400">
                    {new Date(selectedGroup.nextMeeting).toLocaleDateString('vi-VN', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
                    {new Date(selectedGroup.nextMeeting).toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              {/* Mô tả nhóm */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">ℹ️ Thông tin</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Nhóm học tập này được tạo để hỗ trợ các thành viên học tập và làm bài tập cùng nhau. 
                    Các thành viên có thể trao đổi, thảo luận và hỗ trợ lẫn nhau trong quá trình học.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedGroup(null)}
                className="btn-secondary"
              >
                Đóng
              </button>
              {!isUserJoinedGroup(selectedGroup.id) && !selectedGroup.members.some(m => currentUser && m.mssv === currentUser.mssv) && (
                <button
                  onClick={() => handleJoinGroup(selectedGroup)}
                  className="btn-accent"
                >
                  ➕ Tham gia Nhóm
                </button>
              )}
              {(isUserJoinedGroup(selectedGroup.id) || selectedGroup.members.some(m => currentUser && m.mssv === currentUser.mssv)) && (
                <button
                  onClick={() => {
                    handleLeaveGroup(selectedGroup.id);
                    setSelectedGroup(null);
                  }}
                  className="btn-danger"
                >
                  🚪 Rời Nhóm
                </button>
              )}
              {currentUser && selectedGroup.members.some(m => m.role === 'Leader' && m.mssv === currentUser.mssv) && (
                <button className="btn-primary">
                  ⚙️ Quản lý Nhóm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
