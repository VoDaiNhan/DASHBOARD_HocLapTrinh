// 🔗 INTEGRATION SYSTEM: Kết nối Ngân hàng bài tập với hệ thống học tập
// Quản lý việc đồng bộ dữ liệu giữa Exercise Bank và Learning Management System

// ==================== MOCK DATA - Mô phỏng hệ thống thực tế ====================

// Mock data cho học kỳ hiện tại
export const CURRENT_SEMESTER = {
  id: 'HK1_2024_2025',
  name: 'Học kỳ 1 năm học 2024-2025',
  startDate: '2024-09-01',
  endDate: '2025-01-15',
  status: 'active'
};

// Mock data cho các lớp học và bài tập được giao
export const ASSIGNED_EXERCISES = {
  // Lớp Kỹ thuật lập trình - Nhóm 1
  'KTLT_N01': {
    className: 'Kỹ thuật lập trình - Nhóm 1',
    courseKey: 'Kỹ thuật lập trình',
    teacher: 'TS. Nguyễn Văn A',
    studentCount: 45,
    assignedExercises: [
      {
        exerciseCode: 'PROG-CH01-BASIC-001',
        assignedDate: '2024-09-15',
        dueDate: '2024-09-22',
        status: 'active'
      },
      {
        exerciseCode: 'PROG-CH01-BASIC-002',
        assignedDate: '2024-09-22',
        dueDate: '2024-09-29',
        status: 'active'
      },
      {
        exerciseCode: 'PROG-CH01-ADV-001',
        assignedDate: '2024-10-01',
        dueDate: '2024-10-15',
        status: 'active'
      },
      {
        exerciseCode: 'PROG-CH02-BASIC-001',
        assignedDate: '2024-10-05',
        dueDate: '2024-10-12',
        status: 'active'
      },
      {
        exerciseCode: 'PROG-CH03-BASIC-001',
        assignedDate: '2024-10-15',
        dueDate: '2024-10-22',
        status: 'active'
      }
    ]
  },
  
  // Lớp OOP - Nhóm 2
  'OOP_N02': {
    className: 'Lập trình hướng đối tượng - Nhóm 2',
    courseKey: 'Lập trình hướng đối tượng',
    teacher: 'ThS. Trần Thị B',
    studentCount: 38,
    assignedExercises: [
      {
        exerciseCode: 'OOP-CH01-BASIC-001',
        assignedDate: '2024-09-10',
        dueDate: '2024-09-17',
        status: 'completed'
      },
      {
        exerciseCode: 'OOP-CH01-BASIC-002',
        assignedDate: '2024-09-17',
        dueDate: '2024-09-24',
        status: 'active'
      },
      {
        exerciseCode: 'OOP-CH02-BASIC-001',
        assignedDate: '2024-09-24',
        dueDate: '2024-10-01',
        status: 'active'
      },
      {
        exerciseCode: 'OOP-CH04-ADV-001',
        assignedDate: '2024-10-08',
        dueDate: '2024-10-15',
        status: 'active'
      }
    ]
  },
  
  // Lớp Cấu trúc dữ liệu - Nhóm 3
  'CTDL_N03': {
    className: 'Cấu trúc dữ liệu - Nhóm 3',
    courseKey: 'Cấu trúc dữ liệu',
    teacher: 'PGS. Lê Văn C',
    studentCount: 42,
    assignedExercises: [
      {
        exerciseCode: 'DS-CH01-BASIC-001',
        assignedDate: '2024-09-12',
        dueDate: '2024-09-19',
        status: 'active'
      },
      {
        exerciseCode: 'DS-CH01-ADV-001',
        assignedDate: '2024-09-20',
        dueDate: '2024-09-27',
        status: 'active'
      },
      {
        exerciseCode: 'DS-CH05-BASIC-001',
        assignedDate: '2024-10-10',
        dueDate: '2024-10-17',
        status: 'active'
      }
    ]
  },
  
  // Lớp Cơ sở dữ liệu - Nhóm 1
  'CSDL_N01': {
    className: 'Cơ sở dữ liệu - Nhóm 1',
    courseKey: 'Cơ sở dữ liệu',
    teacher: 'TS. Phạm Thị D',
    studentCount: 40,
    assignedExercises: [
      {
        exerciseCode: 'DB-CH01-BASIC-001',
        assignedDate: '2024-09-08',
        dueDate: '2024-09-15',
        status: 'active'
      },
      {
        exerciseCode: 'DB-CH02-BASIC-001',
        assignedDate: '2024-09-16',
        dueDate: '2024-09-23',
        status: 'active'
      },
      {
        exerciseCode: 'DB-CH03-ADV-001',
        assignedDate: '2024-09-25',
        dueDate: '2024-10-02',
        status: 'active'
      }
    ]
  }
};

