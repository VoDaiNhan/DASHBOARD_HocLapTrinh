// Mock data cho Student Learning Dashboard

export const studentInfo = {
  name: "Nguyễn Văn An",
  studentId: "SV2023001",
  class: "CNTT K18",
  course: "Lập trình Web",
  avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+An&background=3b82f6&color=fff&size=128",
  level: "Intermediate",
  averageScore: 8.2,
  progress: 72,
  riskLevel: "Low", // Low, Medium, High
  totalCredits: 45,
  currentSemester: "HK2 2024-2025"
};

// Hàm tạo dữ liệu tiến độ dựa trên khóa học đã đăng ký
// Mỗi khóa học sẽ có 1 đường riêng trên biểu đồ
// Tiến độ được tính từ bài học đã hoàn thành (nếu có) hoặc từ bài tập (fallback)
export const generateProgressData = (enrolledCourses, courseLessons = {}) => {
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return [];
  }

  // Lấy danh sách bài học đã hoàn thành từ sessionStorage
  const savedCompletedLessons = typeof window !== 'undefined' 
    ? JSON.parse(sessionStorage.getItem('completedLessons') || '[]')
    : [];

  const weeklyTargets = [
    { week: "Tuần 1", target: 12.5 },
    { week: "Tuần 2", target: 25 },
    { week: "Tuần 3", target: 37.5 },
    { week: "Tuần 4", target: 50 },
    { week: "Tuần 5", target: 62.5 },
    { week: "Tuần 6", target: 75 },
    { week: "Tuần 7", target: 87.5 },
    { week: "Tuần 8", target: 100 }
  ];
  
  // Tính tiến độ thực tế cho từng khóa học
  const courseProgressMap = {};
  enrolledCourses.forEach((course) => {
    let actualProgress = 0;
    
    // Ưu tiên tính từ bài học đã hoàn thành
    const lessons = courseLessons[course.id] || [];
    if (lessons.length > 0) {
      const completedLessons = lessons.filter(l => savedCompletedLessons.includes(l.id));
      actualProgress = Math.min(100, Math.round((completedLessons.length / lessons.length) * 100));
    } else {
      // Fallback: tính từ bài tập nếu không có bài học
      const courseExs = courseExercises[course.id] || [];
      const totalExercises = courseExs.length;
      const completedExercises = courseExs.filter(ex => ex.completed).length;
      actualProgress = totalExercises > 0 
        ? Math.min(100, Math.round((completedExercises / totalExercises) * 100))
        : 0;
    }
    
    // Sử dụng tiến độ từ course.progress nếu có (được cập nhật từ trang bài học)
    // Đây là nguồn dữ liệu chính xác nhất
    if (course.progress !== undefined && course.progress !== null) {
      actualProgress = course.progress;
    }
    
    courseProgressMap[course.id] = actualProgress;
  });

  // Tính tiến độ cho từng khóa học riêng biệt
  // Hiển thị tiến độ thực tế từ bài học đã hoàn thành
  // Bỏ logic tính tuần, chỉ hiển thị tiến độ thực tế
  return weeklyTargets.map((targetItem, weekIndex) => {
    const dataPoint = {
      week: targetItem.week,
      target: targetItem.target
    };

    // Tính tiến độ cho từng khóa học
    enrolledCourses.forEach((course) => {
      const actualProgress = courseProgressMap[course.id] || 0;
      
      // Hiển thị tiến độ thực tế ở tất cả các tuần
      // User học tới đâu thì tiến độ tới đó, không phân bổ theo tuần
      // Hiển thị tiến độ thực tế ở tất cả các tuần từ tuần 1
      let weeklyProgress = actualProgress;
    
      // Sử dụng tên khóa học làm key (loại bỏ ký tự đặc biệt để làm key hợp lệ)
      const courseKey = course.name.replace(/[^a-zA-Z0-9]/g, '_');
      dataPoint[courseKey] = weeklyProgress;
      // Lưu thêm thông tin để hiển thị tên đầy đủ
      dataPoint[`${courseKey}_name`] = course.name;
    });

    return dataPoint;
  });
};

// Dữ liệu mẫu cho demo (khi chưa có khóa học)
export const sampleProgressData = [
  { week: "Tuần 1", progress: 15, target: 20, completedExercises: 2, totalExercises: 15 },
  { week: "Tuần 2", progress: 28, target: 35, completedExercises: 4, totalExercises: 15 },
  { week: "Tuần 3", progress: 42, target: 50, completedExercises: 6, totalExercises: 15 },
  { week: "Tuần 4", progress: 55, target: 65, completedExercises: 8, totalExercises: 15 },
  { week: "Tuần 5", progress: 68, target: 75, completedExercises: 10, totalExercises: 15 },
  { week: "Tuần 6", progress: 78, target: 85, completedExercises: 12, totalExercises: 15 },
  { week: "Tuần 7", progress: 85, target: 90, completedExercises: 13, totalExercises: 15 },
  { week: "Tuần 8", progress: 92, target: 100, completedExercises: 14, totalExercises: 15 }
];

export const kpiData = {
  completionRate: 72,
  submittedAssignments: 12,
  totalAssignments: 15,
  averageScore: 8.2,
  studyHoursPerWeek: 18,
  classRank: 5,
  totalStudents: 45
};

export const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Bài tập chưa nộp",
    message: "Bạn chưa nộp bài tập 13 - Deadline: 29/10/2025",
    time: "2 giờ trước",
    icon: "⚠️"
  },
  {
    id: 2,
    type: "info",
    title: "Bài kiểm tra sắp tới",
    message: "Kiểm tra giữa kỳ môn Lập trình Web - Ngày 05/11/2025",
    time: "1 ngày trước",
    icon: "📅"
  },
  {
    id: 3,
    type: "success",
    title: "Hoàn thành xuất sắc",
    message: "Bạn đã đạt 10 điểm cho bài tập 12 - React Components",
    time: "3 ngày trước",
    icon: "🎉"
  },
  {
    id: 4,
    type: "warning",
    title: "Điểm thấp",
    message: "Điểm bài 10 (6.5) thấp hơn trung bình lớp (7.8)",
    time: "5 ngày trước",
    icon: "📊"
  }
];

