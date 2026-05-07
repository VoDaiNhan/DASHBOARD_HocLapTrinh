import React, { useState, useMemo, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, ComposedChart, Bar, Line, ReferenceLine, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Info, ChevronDown, ChevronUp, X, ArrowUpDown, Search, Bell, Brain, CheckCircle2, Users, Mail } from 'lucide-react';

const COHORTS = [
  { value: '2018-2022', label: '2018-2022' },
  { value: '2019-2023', label: '2019-2023' },
  { value: '2020-2024', label: '2020-2024' },
  { value: '2021-2025', label: '2021-2025' },
  { value: '2022-2026', label: '2022-2026' },
];

const courses = [
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

// 7 mức học lực - UPDATED với thang điểm chuẩn - SẮP XẾP TỪ CAO ĐẾN THẤP
const RANKING_META = [
  { name: 'Xuất sắc', color: '#10b981', range: '9.0 - 10.0', key: 'excellent' },
  { name: 'Giỏi',     color: '#3b82f6', range: '8.0 - 8.9', key: 'good' },
  { name: 'Khá',      color: '#6366f1', range: '7.0 - 7.9', key: 'kha' },
  { name: 'Trung bình khá', color: '#8b5cf6', range: '6.0 - 6.9', key: 'tbKha' },
  { name: 'Trung bình',    color: '#f59e0b', range: '5.0 - 5.9', key: 'trungBinh' },
  { name: 'Yếu',     color: '#ef4444', range: '4.0 - 4.9', key: 'yeu' },
  { name: 'Kém',     color: '#991b1b', range: '< 4.0', key: 'kem' },
];

// Function to get academic rank from grade - SINGLE SOURCE OF TRUTH
const getAcademicRank = (grade) => {
  // Ensure grade is a number
  const numGrade = parseFloat(grade);
  if (isNaN(numGrade)) return 'kem'; // Default for invalid grades
  
  if (numGrade >= 9.0 && numGrade <= 10.0) return 'excellent';
  else if (numGrade >= 8.0 && numGrade <= 8.9) return 'good';
  else if (numGrade >= 7.0 && numGrade <= 7.9) return 'kha';
  else if (numGrade >= 6.0 && numGrade <= 6.9) return 'tbKha';
  else if (numGrade >= 5.0 && numGrade <= 5.9) return 'trungBinh';
  else if (numGrade >= 4.0 && numGrade <= 4.9) return 'yeu';
  else return 'kem'; // < 4.0
};

// Function to validate and fix student categories based on their grades
const validateAndFixStudentCategories = (students) => {
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
    // Determine correct category based on grade
    let correctCategory = 'kem'; // default
    
    for (const [category, range] of Object.entries(gradeRanges)) {
      if (student.grade >= range.min && student.grade <= range.max) {
        correctCategory = category;
        break;
      }
    }
    
    // If category doesn't match, fix it
    if (student.category !== correctCategory) {
      console.warn(`FIXING: Student ${student.name} had category ${student.category} but grade ${student.grade} should be ${correctCategory}`);
      return { ...student, category: correctCategory };
    }
    
    return student;
  });
};

// Global counter to ensure unique IDs across all function calls
let globalStudentIdCounter = 0;

// Generate mock student data for each ranking category
const generateStudentData = (category, year, count) => {
  if (count <= 0) return [];
  
  const students = [];
  const baseNames = [
    'Nguyễn Văn', 'Trần Thị', 'Lê Văn', 'Phạm Thị', 'Hoàng Văn', 'Vũ Thị', 'Đặng Văn', 'Bùi Thị',
    'Dương Văn', 'Đỗ Thị', 'Ngô Văn', 'Hồ Thị', 'Đinh Văn', 'Lý Thị', 'Võ Văn', 'Phan Thị'
  ];
  const lastNames = [
    'An', 'Bình', 'Cường', 'Dũng', 'Em', 'Phương', 'Giang', 'Hà', 'Khoa', 'Linh', 
    'Minh', 'Nam', 'Oanh', 'Phúc', 'Quang', 'Sơn', 'Tâm', 'Uyên', 'Vinh', 'Yến'
  ];
  
  // Grade ranges for each category - THANG ĐIỂM CHUẨN
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
  if (!range) {
    console.error('Invalid category:', category);
    return [];
  }
  
  const yearCode = parseInt(year) - 2000; // 2022 -> 22
  
  console.log(`Generating ${count} students for category: ${category}, grade range: ${range.min}-${range.max}`);
  
  for (let i = 0; i < count; i++) {
    const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate absolutely unique student ID using global counter
    globalStudentIdCounter++;
    const studentId = `${yearCode}CT${globalStudentIdCounter.toString().padStart(4, '0')}`;
    
    // Generate grade within the EXACT range for this category
    // Use a more controlled approach to ensure we stay within bounds
    const gradeRange = range.max - range.min;
    const randomFactor = Math.random();
    const grade = range.min + (randomFactor * gradeRange);
    
    // Round to 2 decimal places and ensure it's within bounds
    let finalGrade = Math.round(grade * 100) / 100;
    
    // Strict bounds checking - ensure we never exceed the range
    if (finalGrade > range.max) finalGrade = range.max;
    if (finalGrade < range.min) finalGrade = range.min;
    
    const student = {
      id: studentId,
      name: `${baseName} ${lastName}`,
      grade: finalGrade,
      category: category, // This MUST match the input category
      year: year,
      class: `${yearCode}CT${Math.floor(Math.random() * 8) + 111}`, // 22CT111 to 22CT118
      email: `${studentId.toLowerCase()}@student.edu.vn`,
      phone: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
    };
    
    // Verify the student is in the correct category
    console.log(`Generated: ${student.name}, grade: ${student.grade}, category: ${student.category}, range: ${range.min}-${range.max}, ID: ${student.id}`);
    
    // Double-check: Ensure the grade matches the category
    if (student.grade < range.min || student.grade > range.max) {
      console.error(`ERROR: Student ${student.name} has grade ${student.grade} but should be in range ${range.min}-${range.max} for category ${category}`);
      // Fix it immediately
      student.grade = range.min + Math.random() * (range.max - range.min);
      student.grade = Math.round(student.grade * 100) / 100;
      console.log(`FIXED: ${student.name} grade corrected to ${student.grade}`);
    }
    
    students.push(student);
  }
  
  return students.sort((a, b) => b.grade - a.grade); // Sort by grade descending
};