// Mock data cho kết quả làm bài của sinh viên
export const STUDENT_SUBMISSIONS = {
  'PROG-CH01-BASIC-001': {
    totalStudents: 45,
    submissions: [
      { studentId: 'SV001', studentName: 'Nguyễn Văn An', submittedAt: '2024-09-20', score: 8.5, status: 'completed' },
      { studentId: 'SV002', studentName: 'Trần Thị Bình', submittedAt: '2024-09-21', score: 9.0, status: 'completed' },
      { studentId: 'SV003', studentName: 'Lê Văn Cường', submittedAt: null, score: null, status: 'not_submitted' },
      { studentId: 'SV004', studentName: 'Phạm Thị Dung', submittedAt: '2024-09-19', score: 7.5, status: 'completed' },
      { studentId: 'SV005', studentName: 'Hoàng Văn Em', submittedAt: '2024-09-22', score: 8.0, status: 'completed' },
    ],
    statistics: {
      submitted: 42,
      notSubmitted: 3,
      averageScore: 8.2,
      completionRate: 93.3,
      onTime: 38,
      late: 4,
      resubmissions: 8,
      correctSubmissions: 38
    }
  },
  
  'PROG-CH01-BASIC-002': {
    totalStudents: 45,
    submissions: [
      { studentId: 'SV001', studentName: 'Nguyễn Văn An', submittedAt: '2024-09-28', score: 9.0, status: 'completed' },
      { studentId: 'SV002', studentName: 'Trần Thị Bình', submittedAt: null, score: null, status: 'in_progress' },
      { studentId: 'SV003', studentName: 'Lê Văn Cường', submittedAt: null, score: null, status: 'not_started' },
    ],
    statistics: {
      submitted: 25,
      notSubmitted: 20,
      averageScore: 8.5,
      completionRate: 55.6,
      onTime: 23,
      late: 2,
      resubmissions: 12,
      correctSubmissions: 20
    }
  },
  
  'PROG-CH01-ADV-001': {
    totalStudents: 45,
    statistics: {
      submitted: 38,
      notSubmitted: 7,
      averageScore: 8.8,
      completionRate: 84.4,
      onTime: 35,
      late: 3
    }
  },
  
  'PROG-CH02-BASIC-001': {
    totalStudents: 45,
    statistics: {
      submitted: 40,
      notSubmitted: 5,
      averageScore: 8.3,
      completionRate: 88.9,
      onTime: 38,
      late: 2
    }
  },
  
  'PROG-CH03-BASIC-001': {
    totalStudents: 45,
    statistics: {
      submitted: 35,
      notSubmitted: 10,
      averageScore: 7.9,
      completionRate: 77.8,
      onTime: 32,
      late: 3
    }
  },
  
  'OOP-CH01-BASIC-001': {
    totalStudents: 38,
    statistics: {
      submitted: 36,
      notSubmitted: 2,
      averageScore: 8.7,
      completionRate: 94.7,
      onTime: 34,
      late: 2
    }
  },
  
  'OOP-CH01-BASIC-002': {
    totalStudents: 38,
    statistics: {
      submitted: 30,
      notSubmitted: 8,
      averageScore: 8.4,
      completionRate: 78.9,
      onTime: 28,
      late: 2
    }
  },
  
  'OOP-CH02-BASIC-001': {
    totalStudents: 38,
    statistics: {
      submitted: 32,
      notSubmitted: 6,
      averageScore: 8.6,
      completionRate: 84.2,
      onTime: 30,
      late: 2
    }
  },
  
  'OOP-CH04-ADV-001': {
    totalStudents: 38,
    statistics: {
      submitted: 28,
      notSubmitted: 10,
      averageScore: 8.1,
      completionRate: 73.7,
      onTime: 25,
      late: 3
    }
  },
  
  'DS-CH01-BASIC-001': {
    totalStudents: 42,
    statistics: {
      submitted: 39,
      notSubmitted: 3,
      averageScore: 8.5,
      completionRate: 92.9,
      onTime: 37,
      late: 2
    }
  },
  
  'DS-CH01-ADV-001': {
    totalStudents: 42,
    statistics: {
      submitted: 35,
      notSubmitted: 7,
      averageScore: 8.2,
      completionRate: 83.3,
      onTime: 33,
      late: 2
    }
  },
  
  'DS-CH05-BASIC-001': {
    totalStudents: 42,
    statistics: {
      submitted: 30,
      notSubmitted: 12,
      averageScore: 7.8,
      completionRate: 71.4,
      onTime: 28,
      late: 2
    }
  },
  
  'DB-CH01-BASIC-001': {
    totalStudents: 40,
    statistics: {
      submitted: 38,
      notSubmitted: 2,
      averageScore: 8.9,
      completionRate: 95.0,
      onTime: 36,
      late: 2
    }
  },
  
  'DB-CH02-BASIC-001': {
    totalStudents: 40,
    statistics: {
      submitted: 36,
      notSubmitted: 4,
      averageScore: 8.6,
      completionRate: 90.0,
      onTime: 34,
      late: 2
    }
  },
  
  'DB-CH03-ADV-001': {
    totalStudents: 40,
    statistics: {
      submitted: 32,
      notSubmitted: 8,
      averageScore: 8.3,
      completionRate: 80.0,
      onTime: 30,
      late: 2
    }
  }
};

