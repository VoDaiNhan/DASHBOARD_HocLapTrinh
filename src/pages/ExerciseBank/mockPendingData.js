// Mock data for pending exercises awaiting approval
export const PENDING_EXERCISES = [
  {
    id: 'pending_1',
    title: 'Cài đặt Stack với Linked List',
    goal: 'Hiểu cách implement Stack sử dụng Linked List thay vì mảng',
    description: 'Sinh viên sẽ tự cài đặt cấu trúc dữ liệu Stack sử dụng Linked List. Bài tập bao gồm các thao tác push, pop, peek, isEmpty và size. Yêu cầu xử lý memory allocation và deallocation đúng cách.',
    hints: [
      'Sử dụng struct Node với data và next pointer',
      'Top của stack là head của linked list',
      'Push = thêm node mới vào đầu list',
      'Pop = xóa node đầu và trả về data'
    ],
    level: 'advanced',
    tags: ['stack', 'linked-list', 'data-structure', 'memory'],
    courseName: 'Kỹ thuật lập trình',
    chapterTitle: 'Chương 3: Thuật toán và cấu trúc dữ liệu',
    teacherName: 'TS. Nguyễn Văn Minh',
    teacherEmail: 'minh.nv@university.edu.vn',
    submittedAt: '2024-12-20T10:30:00Z',
    status: 'pending'
  },
  {
    id: 'pending_2',
    title: 'Validation Form với Regex',
    goal: 'Áp dụng Regular Expression để validate form input',
    description: 'Tạo form đăng ký với validation cho email, số điện thoại, mật khẩu. Sử dụng JavaScript Regex để kiểm tra format đúng. Hiển thị error message real-time khi user nhập sai.',
    hints: [
      'Email regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/',
      'Phone regex: /^(\\+84|0)[0-9]{9,10}$/',
      'Password: ít nhất 8 ký tự, có chữ hoa, số',
      'Dùng addEventListener cho real-time validation'
    ],
    level: 'basic',
    tags: ['javascript', 'regex', 'validation', 'form'],
    courseName: 'Lập trình Front-end',
    chapterTitle: 'Chương 2: JavaScript ES6+',
    teacherName: 'ThS. Trần Thị Lan',
    teacherEmail: 'lan.tt@university.edu.vn',
    submittedAt: '2024-12-20T14:15:00Z',
    status: 'pending'
  },
  {
    id: 'pending_3',
    title: 'JWT Authentication Middleware',
    goal: 'Tạo middleware xác thực JWT cho Express.js API',
    description: 'Xây dựng middleware để verify JWT token từ Authorization header. Middleware sẽ decode token, kiểm tra expiry, và attach user info vào req object. Xử lý các trường hợp token invalid, expired, hoặc missing.',
    hints: [
      'Sử dụng jsonwebtoken library',
      'Check Authorization header format: "Bearer <token>"',
      'Verify token với secret key',
      'Attach decoded user vào req.user'
    ],
    level: 'advanced',
    tags: ['jwt', 'auth', 'middleware', 'security'],
    courseName: 'Lập trình Back-end',
    chapterTitle: 'Chương 3: Authentication và Security',
    teacherName: 'PGS. Lê Văn Hùng',
    teacherEmail: 'hung.lv@university.edu.vn',
    submittedAt: '2024-12-19T16:45:00Z',
    status: 'pending'
  },
  {
    id: 'pending_4',
    title: 'Generic Repository Pattern',
    goal: 'Implement Generic Repository Pattern trong C#',
    description: 'Tạo Generic Repository để abstract database operations. Repository sẽ có các method cơ bản như GetById, GetAll, Add, Update, Delete. Sử dụng Entity Framework Core và Generic constraints.',
    hints: [
      'Tạo interface IRepository<T> với generic constraints',
      'Implement BaseRepository<T> class',
      'Sử dụng DbContext và DbSet<T>',
      'Async/await cho database operations'
    ],
    level: 'advanced',
    tags: ['csharp', 'repository-pattern', 'generics', 'ef-core'],
    courseName: 'Lập trình hướng đối tượng',
    chapterTitle: 'Chương 3: Collections và LINQ',
    teacherName: 'TS. Phạm Minh Đức',
    teacherEmail: 'duc.pm@university.edu.vn',
    submittedAt: '2024-12-19T09:20:00Z',
    status: 'pending'
  },
  {
    id: 'pending_5',
    title: 'Database Indexing Performance',
    goal: 'So sánh hiệu suất query với và không có index',
    description: 'Tạo bảng với 100,000 records. Thực hiện các query SELECT với WHERE conditions. Đo thời gian execution trước và sau khi tạo index. Phân tích execution plan và đưa ra kết luận.',
    hints: [
      'Sử dụng EXPLAIN ANALYZE để xem execution plan',
      'Tạo index trên columns thường dùng trong WHERE',
      'So sánh thời gian với \\timing trong PostgreSQL',
      'Test với different types of indexes'
    ],
    level: 'basic',
    tags: ['sql', 'indexing', 'performance', 'optimization'],
    courseName: 'Cơ sở dữ liệu',
    chapterTitle: 'Chương 2: Database Design',
    teacherName: 'ThS. Hoàng Thị Mai',
    teacherEmail: 'mai.ht@university.edu.vn',
    submittedAt: '2024-12-18T11:10:00Z',
    status: 'pending'
  },
  {
    id: 'pending_6',
    title: 'React Native Navigation Stack',
    goal: 'Cài đặt navigation giữa các screens trong React Native',
    description: 'Sử dụng React Navigation để tạo Stack Navigator. Tạo 3 screens: Home, Profile, Settings. Implement navigation với params passing và custom header styling.',
    hints: [
      'npm install @react-navigation/native @react-navigation/stack',
      'Wrap app với NavigationContainer',
      'Tạo Stack.Navigator với Stack.Screen',
      'Sử dụng navigation.navigate() để chuyển screen'
    ],
    level: 'basic',
    tags: ['react-native', 'navigation', 'stack', 'mobile'],
    courseName: 'Lập trình Mobile',
    chapterTitle: 'Chương 1: React Native cơ bản',
    teacherName: 'ThS. Vũ Đình Nam',
    teacherEmail: 'nam.vd@university.edu.vn',
    submittedAt: '2024-12-18T08:30:00Z',
    status: 'pending'
  },
  {
    id: 'pending_7',
    title: 'Docker Multi-stage Build',
    goal: 'Tối ưu Docker image size với multi-stage build',
    description: 'Tạo Dockerfile cho Node.js app sử dụng multi-stage build. Stage 1 để build app, Stage 2 chỉ copy production files. So sánh image size trước và sau optimization.',
    hints: [
      'FROM node:16 AS builder cho build stage',
      'FROM node:16-alpine AS production',
      'COPY --from=builder để copy files',
      'Chỉ copy node_modules và dist folder'
    ],
    level: 'advanced',
    tags: ['docker', 'optimization', 'multi-stage', 'nodejs'],
    courseName: 'DevOps và Cloud',
    chapterTitle: 'Chương 1: Docker và Containerization',
    teacherName: 'TS. Đặng Quốc Bảo',
    teacherEmail: 'bao.dq@university.edu.vn',
    submittedAt: '2024-12-17T15:20:00Z',
    status: 'pending'
  }
];

// Mock feedback data
export const EXERCISE_FEEDBACK = {
  'pending_2': [
    {
      id: 'feedback_1',
      type: 'difficulty',
      message: 'Bài tập này có vẻ phù hợp với mức nâng cao hơn là cơ bản. Regex validation khá phức tạp cho sinh viên mới học JavaScript.',
      timestamp: '2024-12-20T15:30:00Z',
      reviewerName: 'PGS. Nguyễn Thị Hoa'
    }
  ],
  'pending_5': [
    {
      id: 'feedback_2', 
      type: 'content',
      message: 'Nên bổ sung thêm yêu cầu về composite index và covering index để bài tập đầy đủ hơn.',
      timestamp: '2024-12-18T12:45:00Z',
      reviewerName: 'PGS. Nguyễn Thị Hoa'
    }
  ]
};