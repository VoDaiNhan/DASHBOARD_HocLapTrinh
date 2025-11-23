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
export const generateProgressData = (enrolledCourses) => {
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return [];
  }

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
  
  // Tính tiến độ cho từng khóa học riêng biệt
  return weeklyTargets.map((targetItem, weekIndex) => {
    const dataPoint = {
      week: targetItem.week,
      target: targetItem.target
    };

    // Tính tiến độ cho từng khóa học
    enrolledCourses.forEach((course) => {
      const courseExs = courseExercises[course.id] || [];
      const totalExercises = courseExs.length;
      const completedExercises = courseExs.filter(ex => ex.completed).length;
    
      // Tính phần trăm hoàn thành thực tế
      const actualProgress = totalExercises > 0 
        ? Math.min(100, Math.round((completedExercises / totalExercises) * 100))
        : 0;
      
      // Phân bổ tiến độ theo tuần (giả định tiến độ tăng đều)
      const weeklyProgress = Math.min(100, Math.round(((weekIndex + 1) / weeklyTargets.length) * actualProgress));
    
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