// ==================== INTEGRATION FUNCTIONS ====================

/**
 * Lấy danh sách bài tập đang được sử dụng trong học kỳ hiện tại
 * @returns {Array} Danh sách exercise codes đang được giao
 */
export const getActiveExercisesInSemester = () => {
  const activeExercises = new Set();
  
  Object.values(ASSIGNED_EXERCISES).forEach(classData => {
    classData.assignedExercises.forEach(assignment => {
      if (assignment.status === 'active' || assignment.status === 'completed') {
        activeExercises.add(assignment.exerciseCode);
      }
    });
  });
  
  return Array.from(activeExercises);
};

/**
 * Lấy thống kê chi tiết cho một bài tập
 * @param {string} exerciseCode - Mã bài tập (VD: PROG-CH01-BASIC-001)
 * @returns {Object} Thống kê chi tiết
 */
export const getExerciseStatistics = (exerciseCode) => {
  const submissions = STUDENT_SUBMISSIONS[exerciseCode];
  
  if (!submissions) {
    return {
      isActive: false,
      totalClasses: 0,
      totalStudents: 0,
      statistics: null
    };
  }
  
  // Tìm các lớp đang sử dụng bài tập này
  const usingClasses = [];
  Object.entries(ASSIGNED_EXERCISES).forEach(([classId, classData]) => {
    const assignment = classData.assignedExercises.find(a => a.exerciseCode === exerciseCode);
    if (assignment) {
      usingClasses.push({
        classId,
        className: classData.className,
        teacher: classData.teacher,
        studentCount: classData.studentCount,
        assignedDate: assignment.assignedDate,
        dueDate: assignment.dueDate,
        status: assignment.status
      });
    }
  });
  
  return {
    isActive: usingClasses.length > 0,
    totalClasses: usingClasses.length,
    totalStudents: submissions.totalStudents,
    usingClasses,
    statistics: submissions.statistics,
    submissions: submissions.submissions
  };
};

/**
 * Lấy tổng quan thống kê cho tất cả bài tập trong một môn học
 * @param {string} courseKey - Tên môn học
 * @returns {Object} Tổng quan thống kê
 */
