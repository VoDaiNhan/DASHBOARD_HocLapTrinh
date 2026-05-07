export const mockDashboardData = {
  kpiMetrics: {
    totalStudents: 150,
    studentChange: 12,
    totalTeachers: 8,
    teacherChange: 1,
    ongoingClasses: 2,
    classChange: 2,
    averageProgress: 78.5,
    progressChange: 3.2,
    graduationRate: 85.2,
    graduationChange: 2.5,
    employmentRate: 92.5,
    employmentChange: 1.8
  },
  
  progressOverview: {
    all: [
      {
        course: 'Nhập môn lập trình',
        completed: 6,
        inProgress: 3,
        notStarted: 1
      },
      {
        course: 'Kĩ thuật lập trình',
        completed: 5,
        inProgress: 4,
        notStarted: 1
      },
      {
        course: 'Lập trình hướng đối tượng',
        completed: 4,
        inProgress: 5,
        notStarted: 1
      },
      {
        course: 'Cấu trúc dữ liệu và giải thuật',
        completed: 3,
        inProgress: 5,
        notStarted: 2
      }
    ],
    '22CT111': [
      {
        course: 'Nhập môn lập trình',
        completed: 2,
        inProgress: 1,
        notStarted: 0
      },
      {
        course: 'Kĩ thuật lập trình',
        completed: 2,
        inProgress: 1,
        notStarted: 0
      },
      {
        course: 'Lập trình hướng đối tượng',
        completed: 1,
        inProgress: 2,
        notStarted: 0
      },
      {
        course: 'Cấu trúc dữ liệu và giải thuật',
        completed: 1,
        inProgress: 1,
        notStarted: 1
      }
    ],
    '22CT112': [
      {
        course: 'Nhập môn lập trình',
        completed: 3,
        inProgress: 1,
        notStarted: 0
      },
      {
        course: 'Kĩ thuật lập trình',
        completed: 2,
        inProgress: 2,
        notStarted: 0
      },
      {
        course: 'Lập trình hướng đối tượng',
        completed: 2,
        inProgress: 1,
        notStarted: 1
      },
      {
        course: 'Cấu trúc dữ liệu và giải thuật',
        completed: 1,
        inProgress: 2,
        notStarted: 1
      }
    ],
    '22CT113': [
      {
        course: 'Nhập môn lập trình',
        completed: 1,
        inProgress: 1,
        notStarted: 1
      },
      {
        course: 'Kĩ thuật lập trình',
        completed: 1,
        inProgress: 1,
        notStarted: 1
      },
      {
        course: 'Lập trình hướng đối tượng',
        completed: 1,
        inProgress: 2,
        notStarted: 0
      },
      {
        course: 'Cấu trúc dữ liệu và giải thuật',
        completed: 1,
        inProgress: 2,
        notStarted: 0
      }
    ]
  },
  
  courseMonitoring: [
    {
      name: 'Nhập môn lập trình',
      enrolledStudents: 10,
      duration: '12 tuần',
      status: 'active',
      completionRate: 78,
      averageScore: 7.8
    },
    {
      name: 'Kĩ thuật lập trình',
      enrolledStudents: 10,
      duration: '10 tuần',
      status: 'active',
      completionRate: 70,
      averageScore: 7.2
    },
    {
      name: 'Lập trình hướng đối tượng',
      enrolledStudents: 10,
      duration: '16 tuần',
      status: 'active',
      completionRate: 68,
      averageScore: 7.5
    },
    {
      name: 'Cấu trúc dữ liệu và giải thuật',
      enrolledStudents: 10,
      duration: '12 tuần',
      status: 'active',
      completionRate: 72,
      averageScore: 7.6
    }
  ],
  
  notifications: [
    {
      id: 1,
      type: 'warning',
      priority: 'high',
      title: 'Sinh viên có nguy cơ bỏ học',
      message: '15 sinh viên trong khóa "Nhập môn lập trình" có tỷ lệ hoàn thành dưới 30%',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'info',
      priority: 'medium',
      title: 'Báo cáo tiến độ tuần',
      message: 'Báo cáo tiến độ học tập tuần này đã sẵn sàng để xem',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'success',
      priority: 'low',
      title: 'Khóa học hoàn thành',
      message: 'Khóa "Kĩ thuật lập trình" đã hoàn thành với 98% sinh viên đạt yêu cầu',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: 4,
      type: 'reminder',
      priority: 'medium',
      title: 'Deadline nộp bài tập',
      message: 'Nhắc nhở: Bài tập lớn môn "Cấu trúc dữ liệu và giải thuật" sẽ hết hạn trong 3 ngày',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 5,
      type: 'info',
      priority: 'low',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ được bảo trì vào 2:00 AM ngày mai',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      read: true
    }
  ],
  
  performanceChart: [
    {
      date: '01/12',
      averageScore: 7.5,
      completionRate: 70,
      engagement: 6.8
    },
    {
      date: '02/12',
      averageScore: 7.6,
      completionRate: 72,
      engagement: 7.0
    },
    {
      date: '03/12',
      averageScore: 7.4,
      completionRate: 73,
      engagement: 7.2
    },
    {
      date: '04/12',
      averageScore: 7.8,
      completionRate: 75,
      engagement: 7.4
    },
    {
      date: '05/12',
      averageScore: 8.0,
      completionRate: 78,
      engagement: 7.5
    },
    {
      date: '06/12',
      averageScore: 7.9,
      completionRate: 79,
      engagement: 7.6
    },
    {
      date: '07/12',
      averageScore: 8.1,
      completionRate: 80,
      engagement: 7.8
    }
  ]
};