// Bài tập theo từng khóa học (mỗi khóa học có 5 bài tập)
export const courseExercises = {
  1: [ // Nhập môn Lập trình (IT1010)
    {
      id: 101,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập 1: Tính toán cơ bản",
      level: "Easy",
      fitPercent: 95,
      description: "Viết chương trình tính tổng, hiệu, tích, thương của hai số",
      estimatedTime: "1 giờ",
      skills: ["Biến", "Kiểu dữ liệu", "Phép toán"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản"]
    },
    {
      id: 102,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập 2: Cấu trúc điều kiện",
      level: "Easy",
      fitPercent: 90,
      description: "Sử dụng if-else để giải quyết bài toán phân loại",
      estimatedTime: "2 giờ",
      skills: ["If-else", "Switch-case", "Logic"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"]
    },
    {
      id: 103,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập 3: Vòng lặp",
      level: "Medium",
      fitPercent: 88,
      description: "Sử dụng vòng lặp để tính tổng, giai thừa, dãy số",
      estimatedTime: "2.5 giờ",
      skills: ["For", "While", "Do-while"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"]
    },
    {
      id: 104,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập 4: Hàm và Thủ tục",
      level: "Medium",
      fitPercent: 85,
      description: "Tạo các hàm để tính toán và xử lý dữ liệu",
      estimatedTime: "3 giờ",
      skills: ["Hàm", "Tham số", "Giá trị trả về"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Code quality"]
    },
    {
      id: 105,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập 5: Dự án tổng hợp",
      level: "Hard",
      fitPercent: 92,
      description: "Xây dựng chương trình quản lý đơn giản sử dụng tất cả kiến thức đã học",
      estimatedTime: "4 giờ",
      skills: ["Tổng hợp", "Dự án", "Thực hành"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề", "Code quality"]
    }
  ],
  2: [ // Kỹ thuật Lập trình (IT1020)
    {
      id: 201,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài tập 1: Xử lý Mảng một chiều",
      level: "Easy",
      fitPercent: 95,
      description: "Thao tác cơ bản với mảng: nhập, xuất, tìm kiếm, sắp xếp",
      estimatedTime: "2 giờ",
      skills: ["Mảng", "Vòng lặp", "Thuật toán cơ bản"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"]
    },
    {
      id: 202,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài tập 2: Xử lý Mảng hai chiều",
      level: "Medium",
      fitPercent: 90,
      description: "Làm việc với ma trận: nhập xuất, tính tổng, tích ma trận",
      estimatedTime: "3 giờ",
      skills: ["Mảng 2D", "Ma trận", "Thuật toán"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"]
    },
    {
      id: 203,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài tập 3: Xử lý Chuỗi",
      level: "Medium",
      fitPercent: 88,
      description: "Các thao tác với chuỗi: đếm từ, đảo ngược, tìm kiếm",
      estimatedTime: "2.5 giờ",
      skills: ["Chuỗi", "String manipulation", "Thuật toán"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"]
    },
    {
      id: 204,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài tập 4: Con trỏ và Quản lý bộ nhớ",
      level: "Hard",
      fitPercent: 85,
      description: "Sử dụng con trỏ để quản lý bộ nhớ động",
      estimatedTime: "4 giờ",
      skills: ["Con trỏ", "Bộ nhớ động", "Memory management"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Code quality"]
    },
    {
      id: 205,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài tập 5: Xử lý File",
      level: "Hard",
      fitPercent: 87,
      description: "Đọc/ghi file, xử lý dữ liệu từ file",
      estimatedTime: "3.5 giờ",
      skills: ["File I/O", "Xử lý dữ liệu", "Thực hành"],
      completed: false,
      points: 10,
      criteria: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề", "Code quality"]
    }
  ],
  3: [ // Cấu trúc Dữ liệu & Giải thuật (IT2030)
    {
      id: 301,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập 1: Array và Linked List",
      level: "Medium",
      fitPercent: 90,
      description: "Cài đặt các thao tác cơ bản trên Array và Linked List",
      estimatedTime: "3 giờ",
      skills: ["Data Structures", "Arrays", "Linked List"],
      completed: false,
      points: 10,
      criteria: ["Thuật toán & Cấu trúc dữ liệu", "Giải quyết vấn đề"]
    },
    {
      id: 302,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập 2: Stack và Queue",
      level: "Medium",
      fitPercent: 88,
      description: "Implement Stack và Queue, ứng dụng giải quyết bài toán",
      estimatedTime: "3 giờ",
      skills: ["Stack", "Queue", "Problem Solving"],
      completed: false,
      points: 10,
      criteria: ["Thuật toán & Cấu trúc dữ liệu", "Giải quyết vấn đề"]
    },
    {
      id: 303,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập 3: Tree Traversal",
      level: "Hard",
      fitPercent: 85,
      description: "Cài đặt các phương pháp duyệt cây nhị phân (Preorder, Inorder, Postorder)",
      estimatedTime: "4 giờ",
      skills: ["Trees", "Recursion", "Traversal"],
      completed: false,
      points: 10,
      criteria: ["Thuật toán & Cấu trúc dữ liệu", "Giải quyết vấn đề"]
    },
    {
      id: 304,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập 4: Sorting Algorithms",
      level: "Hard",
      fitPercent: 87,
      description: "Implement và so sánh các thuật toán sắp xếp (Bubble, Quick, Merge)",
      estimatedTime: "5 giờ",
      skills: ["Sorting", "Algorithms", "Complexity Analysis"],
      completed: false,
      points: 10,
      criteria: ["Thuật toán & Cấu trúc dữ liệu", "Giải quyết vấn đề", "Code quality"]
    },
    {
      id: 305,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập 5: Graph Algorithms",
      level: "Hard",
      fitPercent: 82,
      description: "BFS, DFS và tìm đường đi ngắn nhất trên đồ thị",
      estimatedTime: "6 giờ",
      skills: ["Graph", "BFS", "DFS", "Dijkstra"],
      completed: false,
      points: 10,
      criteria: ["Thuật toán & Cấu trúc dữ liệu", "Giải quyết vấn đề"]
    }
  ],
  4: [ // Lập trình Hướng đối tượng (IT2040)
    {
      id: 401,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập 1: Class và Object",
      level: "Easy",
      fitPercent: 95,
      description: "Tạo class và object, các phương thức cơ bản",
      estimatedTime: "2 giờ",
      skills: ["Class", "Object", "OOP Basics"],
      completed: false,
      points: 10,
      criteria: ["Lập trình hướng đối tượng", "Kỹ năng lập trình cơ bản"]
    },
    {
      id: 402,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập 2: Encapsulation",
      level: "Medium",
      fitPercent: 90,
      description: "Áp dụng đóng gói dữ liệu với access modifiers",
      estimatedTime: "2.5 giờ",
      skills: ["Encapsulation", "Access Modifiers", "OOP"],
      completed: false,
      points: 10,
      criteria: ["Lập trình hướng đối tượng", "Code quality"]
    },
    {
      id: 403,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập 3: Inheritance",
      level: "Medium",
      fitPercent: 88,
      description: "Sử dụng kế thừa để mở rộng class",
      estimatedTime: "3 giờ",
      skills: ["Inheritance", "OOP", "Class Design"],
      completed: false,
      points: 10,
      criteria: ["Lập trình hướng đối tượng", "Giải quyết vấn đề"]
    },
    {
      id: 404,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập 4: Polymorphism",
      level: "Hard",
      fitPercent: 85,
      description: "Áp dụng đa hình (method overriding, overloading)",
      estimatedTime: "4 giờ",
      skills: ["Polymorphism", "Method Overriding", "OOP"],
      completed: false,
      points: 10,
      criteria: ["Lập trình hướng đối tượng", "Giải quyết vấn đề", "Code quality"]
    },
    {
      id: 405,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập 5: Dự án OOP",
      level: "Hard",
      fitPercent: 92,
      description: "Xây dựng ứng dụng hoàn chỉnh sử dụng tất cả khái niệm OOP",
      estimatedTime: "6 giờ",
      skills: ["OOP", "Project", "Design Patterns"],
      completed: false,
      points: 10,
      criteria: ["Lập trình hướng đối tượng", "Giải quyết vấn đề", "Code quality"]
    }
  ]
};

export const learningPath = [
  {
    id: 1,
    title: "HTML & CSS Cơ bản",
    status: "completed",
    date: "Tuần 1-2"
  },
  {
    id: 2,
    title: "JavaScript ES6+",
    status: "completed",
    date: "Tuần 3-4"
  },
  {
    id: 3,
    title: "React Fundamentals",
    status: "current",
    date: "Tuần 5-7"
  },
  {
    id: 4,
    title: "State Management",
    status: "upcoming",
    date: "Tuần 8-9"
  },
  {
    id: 5,
    title: "Backend with Node.js",
    status: "upcoming",
    date: "Tuần 10-12"
  }
];

export const errorStats = [
  { type: "Syntax Error", count: 15, color: "#dc2626" }, // Danger (màu chuẩn CSS)
  { type: "Logic Error", count: 23, color: "#ff9800" }, // Accent Orange
  { type: "Runtime Error", count: 8, color: "#3f51b5" }, // Primary Blue
  { type: "Style Error", count: 12, color: "#5c6bc0" } // Primary Blue variant
];

export const submissions = [
  {
    id: 1,
    assignmentName: "Bài 12 - React Components",
    submittedAt: "25/10/2025 14:30",
    testsPassed: 10,
    testsTotal: 10,
    score: 10,
    status: "passed",
    errors: []
  },
  {
    id: 2,
    assignmentName: "Bài 11 - JavaScript Advanced",
    submittedAt: "20/10/2025 16:45",
    testsPassed: 7,
    testsTotal: 10,
    score: 7.5,
    status: "partial",
    errors: [
      {
        type: "Logic Error",
        description: "Vòng lặp không xử lý trường hợp mảng rỗng",
        suggestion: "Thêm kiểm tra if (array.length === 0) return null;"
      },
      {
        type: "Runtime Error",
        description: "Cannot read property 'length' of undefined",
        suggestion: "Kiểm tra biến trước khi truy cập: if (data && data.length)"
      }
    ]
  },
  {
    id: 3,
    assignmentName: "Bài 10 - DOM Manipulation",
    submittedAt: "15/10/2025 10:20",
    testsPassed: 5,
    testsTotal: 10,
    score: 6.5,
    status: "partial",
    errors: [
      {
        type: "Syntax Error",
        description: "Thiếu dấu ngoặc đóng trong hàm addEventListener",
        suggestion: "Kiểm tra lại cú pháp: addEventListener('click', function() { ... });"
      },
      {
        type: "Logic Error",
        description: "Event listener được gán nhiều lần",
        suggestion: "Xóa listener cũ trước khi thêm mới hoặc dùng flag để kiểm tra"
      }
    ]
  },
  {
    id: 4,
    assignmentName: "Bài 9 - Array Methods",
    submittedAt: "10/10/2025 09:15",
    testsPassed: 8,
    testsTotal: 10,
    score: 8.5,
    status: "passed",
    errors: [
      {
        type: "Logic Error",
        description: "Filter không xử lý đúng điều kiện edge case",
        suggestion: "Xem xét các trường hợp đặc biệt: null, undefined, empty array"
      }
    ]
  }
];

export const softSkills = {
  communication: 4.2,
  teamwork: 4.5,
  timeManagement: 3.8,
  problemSolving: 4.0,
  creativity: 3.5,
  leadership: 3.2
};

export const projects = [
  {
    id: 1,
    name: "Website Thương mại Điện tử",
    role: "Frontend Developer",
    progress: 75,
    deadline: "15/11/2025",
    teamMembers: 4,
    status: "on-track",
    tasks: {
      completed: 12,
      total: 16
    }
  },
  {
    id: 2,
    name: "Ứng dụng Quản lý Thư viện",
    role: "Full-stack Developer",
    progress: 45,
    deadline: "30/11/2025",
    teamMembers: 3,
    status: "at-risk",
    tasks: {
      completed: 9,
      total: 20
    }
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    role: "UI/UX Designer",
    progress: 90,
    deadline: "01/11/2025",
    teamMembers: 2,
    status: "on-track",
    tasks: {
      completed: 18,
      total: 20
    }
  }
];

export const skillImprovements = [
  {
    skill: "Giao tiếp",
    currentLevel: 4.2,
    suggestion: "Tham gia thêm các buổi thuyết trình nhóm và code review để cải thiện kỹ năng trình bày ý tưởng."
  },
  {
    skill: "Quản lý thời gian",
    currentLevel: 3.8,
    suggestion: "Sử dụng phương pháp Pomodoro và lập kế hoạch học tập cụ thể cho từng tuần."
  },
  {
    skill: "Lãnh đạo",
    currentLevel: 3.2,
    suggestion: "Chủ động đảm nhận vai trò team leader trong dự án nhỏ để rèn luyện khả năng điều phối nhóm."
  }
];

export const achievements = [
  {
    id: 1,
    title: "Code Master",
    description: "Hoàn thành 50 bài tập lập trình",
    icon: "🏆",
    earned: true,
    earnedDate: "15/10/2025"
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Đạt 10 điểm cho 5 bài tập liên tiếp",
    icon: "⭐",
    earned: true,
    earnedDate: "20/10/2025"
  },
  {
    id: 3,
    title: "Team Player",
    description: "Hoàn thành 3 dự án nhóm xuất sắc",
    icon: "🤝",
    earned: false,
    earnedDate: null
  },
  {
    id: 4,
    title: "Early Bird",
    description: "Nộp bài sớm hơn deadline 10 lần",
    icon: "🐦",
    earned: true,
    earnedDate: "18/10/2025"
  },
  {
    id: 5,
    title: "Bug Hunter",
    description: "Tìm và sửa 100 lỗi",
    icon: "🐛",
    earned: false,
    earnedDate: null
  },
  {
    id: 6,
    title: "Fast Learner",
    description: "Hoàn thành khóa học trong 80% thời gian",
    icon: "⚡",
    earned: false,
    earnedDate: null
  }
];

export const studyStats = {
  totalAssignments: 15,
  completedAssignments: 12,
  totalProjects: 3,
  completedProjects: 1,
  totalStudyHours: 126,
  averageScore: 8.2,
  highestScore: 10,
  lowestScore: 6.5,
  currentStreak: 7,
  longestStreak: 12
};

// Danh sách 4 khóa học chính
export const availableCourses = [
  {
    id: 1,
    name: "Nhập môn Lập trình",
    code: "IT1010",
    instructor: "TS. Nguyễn Văn A",
    credits: 3,
    semester: "HK2 2024-2025",
    schedule: "Thứ 2, 4 (7:00-9:30)",
    room: "D3-201",
    category: "Chuyên ngành bắt buộc",
    description: "Học các khái niệm cơ bản về lập trình, biến, hàm, vòng lặp, điều kiện và cấu trúc dữ liệu cơ bản",
    maxStudents: 60,
    enrolled: 45,
    difficulty: "Beginner",
    duration: "15 tuần",
    thumbnail: "💻",
    topics: [
      { name: "Giới thiệu lập trình", description: "Khái niệm cơ bản về lập trình" },
      { name: "Biến và Kiểu dữ liệu", description: "Các kiểu dữ liệu cơ bản" },
      { name: "Cấu trúc điều khiển", description: "If-else, switch-case" },
      { name: "Vòng lặp", description: "For, while, do-while" },
      { name: "Hàm và Thủ tục", description: "Cách tạo và sử dụng hàm" }
    ]
  },
  {
    id: 2,
    name: "Kỹ thuật Lập trình",
    code: "IT1020",
    instructor: "PGS.TS. Trần Thị B",
    credits: 3,
    semester: "HK2 2024-2025",
    schedule: "Thứ 3, 5 (13:00-15:30)",
    room: "D9-305",
    category: "Chuyên ngành bắt buộc",
    description: "Nâng cao kỹ năng lập trình với mảng, chuỗi, con trỏ, file và kỹ thuật lập trình nâng cao",
    maxStudents: 50,
    enrolled: 38,
    difficulty: "Intermediate",
    duration: "15 tuần",
    thumbnail: "⚙️",
    topics: [
      { name: "Mảng và Chuỗi", description: "Xử lý mảng một chiều, hai chiều và chuỗi" },
      { name: "Con trỏ", description: "Con trỏ và quản lý bộ nhớ" },
      { name: "Xử lý File", description: "Đọc/ghi file" },
      { name: "Kỹ thuật Debug", description: "Kỹ thuật tìm và sửa lỗi" },
      { name: "Code Quality", description: "Viết code sạch và tối ưu" }
    ]
  },
  {
    id: 3,
    name: "Cấu trúc Dữ liệu & Giải thuật",
    code: "IT2030",
    instructor: "TS. Lê Văn C",
    credits: 4,
    semester: "HK2 2024-2025",
    schedule: "Thứ 6 (9:00-12:00)",
    room: "D3-105",
    category: "Chuyên ngành bắt buộc",
    description: "Nghiên cứu các cấu trúc dữ liệu và thuật toán cơ bản như Array, Linked List, Stack, Queue, Tree, Graph",
    maxStudents: 55,
    enrolled: 42,
    difficulty: "Advanced",
    duration: "15 tuần",
    thumbnail: "🔢",
    topics: [
      { name: "Array & Linked List", description: "Cấu trúc dữ liệu tuyến tính" },
      { name: "Stack & Queue", description: "Ngăn xếp và hàng đợi" },
      { name: "Tree & Graph", description: "Cấu trúc phi tuyến" },
      { name: "Sorting Algorithms", description: "Các thuật toán sắp xếp" },
      { name: "Searching Algorithms", description: "Các thuật toán tìm kiếm" }
    ]
  },
  {
    id: 4,
    name: "Lập trình Hướng đối tượng",
    code: "IT2040",
    instructor: "TS. Đỗ Văn F",
    credits: 3,
    semester: "HK2 2024-2025",
    schedule: "Thứ 3, 6 (7:00-9:30)",
    room: "D3-201",
    category: "Chuyên ngành bắt buộc",
    description: "Lập trình OOP với các khái niệm Class, Object, Inheritance, Polymorphism, Encapsulation",
    maxStudents: 50,
    enrolled: 41,
    difficulty: "Intermediate",
    duration: "15 tuần",
    thumbnail: "☕",
    topics: [
      { name: "OOP Concepts", description: "Khái niệm OOP cơ bản" },
      { name: "Class và Object", description: "Tạo và sử dụng class" },
      { name: "Inheritance & Polymorphism", description: "Kế thừa và đa hình" },
      { name: "Encapsulation", description: "Đóng gói dữ liệu" },
      { name: "Design Patterns", description: "Các mẫu thiết kế cơ bản" }
    ]
  }
];

// Phân loại năng lực theo môn học
export const competencyByCourse = {
  1: { // Nhập môn Lập trình
    "Kỹ năng lập trình cơ bản": 85,
    "Giải quyết vấn đề": 78,
    "Code quality": 72
  },
  2: { // Kỹ thuật Lập trình
    "Kỹ năng lập trình cơ bản": 88,
    "Giải quyết vấn đề": 82,
    "Code quality": 80
  },
  3: { // Cấu trúc Dữ liệu & Giải thuật
    "Thuật toán & Cấu trúc dữ liệu": 75,
    "Giải quyết vấn đề": 80,
    "Code quality": 78
  },
  4: { // Lập trình Hướng đối tượng
    "Lập trình hướng đối tượng": 82,
    "Kỹ năng lập trình cơ bản": 85,
    "Giải quyết vấn đề": 80,
    "Code quality": 85
  }
};

// Đánh giá theo tiêu chí/năng lực (tổng hợp)
export const competencyAssessment = {
  "Kỹ năng lập trình cơ bản": {
    score: 86.5,
    level: "Khá",
    description: "Nắm vững các khái niệm cơ bản về lập trình",
    courses: ["Nhập môn Lập trình", "Kỹ thuật Lập trình", "Lập trình Hướng đối tượng"]
  },
  "Giải quyết vấn đề": {
    score: 80,
    level: "Khá",
    description: "Có khả năng phân tích và giải quyết bài toán",
    courses: ["Nhập môn Lập trình", "Kỹ thuật Lập trình", "Cấu trúc Dữ liệu & Giải thuật", "Lập trình Hướng đối tượng"]
  },
  "Code quality": {
    score: 78.75,
    level: "Khá",
    description: "Viết code có cấu trúc và dễ đọc",
    courses: ["Nhập môn Lập trình", "Kỹ thuật Lập trình", "Cấu trúc Dữ liệu & Giải thuật", "Lập trình Hướng đối tượng"]
  },
  "Thuật toán & Cấu trúc dữ liệu": {
    score: 75,
    level: "Trung bình",
    description: "Hiểu và áp dụng các cấu trúc dữ liệu cơ bản",
    courses: ["Cấu trúc Dữ liệu & Giải thuật"]
  },
  "Lập trình hướng đối tượng": {
    score: 82,
    level: "Khá",
    description: "Áp dụng tốt các nguyên lý OOP",
    courses: ["Lập trình Hướng đối tượng"]
  }
};

// Mục tiêu tiến độ theo tuần (cho biểu đồ)
export const weeklyTargets = [
  { week: "Tuần 1", target: 12.5 },
  { week: "Tuần 2", target: 25 },
  { week: "Tuần 3", target: 37.5 },
  { week: "Tuần 4", target: 50 },
  { week: "Tuần 5", target: 62.5 },
  { week: "Tuần 6", target: 75 },
  { week: "Tuần 7", target: 87.5 },
  { week: "Tuần 8", target: 100 }
];

// DT060: Gợi ý kết bạn dựa trên năng lực và sở thích
export const friendSuggestions = [
  {
    id: 1,
    name: "Trần Văn B",
    mssv: "SV2023002",
    avatar: "https://ui-avatars.com/api/?name=Tran+Van+B&background=667eea&color=fff&size=128",
    matchingScore: 92,
    commonCourses: ["Nhập môn Lập trình", "Kỹ thuật Lập trình"],
    similarSkills: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"],
    level: "Intermediate",
    averageScore: 8.5,
    interests: ["Web Development", "Algorithms"],
    isFriend: false
  },
  {
    id: 2,
    name: "Lê Thị C",
    mssv: "SV2023003",
    avatar: "https://ui-avatars.com/api/?name=Le+Thi+C&background=f093fb&color=fff&size=128",
    matchingScore: 88,
    commonCourses: ["Cấu trúc Dữ liệu & Giải thuật", "Lập trình Hướng đối tượng"],
    similarSkills: ["Thuật toán & Cấu trúc dữ liệu", "Code quality"],
    level: "Advanced",
    averageScore: 9.0,
    interests: ["Data Structures", "OOP"],
    isFriend: false
  },
  {
    id: 3,
    name: "Phạm Văn D",
    mssv: "SV2023004",
    avatar: "https://ui-avatars.com/api/?name=Pham+Van+D&background=4facfe&color=fff&size=128",
    matchingScore: 85,
    commonCourses: ["Nhập môn Lập trình", "Lập trình Hướng đối tượng"],
    similarSkills: ["Kỹ năng lập trình cơ bản", "Lập trình hướng đối tượng"],
    level: "Intermediate",
    averageScore: 8.2,
    interests: ["OOP", "Design Patterns"],
    isFriend: false
  },
  {
    id: 4,
    name: "Hoàng Thị E",
    mssv: "SV2023005",
    avatar: "https://ui-avatars.com/api/?name=Hoang+Thi+E&background=fa709a&color=fff&size=128",
    matchingScore: 90,
    commonCourses: ["Kỹ thuật Lập trình", "Cấu trúc Dữ liệu & Giải thuật"],
    similarSkills: ["Giải quyết vấn đề", "Code quality"],
    level: "Advanced",
    averageScore: 8.8,
    interests: ["Algorithms", "Problem Solving"],
    isFriend: false
  },
  {
    id: 5,
    name: "Nguyễn Văn F",
    mssv: "SV2023006",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+F&background=30cfd0&color=fff&size=128",
    matchingScore: 87,
    commonCourses: ["Nhập môn Lập trình", "Kỹ thuật Lập trình", "Lập trình Hướng đối tượng"],
    similarSkills: ["Kỹ năng lập trình cơ bản", "Giải quyết vấn đề"],
    level: "Intermediate",
    averageScore: 8.3,
    interests: ["Web Development", "OOP"],
    isFriend: false
  }
];

// DT056: Nhóm học tập - Mỗi khóa học có 2 nhóm
export const studyGroups = [
  // Khóa học 1: Nhập môn Lập trình - 2 nhóm
  {
    id: 1,
    name: "Nhóm Lập trình Cơ bản",
    courseId: 1,
    courseName: "Nhập môn Lập trình",
    members: [
      { id: 1, name: "Nguyễn Văn An", mssv: "SV2023001", role: "Leader" },
      { id: 2, name: "Trần Văn B", mssv: "SV2023002", role: "Member" },
      { id: 3, name: "Lê Thị C", mssv: "SV2023003", role: "Member" }
    ],
    progress: 75,
    assignments: { completed: 3, total: 5 },
    nextMeeting: "2025-11-25T14:00:00",
    status: "active"
  },
  {
    id: 2,
    name: "Nhóm Code Master",
    courseId: 1,
    courseName: "Nhập môn Lập trình",
    members: [
      { id: 4, name: "Phạm Văn D", mssv: "SV2023004", role: "Leader" },
      { id: 5, name: "Hoàng Thị E", mssv: "SV2023005", role: "Member" },
      { id: 6, name: "Vũ Văn F", mssv: "SV2023006", role: "Member" }
    ],
    progress: 60,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-26T10:00:00",
    status: "active"
  },
  // Khóa học 2: Kỹ thuật Lập trình - 2 nhóm
  {
    id: 3,
    name: "Nhóm Kỹ thuật Nâng cao",
    courseId: 2,
    courseName: "Kỹ thuật Lập trình",
    members: [
      { id: 1, name: "Nguyễn Văn An", mssv: "SV2023001", role: "Member" },
      { id: 7, name: "Đỗ Thị G", mssv: "SV2023007", role: "Leader" },
      { id: 8, name: "Bùi Văn H", mssv: "SV2023008", role: "Member" }
    ],
    progress: 50,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-27T14:00:00",
    status: "active"
  },
  {
    id: 4,
    name: "Nhóm Tech Pro",
    courseId: 2,
    courseName: "Kỹ thuật Lập trình",
    members: [
      { id: 2, name: "Trần Văn B", mssv: "SV2023002", role: "Leader" },
      { id: 9, name: "Lý Thị I", mssv: "SV2023009", role: "Member" },
      { id: 10, name: "Ngô Văn K", mssv: "SV2023010", role: "Member" }
    ],
    progress: 40,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-28T16:00:00",
    status: "active"
  },
  // Khóa học 3: Cấu trúc Dữ liệu & Giải thuật - 2 nhóm
  {
    id: 5,
    name: "Nhóm Algorithms",
    courseId: 3,
    courseName: "Cấu trúc Dữ liệu & Giải thuật",
    members: [
      { id: 1, name: "Nguyễn Văn An", mssv: "SV2023001", role: "Member" },
      { id: 2, name: "Trần Văn B", mssv: "SV2023002", role: "Member" },
      { id: 5, name: "Hoàng Thị E", mssv: "SV2023005", role: "Leader" }
    ],
    progress: 50,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-27T09:00:00",
    status: "active"
  },
  {
    id: 6,
    name: "Nhóm Data Structure",
    courseId: 3,
    courseName: "Cấu trúc Dữ liệu & Giải thuật",
    members: [
      { id: 3, name: "Lê Thị C", mssv: "SV2023003", role: "Leader" },
      { id: 11, name: "Phan Văn L", mssv: "SV2023011", role: "Member" },
      { id: 12, name: "Trương Thị M", mssv: "SV2023012", role: "Member" }
    ],
    progress: 45,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-29T11:00:00",
    status: "active"
  },
  // Khóa học 4: Lập trình Hướng đối tượng - 2 nhóm
  {
    id: 7,
    name: "Nhóm OOP Study",
    courseId: 4,
    courseName: "Lập trình Hướng đối tượng",
    members: [
      { id: 1, name: "Nguyễn Văn An", mssv: "SV2023001", role: "Member" },
      { id: 4, name: "Phạm Văn D", mssv: "SV2023004", role: "Leader" },
      { id: 5, name: "Hoàng Thị E", mssv: "SV2023005", role: "Member" }
    ],
    progress: 60,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-26T16:00:00",
    status: "active"
  },
  {
    id: 8,
    name: "Nhóm Object Master",
    courseId: 4,
    courseName: "Lập trình Hướng đối tượng",
    members: [
      { id: 6, name: "Vũ Văn F", mssv: "SV2023006", role: "Leader" },
      { id: 13, name: "Đinh Văn N", mssv: "SV2023013", role: "Member" },
      { id: 14, name: "Hoàng Thị O", mssv: "SV2023014", role: "Member" }
    ],
    progress: 55,
    assignments: { completed: 2, total: 5 },
    nextMeeting: "2025-11-30T13:00:00",
    status: "active"
  }
];

// Bài tập nhóm (Group Assignments)
export const groupAssignments = {
  1: [ // Nhóm Lập trình Cơ bản
    {
      id: 1001,
      groupId: 1,
      groupName: "Nhóm Lập trình Cơ bản",
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Dự án nhóm: Xây dựng ứng dụng Quản lý Thư viện",
      description: "Làm việc nhóm để xây dựng ứng dụng quản lý thư viện sử dụng các kiến thức đã học về biến, hàm, vòng lặp, cấu trúc điều kiện.",
      deadline: "2025-12-15T23:59:59",
      status: "in-progress", // not-started, in-progress, submitted, graded
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "2 tuần",
      skills: ["Lập trình cơ bản", "Làm việc nhóm", "Quản lý dự án"],
      requirements: [
        "Quản lý sách (thêm, sửa, xóa, tìm kiếm)",
        "Quản lý độc giả",
        "Quản lý mượn/trả sách",
        "Báo cáo thống kê"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Frontend", progress: 60 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "Backend", progress: 50 },
        { mssv: "SV2023003", name: "Lê Thị C", contribution: "Database", progress: 40 }
      ]
    },
    {
      id: 1002,
      groupId: 1,
      groupName: "Nhóm Lập trình Cơ bản",
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập nhóm: Tạo game Đoán số",
      description: "Tạo game đoán số với các tính năng: chọn độ khó, đếm số lần đoán, hiển thị điểm.",
      deadline: "2025-12-01T23:59:59",
      status: "submitted",
      submittedAt: "2025-11-20T14:30:00",
      score: 85,
      maxScore: 100,
      level: "Easy",
      estimatedTime: "1 tuần",
      skills: ["Lập trình cơ bản", "Game logic"],
      requirements: [
        "Random số từ 1-100",
        "Cho phép người chơi đoán",
        "Hiển thị gợi ý (lớn hơn/nhỏ hơn)",
        "Đếm số lần đoán"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Game logic", progress: 100 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "UI", progress: 100 },
        { mssv: "SV2023003", name: "Lê Thị C", contribution: "Testing", progress: 100 }
      ]
    },
    {
      id: 1003,
      groupId: 1,
      groupName: "Nhóm Lập trình Cơ bản",
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập nhóm: Xây dựng hệ thống Quản lý Sinh viên",
      description: "Xây dựng hệ thống quản lý thông tin sinh viên với các chức năng CRUD cơ bản.",
      deadline: "2025-12-20T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "3 tuần",
      skills: ["Lập trình cơ bản", "Xử lý dữ liệu", "File I/O"],
      requirements: [
        "Thêm/sửa/xóa sinh viên",
        "Tìm kiếm sinh viên",
        "Lưu dữ liệu vào file",
        "Thống kê số lượng sinh viên"
      ],
      members: []
    },
    {
      id: 1004,
      groupId: 1,
      groupName: "Nhóm Lập trình Cơ bản",
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập nhóm: Xây dựng Máy tính đơn giản",
      description: "Tạo ứng dụng máy tính đơn giản với các phép toán cơ bản: cộng, trừ, nhân, chia.",
      deadline: "2025-12-08T23:59:59",
      status: "in-progress",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Easy",
      estimatedTime: "1 tuần",
      skills: ["Lập trình cơ bản", "Xử lý input", "Phép toán"],
      requirements: [
        "Nhập 2 số từ người dùng",
        "Chọn phép toán (+, -, *, /)",
        "Hiển thị kết quả",
        "Xử lý lỗi chia cho 0"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Logic tính toán", progress: 70 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "UI", progress: 60 }
      ]
    },
    {
      id: 1005,
      groupId: 1,
      groupName: "Nhóm Lập trình Cơ bản",
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài tập nhóm: Xây dựng Chương trình Quản lý Danh bạ",
      description: "Tạo chương trình quản lý danh bạ điện thoại với các chức năng thêm, sửa, xóa, tìm kiếm liên hệ.",
      deadline: "2025-12-25T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "2 tuần",
      skills: ["Lập trình cơ bản", "Quản lý dữ liệu", "Tìm kiếm"],
      requirements: [
        "Thêm liên hệ mới",
        "Sửa thông tin liên hệ",
        "Xóa liên hệ",
        "Tìm kiếm theo tên hoặc số điện thoại",
        "Hiển thị danh sách tất cả liên hệ"
      ],
      members: []
    }
  ],
  2: [ // Nhóm OOP Study
    {
      id: 2001,
      groupId: 2,
      groupName: "Nhóm OOP Study",
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Dự án nhóm: Hệ thống Quản lý Ngân hàng",
      description: "Xây dựng hệ thống quản lý ngân hàng sử dụng các nguyên lý OOP: Class, Inheritance, Polymorphism, Encapsulation.",
      deadline: "2025-12-20T23:59:59",
      status: "in-progress",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "3 tuần",
      skills: ["OOP", "Inheritance", "Polymorphism", "Design Patterns"],
      requirements: [
        "Class Account, Customer, Transaction",
        "Inheritance cho các loại tài khoản",
        "Polymorphism cho các loại giao dịch",
        "Encapsulation cho dữ liệu nhạy cảm"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Account classes", progress: 50 },
        { mssv: "SV2023004", name: "Phạm Văn D", contribution: "Transaction system", progress: 40 },
        { mssv: "SV2023005", name: "Hoàng Thị E", contribution: "UI/Testing", progress: 30 }
      ]
    },
    {
      id: 2002,
      groupId: 2,
      groupName: "Nhóm OOP Study",
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập nhóm: Xây dựng hệ thống Quản lý Thú cưng",
      description: "Tạo hệ thống quản lý thú cưng với các class Animal, Dog, Cat sử dụng Inheritance.",
      deadline: "2025-12-05T23:59:59",
      status: "submitted",
      submittedAt: "2025-11-18T10:00:00",
      score: 90,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "1 tuần",
      skills: ["OOP", "Inheritance"],
      requirements: [
        "Class Animal (base class)",
        "Class Dog, Cat kế thừa Animal",
        "Override methods",
        "Polymorphism demo"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Base class", progress: 100 },
        { mssv: "SV2023004", name: "Phạm Văn D", contribution: "Inheritance", progress: 100 },
        { mssv: "SV2023005", name: "Hoàng Thị E", contribution: "Testing", progress: 100 }
      ]
    },
    {
      id: 2003,
      groupId: 2,
      groupName: "Nhóm OOP Study",
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập nhóm: Xây dựng hệ thống Quản lý Nhân viên",
      description: "Tạo hệ thống quản lý nhân viên với các class Employee, Manager, Developer sử dụng Inheritance và Polymorphism.",
      deadline: "2025-12-12T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "2 tuần",
      skills: ["OOP", "Inheritance", "Polymorphism"],
      requirements: [
        "Class Employee (base class)",
        "Class Manager, Developer kế thừa Employee",
        "Override method calculateSalary()",
        "Polymorphism trong danh sách nhân viên"
      ],
      members: []
    },
    {
      id: 2004,
      groupId: 2,
      groupName: "Nhóm OOP Study",
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập nhóm: Xây dựng hệ thống Quản lý Thư viện với OOP",
      description: "Xây dựng hệ thống quản lý thư viện sử dụng các nguyên lý OOP: Class Book, Member, Loan với Encapsulation.",
      deadline: "2025-12-18T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "2 tuần",
      skills: ["OOP", "Encapsulation", "Class Design"],
      requirements: [
        "Class Book với private fields",
        "Class Member với Encapsulation",
        "Class Loan quản lý mượn/trả",
        "Getter/Setter methods"
      ],
      members: []
    },
    {
      id: 2005,
      groupId: 2,
      groupName: "Nhóm OOP Study",
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài tập nhóm: Xây dựng Game với OOP",
      description: "Tạo game đơn giản sử dụng các nguyên lý OOP: Class Player, Enemy, Weapon với Inheritance và Polymorphism.",
      deadline: "2025-12-28T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "3 tuần",
      skills: ["OOP", "Inheritance", "Polymorphism", "Game Design"],
      requirements: [
        "Class Player, Enemy (base classes)",
        "Inheritance cho các loại Enemy",
        "Polymorphism cho các loại Weapon",
        "Game loop với OOP"
      ],
      members: []
    }
  ],
  3: [ // Nhóm Algorithms
    {
      id: 3001,
      groupId: 3,
      groupName: "Nhóm Algorithms",
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Dự án nhóm: Implement các thuật toán Sắp xếp",
      description: "Nhóm sẽ implement và so sánh hiệu suất của các thuật toán sắp xếp: Bubble Sort, Quick Sort, Merge Sort.",
      deadline: "2025-12-10T23:59:59",
      status: "in-progress",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "2 tuần",
      skills: ["Algorithms", "Sorting", "Complexity Analysis"],
      requirements: [
        "Implement Bubble Sort",
        "Implement Quick Sort",
        "Implement Merge Sort",
        "So sánh thời gian thực thi",
        "Viết báo cáo phân tích"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Quick Sort", progress: 60 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "Merge Sort", progress: 50 },
        { mssv: "SV2023005", name: "Hoàng Thị E", contribution: "Bubble Sort & Report", progress: 70 }
      ]
    },
    {
      id: 3002,
      groupId: 3,
      groupName: "Nhóm Algorithms",
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập nhóm: Implement các thuật toán Tìm kiếm",
      description: "Nhóm sẽ implement và so sánh hiệu suất của các thuật toán tìm kiếm: Linear Search, Binary Search.",
      deadline: "2025-12-15T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "1.5 tuần",
      skills: ["Algorithms", "Searching", "Complexity Analysis"],
      requirements: [
        "Implement Linear Search",
        "Implement Binary Search",
        "So sánh thời gian thực thi",
        "Viết báo cáo phân tích"
      ],
      members: []
    },
    {
      id: 3003,
      groupId: 3,
      groupName: "Nhóm Algorithms",
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập nhóm: Xây dựng cấu trúc dữ liệu Stack và Queue",
      description: "Implement cấu trúc dữ liệu Stack và Queue từ đầu, sau đó ứng dụng giải quyết các bài toán thực tế.",
      deadline: "2025-12-05T23:59:59",
      status: "submitted",
      submittedAt: "2025-11-22T16:00:00",
      score: 88,
      maxScore: 100,
      level: "Medium",
      estimatedTime: "2 tuần",
      skills: ["Data Structures", "Stack", "Queue", "Problem Solving"],
      requirements: [
        "Implement Stack với array",
        "Implement Queue với array",
        "Ứng dụng Stack: Kiểm tra dấu ngoặc",
        "Ứng dụng Queue: Mô phỏng hàng đợi"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Stack implementation", progress: 100 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "Queue implementation", progress: 100 },
        { mssv: "SV2023005", name: "Hoàng Thị E", contribution: "Applications & Testing", progress: 100 }
      ]
    },
    {
      id: 3004,
      groupId: 3,
      groupName: "Nhóm Algorithms",
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập nhóm: Implement Binary Tree và các phương pháp duyệt",
      description: "Xây dựng cấu trúc dữ liệu Binary Tree và implement các phương pháp duyệt: Preorder, Inorder, Postorder.",
      deadline: "2025-12-18T23:59:59",
      status: "in-progress",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "2.5 tuần",
      skills: ["Data Structures", "Trees", "Recursion", "Traversal"],
      requirements: [
        "Implement Binary Tree structure",
        "Preorder traversal",
        "Inorder traversal",
        "Postorder traversal",
        "Tìm kiếm trong tree"
      ],
      members: [
        { mssv: "SV2023001", name: "Nguyễn Văn An", contribution: "Tree structure", progress: 50 },
        { mssv: "SV2023002", name: "Trần Văn B", contribution: "Traversal methods", progress: 40 },
        { mssv: "SV2023005", name: "Hoàng Thị E", contribution: "Search algorithm", progress: 30 }
      ]
    },
    {
      id: 3005,
      groupId: 3,
      groupName: "Nhóm Algorithms",
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài tập nhóm: Implement Graph và các thuật toán BFS, DFS",
      description: "Xây dựng cấu trúc dữ liệu Graph và implement các thuật toán duyệt: Breadth-First Search (BFS) và Depth-First Search (DFS).",
      deadline: "2025-12-30T23:59:59",
      status: "not-started",
      submittedAt: null,
      score: null,
      maxScore: 100,
      level: "Hard",
      estimatedTime: "3 tuần",
      skills: ["Data Structures", "Graph", "BFS", "DFS", "Algorithms"],
      requirements: [
        "Implement Graph structure",
        "Breadth-First Search (BFS)",
        "Depth-First Search (DFS)",
        "Tìm đường đi ngắn nhất",
        "Viết báo cáo so sánh BFS vs DFS"
      ],
      members: []
    }
  ]
};

// Bài học theo khóa học (Course Lessons)
export const courseLessons = {
  1: [ // Nhập môn Lập trình
    {
      id: 1001,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài 1: Giới thiệu về Lập trình",
      description: "Tìm hiểu khái niệm cơ bản về lập trình, ngôn ngữ lập trình, và môi trường phát triển.",
      duration: 45, // phút
      type: "video", // video, reading, practice
      status: "not-started", // not-started, in-progress, completed
      completedAt: null,
      videoUrl: null,
      content: "Lập trình là quá trình viết mã để máy tính thực hiện các tác vụ cụ thể...",
      order: 1
    },
    {
      id: 1002,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài 2: Biến và Kiểu dữ liệu",
      description: "Học về biến, các kiểu dữ liệu cơ bản: số nguyên, số thực, chuỗi, boolean.",
      duration: 60,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Biến là một vùng nhớ được đặt tên để lưu trữ dữ liệu...",
      order: 2
    },
    {
      id: 1003,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài 3: Cấu trúc điều kiện (If-else)",
      description: "Sử dụng cấu trúc if-else để điều khiển luồng chương trình.",
      duration: 50,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Cấu trúc điều kiện cho phép chương trình thực hiện các hành động khác nhau...",
      order: 3
    },
    {
      id: 1004,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài 4: Vòng lặp (For, While)",
      description: "Sử dụng vòng lặp để lặp lại các thao tác trong chương trình.",
      duration: 55,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Vòng lặp cho phép thực hiện một đoạn code nhiều lần...",
      order: 4
    },
    {
      id: 1005,
      courseId: 1,
      courseName: "Nhập môn Lập trình",
      title: "Bài 5: Hàm và Thủ tục",
      description: "Tạo và sử dụng hàm để tổ chức code tốt hơn.",
      duration: 65,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Hàm là một khối code được đặt tên để thực hiện một tác vụ cụ thể...",
      order: 5
    }
  ],
  2: [ // Kỹ thuật Lập trình
    {
      id: 2001,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài 1: Xử lý Mảng một chiều",
      description: "Làm việc với mảng: khai báo, truy cập phần tử, duyệt mảng.",
      duration: 60,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Mảng là một tập hợp các phần tử cùng kiểu dữ liệu...",
      order: 1
    },
    {
      id: 2002,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài 2: Xử lý Mảng hai chiều",
      description: "Làm việc với ma trận: khai báo, truy cập, xử lý ma trận.",
      duration: 70,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Ma trận là mảng hai chiều, được sử dụng để biểu diễn dữ liệu dạng bảng...",
      order: 2
    },
    {
      id: 2003,
      courseId: 2,
      courseName: "Kỹ thuật Lập trình",
      title: "Bài 3: Xử lý Chuỗi",
      description: "Các thao tác với chuỗi: cắt, nối, tìm kiếm, thay thế.",
      duration: 55,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Chuỗi là một dãy các ký tự được đặt trong dấu ngoặc kép...",
      order: 3
    }
  ],
  3: [ // Cấu trúc Dữ liệu & Giải thuật
    {
      id: 3001,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài 1: Array và Linked List",
      description: "Tìm hiểu về cấu trúc dữ liệu Array và Linked List, so sánh ưu nhược điểm.",
      duration: 80,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Array và Linked List là hai cấu trúc dữ liệu cơ bản...",
      order: 1
    },
    {
      id: 3002,
      courseId: 3,
      courseName: "Cấu trúc Dữ liệu & Giải thuật",
      title: "Bài 2: Stack và Queue",
      description: "Cấu trúc dữ liệu Stack (LIFO) và Queue (FIFO), ứng dụng thực tế.",
      duration: 75,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Stack là cấu trúc dữ liệu LIFO (Last In First Out)...",
      order: 2
    }
  ],
  4: [ // Lập trình Hướng đối tượng
    {
      id: 4001,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài 1: Class và Object",
      description: "Khái niệm Class và Object, cách tạo và sử dụng trong lập trình OOP.",
      duration: 60,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Class là một blueprint để tạo ra các object...",
      order: 1
    },
    {
      id: 4002,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài 2: Encapsulation",
      description: "Nguyên lý đóng gói dữ liệu với access modifiers: public, private, protected.",
      duration: 55,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Encapsulation là việc ẩn chi tiết triển khai và chỉ expose những gì cần thiết...",
      order: 2
    },
    {
      id: 4003,
      courseId: 4,
      courseName: "Lập trình Hướng đối tượng",
      title: "Bài 3: Inheritance",
      description: "Kế thừa trong OOP: cách tạo class con từ class cha.",
      duration: 65,
      type: "video",
      status: "not-started",
      completedAt: null,
      videoUrl: null,
      content: "Inheritance cho phép class con kế thừa các thuộc tính và phương thức từ class cha...",
      order: 3
    }
  ]
};

// DT037: Cảnh báo đạo văn
export const plagiarismWarnings = [
  {
    id: 1,
    assignmentName: "Bài tập 12 - React Components",
    submittedAt: "2025-10-25T14:30:00",
    similarityScore: 15,
    status: "safe", // safe, warning, high-risk
    matchedSources: [
      { source: "SV2023002 - Trần Văn B", similarity: 12 },
      { source: "GitHub Repository", similarity: 3 }
    ],
    message: "Mức độ tương đồng thấp, an toàn"
  },
  {
    id: 2,
    assignmentName: "Bài tập 11 - JavaScript Advanced",
    submittedAt: "2025-10-20T16:45:00",
    similarityScore: 45,
    status: "warning",
    matchedSources: [
      { source: "SV2023003 - Lê Thị C", similarity: 35 },
      { source: "Stack Overflow", similarity: 10 }
    ],
    message: "Cảnh báo: Mức độ tương đồng trung bình. Vui lòng đảm bảo code là của bạn."
  },
  {
    id: 3,
    assignmentName: "Bài tập 10 - DOM Manipulation",
    submittedAt: "2025-10-15T10:20:00",
    similarityScore: 78,
    status: "high-risk",
    matchedSources: [
      { source: "SV2023004 - Phạm Văn D", similarity: 65 },
      { source: "GitHub Repository", similarity: 13 }
    ],
    message: "⚠️ Nguy cơ cao: Mức độ tương đồng rất cao. Cần kiểm tra lại."
  }
];