const rankingData = {
  all: {
    '2022-2026': {
      years: [
        { 
          year: '2022', 
          excellent: 12, good: 22, kha: 28, tbKha: 18, trungBinh: 12, yeu: 6, kem: 2, 
          total: 100,
          passRate: 80, // Khá trở lên (excellent + good + kha + tbKha)
          topRate: 34,  // Giỏi + Xuất sắc
          riskRate: 8,  // Yếu + Kém
        },
        { 
          year: '2023', 
          excellent: 13, good: 23, kha: 29, tbKha: 17, trungBinh: 11, yeu: 5, kem: 2, 
          total: 100,
          passRate: 82,
          topRate: 36,
          riskRate: 7,
        },
        { 
          year: '2024', 
          excellent: 14, good: 24, kha: 30, tbKha: 16, trungBinh: 10, yeu: 5, kem: 1, 
          total: 100,
          passRate: 84,
          topRate: 38,
          riskRate: 6,
        },
        { 
          year: '2025', 
          excellent: 15, good: 25, kha: 30, tbKha: 15, trungBinh: 10, yeu: 4, kem: 1, 
          total: 100,
          passRate: 85,
          topRate: 40,
          riskRate: 5,
        },
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

// Department average for comparison
const departmentAverage = {
  excellentGood: 38, // %
  khaAndTBKha: 43,
  trungBinh: 12,
  yeuKem: 7,
};

// KPI Targets
const kpiTargets = {
  excellentGoodMin: 35, // At least 35% Xuất sắc + Giỏi
  khaOrAboveMin: 60,    // At least 60% Khá trở lên
  yeuKemMax: 5,         // At most 5% Yếu + Kém
  trungBinhMax: 15,     // At most 15% Trung bình
};

const getDisplayData = (course, cohort) => {
  const dataObj = rankingData[course]?.[cohort]
    || rankingData['all'][cohort]
    || rankingData['all']['2022-2026'];
  
  return dataObj.years || [];
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Calculate changes from previous year
    const currentYear = payload[0].payload;
    const yearIndex = payload[0].payload._yearIndex;
    const allYears = payload[0].payload._allYears;
    const prevYear = yearIndex > 0 ? allYears[yearIndex - 1] : null;
    
    const categories = [
      { key: 'excellent', name: 'Xuất sắc', color: '#10b981' },
      { key: 'good', name: 'Giỏi', color: '#3b82f6' },
      { key: 'kha', name: 'Khá', color: '#6366f1' },
      { key: 'tbKha', name: 'TB Khá', color: '#8b5cf6' },
      { key: 'trungBinh', name: 'Trung bình', color: '#f59e0b' },
      { key: 'yeu', name: 'Yếu', color: '#ef4444' },
      { key: 'kem', name: 'Kém', color: '#991b1b' },
    ];
    
    const yeuKem = currentYear.yeu + currentYear.kem;
    const passRate = currentYear.passRate;
    const riskRate = currentYear.riskRate;
    const prevPassRate = prevYear ? prevYear.passRate : passRate;
    const prevRiskRate = prevYear ? prevYear.riskRate : riskRate;
    const passRateChange = passRate - prevPassRate;
    const riskRateChange = riskRate - prevRiskRate;
    
    return (
      <div className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-w-xs z-50 relative">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Năm {label}</p>
        <div className="space-y-1 text-xs">
          {categories.map(cat => {
            const value = currentYear[cat.key];
            const prevValue = prevYear ? prevYear[cat.key] : value;
            const change = value - prevValue;
            
            return (
              <div key={cat.key} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-gray-700 dark:text-gray-300">{cat.name}:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{value}%</span>
                  {prevYear && change !== 0 && (
                    <span className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({change > 0 ? '+' : ''}{change})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Yếu + Kém:</span>
              <span className={`font-bold ${yeuKem > 10 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                {yeuKem}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Tỷ lệ đạt chuẩn:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-white">{passRate}%</span>
                {prevYear && passRateChange !== 0 && (
                  <span className={`text-xs ${passRateChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {passRateChange > 0 ? '▲' : '▼'} {Math.abs(passRateChange)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Tỷ lệ nguy hiểm:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">{riskRate}%</span>
                {prevYear && riskRateChange !== 0 && (
                  <span className={`text-xs ${riskRateChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {riskRateChange > 0 ? '▲' : '▼'} {Math.abs(riskRateChange)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const AcademicRankingChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCohort, setSelectedCohort] = useState('2022-2026');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'grouped'
  const [displayMode, setDisplayMode] = useState('percentage'); // 'percentage' or 'count'
  const [showInsights, setShowInsights] = useState(true);
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [drillDownCategory, setDrillDownCategory] = useState(null);

  // Get years data FIRST - before any useMemo or useCallback that depends on it
  const yearsData = getDisplayData(selectedCourse, selectedCohort);
  
  // Student modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [sortBy, setSortBy] = useState('grade'); // 'grade', 'name', 'class'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = từ cao xuống thấp (mặc định), 'asc' = từ thấp đến cao
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // New state for filtering by academic level
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [notificationStudents, setNotificationStudents] = useState([]);
  const [selectedNotifStudents, setSelectedNotifStudents] = useState([]);

  // Generate students for notification when modal opens
  const openNotificationModal = useCallback(() => {
    const latestYearData = yearsData[yearsData.length - 1];
    if (!latestYearData) return;

    // Generate Yeu and Kem students
    const yeuStudents = generateStudentData('yeu', latestYearData.year, latestYearData.yeu);
    const kemStudents = generateStudentData('kem', latestYearData.year, latestYearData.kem);
    
    const allRiskStudents = [...yeuStudents, ...kemStudents].map(s => ({
      ...s,
      riskSubjects: courses.slice(1, 1 + Math.floor(Math.random() * 3) + 1).map(c => c.name), // Random 1-3 subjects
    }));

    setNotificationStudents(allRiskStudents);
    // Auto-select all by default
    setSelectedNotifStudents(allRiskStudents.map(s => s.id));
    setShowNotificationModal(true);
  }, [yearsData]);

  const toggleStudentSelection = (id) => {
    setSelectedNotifStudents(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const selectAllByRank = (rank) => {
    const studentsToSelect = notificationStudents
      .filter(s => rank === 'all' || s.category === rank)
      .map(s => s.id);
    
    setSelectedNotifStudents(prev => {
      const otherRanks = notificationStudents
        .filter(s => rank !== 'all' && s.category !== rank && prev.includes(s.id))
        .map(s => s.id);
      return [...new Set([...otherRanks, ...studentsToSelect])];
    });
  };

  const [notificationMessage, setNotificationMessage] = useState(
    `Chào {{tên_sinh_viên}},\n\nDựa trên kết quả học tập môn {{tên_môn}}, khoa nhận thấy em đang gặp một chút khó khăn với mức điểm {{điểm_số}}. Để hỗ trợ kịp thời, khoa sẽ tổ chức buổi tư vấn riêng vào thứ 7 này.\n\nRất mong em có mặt để cùng thầy cô tìm giải pháp cải thiện kết quả học tập nhé.`
  );

  const insertToken = (token) => {
    setNotificationMessage(prev => prev + " " + token);
  };
  
  const [visibleLines, setVisibleLines] = useState({
    excellent: true,
    good: true,
    kha: true,
    tbKha: true,
    trungBinh: true,
    yeu: true,
    kem: true,
    // Grouped mode
    top: true,
    stable: true,
    risk: true,
    danger: true,
  });



  // Handle bar click to show student list
  const handleBarClick = useCallback((data, category, year) => {
    console.log('Bar clicked:', { data, category, year }); // Debug log
    setSelectedCategory(category);
    setSelectedYear(year);
    setFilterCategory('all'); // Reset filter when opening modal
    setSearchTerm(''); // Reset search when opening modal
    setShowStudentModal(true);
  }, []);

  // Handle card click to filter chart and show students - UPDATED theo yêu cầu mới
  const handleCardClick = useCallback((cardType) => {
    const latestYearData = yearsData[yearsData.length - 1];
    if (!latestYearData) return;

    let category = 'all';
    let filterCat = 'all';
    
    switch (cardType) {
      case 'excellent-good':
        category = 'all';
        filterCat = 'excellent';
        break;
      case 'kha-tbkha':
        category = 'all';
        filterCat = 'kha';
        break;
      case 'trung-binh':
        category = 'all';
        filterCat = 'trungBinh';
        break;
      case 'yeu-kem':
        category = 'all';
        filterCat = 'yeu';
        break;
    }
    
    setSelectedCategory(category);
    setSelectedYear(latestYearData.year);
    setFilterCategory(filterCat);
    setSearchTerm('');
    setShowStudentModal(true);
  }, [yearsData]);

  // Generate student data for modal - UPDATED theo yêu cầu mới
  const modalStudentData = useMemo(() => {
    if (!showStudentModal || !selectedCategory || !selectedYear) {
      return { students: [], categoryName: '', categoryColor: '', count: 0 };
    }

    // Get the year data
    const yearData = yearsData.find(y => y.year === selectedYear);
    if (!yearData) {
      return { students: [], categoryName: '', categoryColor: '', count: 0 };
    }

    let generatedStudents = [];
    let categoryName = '';
    let categoryColor = '';
    let count = 0;

    if (selectedCategory === 'all') {
      // Show students based on filterCategory
      switch (filterCategory) {
        case 'excellent':
          // Card 1: Xuất sắc + Giỏi (Khá trở lên)
          categoryName = `Học sinh Khá trở lên (Xuất sắc + Giỏi) - Năm ${selectedYear}`;
          categoryColor = '#10b981';
          count = yearData.excellent + yearData.good;
          const excellentGoodStudents = [
            ...generateStudentData('excellent', selectedYear, yearData.excellent),
            ...generateStudentData('good', selectedYear, yearData.good)
          ];
          generatedStudents = validateAndFixStudentCategories(excellentGoodStudents);
          break;
          
        case 'kha':
          // Card 2: Khá + TB Khá
          categoryName = `Học sinh Khá + TB Khá - Năm ${selectedYear}`;
          categoryColor = '#6366f1';
          count = yearData.kha + yearData.tbKha;
          const khaStudents = [
            ...generateStudentData('kha', selectedYear, yearData.kha),
            ...generateStudentData('tbKha', selectedYear, yearData.tbKha)
          ];
          generatedStudents = validateAndFixStudentCategories(khaStudents);
          break;
          
        case 'trungBinh':
          // Card 3: Trung bình
          categoryName = `Học sinh Trung bình - Năm ${selectedYear}`;
          categoryColor = '#f59e0b';
          count = yearData.trungBinh;
          const trungBinhStudents = generateStudentData('trungBinh', selectedYear, count);
          generatedStudents = validateAndFixStudentCategories(trungBinhStudents);
          break;
          
        case 'yeu':
          // Card 4: Yếu + Kém
          categoryName = `Học sinh Yếu + Kém - Năm ${selectedYear}`;
          categoryColor = '#ef4444';
          count = yearData.yeu + yearData.kem;
          const yeuKemStudents = [
            ...generateStudentData('yeu', selectedYear, yearData.yeu),
            ...generateStudentData('kem', selectedYear, yearData.kem)
          ];
          generatedStudents = validateAndFixStudentCategories(yeuKemStudents);
          break;
          
        case 'all':
        default:
          // Show ALL students for this year
          categoryName = `Tất cả học sinh năm ${selectedYear}`;
          categoryColor = '#6366f1';
          
          // Generate students for all categories with EXACT counts
          const excellentCount = yearData.excellent || 0;
          const goodCount = yearData.good || 0;
          const khaCount = yearData.kha || 0;
          const tbKhaCount = yearData.tbKha || 0;
          const trungBinhCount = yearData.trungBinh || 0;
          const yeuCount = yearData.yeu || 0;
          const kemCount = yearData.kem || 0;
          
          let allStudents = [];
          
          // Generate each category separately to ensure exact counts
          if (excellentCount > 0) allStudents.push(...generateStudentData('excellent', selectedYear, excellentCount));
          if (goodCount > 0) allStudents.push(...generateStudentData('good', selectedYear, goodCount));
          if (khaCount > 0) allStudents.push(...generateStudentData('kha', selectedYear, khaCount));
          if (tbKhaCount > 0) allStudents.push(...generateStudentData('tbKha', selectedYear, tbKhaCount));
          if (trungBinhCount > 0) allStudents.push(...generateStudentData('trungBinh', selectedYear, trungBinhCount));
          if (yeuCount > 0) allStudents.push(...generateStudentData('yeu', selectedYear, yeuCount));
          if (kemCount > 0) allStudents.push(...generateStudentData('kem', selectedYear, kemCount));
          
          // Validate and fix any category mismatches
          generatedStudents = validateAndFixStudentCategories(allStudents);
          count = generatedStudents.length;
          break;
      }
    } else if (viewMode === 'detailed') {
      const categoryInfo = RANKING_META.find(r => r.key === selectedCategory);
      if (categoryInfo) {
        categoryName = categoryInfo.name;
        categoryColor = categoryInfo.color;
        count = yearData[selectedCategory];
        const rawStudents = generateStudentData(selectedCategory, selectedYear, count);
        generatedStudents = validateAndFixStudentCategories(rawStudents);
      }
    } else {
      // Grouped mode
      switch (selectedCategory) {
        case 'top':
          categoryName = 'Tốt (Xuất sắc + Giỏi)';
          categoryColor = '#10b981';
          count = yearData.excellent + yearData.good;
          const topStudents = [
            ...generateStudentData('excellent', selectedYear, yearData.excellent),
            ...generateStudentData('good', selectedYear, yearData.good)
          ];
          generatedStudents = validateAndFixStudentCategories(topStudents);
          break;
        case 'stable':
          categoryName = 'Ổn (Khá + TB Khá)';
          categoryColor = '#3b82f6';
          count = yearData.kha + yearData.tbKha;
          const stableStudents = [
            ...generateStudentData('kha', selectedYear, yearData.kha),
            ...generateStudentData('tbKha', selectedYear, yearData.tbKha)
          ];
          generatedStudents = validateAndFixStudentCategories(stableStudents);
          break;
        case 'risk':
          categoryName = 'Nguy cơ (Trung bình)';
          categoryColor = '#f59e0b';
          count = yearData.trungBinh;
          const riskStudents = generateStudentData('trungBinh', selectedYear, count);
          generatedStudents = validateAndFixStudentCategories(riskStudents);
          break;
        case 'danger':
          categoryName = 'Nguy hiểm (Yếu + Kém)';
          categoryColor = '#ef4444';
          count = yearData.yeu + yearData.kem;
          const dangerStudents = [
            ...generateStudentData('yeu', selectedYear, yearData.yeu),
            ...generateStudentData('kem', selectedYear, yearData.kem)
          ];
          generatedStudents = validateAndFixStudentCategories(dangerStudents);
          break;
      }
    }

    return { students: generatedStudents, categoryName, categoryColor, count };
  }, [selectedCategory, selectedYear, yearsData, viewMode, showStudentModal, filterCategory]);

  // Filter students by search term - Simplified without academic level filter
  const searchFilteredStudents = useMemo(() => {
    if (!showStudentModal || !modalStudentData.students) {
      return [];
    }
    
    return modalStudentData.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [modalStudentData.students, searchTerm, showStudentModal]);

  // Apply academic level filter - Simplified logic
  const filteredStudents = useMemo(() => {
    // Vì đã filter đúng nhóm từ đầu, chỉ cần return search results
    return searchFilteredStudents;
  }, [searchFilteredStudents]);

  // Sort students
  const sortedStudents = useMemo(() => {
    if (!showStudentModal) {
      return [];
    }
    
    return [...filteredStudents].sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'class':
          aVal = a.class;
          bVal = b.class;
          break;
        case 'grade':
        default:
          aVal = a.grade;
          bVal = b.grade;
          break;
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredStudents, sortBy, sortOrder, showStudentModal]);
  
  // Add metadata to each year for tooltip AND calculate cumulative positions for lines
  const enrichedYearsData = yearsData.map((year, idx) => {
    // Calculate cumulative positions (middle of each segment in stacked bar)
    const excellentPos = year.excellent / 2; // Middle of excellent segment
    const goodPos = year.excellent + (year.good / 2); // Middle of good segment
    const khaPos = year.excellent + year.good + (year.kha / 2); // Middle of kha segment
    const tbKhaPos = year.excellent + year.good + year.kha + (year.tbKha / 2);
    const trungBinhPos = year.excellent + year.good + year.kha + year.tbKha + (year.trungBinh / 2);
    const yeuPos = year.excellent + year.good + year.kha + year.tbKha + year.trungBinh + (year.yeu / 2);
    const kemPos = year.excellent + year.good + year.kha + year.tbKha + year.trungBinh + year.yeu + (year.kem / 2);
    
    // For grouped mode
    const topPos = (year.excellent + year.good) / 2;
    const stablePos = (year.excellent + year.good) + (year.kha + year.tbKha) / 2;
    const riskPos = (year.excellent + year.good + year.kha + year.tbKha) + (year.trungBinh / 2);
    const dangerPos = (year.excellent + year.good + year.kha + year.tbKha + year.trungBinh) + (year.yeu + year.kem) / 2;
    
    return {
      ...year,
      _yearIndex: idx,
      _allYears: yearsData,
      // Line positions (middle of each segment)
      excellentLinePos: excellentPos,
      goodLinePos: goodPos,
      khaLinePos: khaPos,
      tbKhaLinePos: tbKhaPos,
      trungBinhLinePos: trungBinhPos,
      yeuLinePos: yeuPos,
      kemLinePos: kemPos,
      // Grouped positions
      topLinePos: topPos,
      stableLinePos: stablePos,
      riskLinePos: riskPos,
      dangerLinePos: dangerPos,
    };
  });
  
  // Get latest year data
  const latestYear = yearsData[yearsData.length - 1] || {};
  const prevYear = yearsData[yearsData.length - 2] || latestYear;

  // Calculate grouped stats with trends - ENHANCED with multi-year analysis
  const stats = useMemo(() => {
    if (!yearsData || yearsData.length === 0) {
      return {
        excellentGood: 0, khaAndTBKha: 0, trungBinh: 0, yeuKem: 0,
        excellentGoodPct: 0, khaAndTBKhaPct: 0, trungBinhPct: 0, yeuKemPct: 0,
        khaOrAbovePct: 0, belowStandardPct: 0,
        excellentGoodChange: 0, khaAndTBKhaChange: 0, trungBinhChange: 0, yeuKemChange: 0,
        excellentGoodVsAvg: 0, yeuKemVsAvg: 0,
        trendAnalysis: { direction: 'stable', years: 0, totalChange: 0 }
      };
    }

    const excellentGood = latestYear.excellent + latestYear.good;
    const khaAndTBKha = latestYear.kha + latestYear.tbKha;
    const trungBinh = latestYear.trungBinh;
    const yeuKem = latestYear.yeu + latestYear.kem;
    
    const prevExcellentGood = prevYear.excellent + prevYear.good;
    const prevKhaAndTBKha = prevYear.kha + prevYear.tbKha;
    const prevTrungBinh = prevYear.trungBinh;
    const prevYeuKem = prevYear.yeu + prevYear.kem;
    
    // Percentages (already in %)
    const excellentGoodPct = excellentGood;
    const khaAndTBKhaPct = khaAndTBKha;
    const trungBinhPct = trungBinh;
    const yeuKemPct = yeuKem;
    const khaOrAbovePct = excellentGoodPct + khaAndTBKhaPct;
    const belowStandardPct = trungBinhPct + yeuKemPct;
    
    // Calculate changes from previous year
    const excellentGoodChange = excellentGood - prevExcellentGood;
    const khaAndTBKhaChange = khaAndTBKha - prevKhaAndTBKha;
    const trungBinhChange = trungBinh - prevTrungBinh;
    const yeuKemChange = yeuKem - prevYeuKem;
    
    // Multi-year trend analysis
    const firstYear = yearsData[0];
    const totalYears = yearsData.length;
    
    // Calculate total change from first to last year
    const firstYearExcellentGood = firstYear.excellent + firstYear.good;
    const firstYearYeuKem = firstYear.yeu + firstYear.kem;
    
    const totalExcellentGoodChange = excellentGood - firstYearExcellentGood;
    const totalYeuKemChange = yeuKem - firstYearYeuKem;
    
    // Calculate average annual growth rate
    const avgAnnualGrowthExcellentGood = totalYears > 1 ? totalExcellentGoodChange / (totalYears - 1) : 0;
    const avgAnnualGrowthYeuKem = totalYears > 1 ? totalYeuKemChange / (totalYears - 1) : 0;
    
    // Determine trend direction for excellent+good category
    let trendDirection = 'stable';
    if (totalExcellentGoodChange > 2) trendDirection = 'improving';
    else if (totalExcellentGoodChange < -2) trendDirection = 'declining';
    
    // Calculate consistency of trend (how many years show improvement)
    let improvingYears = 0;
    for (let i = 1; i < yearsData.length; i++) {
      const currentYearEG = yearsData[i].excellent + yearsData[i].good;
      const previousYearEG = yearsData[i-1].excellent + yearsData[i-1].good;
      if (currentYearEG > previousYearEG) improvingYears++;
    }
    const trendConsistency = totalYears > 1 ? (improvingYears / (totalYears - 1)) * 100 : 0;
    
    // Compare with department average
    const excellentGoodVsAvg = excellentGoodPct - departmentAverage.excellentGood;
    const yeuKemVsAvg = yeuKemPct - departmentAverage.yeuKem;
    
    return {
      excellentGood,
      khaAndTBKha,
      trungBinh,
      yeuKem,
      excellentGoodPct,
      khaAndTBKhaPct,
      trungBinhPct,
      yeuKemPct,
      khaOrAbovePct,
      belowStandardPct,
      excellentGoodChange,
      khaAndTBKhaChange,
      trungBinhChange,
      yeuKemChange,
      excellentGoodVsAvg,
      yeuKemVsAvg,
      // Enhanced trend analysis
      trendAnalysis: {
        direction: trendDirection,
        years: totalYears,
        totalChange: totalExcellentGoodChange,
        avgAnnualGrowth: avgAnnualGrowthExcellentGood,
        consistency: trendConsistency,
        firstYearValue: firstYearExcellentGood,
        improvingYears: improvingYears,
        totalYeuKemChange: totalYeuKemChange,
        avgAnnualYeuKemChange: avgAnnualGrowthYeuKem
      }
    };
  }, [latestYear, prevYear, yearsData]);

  // Generate warnings
  const warnings = useMemo(() => {
    const w = [];
    if (stats.yeuKemPct > 10) {
      w.push({ type: 'critical', message: `Tỷ lệ yếu + kém vượt ngưỡng an toàn (${stats.yeuKemPct.toFixed(1)}% > 10%)` });
    }
    if (stats.trungBinhPct > 25) {
      w.push({ type: 'warning', message: `Tỷ lệ trung bình cao (${stats.trungBinhPct.toFixed(1)}% > 25%)` });
    }
    if (stats.belowStandardPct > 20) {
      w.push({ type: 'warning', message: `${stats.belowStandardPct.toFixed(1)}% sinh viên dưới mức chuẩn (Trung bình + Yếu + Kém)` });
    }
    if (stats.yeuKemChange > 0) {
      w.push({ type: 'warning', message: `Nhóm yếu + kém tăng ${stats.yeuKemChange} SV so với kỳ trước` });
    }
    return w;
  }, [stats]);

  // Generate insights with actionable meaning
  const insights = useMemo(() => {
    const ins = [];
    
    // Xuất sắc trend with meaning
    const excellentTrend = yearsData.every((y, i) => i === 0 || y.excellent >= yearsData[i-1].excellent);
    if (excellentTrend && yearsData.length >= 3) {
      const firstExcellent = yearsData[0].excellent;
      const lastExcellent = yearsData[yearsData.length - 1].excellent;
      const growth = lastExcellent - firstExcellent;
      ins.push(`Nhóm Xuất sắc tăng ổn định (+${growth}%) → có thể duy trì chiến lược hiện tại`);
    }
    
    // Yếu + Kém trend with meaning
    const yeuKemValues = yearsData.map(y => y.yeu + y.kem);
    const firstYeuKem = yeuKemValues[0];
    const lastYeuKem = yeuKemValues[yeuKemValues.length - 1];
    const yeuKemChange = lastYeuKem - firstYeuKem;
    
    if (yeuKemChange < 0) {
      ins.push(`Nhóm yếu + kém giảm (${Math.abs(yeuKemChange)}%) nhưng vẫn ở ngưỡng KPI → cần giữ ổn định, tránh tăng lại`);
    } else if (yeuKemChange > 0) {
      ins.push(`Nhóm yếu + kém tăng (+${yeuKemChange}%) → đe dọa KPI, cần can thiệp ngay`);
    } else {
      ins.push(`Nhóm yếu + kém ổn định (${lastYeuKem}%) → duy trì biện pháp hiện tại`);
    }
    
    // Trung bình analysis with meaning
    if (latestYear.trungBinh > 15) {
      ins.push(`Nhóm Trung bình quá cao (${latestYear.trungBinh}%) → tiềm năng lớn nâng KPI nếu đẩy lên Khá`);
    } else if (latestYear.trungBinh > 10) {
      ins.push(`Nhóm Trung bình vừa phải (${latestYear.trungBinh}%) → cơ hội cải thiện KPI có chọn lọc`);
    }
    
    // KPI comparison with meaning
    if (stats.khaOrAbovePct >= kpiTargets.khaOrAboveMin + 10) {
      ins.push(`KPI Khá+ vượt xa mục tiêu → có thể nâng tiêu chuẩn hoặc tập trung nhóm Tốt`);
    } else if (stats.khaOrAbovePct < kpiTargets.khaOrAboveMin) {
      ins.push(`KPI Khá+ chưa đạt → ưu tiên tuyệt đối, nguy cơ ảnh hưởng đánh giá`);
    }
    
    return ins;
  }, [stats, yearsData, latestYear]);

  // Generate specific actionable suggestions
  const actions = useMemo(() => {
    const acts = [];
    
    // Priority 1: Critical KPI issues
    if (stats.yeuKem > kpiTargets.yeuKemMax) {
      acts.push(`🔴 KHẨN CẤP: Xử lý ${stats.yeuKem} SV yếu + kém → tránh vượt ngưỡng KPI (≤${kpiTargets.yeuKemMax}%)`);
    }
    
    if (stats.khaOrAbovePct < kpiTargets.khaOrAboveMin) {
      const shortage = Math.ceil((kpiTargets.khaOrAboveMin - stats.khaOrAbovePct) * 100 / 100);
      acts.push(`🔴 KHẨN CẤP: Cần nâng thêm ~${shortage} SV lên Khá để đạt KPI ${kpiTargets.khaOrAboveMin}%`);
    }
    
    // Priority 2: High-impact opportunities
    if (stats.trungBinh > 0) {
      const nearKha = Math.ceil(stats.trungBinh * 0.6); // Estimate 60% can be improved
      acts.push(`🎯 Ưu tiên ${nearKha}/${stats.trungBinh} SV Trung bình (sát ngưỡng Khá) → có thể nâng KPI nhanh nhất`);
    }
    
    // Priority 3: Maintenance and prevention
    if (stats.yeuKem > 0 && stats.yeuKem <= kpiTargets.yeuKemMax) {
      acts.push(`⚠️ Theo dõi sát ${stats.yeuKem} SV yếu + kém → ngăn không cho tăng thêm`);
    }
    
    // Priority 4: Growth opportunities
    if (stats.excellentGood < 40 && stats.khaAndTBKha > 30) {
      const potential = Math.ceil(stats.khaAndTBKha * 0.3); // Estimate 30% can move up
      acts.push(`📈 Phát triển ${potential}/${stats.khaAndTBKha} SV nhóm Ổn lên Tốt → tăng chất lượng tổng thể`);
    }
    
    // If no critical issues, focus on optimization
    if (acts.length === 0) {
      acts.push(`✅ KPI ổn định → tập trung duy trì chất lượng và phát triển nhóm Xuất sắc`);
    }
    
    return acts;
  }, [stats, kpiTargets]);

  return (
    <div className="card p-6">
      {/* Header - Improved */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Xếp loại học lực
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Phân bố theo năm • So sánh xu hướng • Phân tích chuyên sâu
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {COHORTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          
          {/* View Mode Toggle - Workflow Optimized */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-2 text-sm font-bold transition-all flex items-center gap-2 ${
                viewMode === 'detailed'
                  ? 'bg-blue-600 text-white shadow-inner'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              🏢 Toàn ngành
            </button>
            <button
              onClick={() => {
                setViewMode('grouped');
                alert('Đang chuyển sang chế độ phân tích theo Lớp & Khóa học...');
              }}
              className={`px-3 py-2 text-sm font-bold transition-all border-l border-gray-300 dark:border-gray-600 flex items-center gap-2 ${
                viewMode === 'grouped'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              🏫 Theo lớp
            </button>
            <button
              onClick={() => alert('Đang chuyển sang chế độ phân tích theo Môn học/Học phần...')}
              className="px-3 py-2 text-sm font-bold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border-l border-gray-300 dark:border-gray-600 flex items-center gap-2"
            >
              📚 Theo môn
            </button>
          </div>
        </div>
      </div>

      {/* Warnings - Keep at top */}
      {warnings.length > 0 && (
        <div className="mb-8 space-y-2">
          {warnings.map((warning, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all hover:shadow-md ${
                warning.type === 'critical'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
              }`}
            >
              <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                warning.type === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'
              }`} />
              <span className={`text-sm font-medium ${
                warning.type === 'critical'
                  ? 'text-red-900 dark:text-red-100'
                  : 'text-amber-900 dark:text-amber-100'
              }`}>
                {warning.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Stacked Bar Chart 100% - VERTICAL with Line Overlay */}
      <div className="mb-6">
        <div 
          className="h-80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 [&_*]:outline-none [&_*]:focus:outline-none cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={(e) => {
            console.log('Chart container clicked:', e); // Debug log
            // For now, let's show students for the latest year when clicking anywhere on the chart
            const latestYearData = enrichedYearsData[enrichedYearsData.length - 1];
            if (latestYearData) {
              console.log('Showing students for latest year:', latestYearData.year);
              handleBarClick(latestYearData, 'all', latestYearData.year);
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={enrichedYearsData}
              stackOffset="expand"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="35%"
              maxBarSize={60}
              key={`${viewMode}-legend-order-fixed-${Date.now()}`}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.4} />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 13 }}
              />
              <YAxis 
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 1]}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                position={{ y: 0 }}
                allowEscapeViewBox={{ x: false, y: true }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="circle"
                style={{ cursor: 'default' }}
                payload={[
                  { value: 'Xuất sắc', type: 'circle', color: '#10b981' },
                  { value: 'Giỏi', type: 'circle', color: '#3b82f6' },
                  { value: 'Khá', type: 'circle', color: '#6366f1' },
                  { value: 'TB Khá', type: 'circle', color: '#8b5cf6' },
                  { value: 'Trung bình', type: 'circle', color: '#f59e0b' },
                  { value: 'Yếu', type: 'circle', color: '#ef4444' },
                  { value: 'Kém', type: 'circle', color: '#991b1b' },
                ]}
              />
              
              {/* Reference line for 90% target */}
              <ReferenceLine 
                y={0.9} 
                stroke="#10b981" 
                strokeDasharray="3 3" 
                label={{ value: 'Mục tiêu 90%', position: 'right', fill: '#10b981', fontSize: 11 }}
              />
              
              {viewMode === 'detailed' ? (
                <>
                  {/* Bars - Thứ tự để Legend hiển thị đúng từ cao đến thấp */}
                  <Bar 
                    dataKey={(data) => data.excellent / 100} 
                    stackId="a" 
                    fill="#10b981" 
                    name="Xuất sắc" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.good / 100} 
                    stackId="a" 
                    fill="#3b82f6" 
                    name="Giỏi" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.kha / 100} 
                    stackId="a" 
                    fill="#6366f1" 
                    name="Khá" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.tbKha / 100} 
                    stackId="a" 
                    fill="#8b5cf6" 
                    name="TB Khá" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.trungBinh / 100} 
                    stackId="a" 
                    fill="#f59e0b" 
                    name="Trung bình" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.yeu / 100} 
                    stackId="a" 
                    fill="#ef4444" 
                    name="Yếu" 
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.kem / 100} 
                    stackId="a" 
                    fill="#991b1b" 
                    name="Kém" 
                    radius={[8, 8, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  
                  {/* Lines for each category - positioned at middle of each segment */}
                  {visibleLines.excellent && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.excellentLinePos / 100}
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Xuất sắc"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.good && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.goodLinePos / 100}
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Giỏi"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.kha && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.khaLinePos / 100}
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Khá"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.tbKha && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.tbKhaLinePos / 100}
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="TB Khá"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.trungBinh && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.trungBinhLinePos / 100}
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Trung bình"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.yeu && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.yeuLinePos / 100}
                      stroke="#ef4444"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Yếu"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.kem && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.kemLinePos / 100}
                      stroke="#991b1b"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#991b1b', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Kém"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Bars - Grouped mode simplified */}
                  <Bar 
                    dataKey={(data) => (data.excellent + data.good) / 100} 
                    stackId="a" 
                    fill="#10b981" 
                    name="Tốt (XS + Giỏi)"
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => (data.kha + data.tbKha) / 100} 
                    stackId="a" 
                    fill="#3b82f6" 
                    name="Ổn (Khá + TB Khá)"
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => data.trungBinh / 100} 
                    stackId="a" 
                    fill="#f59e0b" 
                    name="Nguy cơ (TB)"
                    radius={[0, 0, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  <Bar 
                    dataKey={(data) => (data.yeu + data.kem) / 100} 
                    stackId="a" 
                    fill="#ef4444" 
                    name="Nguy hiểm (Yếu + Kém)"
                    radius={[8, 8, 0, 0]}
                    style={{ outline: 'none' }}
                    stroke="none"
                    animationDuration={300}
                  />
                  
                  {/* Lines for grouped categories - positioned at middle of each segment */}
                  {visibleLines.top && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.topLinePos / 100}
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Tốt (XS + Giỏi)"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.stable && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.stableLinePos / 100}
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Ổn (Khá + TB Khá)"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.risk && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.riskLinePos / 100}
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Nguy cơ (TB)"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  {visibleLines.danger && (
                    <Line
                      type="monotone"
                      dataKey={(data) => data.dangerLinePos / 100}
                      stroke="#ef4444"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                      name="Nguy hiểm (Yếu + Kém)"
                      legendType="none"
                      isAnimationActive={false}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Summary - Enhanced with actionable insights */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Tốt (Xuất sắc + Giỏi) */}
        <div 
          onClick={() => handleCardClick('excellent-good')}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${
            stats.excellentGood >= 35 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
            stats.excellentGood >= 25 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
            'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.excellentGood} SV
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.excellentGood >= 35 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
              stats.excellentGood >= 25 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {stats.excellentGood >= 35 ? '🟢 Ổn' :
               stats.excellentGood >= 25 ? '🟡 Theo dõi' : '🔴 Nguy hiểm'}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tốt ({stats.excellentGoodPct}%)
              </div>
              <div className={`text-sm font-semibold ${
                stats.excellentGoodChange > 0 ? 'text-green-600' : 
                stats.excellentGoodChange < 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stats.excellentGoodChange > 0 ? '+' : ''}{stats.excellentGoodChange} vs {prevYear.year}
              </div>
            </div>
            
            {/* Contribution to KPI */}
            <div className="text-xs text-blue-600 dark:text-blue-400">
              {((stats.excellentGood / (stats.excellentGood + stats.khaAndTBKha)) * 100).toFixed(0)}% nhóm Khá+
            </div>
            
            {/* Distance to threshold */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stats.excellentGood >= 35 ? 
                `Vượt mục tiêu +${stats.excellentGood - 35} SV` :
                `Thiếu ${35 - stats.excellentGood} SV đạt mục tiêu`
              }
            </div>
            
            {/* Mini trend */}
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {(() => {
                const trend = yearsData.slice(-3).every((y, i, arr) => 
                  i === 0 || (y.excellent + y.good) >= (arr[i-1].excellent + arr[i-1].good)
                );
                return trend ? '↗ Tăng ổn định' : '↘ Cần cải thiện';
              })()}
            </div>
            
            {/* Growth analysis */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              {(() => {
                if (yearsData.length >= 2) {
                  const firstYear = yearsData[0];
                  const lastYear = yearsData[yearsData.length - 1];
                  const firstValue = firstYear.excellent + firstYear.good;
                  const lastValue = lastYear.excellent + lastYear.good;
                  const totalGrowth = lastValue - firstValue;
                  const avgGrowth = totalGrowth / (yearsData.length - 1);
                  
                  return (
                    <>
                      <div>Từ {firstYear.year}: {totalGrowth > 0 ? '+' : ''}{totalGrowth} SV ({totalGrowth > 0 ? '+' : ''}{totalGrowth.toFixed(1)}%)</div>
                      <div>TB/năm: {avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)} SV</div>
                    </>
                  );
                }
                return <div>Chưa đủ dữ liệu xu hướng</div>;
              })()}
            </div>
          </div>
        </div>

        {/* Card 2: Ổn (Khá + TB Khá) */}
        <div 
          onClick={() => handleCardClick('kha-tbkha')}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${
            stats.khaAndTBKha >= 40 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 
            stats.khaAndTBKha >= 30 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
            'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.khaAndTBKha} SV
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.khaAndTBKha >= 40 ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
              stats.khaAndTBKha >= 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
              'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
            }`}>
              {stats.khaAndTBKha >= 40 ? '🔵 Ổn' :
               stats.khaAndTBKha >= 30 ? '🟡 Theo dõi' : '🟠 Cảnh báo'}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Ổn ({stats.khaAndTBKhaPct}%)
              </div>
              <div className={`text-sm font-semibold ${
                stats.khaAndTBKhaChange > 0 ? 'text-green-600' : 
                stats.khaAndTBKhaChange < 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stats.khaAndTBKhaChange > 0 ? '+' : ''}{stats.khaAndTBKhaChange} vs {prevYear.year}
              </div>
            </div>
            
            {/* Contribution to KPI */}
            <div className="text-xs text-blue-600 dark:text-blue-400">
              {((stats.khaAndTBKha / (stats.excellentGood + stats.khaAndTBKha)) * 100).toFixed(0)}% nhóm Khá+
            </div>
            
            {/* Distance to threshold */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Cần ~0.5 điểm để lên Tốt
            </div>
            
            {/* Mini trend */}
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {(() => {
                const trend = yearsData.slice(-3).every((y, i, arr) => 
                  i === 0 || (y.kha + y.tbKha) >= (arr[i-1].kha + arr[i-1].tbKha)
                );
                return trend ? '↗ Tăng ổn định' : '↘ Biến động';
              })()}
            </div>
            
            {/* Growth analysis */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              {(() => {
                if (yearsData.length >= 2) {
                  const firstYear = yearsData[0];
                  const lastYear = yearsData[yearsData.length - 1];
                  const firstValue = firstYear.kha + firstYear.tbKha;
                  const lastValue = lastYear.kha + lastYear.tbKha;
                  const totalGrowth = lastValue - firstValue;
                  const avgGrowth = totalGrowth / (yearsData.length - 1);
                  
                  return (
                    <>
                      <div>Từ {firstYear.year}: {totalGrowth > 0 ? '+' : ''}{totalGrowth} SV ({totalGrowth > 0 ? '+' : ''}{totalGrowth.toFixed(1)}%)</div>
                      <div>TB/năm: {avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)} SV</div>
                    </>
                  );
                }
                return <div>Chưa đủ dữ liệu xu hướng</div>;
              })()}
            </div>
          </div>
        </div>

        {/* Card 3: Nguy cơ (Trung bình) */}
        <div 
          onClick={() => handleCardClick('trung-binh')}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${
            stats.trungBinh <= 10 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
            stats.trungBinh <= 15 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
            stats.trungBinh <= 20 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
            'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.trungBinh} SV
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.trungBinh <= 10 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
              stats.trungBinh <= 15 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
              stats.trungBinh <= 20 ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {stats.trungBinh <= 10 ? '🟢 Ổn' :
               stats.trungBinh <= 15 ? '🟡 Theo dõi' :
               stats.trungBinh <= 20 ? '🟠 Nguy cơ' : '🔴 Nguy hiểm'}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Nguy cơ ({stats.trungBinhPct}%)
              </div>
              <div className={`text-sm font-semibold ${
                stats.trungBinhChange < 0 ? 'text-green-600' : 
                stats.trungBinhChange > 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stats.trungBinhChange > 0 ? '+' : ''}{stats.trungBinhChange} vs {prevYear.year}
              </div>
            </div>
            
            {/* Impact on KPI */}
            <div className="text-xs text-amber-600 dark:text-amber-400">
              Cản trở KPI Khá+
            </div>
            
            {/* Distance to threshold */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Cần ~1.0 điểm để lên Khá
            </div>
            
            {/* Mini trend */}
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {(() => {
                const trend = yearsData.slice(-3).every((y, i, arr) => 
                  i === 0 || y.trungBinh <= arr[i-1].trungBinh
                );
                return trend ? '↘ Giảm tốt' : '↗ Tăng lo ngại';
              })()}
            </div>
            
            {/* Growth analysis */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              {(() => {
                if (yearsData.length >= 2) {
                  const firstYear = yearsData[0];
                  const lastYear = yearsData[yearsData.length - 1];
                  const firstValue = firstYear.trungBinh;
                  const lastValue = lastYear.trungBinh;
                  const totalChange = lastValue - firstValue;
                  const avgChange = totalChange / (yearsData.length - 1);
                  
                  return (
                    <>
                      <div>Từ {firstYear.year}: {totalChange > 0 ? '+' : ''}{totalChange} SV ({totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)}%)</div>
                      <div>TB/năm: {avgChange > 0 ? '+' : ''}{avgChange.toFixed(1)} SV {totalChange < 0 ? '(tích cực)' : '(cần cải thiện)'}</div>
                    </>
                  );
                }
                return <div>Chưa đủ dữ liệu xu hướng</div>;
              })()}
            </div>
          </div>
        </div>

        {/* Card 4: Nguy hiểm (Yếu + Kém) */}
        <div 
          onClick={() => handleCardClick('yeu-kem')}
          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${
            stats.yeuKem <= 3 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
            stats.yeuKem <= 5 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
            stats.yeuKem <= 10 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
            'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.yeuKem} SV
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stats.yeuKem <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
              stats.yeuKem <= 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
              stats.yeuKem <= 10 ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {stats.yeuKem <= 3 ? '🟢 Ổn' :
               stats.yeuKem <= 5 ? '🟡 Theo dõi' :
               stats.yeuKem <= 10 ? '🟠 Cảnh báo' : '🔴 Nguy hiểm'}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Nguy hiểm ({stats.yeuKemPct}%)
              </div>
              <div className={`text-sm font-semibold ${
                stats.yeuKemChange < 0 ? 'text-green-600' : 
                stats.yeuKemChange > 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stats.yeuKemChange > 0 ? '+' : ''}{stats.yeuKemChange} vs {prevYear.year}
              </div>
            </div>
            
            {/* Impact on KPI */}
            <div className="text-xs text-red-600 dark:text-red-400">
              {stats.yeuKem > 5 ? 'Phá vỡ KPI' : 'Trong ngưỡng an toàn'}
            </div>
            
            {/* Distance to threshold */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Cần ~1.5 điểm để lên TB
            </div>
            
            {/* Mini trend */}
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {(() => {
                const trend = yearsData.slice(-3).every((y, i, arr) => 
                  i === 0 || (y.yeu + y.kem) <= (arr[i-1].yeu + arr[i-1].kem)
                );
                return trend ? '↘ Giảm tốt' : '↗ Tăng nguy hiểm';
              })()}
            </div>
            
            {/* Growth analysis */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              {(() => {
                if (yearsData.length >= 2) {
                  const firstYear = yearsData[0];
                  const lastYear = yearsData[yearsData.length - 1];
                  const firstValue = firstYear.yeu + firstYear.kem;
                  const lastValue = lastYear.yeu + lastYear.kem;
                  const totalChange = lastValue - firstValue;
                  const avgChange = totalChange / (yearsData.length - 1);
                  
                  // Risk assessment
                  const riskLevel = lastValue > 10 ? 'Nguy hiểm' : lastValue > 5 ? 'Cảnh báo' : 'An toàn';
                  
                  return (
                    <>
                      <div>Từ {firstYear.year}: {totalChange > 0 ? '+' : ''}{totalChange} SV ({totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)}%)</div>
                      <div>TB/năm: {avgChange > 0 ? '+' : ''}{avgChange.toFixed(1)} SV • {riskLevel}</div>
                    </>
                  );
                }
                return <div>Chưa đủ dữ liệu xu hướng</div>;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Actions */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Phân tích & Đề xuất
            </h4>
          </div>
          {showInsights ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
        </button>
        
        {showInsights && (
          <div className="space-y-4">
            {/* Insights - Redesigned for meaning */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-blue-600">📊</span> Phân tích (Hiện tượng → Ý nghĩa)
              </h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                {insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 font-medium">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Actions - Redesigned for specificity */}
            {actions.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-green-600">🎯</span> Hành động cụ thể (Nhóm → Số lượng → Mục tiêu)
                </h5>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  {actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 font-medium">
                        {action.startsWith('🔴') ? '🔴' : 
                         action.startsWith('🎯') ? '🎯' : 
                         action.startsWith('⚠️') ? '⚠️' : 
                         action.startsWith('📈') ? '📈' : '•'}
                      </span>
                      <span className={action.startsWith('🔴') ? 'font-medium text-red-700 dark:text-red-300' : ''}>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Action Buttons - Management Workflow Optimized */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
              <button
                onClick={openNotificationModal}
                className="px-5 py-2.5 text-sm font-black text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-1"
              >
                🔔 Gửi thông báo & Hỗ trợ học tập
              </button>

              <button
                onClick={() => {
                  // Export CSV based on current filters
                  const csvContent = [
                    ['Báo cáo quản lý xếp loại học lực - Tối ưu cho quản lý ngành'],
                    ['Môn học: ' + courses.find(c => c.id === selectedCourse)?.name],
                    ['Khóa: ' + selectedCohort],
                    ['Năm', 'Xuất sắc', 'Giỏi', 'Khá', 'TB Khá', 'Trung bình', 'Yếu', 'Kém', 'Tỷ lệ Nguy cơ (%)'],
                    ...yearsData.map(y => [
                      y.year, y.excellent, y.good, y.kha, y.tbKha, y.trungBinh, y.yeu, y.kem, 
                      ((y.yeu + y.kem) / y.total * 100).toFixed(1)
                    ]),
                  ].map(row => row.join(',')).join('\n');
                  
                  const BOM = '\uFEFF';
                  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
                  const link = document.createElement('a');
                  const url = URL.createObjectURL(blob);
                  link.setAttribute('href', url);
                  link.setAttribute('download', `bao-cao-quan-ly-nganh-${new Date().getTime()}.csv`);
                  link.style.visibility = 'hidden';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2 border border-transparent hover:border-gray-300"
              >
                📄 Xuất báo cáo (Excel)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Student List Modal */}
      {showStudentModal && selectedCategory && selectedYear && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowStudentModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700" style={{ backgroundColor: `${modalStudentData.categoryColor}15` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: modalStudentData.categoryColor }}
                    >
                      <span className="text-white text-xl font-bold">
                        {filteredStudents.length}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {modalStudentData.categoryName}
                        {selectedCategory === 'all' && filterCategory !== 'all' && (
                          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                            {' '} • {RANKING_META.find(r => r.key === filterCategory)?.name}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Năm {selectedYear} • {filteredStudents.length} sinh viên
                        {selectedCategory === 'all' && filterCategory === 'all' && ' • Tất cả mức độ học lực'}
                        {selectedCategory === 'all' && filterCategory !== 'all' && ` • ${RANKING_META.find(r => r.key === filterCategory)?.name}`}
                        {selectedCategory !== 'all' && ` • ${((modalStudentData.count / 100) * 100).toFixed(1)}% tổng số`}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowStudentModal(false)} 
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex flex-col gap-4">
                  {/* First Row: Search and Sort */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, MSSV, lớp..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sắp xếp:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="grade">Điểm số</option>
                        <option value="name">Tên</option>
                        <option value="class">Lớp</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student List */}
              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                {sortedStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Không tìm thấy sinh viên nào</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedStudents.map((student, idx) => {
                      // Safety checks
                      if (!student || typeof student.grade === 'undefined') {
                        console.warn('Invalid student in render:', student);
                        return null;
                      }
                      
                      // SINGLE SOURCE OF TRUTH: Always compute category from grade
                      const actualCategory = getAcademicRank(student.grade);
                      const categoryInfo = RANKING_META.find(r => r.key === actualCategory);
                      
                      // Safety check for categoryInfo
                      if (!categoryInfo) {
                        console.warn('No category info found for:', actualCategory);
                        return null;
                      }
                      
                      return (
                        <div 
                          key={student.id} 
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300">
                              {idx + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {student.id} • Lớp {student.class}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {student.grade}
                              </div>
                              <div 
                                className="text-xs font-medium px-2 py-1 rounded-full"
                                style={{ 
                                  backgroundColor: `${categoryInfo?.color}20`,
                                  color: categoryInfo?.color 
                                }}
                              >
                                {categoryInfo?.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Hiển thị {filteredStudents.length} sinh viên
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      // Export CSV
                      const csvContent = [
                        ['Danh sách sinh viên - ' + modalStudentData.categoryName],
                        ['Năm: ' + selectedYear],
                        ['Ngày xuất: ' + new Date().toLocaleDateString('vi-VN')],
                        [],
                        ['STT', 'MSSV', 'Họ tên', 'Lớp', 'Điểm', 'Xếp loại'],
                        ...sortedStudents.map((student, idx) => {
                          // Safety checks
                          if (!student || typeof student.grade === 'undefined') {
                            return [idx + 1, 'N/A', 'Invalid Student', 'N/A', 'N/A', 'N/A'];
                          }
                          const actualCategory = getAcademicRank(student.grade);
                          const categoryInfo = RANKING_META.find(r => r.key === actualCategory);
                          return [
                            idx + 1,
                            student.id,
                            student.name,
                            student.class,
                            student.grade,
                            categoryInfo?.name || ''
                          ];
                        }),
                      ].map(row => row.join(',')).join('\n');
                      
                      const BOM = '\uFEFF';
                      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
                      const link = document.createElement('a');
                      const url = URL.createObjectURL(blob);
                      link.setAttribute('href', url);
                      link.setAttribute('download', `danh-sach-${selectedCategory}-${selectedYear}-${new Date().getTime()}.csv`);
                      link.style.visibility = 'hidden';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Xuất CSV
                  </button>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowNotificationModal(false)} />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full p-0">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/10 flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Bell className="h-6 w-6 text-red-500" /> Gửi thông báo & Hỗ trợ học tập
                </h3>
                <button onClick={() => setShowNotificationModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                   <p className="text-sm text-amber-800 dark:text-amber-200">
                     Hệ thống đã tự động phân tích <strong>{notificationStudents.length} sinh viên</strong> có nguy cơ rớt môn hoặc GPA thấp (Yếu & Kém). Hãy rà soát danh sách trước khi gửi thông báo.
                   </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 italic underline">Đối tượng nhận tin ({selectedNotifStudents.length} đã chọn)</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => selectAllByRank('yeu')}
                        className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded hover:bg-orange-100"
                      >
                        Chọn tất cả Yếu
                      </button>
                      <button 
                        onClick={() => selectAllByRank('kem')}
                        className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded hover:bg-red-100"
                      >
                        Chọn tất cả Kém
                      </button>
                      <button 
                        onClick={() => selectAllByRank('all')}
                        className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        Chọn tất cả
                      </button>
                      <button 
                        onClick={() => setSelectedNotifStudents([])}
                        className="text-[10px] font-bold text-gray-600 bg-gray-50 dark:bg-gray-800/30 px-2 py-1 rounded hover:bg-gray-100"
                      >
                        Bỏ chọn tất cả
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 uppercase font-bold">
                        <tr>
                          <th className="px-3 py-2 w-8 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedNotifStudents.length === notificationStudents.length && notificationStudents.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedNotifStudents(notificationStudents.map(s => s.id));
                                else setSelectedNotifStudents([]);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          <th className="px-3 py-2">STT</th>
                          <th className="px-3 py-2">Họ tên & MSSV</th>
                          <th className="px-3 py-2">Lớp</th>
                          <th className="px-3 py-2">Môn nguy cơ</th>
                          <th className="px-3 py-2 text-right">Điểm TB</th>
                          <th className="px-3 py-2">Xếp loại</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {notificationStudents.map((sv, idx) => (
                          <tr key={sv.id} className={`${selectedNotifStudents.includes(sv.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}>
                            <td className="px-3 py-2 text-center">
                              <input 
                                type="checkbox" 
                                checked={selectedNotifStudents.includes(sv.id)}
                                onChange={() => toggleStudentSelection(sv.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-3 py-2 text-gray-500">{idx + 1}</td>
                            <td className="px-3 py-2">
                              <div className="font-bold text-gray-900 dark:text-white">{sv.name}</div>
                              <div className="text-[10px] text-gray-400">{sv.id}</div>
                            </td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{sv.class}</td>
                            <td className="px-3 py-2">
                              <div className="flex flex-wrap gap-1">
                                {sv.riskSubjects.map(s => (
                                  <span key={s} className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-[9px] font-bold border border-red-200 dark:border-red-800">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-red-600">{sv.grade.toFixed(2)}</td>
                            <td className="px-3 py-2">
                               <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${sv.category === 'kem' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                 {sv.category === 'kem' ? 'Kém' : 'Yếu'}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Tổng hợp:</span>
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 shadow-sm">
                        Đã chọn <strong>{selectedNotifStudents.length}</strong> / {notificationStudents.length} SV
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Phân loại:</span>
                      <span className="text-orange-600">Yếu: {notificationStudents.filter(s => s.category === 'yeu' && selectedNotifStudents.includes(s.id)).length}</span>
                      <span className="text-red-600">Kém: {notificationStudents.filter(s => s.category === 'kem' && selectedNotifStudents.includes(s.id)).length}</span>
                    </div>
                  </div>
                </div>


                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Nội dung thông báo</label>
                  </div>
                  <textarea 
                    className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl h-40 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white"
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    placeholder="Nhập nội dung hỗ trợ sinh viên tại đây..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                  <button onClick={() => setShowNotificationModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Hủy</button>
                  <button 
                    onClick={() => {
                      setShowNotificationModal(false);
                      setToastMessage(`Đã gửi thông báo hỗ trợ tới ${selectedNotifStudents.length} sinh viên thành công!`);
                      setTimeout(() => setToastMessage(''), 3000);
                    }}
                    disabled={selectedNotifStudents.length === 0}
                    className={`px-6 py-2 rounded-lg font-bold transition-all shadow-lg ${
                      selectedNotifStudents.length === 0 
                        ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                        : 'bg-red-600 text-white hover:bg-red-700 shadow-red-200 dark:shadow-none transform hover:-translate-y-1'
                    }`}
                  >
                    Gửi thông báo ({selectedNotifStudents.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Prediction Modal */}
      {showPredictionModal && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowPredictionModal(false)} />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Brain className="h-6 w-6 text-indigo-500" /> Dự đoán xu hướng học lực (AI Analysis)
                </h3>
                <button onClick={() => setShowPredictionModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Dự báo phân bổ kỳ tới
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Xuất sắc/Giỏi</span>
                      <span className="font-bold text-green-600">+2.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Trung bình</span>
                      <span className="font-bold text-gray-500">Ổn định</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Yếu/Kém</span>
                      <span className="font-bold text-red-600">-1.8%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold mb-4 text-gray-900 dark:text-white">🚀 Đề xuất từ hệ thống</h4>
                  <ul className="text-sm space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center rounded-full text-[10px]">1</span>
                      ✨ Tập trung nâng cao tỉ lệ nhóm Khá lên Giỏi thông qua các đồ án thực tế.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center rounded-full text-[10px]">2</span>
                      ⚠️ Cảnh báo sớm 5 SV có biến động điểm số mạnh để có phương án hỗ trợ kịp thời.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center rounded-full text-[10px]">3</span>
                      📊 Tăng cường thời lượng bài tập thực hành cho môn Cấu trúc dữ liệu.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowPredictionModal(false)}
                  className="px-8 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                >
                  Đã hiểu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gray-900 dark:bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-inner">
               <CheckCircle2 className="h-5 w-5 text-white" />
             </div>
             <div>
               <div className="font-bold text-sm">Thành công</div>
               <div className="text-xs text-gray-300 dark:text-indigo-100">{toastMessage}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AcademicRankingChart);