// Dữ liệu mock cho quản lý ngành
export const mockDepartmentData = {
  departmentInfo: {
    name: 'Khoa Công Nghệ Thông Tin',
    code: 'CNTT',
    description: 'Khoa Công Nghệ Thông Tin - Đào tạo chuyên sâu về lập trình, hệ thống và công nghệ',
    establishedYear: 2005,
    totalStudents: 150,
    totalTeachers: 8,
    totalCourses: 12,
    totalClasses: 24
  },
  
  teachers: [
    {
      id: 1,
      name: 'TS. Nguyễn Văn An',
      email: 'an.nv@university.edu.vn',
      phone: '0901234567',
      position: 'Trưởng khoa',
      department: 'CNTT',
      specialization: 'Lập trình, Cấu trúc dữ liệu',
      experience: 15,
      status: 'active',
      totalClasses: 4,
      totalStudents: 45,
      averageRating: 4.8,
      joinDate: '2010-09-01',
      education: 'Tiến sĩ Công nghệ Thông tin - Đại học Bách Khoa',
      researchAreas: ['Machine Learning', 'Data Structures', 'Algorithm Design'],
      publications: 25,
      projects: 12
    },
    {
      id: 2,
      name: 'TS. Trần Thị Bình',
      email: 'binh.tt@university.edu.vn',
      phone: '0901234568',
      position: 'Phó trưởng khoa',
      department: 'CNTT',
      specialization: 'Lập trình hướng đối tượng, Phát triển phần mềm',
      experience: 12,
      status: 'active',
      totalClasses: 3,
      totalStudents: 36,
      averageRating: 4.7,
      joinDate: '2012-03-01',
      education: 'Tiến sĩ Khoa học Máy tính - Đại học Quốc gia',
      researchAreas: ['Software Engineering', 'Object-Oriented Programming', 'Web Development'],
      publications: 18,
      projects: 8
    },
    {
      id: 3,
      name: 'TS. Lê Văn Cường',
      email: 'cuong.lv@university.edu.vn',
      phone: '0901234569',
      position: 'Giảng viên chính',
      department: 'CNTT',
      specialization: 'Cơ sở dữ liệu, Hệ thống thông tin',
      experience: 10,
      status: 'active',
      totalClasses: 3,
      totalStudents: 42,
      averageRating: 4.6,
      joinDate: '2014-08-01',
      education: 'Tiến sĩ Hệ thống Thông tin - Đại học Công nghệ',
      researchAreas: ['Database Systems', 'Information Systems', 'Data Mining'],
      publications: 15,
      projects: 6
    },
    {
      id: 4,
      name: 'ThS. Phạm Thị Dung',
      email: 'dung.pt@university.edu.vn',
      phone: '0901234570',
      position: 'Giảng viên',
      department: 'CNTT',
      specialization: 'Mạng máy tính, An toàn thông tin',
      experience: 8,
      status: 'active',
      totalClasses: 2,
      totalStudents: 30,
      averageRating: 4.5,
      joinDate: '2016-09-01',
      education: 'Thạc sĩ An toàn Thông tin - Đại học Bách Khoa',
      researchAreas: ['Network Security', 'Cybersecurity', 'Computer Networks'],
      publications: 12,
      projects: 4
    },
    {
      id: 5,
      name: 'ThS. Hoàng Văn Em',
      email: 'em.hv@university.edu.vn',
      phone: '0901234571',
      position: 'Giảng viên',
      department: 'CNTT',
      specialization: 'Trí tuệ nhân tạo, Machine Learning',
      experience: 6,
      status: 'active',
      totalClasses: 2,
      totalStudents: 24,
      averageRating: 4.4,
      joinDate: '2018-02-01',
      education: 'Thạc sĩ Trí tuệ Nhân tạo - Đại học Quốc tế',
      researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning'],
      publications: 8,
      projects: 3
    },
    {
      id: 6,
      name: 'ThS. Vũ Thị Phương',
      email: 'phuong.vt@university.edu.vn',
      phone: '0901234572',
      position: 'Giảng viên',
      department: 'CNTT',
      specialization: 'Thiết kế giao diện, UX/UI',
      experience: 5,
      status: 'active',
      totalClasses: 2,
      totalStudents: 28,
      averageRating: 4.3,
      joinDate: '2019-08-01',
      education: 'Thạc sĩ Thiết kế Đồ họa - Đại học Mỹ thuật',
      researchAreas: ['User Experience', 'User Interface Design', 'Human-Computer Interaction'],
      publications: 6,
      projects: 2
    },
    {
      id: 7,
      name: 'ThS. Đặng Văn Giang',
      email: 'giang.dv@university.edu.vn',
      phone: '0901234573',
      position: 'Giảng viên',
      department: 'CNTT',
      specialization: 'Phát triển ứng dụng di động',
      experience: 4,
      status: 'active',
      totalClasses: 1,
      totalStudents: 20,
      averageRating: 4.2,
      joinDate: '2020-09-01',
      education: 'Thạc sĩ Công nghệ Thông tin - Đại học Công nghệ',
      researchAreas: ['Mobile Development', 'Cross-platform Development', 'Mobile Security'],
      publications: 4,
      projects: 1
    },
    {
      id: 8,
      name: 'ThS. Bùi Thị Hoa',
      email: 'hoa.bt@university.edu.vn',
      phone: '0901234574',
      position: 'Giảng viên',
      department: 'CNTT',
      specialization: 'Phân tích dữ liệu, Business Intelligence',
      experience: 3,
      status: 'active',
      totalClasses: 1,
      totalStudents: 18,
      averageRating: 4.1,
      joinDate: '2021-03-01',
      education: 'Thạc sĩ Khoa học Dữ liệu - Đại học Quốc gia',
      researchAreas: ['Data Analytics', 'Business Intelligence', 'Big Data'],
      publications: 3,
      projects: 1
    }
  ],
  
  departmentStats: {
    totalStudents: 150,
    totalTeachers: 8,
    totalCourses: 12,
    totalClasses: 24,
    averageClassSize: 6.25,
    graduationRate: 85.2,
    employmentRate: 92.5,
    researchProjects: 45,
    publications: 91,
    averageStudentRating: 4.3,
    averageTeacherRating: 4.5
  }
};

