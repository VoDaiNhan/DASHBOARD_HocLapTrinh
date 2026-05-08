
export const COHORTS = [
  { value: '2018-2022', label: '2018-2022' },
  { value: '2019-2023', label: '2019-2023' },
  { value: '2020-2024', label: '2020-2024' },
  { value: '2021-2025', label: '2021-2025' },
  { value: '2022-2026', label: '2022-2026' },
];

export const courses = [
  { id: 'all', name: 'Tất cả môn học' },
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-technique', name: 'Kĩ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Phát triển web' },
  { id: 'mobile-dev', name: 'Phát triển ứng dụng di động' },
  { id: 'software-eng', name: 'Công nghệ phần mềm' },
];

export const RANKING_META = [
  { name: 'Xuất sắc', color: '#10b981', range: '9.0 - 10.0', key: 'excellent' },
  { name: 'Giỏi', color: '#3b82f6', range: '8.0 - 8.9', key: 'good' },
  { name: 'Khá', color: '#6366f1', range: '7.0 - 7.9', key: 'kha' },
  { name: 'Trung bình khá', color: '#8b5cf6', range: '6.0 - 6.9', key: 'tbKha' },
  { name: 'Trung bình', color: '#f59e0b', range: '5.0 - 5.9', key: 'trungBinh' },
  { name: 'Yếu', color: '#ef4444', range: '4.0 - 4.9', key: 'yeu' },
  { name: 'Kém', color: '#991b1b', range: '< 4.0', key: 'kem' },
];

export const getAcademicRank = (grade) => {
  const numGrade = parseFloat(grade);
  if (isNaN(numGrade)) return 'kem';

  if (numGrade >= 9.0 && numGrade <= 10.0) return 'excellent';
  else if (numGrade >= 8.0 && numGrade <= 8.9) return 'good';
  else if (numGrade >= 7.0 && numGrade <= 7.9) return 'kha';
  else if (numGrade >= 6.0 && numGrade <= 6.9) return 'tbKha';
  else if (numGrade >= 5.0 && numGrade <= 5.9) return 'trungBinh';
  else if (numGrade >= 4.0 && numGrade <= 4.9) return 'yeu';
  else return 'kem';
};

export const validateAndFixStudentCategories = (students) => {
  const gradeRanges = {
    excellent: { min: 9.0, max: 10.0 },
    good: { min: 8.0, max: 8.9 },
    kha: { min: 7.0, max: 7.9 },
    tbKha: { min: 6.0, max: 6.9 },
    trungBinh: { min: 5.0, max: 5.9 },
    yeu: { min: 4.0, max: 4.9 },
    kem: { min: 1.0, max: 3.9 }
  };

  return students.map(student => {
    let correctCategory = 'kem';
    for (const [category, range] of Object.entries(gradeRanges)) {
      if (student.grade >= range.min && student.grade <= range.max) {
        correctCategory = category;
        break;
      }
    }
    if (student.category !== correctCategory) {
      return { ...student, category: correctCategory };
    }
    return student;
  });
};

let globalStudentIdCounter = 0;

