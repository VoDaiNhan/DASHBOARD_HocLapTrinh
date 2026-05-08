
export const courses = [
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-technique', name: 'Kĩ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Phát triển web' },
  { id: 'mobile-dev', name: 'Phát triển ứng dụng di động' },
  { id: 'software-eng', name: 'Công nghệ phần mềm' },
];

export const allInstructors = [
  { id: 1, name: 'TS. Nguyễn Văn An', email: 'an.nv@university.edu.vn', department: 'CNTT' },
  { id: 2, name: 'ThS. Trần Thị Bình', email: 'binh.tt@university.edu.vn', department: 'CNTT' },
  { id: 3, name: 'PGS. Ngô Văn Hùng', email: 'hung.nv@university.edu.vn', department: 'CNTT' },
  { id: 4, name: 'TS. Hoàng Thị Em', email: 'em.ht@university.edu.vn', department: 'CNTT' },
];

export const completionData = {
  'intro-prog': {
    data: [
      { year: '2022', completion: 75, studentCount: 120, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 78, studentCount: 115, failRate: 11, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 82, studentCount: 110, failRate: 9, absenceRate: 6, midtermAvg: 7.8, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 88, studentCount: 105, failRate: 7, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 3, dropout: 3, notEligible: 1 },
    ],
    instructor: 'TS. Nguyễn Văn An',
    benchmark: 75,
    target: 85,
    bottleneck: { type: 'class', name: '22CT111', rate: 68 },
  },
  'prog-technique': {
    data: [
      { year: '2022', completion: 70, studentCount: 110, failRate: 15, absenceRate: 10, midtermAvg: 6.8, failedByGrade: 8, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 72, studentCount: 108, failRate: 14, absenceRate: 9, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 75, studentCount: 105, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 79, studentCount: 100, failRate: 10, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Trần Thị Bình',
    benchmark: 70,
    target: 80,
    bottleneck: { type: 'class', name: '22CT112', rate: 65 },
  },
  'oop': {
    data: [
      { year: '2022', completion: 68, studentCount: 115, failRate: 18, absenceRate: 12, midtermAvg: 6.5, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2023', completion: 70, studentCount: 112, failRate: 16, absenceRate: 11, midtermAvg: 6.7, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 73, studentCount: 108, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 8, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 76, studentCount: 105, failRate: 12, absenceRate: 9, midtermAvg: 7.3, failedByGrade: 7, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Lê Văn Cường',
    benchmark: 68,
    target: 78,
    bottleneck: { type: 'topic', name: 'Kế thừa & Đa hình', rate: 62 },
  },
  'data-struct-algo': {
    data: [
      { year: '2022', completion: 65, studentCount: 100, failRate: 20, absenceRate: 12, midtermAvg: 6.3, failedByGrade: 11, dropout: 7, notEligible: 2 },
      { year: '2023', completion: 68, studentCount: 98, failRate: 18, absenceRate: 11, midtermAvg: 6.6, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2024', completion: 71, studentCount: 95, failRate: 16, absenceRate: 10, midtermAvg: 6.9, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2025', completion: 74, studentCount: 92, failRate: 14, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 8, dropout: 4, notEligible: 2 },
    ],
    instructor: 'PGS. Phạm Văn Đức',
    benchmark: 65,
    target: 75,
    bottleneck: { type: 'topic', name: 'Cây nhị phân', rate: 58 },
  },
  'database': {
    data: [
      { year: '2022', completion: 80, studentCount: 105, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2023', completion: 82, studentCount: 102, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 85, studentCount: 100, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
      { year: '2025', completion: 87, studentCount: 98, failRate: 7, absenceRate: 4, midtermAvg: 8.4, failedByGrade: 3, dropout: 2, notEligible: 2 },
    ],
    instructor: 'TS. Hoàng Thị Em',
    benchmark: 80,
    target: 88,
    bottleneck: { type: 'class', name: '22CT115', rate: 75 },
  },
  'web-dev': {
    data: [
      { year: '2022', completion: 77, studentCount: 95, failRate: 12, absenceRate: 8, midtermAvg: 7.5, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 79, studentCount: 93, failRate: 11, absenceRate: 7, midtermAvg: 7.7, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 81, studentCount: 90, failRate: 10, absenceRate: 6, midtermAvg: 7.9, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 84, studentCount: 88, failRate: 9, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 4, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Vũ Văn Phúc',
    benchmark: 77,
    target: 85,
    bottleneck: { type: 'topic', name: 'React Hooks', rate: 70 },
  },
  'mobile-dev': {
    data: [
      { year: '2022', completion: 72, studentCount: 85, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 74, studentCount: 83, failRate: 13, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 6, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 77, studentCount: 80, failRate: 12, absenceRate: 8, midtermAvg: 7.4, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 80, studentCount: 78, failRate: 10, absenceRate: 7, midtermAvg: 7.6, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Đỗ Thị Giang',
    benchmark: 72,
    target: 82,
    bottleneck: { type: 'topic', name: 'State Management', rate: 65 },
  },
  'software-eng': {
    data: [
      { year: '2022', completion: 78, studentCount: 90, failRate: 11, absenceRate: 8, midtermAvg: 7.6, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 80, studentCount: 88, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 83, studentCount: 85, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 86, studentCount: 83, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
    ],
    instructor: 'PGS. Ngô Văn Hùng',
    benchmark: 78,
    target: 87,
    bottleneck: { type: 'class', name: '22CT118', rate: 72 },
  },
};

export const SCHOOL_BENCHMARK = 75;

export const getCourseRankings = () => {
  return Object.entries(completionData).map(([id, info]) => ({
    id,
    name: courses.find(c => c.id === id)?.name || id,
    completion: info.data[info.data.length - 1].completion,
    instructor: info.instructor,
  })).sort((a, b) => b.completion - a.completion);
};