export const mockAssignmentData = {
  stats: {
    totalAssignments: 48,
    assignmentChange: 12.5,
    activeAssignments: 18,
    activeChange: 8.3,
    completedAssignments: 25,
    completedChange: 15.2,
    overdueAssignments: 5,
    overdueChange: -25.0,
    averageSubmissionRate: 82.4,
    submissionChange: 3.7,
    averageScore: 7.5,
    scoreChange: 0.5
  },
  
  assignments: [
    {
      id: 1,
      title: 'Bài tập 1: Biến và Kiểu dữ liệu',
      description: 'Làm quen với các kiểu dữ liệu cơ bản và cách khai báo biến',
      instructions: 'Sinh viên cần hoàn thành các bài tập về: Khai báo và sử dụng biến, Các kiểu dữ liệu cơ bản (int, float, string, boolean), Nhập xuất dữ liệu từ bàn phím, Các phép toán số học cơ bản, Định dạng và in ra kết quả.',
      course: 'Nhập môn lập trình',
      courseId: 'intro-prog',
      className: '22CT111',
      classId: 1,
      status: 'completed',
      startDate: '2024-11-15T08:00:00',
      dueDate: '2024-11-22T23:59:00',
      submittedCount: 3,
      totalStudents: 3,
      averageScore: 7.8,
      lateSubmissions: 3,
      maxScore: 100,
      allowLateSubmission: true,
      lateSubmissionPenalty: 10,
      maxAttempts: 2,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['html', 'css', 'js', 'zip'],
      maxFileSize: 10,
      createdAt: '2024-11-10T10:00:00',
      updatedAt: '2024-11-22T15:30:00'
    },
    {
      id: 2,
      title: 'Bài tập 2: Cấu trúc điều khiển',
      description: 'Làm việc với câu lệnh if-else và vòng lặp',
      instructions: 'Thực hiện các bài tập: Viết chương trình kiểm tra số chẵn/lẻ, Tìm số lớn nhất trong 3 số, Tính giai thừa sử dụng vòng lặp, In bảng cửu chương, Kiểm tra số nguyên tố.',
      course: 'Nhập môn lập trình',
      courseId: 'intro-prog',
      className: '22CT111',
      classId: 1,
      status: 'active',
      startDate: '2024-11-25T08:00:00',
      dueDate: '2024-12-05T23:59:00',
      submittedCount: 2,
      totalStudents: 3,
      averageScore: 7.2,
      lateSubmissions: 2,
      maxScore: 100,
      allowLateSubmission: true,
      lateSubmissionPenalty: 15,
      maxAttempts: 3,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['html', 'css', 'js', 'zip'],
      maxFileSize: 15,
      createdAt: '2024-11-20T14:00:00',
      updatedAt: '2024-12-01T09:15:00'
    },
    {
      id: 3,
      title: 'Bài tập 3: Hàm và thủ tục',
      description: 'Xây dựng và sử dụng hàm trong chương trình',
      instructions: 'Viết các hàm để thực hiện: Tính tổng và tích của 2 số, Kiểm tra số hoàn hảo, Chuyển đổi nhiệt độ (C sang F và ngược lại), Tính diện tích và chu vi hình học, Tìm UCLN và BCNN của 2 số.',
      course: 'Nhập môn lập trình',
      courseId: 'intro-prog',
      className: '22CT112',
      classId: 2,
      status: 'active',
      startDate: '2024-12-01T08:00:00',
      dueDate: '2024-12-15T23:59:00',
      submittedCount: 3,
      totalStudents: 4,
      averageScore: 7.5,
      lateSubmissions: 1,
      maxScore: 100,
      allowLateSubmission: true,
      lateSubmissionPenalty: 10,
      maxAttempts: 2,
      showScoreToStudents: false,
      requireFiles: true,
      allowedFileTypes: ['zip', 'rar'],
      maxFileSize: 25,
      createdAt: '2024-11-28T16:00:00',
      updatedAt: '2024-12-05T11:20:00'
    },
    {
      id: 4,
      title: 'Dự án cuối kỳ: Chương trình quản lý',
      description: 'Xây dựng chương trình quản lý đơn giản',
      instructions: 'Phát triển một chương trình quản lý hoàn chỉnh với các tính năng: Menu điều hướng, Thêm/Sửa/Xóa dữ liệu, Tìm kiếm và lọc thông tin, Lưu trữ dữ liệu vào file, Đọc dữ liệu từ file, Xử lý lỗi và validate input, Giao diện thân thiện với người dùng.',
      course: 'Nhập môn lập trình',
      courseId: 'intro-prog',
      className: '22CT113',
      classId: 3,
      status: 'upcoming',
      startDate: '2024-12-10T08:00:00',
      dueDate: '2025-01-20T23:59:00',
      submittedCount: 0,
      totalStudents: 35,
      averageScore: 0,
      lateSubmissions: 0,
      maxScore: 200,
      allowLateSubmission: false,
      lateSubmissionPenalty: 0,
      maxAttempts: 1,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['zip', 'rar', 'tar.gz'],
      maxFileSize: 100,
      createdAt: '2024-12-01T10:00:00',
      updatedAt: '2024-12-01T10:00:00'
    },
    {
      id: 5,
      title: 'Bài tập 1: Con trỏ và cấp phát động',
      description: 'Làm việc với con trỏ và quản lý bộ nhớ động',
      instructions: 'Thực hiện các bài tập về: Khai báo và sử dụng con trỏ, Truyền tham số bằng con trỏ, Cấp phát bộ nhớ động với malloc/free, Quản lý mảng động, Xử lý chuỗi với con trỏ, Giải phóng bộ nhớ đúng cách.',
      course: 'Kĩ thuật lập trình',
      courseId: 'prog-technique',
      className: '22CT111',
      classId: 1,
      status: 'active',
      startDate: '2024-11-20T08:00:00',
      dueDate: '2024-12-10T23:59:00',
      submittedCount: 2,
      totalStudents: 3,
      averageScore: 7.3,
      lateSubmissions: 4,
      maxScore: 150,
      allowLateSubmission: true,
      lateSubmissionPenalty: 20,
      maxAttempts: 2,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['zip', 'apk'],
      maxFileSize: 50,
      createdAt: '2024-11-15T09:00:00',
      updatedAt: '2024-12-05T14:45:00'
    },
    {
      id: 6,
      title: 'Bài tập 2: File và xử lý ngoại lệ',
      description: 'Làm việc với file và xử lý lỗi trong chương trình',
      instructions: 'Thực hiện các bài tập: Đọc và ghi file text, Xử lý file CSV, Binary file I/O, Exception handling với try-catch, Validate dữ liệu đầu vào, Xử lý lỗi runtime và compile-time.',
      course: 'Kĩ thuật lập trình',
      courseId: 'prog-technique',
      className: '22CT112',
      classId: 2,
      status: 'overdue',
      startDate: '2024-11-10T08:00:00',
      dueDate: '2024-11-30T23:59:00',
      submittedCount: 3,
      totalStudents: 4,
      averageScore: 7.6,
      lateSubmissions: 8,
      maxScore: 120,
      allowLateSubmission: true,
      lateSubmissionPenalty: 25,
      maxAttempts: 1,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['ipynb', 'py', 'csv', 'zip'],
      maxFileSize: 30,
      createdAt: '2024-11-05T11:00:00',
      updatedAt: '2024-12-02T16:30:00'
    },
    {
      id: 7,
      title: 'Bài tập 1: Lớp và đối tượng',
      description: 'Tạo và sử dụng class trong lập trình hướng đối tượng',
      instructions: 'Phát triển các class cơ bản: Thiết kế class với thuộc tính và phương thức, Constructor và Destructor, Encapsulation với private/public, Getter và Setter methods, Tạo và sử dụng đối tượng, Quản lý đối tượng trong mảng.',
      course: 'Lập trình hướng đối tượng',
      courseId: 'oop',
      className: '22CT113',
      classId: 3,
      status: 'draft',
      startDate: '2024-12-15T08:00:00',
      dueDate: '2025-01-15T23:59:00',
      submittedCount: 0,
      totalStudents: 35,
      averageScore: 0,
      lateSubmissions: 0,
      maxScore: 180,
      allowLateSubmission: true,
      lateSubmissionPenalty: 15,
      maxAttempts: 2,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['ipynb', 'py', 'h5', 'zip'],
      maxFileSize: 200,
      createdAt: '2024-12-08T13:00:00',
      updatedAt: '2024-12-08T13:00:00'
    },
    {
      id: 8,
      title: 'Bài tập 2: Kế thừa và đa hình',
      description: 'Áp dụng tính kế thừa và đa hình trong OOP',
      instructions: 'Xây dựng hệ thống class với inheritance: Tạo class cha và class con, Override methods, Virtual functions và abstract class, Polymorphism với upcasting/downcasting, Interface implementation, Sử dụng kế thừa đa cấp.',
      course: 'Lập trình hướng đối tượng',
      courseId: 'oop',
      className: '22CT111',
      classId: 1,
      status: 'completed',
      startDate: '2024-10-15T08:00:00',
      dueDate: '2024-11-15T23:59:00',
      submittedCount: 3,
      totalStudents: 3,
      averageScore: 8.2,
      lateSubmissions: 2,
      maxScore: 160,
      allowLateSubmission: true,
      lateSubmissionPenalty: 10,
      maxAttempts: 1,
      showScoreToStudents: true,
      requireFiles: true,
      allowedFileTypes: ['zip', 'tar.gz'],
      maxFileSize: 40,
      createdAt: '2024-10-10T10:00:00',
      updatedAt: '2024-11-20T12:00:00'
    }
  ],
  
  assignmentDetails: {
    submissions: [
      {
        id: 1,
        studentId: 'SV001',
        studentName: 'Nguyễn Văn Minh',
        submittedAt: '2024-11-21T14:30:00',
        status: 'graded',
        score: 8.5,
        feedback: 'Bài làm rất tốt! Code clean và có comment đầy đủ. Giao diện responsive hoàn hảo.',
        files: [
          { name: 'index.html', size: 2048, url: '#' },
          { name: 'style.css', size: 1536, url: '#' },
          { name: 'script.js', size: 1024, url: '#' }
        ]
      },
      {
        id: 2,
        studentId: 'SV002',
        studentName: 'Trần Thị Hương',
        submittedAt: '2024-11-22T09:15:00',
        status: 'graded',
        score: 7.8,
        feedback: 'Bài làm tốt, tuy nhiên cần cải thiện phần responsive trên mobile.',
        files: [
          { name: 'project.zip', size: 5120, url: '#' }
        ]
      },
      {
        id: 3,
        studentId: 'SV003',
        studentName: 'Lê Hoàng Nam',
        submittedAt: '2024-11-23T16:45:00',
        status: 'late',
        score: 6.5,
        feedback: 'Nộp muộn 1 ngày. Code cần cải thiện về cấu trúc và naming convention.',
        files: [
          { name: 'assignment.zip', size: 3072, url: '#' }
        ]
      },
      {
        id: 4,
        studentId: 'SV004',
        studentName: 'Phạm Thị Lan',
        submittedAt: '2024-11-20T11:20:00',
        status: 'pending',
        score: null,
        feedback: null,
        files: [
          { name: 'homework.zip', size: 4096, url: '#' }
        ]
      },
      {
        id: 5,
        studentId: 'SV005',
        studentName: 'Vũ Đức Thành',
        submittedAt: '2024-11-21T18:30:00',
        status: 'graded',
        score: 9.2,
        feedback: 'Xuất sắc! Code rất clean, có sử dụng best practices. Giao diện đẹp và UX tốt.',
        files: [
          { name: 'final-project.zip', size: 6144, url: '#' }
        ]
      },
      {
        id: 6,
        studentId: 'SV006',
        studentName: 'Hoàng Thị Mai',
        submittedAt: null,
        status: 'missing',
        score: null,
        feedback: null,
        files: []
      }
    ],
    
    analytics: {
      submissionRate: 8.5,
      averageScore: 7.6,
      lateSubmissions: 1,
      failureRate: 1.2,
      totalSubmissions: 8,
      averageSubmissionTime: '2.5 ngày',
      resubmissions: 1,
      plagiarismDetected: 0,
      averageGradingTime: '1.2 ngày',
      feedbackGiven: 7,
      
      scoreDistribution: [
        { range: '9-10', count: 2 },
        { range: '8-8.9', count: 3 },
        { range: '7-7.9', count: 3 },
        { range: '6-6.9', count: 1 },
        { range: '0-5.9', count: 1 }
      ],
      
      submissionStatus: [
        { name: 'Đã chấm', value: 6 },
        { name: 'Chờ chấm', value: 2 },
        { name: 'Nộp muộn', value: 1 },
        { name: 'Chưa nộp', value: 1 }
      ],
      
      submissionTimeline: [
        { date: '15/11', submissions: 0 },
        { date: '16/11', submissions: 1 },
        { date: '17/11', submissions: 2 },
        { date: '18/11', submissions: 3 },
        { date: '19/11', submissions: 4 },
        { date: '20/11', submissions: 6 },
        { date: '21/11', submissions: 7 },
        { date: '22/11', submissions: 8 }
      ],
      
      classComparison: [
        { className: '22CT111', averageScore: 7.8, submissionRate: 8.5 },
        { className: '22CT112', averageScore: 7.5, submissionRate: 8.0 },
        { className: '22CT113', averageScore: 7.2, submissionRate: 7.5 }
      ]
    },
    
    files: [
      { name: 'Hướng dẫn bài tập.pdf', url: '#' },
      { name: 'Template HTML.zip', url: '#' },
      { name: 'Rubric chấm điểm.xlsx', url: '#' }
    ]
  }
};