export const generateStudentData = (category, year, count) => {
  if (count <= 0) return [];

  const students = [];
  const baseNames = ['Nguyễn Văn', 'Trần Thị', 'Lê Văn', 'Phạm Thị', 'Hoàng Văn', 'Vũ Thị', 'Đặng Văn', 'Bùi Thị', 'Dương Văn', 'Đỗ Thị', 'Ngô Văn', 'Hồ Thị', 'Đinh Văn', 'Lý Thị', 'Võ Văn', 'Phan Thị'];
  const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Em', 'Phương', 'Giang', 'Hà', 'Khoa', 'Linh', 'Minh', 'Nam', 'Oanh', 'Phúc', 'Quang', 'Sơn', 'Tâm', 'Uyên', 'Vinh', 'Yến'];

  const gradeRanges = {
    excellent: { min: 9.0, max: 10.0 },
    good: { min: 8.0, max: 8.9 },
    kha: { min: 7.0, max: 7.9 },
    tbKha: { min: 6.0, max: 6.9 },
    trungBinh: { min: 5.0, max: 5.9 },
    yeu: { min: 4.0, max: 4.9 },
    kem: { min: 1.0, max: 3.9 }
  };

  const range = gradeRanges[category];
  if (!range) return [];

  const yearCode = parseInt(year) - 2000;

  for (let i = 0; i < count; i++) {
    globalStudentIdCounter++;
    const studentId = `${yearCode}CT${globalStudentIdCounter.toString().padStart(4, '0')}`;
    const grade = range.min + (Math.random() * (range.max - range.min));
    let finalGrade = Math.round(grade * 100) / 100;

    if (finalGrade > range.max) finalGrade = range.max;
    if (finalGrade < range.min) finalGrade = range.min;

    students.push({
      id: studentId,
      name: `${baseNames[Math.floor(Math.random() * baseNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      grade: finalGrade,
      category: category,
      year: year,
      class: `${yearCode}CT${Math.floor(Math.random() * 8) + 111}`,
      email: `${studentId.toLowerCase()}@student.edu.vn`,
      phone: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
    });
  }

  return students.sort((a, b) => b.grade - a.grade);
};

export const rankingData = {
  all: {
    '2022-2026': {
      years: [
        { year: '2022', excellent: 12, good: 22, kha: 28, tbKha: 18, trungBinh: 12, yeu: 6, kem: 2, total: 100, passRate: 80, topRate: 34, riskRate: 8 },
        { year: '2023', excellent: 13, good: 23, kha: 29, tbKha: 17, trungBinh: 11, yeu: 5, kem: 2, total: 100, passRate: 82, topRate: 36, riskRate: 7 },
        { year: '2024', excellent: 14, good: 24, kha: 30, tbKha: 16, trungBinh: 10, yeu: 5, kem: 1, total: 100, passRate: 84, topRate: 38, riskRate: 6 },
        { year: '2025', excellent: 15, good: 25, kha: 30, tbKha: 15, trungBinh: 10, yeu: 4, kem: 1, total: 100, passRate: 85, topRate: 40, riskRate: 5 },
      ],
    },
    '2021-2025': {
      years: [
        { year: '2021', excellent: 10, good: 20, kha: 30, tbKha: 20, trungBinh: 12, yeu: 6, kem: 2, total: 100, passRate: 80, topRate: 30, riskRate: 8 },
        { year: '2022', excellent: 11, good: 21, kha: 29, tbKha: 19, trungBinh: 12, yeu: 6, kem: 2, total: 100, passRate: 80, topRate: 32, riskRate: 8 },
        { year: '2023', excellent: 12, good: 22, kha: 28, tbKha: 18, trungBinh: 12, yeu: 6, kem: 2, total: 100, passRate: 80, topRate: 34, riskRate: 8 },
        { year: '2024', excellent: 13, good: 23, kha: 29, tbKha: 17, trungBinh: 11, yeu: 5, kem: 2, total: 100, passRate: 82, topRate: 36, riskRate: 7 },
      ],
    },
  },
  'intro-prog': {
    '2022-2026': {
      years: [
        { year: '2022', excellent: 18, good: 28, kha: 26, tbKha: 16, trungBinh: 8, yeu: 3, kem: 1, total: 100, passRate: 88, topRate: 46, riskRate: 4 },
        { year: '2023', excellent: 19, good: 29, kha: 26, tbKha: 15, trungBinh: 8, yeu: 2, kem: 1, total: 100, passRate: 89, topRate: 48, riskRate: 3 },
        { year: '2024', excellent: 19, good: 30, kha: 25, tbKha: 15, trungBinh: 8, yeu: 2, kem: 1, total: 100, passRate: 89, topRate: 49, riskRate: 3 },
        { year: '2025', excellent: 20, good: 30, kha: 25, tbKha: 15, trungBinh: 8, yeu: 2, kem: 0, total: 100, passRate: 90, topRate: 50, riskRate: 2 },
      ],
    },
  },
};

export const departmentAverage = {
  excellentGood: 38,
  khaAndTBKha: 43,
  trungBinh: 12,
  yeuKem: 7,
};

export const kpiTargets = {
  excellentGoodMin: 35,
  khaOrAboveMin: 60,
  yeuKemMax: 5,
  trungBinhMax: 15,
};

export const getDisplayData = (course, cohort) => {
  const dataObj = rankingData[course]?.[cohort]
    || rankingData['all'][cohort]
    || rankingData['all']['2022-2026'];

  return dataObj.years || [];
};