export const getCourseStatistics = (courseKey) => {
  const courseClasses = Object.values(ASSIGNED_EXERCISES).filter(
    classData => classData.courseKey === courseKey
  );
  
  if (courseClasses.length === 0) {
    return {
      totalClasses: 0,
      totalStudents: 0,
      activeExercises: 0,
      averageCompletion: 0
    };
  }
  
  const totalStudents = courseClasses.reduce((sum, cls) => sum + cls.studentCount, 0);
  const allExerciseCodes = new Set();
  
  courseClasses.forEach(classData => {
    classData.assignedExercises.forEach(assignment => {
      allExerciseCodes.add(assignment.exerciseCode);
    });
  });
  
  // Tính completion rate trung bình
  let totalCompletion = 0;
  let exerciseCount = 0;
  
  Array.from(allExerciseCodes).forEach(code => {
    const stats = STUDENT_SUBMISSIONS[code];
    if (stats) {
      totalCompletion += stats.statistics.completionRate;
      exerciseCount++;
    }
  });
  
  return {
    totalClasses: courseClasses.length,
    totalStudents,
    activeExercises: allExerciseCodes.size,
    averageCompletion: exerciseCount > 0 ? (totalCompletion / exerciseCount).toFixed(1) : 0
  };
};

/**
 * Đồng bộ trạng thái activeSemester trong Exercise Bank
 * @param {Object} exerciseBank - Dữ liệu ngân hàng bài tập
 * @returns {Object} Exercise Bank đã được cập nhật
 */
export const syncActiveSemesterStatus = (exerciseBank) => {
  const activeExercises = getActiveExercisesInSemester();
  const updatedBank = JSON.parse(JSON.stringify(exerciseBank)); // Deep clone
  
  // Duyệt qua tất cả bài tập và cập nhật trạng thái
  Object.keys(updatedBank).forEach(courseKey => {
    const course = updatedBank[courseKey];
    if (course.chapters) {
      course.chapters.forEach(chapter => {
        ['basic', 'advanced'].forEach(level => {
          if (chapter[level]) {
            chapter[level].forEach(exercise => {
              // Kiểm tra xem bài tập có code và đang được sử dụng không
              exercise.activeSemester = exercise.code && activeExercises.includes(exercise.code);
            });
          }
        });
      });
    }
  });
  
  return updatedBank;
};

/**
 * API mô phỏng - Lấy dữ liệu thời gian thực từ LMS
 * Trong thực tế, đây sẽ là các API calls đến backend
 */
export const LMS_API = {
  // Lấy danh sách bài tập được giao trong học kỳ
  async getAssignedExercises(semesterId = CURRENT_SEMESTER.id) {
    // Mô phỏng API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ASSIGNED_EXERCISES);
      }, 500);
    });
  },
  
  // Lấy kết quả làm bài của sinh viên
  async getSubmissionData(exerciseCode) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(STUDENT_SUBMISSIONS[exerciseCode] || null);
      }, 300);
    });
  },
  
  // Cập nhật trạng thái bài tập trong LMS
  async updateExerciseStatus(exerciseCode, status) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Updated exercise ${exerciseCode} status to ${status}`);
        resolve({ success: true });
      }, 200);
    });
  }
};

// ==================== REAL-TIME SYNC ====================

/**
 * Thiết lập đồng bộ thời gian thực với LMS
 * Trong thực tế có thể dùng WebSocket hoặc polling
 */
export class ExerciseBankSync {
  constructor(updateCallback) {
    this.updateCallback = updateCallback;
    this.syncInterval = null;
  }
  
  // Bắt đầu đồng bộ tự động
  startSync(intervalMs = 30000) { // 30 giây
    this.syncInterval = setInterval(async () => {
      try {
        const assignedExercises = await LMS_API.getAssignedExercises();
        if (this.updateCallback) {
          this.updateCallback(assignedExercises);
        }
      } catch (error) {
        console.error('Sync error:', error);
      }
    }, intervalMs);
  }
  
  // Dừng đồng bộ
  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
  
  // Đồng bộ thủ công
  async manualSync() {
    try {
      const assignedExercises = await LMS_API.getAssignedExercises();
      if (this.updateCallback) {
        this.updateCallback(assignedExercises);
      }
      return { success: true };
    } catch (error) {
      console.error('Manual sync error:', error);
      return { success: false, error };
    }
  }
}