export const mockStudentTrackingData = {
  students: [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      studentId: 'SV001',
      email: 'minh.nv@student.edu.vn',
      phone: '0901234567',
      status: 'active',
      riskLevel: 'low',
      completionRate: 90,
      averageScore: 8.5,
      completedAssignments: 18,
      totalAssignments: 20,
      totalHours: 156,
      scoreChange: 0.5,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 95, score: 8.9, className: '22CT111' },
        { id: 'prog-technique', name: 'Kĩ thuật lập trình', progress: 88, score: 8.7, className: '22CT111' }
      ],
      classes: [
        { id: 1, name: 'Nhập môn lập trình - 22CT111' },
        { id: 3, name: 'Kĩ thuật lập trình - 22CT111' }
      ],
      recentAssignments: [
        { title: 'Hàm và thủ tục', score: 8.5, submittedDate: '2024-12-05', status: 'completed' },
        { title: 'Cấu trúc điều khiển', score: 8.2, submittedDate: '2024-12-03', status: 'completed' },
        { title: 'Biến và kiểu dữ liệu', score: 8.8, submittedDate: '2024-12-01', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-06', content: 'Sinh viên có tiến bộ rõ rệt, tích cực tham gia lớp học.' },
        { author: 'TS. Nguyễn Văn An', date: '2024-11-28', content: 'Cần cải thiện kỹ năng debug code.' }
      ]
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      studentId: 'SV002',
      email: 'huong.tt@student.edu.vn',
      phone: '0901234568',
      status: 'active',
      riskLevel: 'low',
      completionRate: 85,
      averageScore: 8.0,
      completedAssignments: 16,
      totalAssignments: 20,
      totalHours: 142,
      scoreChange: 0.2,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 88, score: 8.2, className: '22CT112' },
        { id: 'oop', name: 'Lập trình hướng đối tượng', progress: 82, score: 7.9, className: '22CT112' }
      ],
      classes: [
        { id: 2, name: 'Nhập môn lập trình - 22CT112' },
        { id: 4, name: 'Lập trình hướng đối tượng - 22CT112' }
      ],
      recentAssignments: [
        { title: 'Lớp và đối tượng', score: 8.0, submittedDate: '2024-12-04', status: 'completed' },
        { title: 'Hàm và thủ tục', score: 7.8, submittedDate: '2024-12-02', status: 'completed' },
        { title: 'Con trỏ cơ bản', score: 8.1, submittedDate: '2024-11-30', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-05', content: 'Sinh viên chăm chỉ, cần hỗ trợ thêm về thuật toán.' }
      ]
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      studentId: 'SV003',
      email: 'nam.lh@student.edu.vn',
      phone: '0901234569',
      status: 'at_risk',
      riskLevel: 'high',
      completionRate: 45,
      averageScore: 6.0,
      completedAssignments: 8,
      totalAssignments: 20,
      totalHours: 89,
      scoreChange: -0.4,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 48, score: 6.2, className: '22CT113' },
        { id: 'prog-technique', name: 'Kĩ thuật lập trình', progress: 42, score: 5.8, className: '22CT113' }
      ],
      classes: [
        { id: 1, name: 'Nhập môn lập trình - 22CT113' },
        { id: 3, name: 'Kĩ thuật lập trình - 22CT113' }
      ],
      recentAssignments: [
        { title: 'Hàm và thủ tục', score: 5.5, submittedDate: '2024-12-07', status: 'late' },
        { title: 'Cấu trúc điều khiển', score: 6.8, submittedDate: '2024-12-05', status: 'completed' },
        { title: 'Biến và kiểu dữ liệu', score: 0, submittedDate: null, status: 'missing' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-07', content: 'CẢNH BÁO: Sinh viên có nguy cơ bỏ học cao. Cần can thiệp ngay.' },
        { author: 'TS. Nguyễn Văn An', date: '2024-12-01', content: 'Vắng mặt nhiều buổi học, điểm số giảm.' }
      ]
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      studentId: 'SV004',
      email: 'lan.pt@student.edu.vn',
      phone: '0901234570',
      status: 'active',
      riskLevel: 'medium',
      completionRate: 78,
      averageScore: 7.5,
      completedAssignments: 14,
      totalAssignments: 20,
      totalHours: 128,
      scoreChange: 0.2,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'oop', name: 'Lập trình hướng đối tượng', progress: 82, score: 7.8, className: '22CT111' },
        { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật', progress: 74, score: 7.4, className: '22CT111' }
      ],
      classes: [
        { id: 4, name: 'Lập trình hướng đối tượng - 22CT111' },
        { id: 5, name: 'Cấu trúc dữ liệu và giải thuật - 22CT111' }
      ],
      recentAssignments: [
        { title: 'Kế thừa và đa hình', score: 7.5, submittedDate: '2024-12-06', status: 'completed' },
        { title: 'Lớp và đối tượng', score: 7.8, submittedDate: '2024-12-04', status: 'completed' },
        { title: 'Stack và Queue', score: 7.6, submittedDate: '2024-12-02', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-06', content: 'Sinh viên có tiềm năng, cần tập trung hơn vào lý thuyết.' }
      ]
    },
    {
      id: 5,
      name: 'Vũ Đức Thành',
      studentId: 'SV005',
      email: 'thanh.vd@student.edu.vn',
      phone: '0901234571',
      status: 'active',
      riskLevel: 'low',
      completionRate: 95,
      averageScore: 9.0,
      completedAssignments: 19,
      totalAssignments: 20,
      totalHours: 168,
      scoreChange: 0.4,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 98, score: 9.2, className: '22CT112' },
        { id: 'prog-technique', name: 'Kĩ thuật lập trình', progress: 92, score: 8.8, className: '22CT112' }
      ],
      classes: [
        { id: 1, name: 'Nhập môn lập trình - 22CT112' },
        { id: 6, name: 'Kĩ thuật lập trình - 22CT112' }
      ],
      recentAssignments: [
        { title: 'Dự án quản lý', score: 9.3, submittedDate: '2024-12-05', status: 'completed' },
        { title: 'File và xử lý ngoại lệ', score: 8.6, submittedDate: '2024-12-03', status: 'completed' },
        { title: 'Con trỏ và cấp phát động', score: 9.0, submittedDate: '2024-12-01', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-05', content: 'Sinh viên xuất sắc, có thể làm mentor cho các bạn khác.' }
      ]
    },
    {
      id: 6,
      name: 'Hoàng Thị Mai',
      studentId: 'SV006',
      email: 'mai.ht@student.edu.vn',
      phone: '0901234572',
      status: 'completed',
      riskLevel: 'low',
      completionRate: 100,
      averageScore: 9.2,
      completedAssignments: 20,
      totalAssignments: 20,
      totalHours: 180,
      scoreChange: 0.6,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'oop', name: 'Lập trình hướng đối tượng', progress: 100, score: 9.3, className: '22CT113' },
        { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật', progress: 100, score: 9.1, className: '22CT113' }
      ],
      classes: [
        { id: 6, name: 'Lập trình hướng đối tượng - 22CT113' },
        { id: 7, name: 'Cấu trúc dữ liệu và giải thuật - 22CT113' }
      ],
      recentAssignments: [
        { title: 'Cây nhị phân', score: 9.4, submittedDate: '2024-12-04', status: 'completed' },
        { title: 'Danh sách liên kết', score: 9.0, submittedDate: '2024-12-02', status: 'completed' },
        { title: 'Sắp xếp và tìm kiếm', score: 9.2, submittedDate: '2024-11-30', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-04', content: 'Hoàn thành xuất sắc tất cả khóa học. Đề xuất làm TA.' }
      ]
    },
    {
      id: 7,
      name: 'Đặng Văn Hùng',
      studentId: 'SV007',
      email: 'hung.dv@student.edu.vn',
      phone: '0901234573',
      status: 'active',
      riskLevel: 'medium',
      completionRate: 72,
      averageScore: 7.2,
      completedAssignments: 13,
      totalAssignments: 20,
      totalHours: 118,
      scoreChange: -0.1,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'prog-technique', name: 'Kĩ thuật lập trình', progress: 75, score: 7.5, className: '22CT111' },
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 69, score: 7.0, className: '22CT112' }
      ],
      classes: [
        { id: 3, name: 'Kĩ thuật lập trình - 22CT111' },
        { id: 2, name: 'Nhập môn lập trình - 22CT112' }
      ],
      recentAssignments: [
        { title: 'Con trỏ và cấp phát động', score: 7.1, submittedDate: '2024-12-06', status: 'completed' },
        { title: 'File và xử lý ngoại lệ', score: 7.6, submittedDate: '2024-12-04', status: 'completed' },
        { title: 'Hàm và thủ tục', score: 7.3, submittedDate: '2024-12-02', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-06', content: 'Cần cải thiện kỹ năng coding và tham gia tích cực hơn.' }
      ]
    },
    {
      id: 8,
      name: 'Bùi Thị Ngọc',
      studentId: 'SV008',
      email: 'ngoc.bt@student.edu.vn',
      phone: '0901234574',
      status: 'active',
      riskLevel: 'low',
      completionRate: 89,
      averageScore: 8.4,
      completedAssignments: 17,
      totalAssignments: 20,
      totalHours: 152,
      scoreChange: 0.4,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'oop', name: 'Lập trình hướng đối tượng', progress: 92, score: 8.6, className: '22CT112' },
        { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật', progress: 86, score: 8.2, className: '22CT112' }
      ],
      classes: [
        { id: 4, name: 'Lập trình hướng đối tượng - 22CT112' },
        { id: 5, name: 'Cấu trúc dữ liệu và giải thuật - 22CT112' }
      ],
      recentAssignments: [
        { title: 'Cây nhị phân tìm kiếm', score: 8.7, submittedDate: '2024-12-05', status: 'completed' },
        { title: 'Kế thừa và đa hình', score: 8.1, submittedDate: '2024-12-03', status: 'completed' },
        { title: 'Stack và Queue', score: 8.4, submittedDate: '2024-12-01', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-05', content: 'Sinh viên có năng khiếu về phân tích dữ liệu.' }
      ]
    },
    {
      id: 9,
      name: 'Lý Minh Tuấn',
      studentId: 'SV009',
      email: 'tuan.lm@student.edu.vn',
      phone: '0901234575',
      status: 'at_risk',
      riskLevel: 'high',
      completionRate: 38,
      averageScore: 5.5,
      completedAssignments: 7,
      totalAssignments: 20,
      totalHours: 76,
      scoreChange: -0.6,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'intro-prog', name: 'Nhập môn lập trình', progress: 42, score: 5.8, className: '22CT113' },
        { id: 'oop', name: 'Lập trình hướng đối tượng', progress: 34, score: 5.2, className: '22CT113' }
      ],
      classes: [
        { id: 2, name: 'Nhập môn lập trình - 22CT113' },
        { id: 6, name: 'Lập trình hướng đối tượng - 22CT113' }
      ],
      recentAssignments: [
        { title: 'Lớp và đối tượng', score: 4.5, submittedDate: '2024-12-08', status: 'late' },
        { title: 'Hàm và thủ tục', score: 6.5, submittedDate: '2024-12-06', status: 'completed' },
        { title: 'Cấu trúc điều khiển', score: 0, submittedDate: null, status: 'missing' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-08', content: 'KHẨN CẤP: Cần họp phụ huynh và tư vấn học tập.' },
        { author: 'TS. Nguyễn Văn An', date: '2024-12-03', content: 'Sinh viên gặp khó khăn về cơ bản, cần hỗ trợ đặc biệt.' }
      ]
    },
    {
      id: 10,
      name: 'Ngô Thị Thu',
      studentId: 'SV010',
      email: 'thu.nt@student.edu.vn',
      phone: '0901234576',
      status: 'active',
      riskLevel: 'low',
      completionRate: 91,
      averageScore: 8.6,
      completedAssignments: 18,
      totalAssignments: 20,
      totalHours: 159,
      scoreChange: 0.4,
      enrollmentDate: '2024-09-01',
      courses: [
        { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật', progress: 94, score: 8.7, className: '22CT111' },
        { id: 'prog-technique', name: 'Kĩ thuật lập trình', progress: 88, score: 8.5, className: '22CT111' }
      ],
      classes: [
        { id: 7, name: 'Cấu trúc dữ liệu và giải thuật - 22CT111' },
        { id: 6, name: 'Kĩ thuật lập trình - 22CT111' }
      ],
      recentAssignments: [
        { title: 'Thuật toán Dijkstra', score: 8.9, submittedDate: '2024-12-05', status: 'completed' },
        { title: 'Cây AVL', score: 8.3, submittedDate: '2024-12-03', status: 'completed' },
        { title: 'Hash Table', score: 8.6, submittedDate: '2024-12-01', status: 'completed' }
      ],
      notes: [
        { author: 'TS. Nguyễn Văn An', date: '2024-12-05', content: 'Sinh viên có khả năng tốt về hệ thống và vận hành.' }
      ]
    }
  ]
};

export const mockClassData = {
  stats: {
    totalClasses: 24,
    classChange: 3,
    activeClasses: 18,
    activeChange: 2,
    totalStudents: 1050,
    studentChange: 45,
    averageScore: 7.6,
    scoreChange: 0.3,
    completionRate: 82,
    completionChange: 5,
    atRiskClasses: 2,
    riskChange: -1
  },
  
  classes: [
    // Khóa 2026 - Đang học (năm 1)
    {
      id: 1,
      name: 'K26-CNTT-01',
      cohort: 2026,
      enrolledStudents: 48,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 8,
      submittedAssignments: 96,  // 48 students × 8 assignments × 25% = 96
      averageScore: 7.2,
      instructor: 'TS. Nguyễn Văn An'
    },
    {
      id: 2,
      name: 'K26-CNTT-02',
      cohort: 2026,
      enrolledStudents: 45,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 8,
      submittedAssignments: 83,  // 45 × 8 × 23% = 83
      averageScore: 7.0,
      instructor: 'TS. Trần Thị Bình'
    },
    {
      id: 3,
      name: 'K26-CNTT-03',
      cohort: 2026,
      enrolledStudents: 47,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 8,
      submittedAssignments: 90,  // 47 × 8 × 24% = 90
      averageScore: 7.1,
      instructor: 'TS. Lê Văn Cường'
    },
    {
      id: 26,
      name: 'K26-CNTT-04',
      cohort: 2026,
      enrolledStudents: 46,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 8,
      submittedAssignments: 88,  // 46 × 8 × 24% = 88
      averageScore: 7.3,
      instructor: 'ThS. Bùi Thị Hoa'
    },
    
    // Khóa 2025 - Đang học (năm 2)
    {
      id: 4,
      name: 'K25-CNTT-01',
      cohort: 2025,
      enrolledStudents: 46,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 10,
      submittedAssignments: 239,  // 46 × 10 × 52% = 239
      averageScore: 7.4,
      instructor: 'TS. Nguyễn Văn An'
    },
    {
      id: 5,
      name: 'K25-CNTT-02',
      cohort: 2025,
      enrolledStudents: 44,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 10,
      submittedAssignments: 220,  // 44 × 10 × 50% = 220
      averageScore: 7.3,
      instructor: 'TS. Trần Thị Bình'
    },
    {
      id: 6,
      name: 'K25-CNTT-03',
      cohort: 2025,
      enrolledStudents: 45,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 10,
      submittedAssignments: 230,  // 45 × 10 × 51% = 230
      averageScore: 7.2,
      instructor: 'ThS. Phạm Thị Dung'
    },
    {
      id: 27,
      name: 'K25-CNTT-04',
      cohort: 2025,
      enrolledStudents: 44,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 10,
      submittedAssignments: 216,  // 44 × 10 × 49% = 216
      averageScore: 7.5,
      instructor: 'ThS. Hoàng Văn Em'
    },
    
    // Khóa 2024 - Đang học (năm 3)
    {
      id: 7,
      name: 'K24-CNTT-01',
      cohort: 2024,
      enrolledStudents: 43,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa C',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 12,
      submittedAssignments: 387,  // 43 × 12 × 75% = 387
      averageScore: 7.6,
      instructor: 'ThS. Hoàng Văn Em'
    },
    {
      id: 8,
      name: 'K24-CNTT-02',
      cohort: 2024,
      enrolledStudents: 42,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa C',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 12,
      submittedAssignments: 368,  // 42 × 12 × 73% = 368
      averageScore: 7.5,
      instructor: 'ThS. Vũ Thị Phương'
    },
    {
      id: 9,
      name: 'K24-CNTT-03',
      cohort: 2024,
      enrolledStudents: 44,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa C',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 12,
      submittedAssignments: 391,  // 44 × 12 × 74% = 391
      averageScore: 7.4,
      instructor: 'ThS. Đặng Văn Giang'
    },
    {
      id: 28,
      name: 'K24-CNTT-04',
      cohort: 2024,
      enrolledStudents: 43,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa C',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 12,
      submittedAssignments: 381,  // 43 × 12 × 74% = 381
      averageScore: 7.7,
      instructor: 'TS. Lê Văn Cường'
    },
    
    // Khóa 2023 - Đang học (năm 4)
    {
      id: 10,
      name: 'K23-CNTT-01',
      cohort: 2023,
      enrolledStudents: 41,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 15,
      submittedAssignments: 541,  // 41 × 15 × 88% = 541
      averageScore: 7.8,
      instructor: 'TS. Lê Văn Cường'
    },
    {
      id: 11,
      name: 'K23-CNTT-02',
      cohort: 2023,
      enrolledStudents: 40,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 15,
      submittedAssignments: 516,  // 40 × 15 × 86% = 516
      averageScore: 7.7,
      instructor: 'ThS. Phạm Thị Dung'
    },
    {
      id: 12,
      name: 'K23-CNTT-03',
      cohort: 2023,
      enrolledStudents: 42,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'active',
      totalAssignments: 15,
      submittedAssignments: 548,  // 42 × 15 × 87% = 548
      averageScore: 7.6,
      instructor: 'ThS. Bùi Thị Hoa'
    },
    
    // Khóa 2022 - Đã kết thúc
    {
      id: 13,
      name: 'K22-CNTT-01',
      cohort: 2022,
      enrolledStudents: 45,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 810,  // 45 × 18 × 100% = 810
      averageScore: 8.2,
      instructor: 'TS. Nguyễn Văn An'
    },
    {
      id: 14,
      name: 'K22-CNTT-02',
      cohort: 2022,
      enrolledStudents: 43,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 774,  // 43 × 18 × 100% = 774
      averageScore: 8.0,
      instructor: 'TS. Trần Thị Bình'
    },
    {
      id: 15,
      name: 'K22-CNTT-03',
      cohort: 2022,
      enrolledStudents: 44,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 792,  // 44 × 18 × 100% = 792
      averageScore: 8.1,
      instructor: 'TS. Lê Văn Cường'
    },
    
    // Khóa 2021 - Đã kết thúc
    {
      id: 16,
      name: 'K21-CNTT-01',
      cohort: 2021,
      enrolledStudents: 40,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 720,  // 40 × 18 × 100% = 720
      averageScore: 8.3,
      instructor: 'TS. Nguyễn Văn An'
    },
    {
      id: 17,
      name: 'K21-CNTT-02',
      cohort: 2021,
      enrolledStudents: 38,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 684,  // 38 × 18 × 100% = 684
      averageScore: 8.1,
      instructor: 'TS. Trần Thị Bình'
    },
    {
      id: 18,
      name: 'K21-CNTT-03',
      cohort: 2021,
      enrolledStudents: 39,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 702,  // 39 × 18 × 100% = 702
      averageScore: 8.2,
      instructor: 'ThS. Phạm Thị Dung'
    },
    
    // Khóa 2020 - Đã kết thúc
    {
      id: 19,
      name: 'K20-CNTT-01',
      cohort: 2020,
      enrolledStudents: 38,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 684,  // 38 × 18 × 100% = 684
      averageScore: 8.0,
      instructor: 'TS. Nguyễn Văn An'
    },
    {
      id: 20,
      name: 'K20-CNTT-02',
      cohort: 2020,
      enrolledStudents: 37,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa A',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 666,  // 37 × 18 × 100% = 666
      averageScore: 7.9,
      instructor: 'TS. Trần Thị Bình'
    },
    {
      id: 21,
      name: 'K20-CNTT-03',
      cohort: 2020,
      enrolledStudents: 36,
      schedule: 'Thứ 2-6, 8:00-17:00',
      location: 'Tòa B',
      duration: '4 năm',
      status: 'completed',
      totalAssignments: 18,
      submittedAssignments: 648,  // 36 × 18 × 100% = 648
      averageScore: 8.1,
      instructor: 'TS. Lê Văn Cường'
    }
  ]
};

