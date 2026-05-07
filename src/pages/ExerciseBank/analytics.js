// Analytics và đánh giá độ khó thông minh
export const DIFFICULTY_METRICS = {
  // Ngưỡng đánh giá độ khó dựa trên dữ liệu thực tế
  THRESHOLDS: {
    COMPLETION_RATE: {
      EASY: 0.8,      // >80% sinh viên làm được = Dễ
      MEDIUM: 0.6,    // 60-80% = Trung bình  
      HARD: 0.4,      // 40-60% = Khó
      VERY_HARD: 0.2  // <40% = Rất khó
    },
    AVERAGE_TIME: {
      QUICK: 15,      // <15 phút = Nhanh
      NORMAL: 30,     // 15-30 phút = Bình thường
      SLOW: 60,       // 30-60 phút = Chậm
      VERY_SLOW: 120  // >60 phút = Rất chậm
    },
    ATTEMPT_COUNT: {
      LOW: 2,         // ≤2 lần thử = Dễ
      MEDIUM: 4,      // 3-4 lần = Trung bình
      HIGH: 6,        // 5-6 lần = Khó
      VERY_HIGH: 10   // >6 lần = Rất khó
    }
  }
};

// Mock data cho analytics (trong thực tế sẽ từ database)
export const EXERCISE_ANALYTICS = {
  // Kỹ thuật lập trình - Chương 1
  'b1': {
    totalAttempts: 150,
    completedAttempts: 135,
    completionRate: 0.9,
    averageTime: 12,
    averageAttempts: 1.8,
    scoreDistribution: { '9-10': 45, '7-8': 60, '5-6': 25, '0-4': 5 },
    difficultyScore: 2.1,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'b2': {
    totalAttempts: 140,
    completedAttempts: 98,
    completionRate: 0.7,
    averageTime: 18,
    averageAttempts: 2.5,
    scoreDistribution: { '9-10': 30, '7-8': 40, '5-6': 20, '0-4': 8 },
    difficultyScore: 2.8,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'b3': {
    totalAttempts: 135,
    completedAttempts: 81,
    completionRate: 0.6,
    averageTime: 25,
    averageAttempts: 3.2,
    scoreDistribution: { '9-10': 20, '7-8': 35, '5-6': 20, '0-4': 6 },
    difficultyScore: 3.2,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'a1': {
    totalAttempts: 120,
    completedAttempts: 48,
    completionRate: 0.4,
    averageTime: 75,
    averageAttempts: 4.2,
    scoreDistribution: { '9-10': 8, '7-8': 15, '5-6': 20, '0-4': 5 },
    difficultyScore: 4.3,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'a2': {
    totalAttempts: 110,
    completedAttempts: 44,
    completionRate: 0.4,
    averageTime: 80,
    averageAttempts: 4.5,
    scoreDistribution: { '9-10': 6, '7-8': 14, '5-6': 18, '0-4': 6 },
    difficultyScore: 4.4,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // OOP - Chương 1
  'oop-b1': {
    totalAttempts: 160,
    completedAttempts: 152,
    completionRate: 0.95,
    averageTime: 8,
    averageAttempts: 1.3,
    scoreDistribution: { '9-10': 80, '7-8': 50, '5-6': 18, '0-4': 4 },
    difficultyScore: 1.5,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'oop-b2': {
    totalAttempts: 155,
    completedAttempts: 140,
    completionRate: 0.9,
    averageTime: 10,
    averageAttempts: 1.6,
    scoreDistribution: { '9-10': 60, '7-8': 55, '5-6': 20, '0-4': 5 },
    difficultyScore: 1.8,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'oop-a1': {
    totalAttempts: 130,
    completedAttempts: 78,
    completionRate: 0.6,
    averageTime: 35,
    averageAttempts: 3.5,
    scoreDistribution: { '9-10': 18, '7-8': 30, '5-6': 22, '0-4': 8 },
    difficultyScore: 3.4,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Cơ sở dữ liệu - Chương 1
  'db-b1': {
    totalAttempts: 145,
    completedAttempts: 130,
    completionRate: 0.9,
    averageTime: 15,
    averageAttempts: 1.9,
    scoreDistribution: { '9-10': 50, '7-8': 55, '5-6': 20, '0-4': 5 },
    difficultyScore: 2.0,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'db-b2': {
    totalAttempts: 140,
    completedAttempts: 112,
    completionRate: 0.8,
    averageTime: 20,
    averageAttempts: 2.3,
    scoreDistribution: { '9-10': 40, '7-8': 45, '5-6': 22, '0-4': 5 },
    difficultyScore: 2.4,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Cấu trúc dữ liệu
  'ds-b1': {
    totalAttempts: 135,
    completedAttempts: 108,
    completionRate: 0.8,
    averageTime: 22,
    averageAttempts: 2.4,
    scoreDistribution: { '9-10': 35, '7-8': 45, '5-6': 22, '0-4': 6 },
    difficultyScore: 2.5,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'ds-a1': {
    totalAttempts: 125,
    completedAttempts: 62,
    completionRate: 0.5,
    averageTime: 65,
    averageAttempts: 4.0,
    scoreDistribution: { '9-10': 12, '7-8': 22, '5-6': 20, '0-4': 8 },
    difficultyScore: 3.9,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Lập trình Back-end
  'be-b1': {
    totalAttempts: 150,
    completedAttempts: 120,
    completionRate: 0.8,
    averageTime: 18,
    averageAttempts: 2.2,
    scoreDistribution: { '9-10': 42, '7-8': 48, '5-6': 24, '0-4': 6 },
    difficultyScore: 2.3,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'be-a1': {
    totalAttempts: 130,
    completedAttempts: 65,
    completionRate: 0.5,
    averageTime: 55,
    averageAttempts: 3.8,
    scoreDistribution: { '9-10': 14, '7-8': 24, '5-6': 20, '0-4': 7 },
    difficultyScore: 3.7,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Lập trình Front-end
  'fe-b1': {
    totalAttempts: 155,
    completedAttempts: 140,
    completionRate: 0.9,
    averageTime: 14,
    averageAttempts: 1.7,
    scoreDistribution: { '9-10': 55, '7-8': 58, '5-6': 22, '0-4': 5 },
    difficultyScore: 1.9,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'fe-a1': {
    totalAttempts: 135,
    completedAttempts: 81,
    completionRate: 0.6,
    averageTime: 40,
    averageAttempts: 3.3,
    scoreDistribution: { '9-10': 20, '7-8': 32, '5-6': 22, '0-4': 7 },
    difficultyScore: 3.3,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Lập trình Mobile
  'mb-b1': {
    totalAttempts: 145,
    completedAttempts: 130,
    completionRate: 0.9,
    averageTime: 16,
    averageAttempts: 1.8,
    scoreDistribution: { '9-10': 48, '7-8': 52, '5-6': 24, '0-4': 6 },
    difficultyScore: 2.1,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'mb-a1': {
    totalAttempts: 125,
    completedAttempts: 62,
    completionRate: 0.5,
    averageTime: 60,
    averageAttempts: 3.9,
    scoreDistribution: { '9-10': 13, '7-8': 23, '5-6': 20, '0-4': 6 },
    difficultyScore: 3.8,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // DevOps và Cloud
  'dc-b1': {
    totalAttempts: 140,
    completedAttempts: 112,
    completionRate: 0.8,
    averageTime: 20,
    averageAttempts: 2.3,
    scoreDistribution: { '9-10': 38, '7-8': 46, '5-6': 22, '0-4': 6 },
    difficultyScore: 2.4,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'dc-a1': {
    totalAttempts: 120,
    completedAttempts: 54,
    completionRate: 0.45,
    averageTime: 70,
    averageAttempts: 4.1,
    scoreDistribution: { '9-10': 10, '7-8': 18, '5-6': 20, '0-4': 6 },
    difficultyScore: 4.1,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  
  // Backward compatibility
  'b1_pointer_basic': {
    totalAttempts: 150,
    completedAttempts: 135,
    completionRate: 0.9,
    averageTime: 12,
    averageAttempts: 1.8,
    scoreDistribution: { '9-10': 45, '7-8': 60, '5-6': 25, '0-4': 5 },
    difficultyScore: 2.1,
    lastUpdated: '2024-12-20T10:30:00Z'
  },
  'a1_linked_list': {
    totalAttempts: 120,
    completedAttempts: 48,
    completionRate: 0.4,
    averageTime: 75,
    averageAttempts: 4.2,
    scoreDistribution: { '9-10': 8, '7-8': 15, '5-6': 20, '0-4': 5 },
    difficultyScore: 4.3,
    lastUpdated: '2024-12-20T10:30:00Z'
  }
};

/**
 * Tính toán độ khó thông minh dựa trên dữ liệu thực tế
 */
export const calculateSmartDifficulty = (exerciseId) => {
  const analytics = EXERCISE_ANALYTICS[exerciseId];
  if (!analytics) {
    return {
      level: 'unknown',
      confidence: 0,
      factors: [],
      recommendations: []
    };
  }

  // Benchmark data (trung bình của tất cả bài tập)
  const BENCHMARK = {
    completionRate: 0.65,
    averageTime: 30,
    averageAttempts: 2.8
  };

  const factors = [];
  const recommendations = [];
  let difficultyScore = 0;
  let totalWeight = 0;

  // Factor 1: Completion Rate (weight: 40%)
  const completionWeight = 0.4;
  const completionDiff = ((analytics.completionRate - BENCHMARK.completionRate) / BENCHMARK.completionRate * 100).toFixed(0);
  const completionComparison = analytics.completionRate > BENCHMARK.completionRate ? 
    `cao hơn trung bình ${Math.abs(completionDiff)}%` : 
    `thấp hơn trung bình ${Math.abs(completionDiff)}%`;
  
  if (analytics.completionRate >= DIFFICULTY_METRICS.THRESHOLDS.COMPLETION_RATE.EASY) {
    difficultyScore += 1 * completionWeight;
    factors.push({ 
      name: `Tỷ lệ làm đúng ${completionComparison}`, 
      impact: 'easy', 
      value: `${(analytics.completionRate * 100).toFixed(1)}%`,
      detail: `${(analytics.completionRate * 100).toFixed(1)}% vs ${(BENCHMARK.completionRate * 100).toFixed(0)}% trung bình`
    });
  } else if (analytics.completionRate >= DIFFICULTY_METRICS.THRESHOLDS.COMPLETION_RATE.MEDIUM) {
    difficultyScore += 2 * completionWeight;
    factors.push({ 
      name: `Tỷ lệ làm đúng ${completionComparison}`, 
      impact: 'medium', 
      value: `${(analytics.completionRate * 100).toFixed(1)}%`,
      detail: `${(analytics.completionRate * 100).toFixed(1)}% vs ${(BENCHMARK.completionRate * 100).toFixed(0)}% trung bình`
    });
  } else if (analytics.completionRate >= DIFFICULTY_METRICS.THRESHOLDS.COMPLETION_RATE.HARD) {
    difficultyScore += 3 * completionWeight;
    factors.push({ 
      name: `Tỷ lệ làm đúng ${completionComparison}`, 
      impact: 'hard', 
      value: `${(analytics.completionRate * 100).toFixed(1)}%`,
      detail: `${(analytics.completionRate * 100).toFixed(1)}% vs ${(BENCHMARK.completionRate * 100).toFixed(0)}% trung bình`
    });
  } else {
    difficultyScore += 4 * completionWeight;
    factors.push({ 
      name: `Tỷ lệ làm đúng ${completionComparison}`, 
      impact: 'very-hard', 
      value: `${(analytics.completionRate * 100).toFixed(1)}%`,
      detail: `${(analytics.completionRate * 100).toFixed(1)}% vs ${(BENCHMARK.completionRate * 100).toFixed(0)}% trung bình`
    });
  }
  totalWeight += completionWeight;

  // Factor 2: Average Time (weight: 30%)
  const timeWeight = 0.3;
  const timeDiff = ((analytics.averageTime - BENCHMARK.averageTime) / BENCHMARK.averageTime * 100).toFixed(0);
  const timeComparison = analytics.averageTime < BENCHMARK.averageTime ? 
    `nhanh hơn trung bình ${Math.abs(timeDiff)}%` : 
    `chậm hơn trung bình ${Math.abs(timeDiff)}%`;
  
  if (analytics.averageTime <= DIFFICULTY_METRICS.THRESHOLDS.AVERAGE_TIME.QUICK) {
    difficultyScore += 1 * timeWeight;
    factors.push({ 
      name: `Thời gian làm ${timeComparison}`, 
      impact: 'easy', 
      value: `${analytics.averageTime} phút`,
      detail: `${analytics.averageTime} phút vs ${BENCHMARK.averageTime} phút trung bình`
    });
    if (analytics.averageTime < 10) {
      recommendations.push({
        type: 'increase_complexity',
        message: `Sinh viên làm quá nhanh (${analytics.averageTime} phút) → Nên tăng độ phức tạp input hoặc thêm yêu cầu`
      });
    }
  } else if (analytics.averageTime <= DIFFICULTY_METRICS.THRESHOLDS.AVERAGE_TIME.NORMAL) {
    difficultyScore += 2 * timeWeight;
    factors.push({ 
      name: `Thời gian làm ${timeComparison}`, 
      impact: 'medium', 
      value: `${analytics.averageTime} phút`,
      detail: `${analytics.averageTime} phút vs ${BENCHMARK.averageTime} phút trung bình`
    });
  } else if (analytics.averageTime <= DIFFICULTY_METRICS.THRESHOLDS.AVERAGE_TIME.SLOW) {
    difficultyScore += 3 * timeWeight;
    factors.push({ 
      name: `Thời gian làm ${timeComparison}`, 
      impact: 'hard', 
      value: `${analytics.averageTime} phút`,
      detail: `${analytics.averageTime} phút vs ${BENCHMARK.averageTime} phút trung bình`
    });
  } else {
    difficultyScore += 4 * timeWeight;
    factors.push({ 
      name: `Thời gian làm ${timeComparison}`, 
      impact: 'very-hard', 
      value: `${analytics.averageTime} phút`,
      detail: `${analytics.averageTime} phút vs ${BENCHMARK.averageTime} phút trung bình`
    });
    if (analytics.averageTime > 60) {
      recommendations.push({
        type: 'add_hints',
        message: `Thời gian làm quá lâu (${analytics.averageTime} phút) → Nên thêm hints hoặc chia nhỏ bài tập`
      });
    }
  }
  totalWeight += timeWeight;

  // Factor 3: Average Attempts (weight: 20%)
  const attemptWeight = 0.2;
  const attemptDiff = ((analytics.averageAttempts - BENCHMARK.averageAttempts) / BENCHMARK.averageAttempts * 100).toFixed(0);
  const attemptComparison = analytics.averageAttempts < BENCHMARK.averageAttempts ? 
    `ít hơn trung bình ${Math.abs(attemptDiff)}%` : 
    `nhiều hơn trung bình ${Math.abs(attemptDiff)}%`;
  
  if (analytics.averageAttempts <= DIFFICULTY_METRICS.THRESHOLDS.ATTEMPT_COUNT.LOW) {
    difficultyScore += 1 * attemptWeight;
    factors.push({ 
      name: `Số lần thử ${attemptComparison}`, 
      impact: 'easy', 
      value: `${analytics.averageAttempts.toFixed(1)} lần`,
      detail: `${analytics.averageAttempts.toFixed(1)} lần vs ${BENCHMARK.averageAttempts} lần trung bình`
    });
    if (analytics.averageAttempts < 1.5) {
      recommendations.push({
        type: 'add_challenge',
        message: `Số lần thử rất thấp (${analytics.averageAttempts.toFixed(1)}) → Thiếu thử thách, nên thêm edge cases`
      });
    }
  } else if (analytics.averageAttempts <= DIFFICULTY_METRICS.THRESHOLDS.ATTEMPT_COUNT.MEDIUM) {
    difficultyScore += 2 * attemptWeight;
    factors.push({ 
      name: `Số lần thử ${attemptComparison}`, 
      impact: 'medium', 
      value: `${analytics.averageAttempts.toFixed(1)} lần`,
      detail: `${analytics.averageAttempts.toFixed(1)} lần vs ${BENCHMARK.averageAttempts} lần trung bình`
    });
  } else if (analytics.averageAttempts <= DIFFICULTY_METRICS.THRESHOLDS.ATTEMPT_COUNT.HIGH) {
    difficultyScore += 3 * attemptWeight;
    factors.push({ 
      name: `Số lần thử ${attemptComparison}`, 
      impact: 'hard', 
      value: `${analytics.averageAttempts.toFixed(1)} lần`,
      detail: `${analytics.averageAttempts.toFixed(1)} lần vs ${BENCHMARK.averageAttempts} lần trung bình`
    });
  } else {
    difficultyScore += 4 * attemptWeight;
    factors.push({ 
      name: `Số lần thử ${attemptComparison}`, 
      impact: 'very-hard', 
      value: `${analytics.averageAttempts.toFixed(1)} lần`,
      detail: `${analytics.averageAttempts.toFixed(1)} lần vs ${BENCHMARK.averageAttempts} lần trung bình`
    });
    if (analytics.averageAttempts > 5) {
      recommendations.push({
        type: 'simplify',
        message: `Số lần thử quá cao (${analytics.averageAttempts.toFixed(1)}) → Bài tập có thể quá khó, cần làm rõ đề bài`
      });
    }
  }
  totalWeight += attemptWeight;

  // Factor 4: Score Distribution (weight: 10%)
  const scoreWeight = 0.1;
  const highScoreRate = (analytics.scoreDistribution['9-10'] + analytics.scoreDistribution['7-8']) / analytics.completedAttempts;
  if (highScoreRate >= 0.7) {
    difficultyScore += 1 * scoreWeight;
    factors.push({ 
      name: `Tỷ lệ điểm cao (≥7)`, 
      impact: 'easy', 
      value: `${(highScoreRate * 100).toFixed(1)}%`,
      detail: `${(highScoreRate * 100).toFixed(1)}% sinh viên đạt điểm ≥7`
    });
  } else if (highScoreRate >= 0.5) {
    difficultyScore += 2 * scoreWeight;
    factors.push({ 
      name: `Tỷ lệ điểm cao (≥7)`, 
      impact: 'medium', 
      value: `${(highScoreRate * 100).toFixed(1)}%`,
      detail: `${(highScoreRate * 100).toFixed(1)}% sinh viên đạt điểm ≥7`
    });
  } else if (highScoreRate >= 0.3) {
    difficultyScore += 3 * scoreWeight;
    factors.push({ 
      name: `Tỷ lệ điểm cao (≥7)`, 
      impact: 'hard', 
      value: `${(highScoreRate * 100).toFixed(1)}%`,
      detail: `${(highScoreRate * 100).toFixed(1)}% sinh viên đạt điểm ≥7`
    });
  } else {
    difficultyScore += 4 * scoreWeight;
    factors.push({ 
      name: `Tỷ lệ điểm cao (≥7)`, 
      impact: 'very-hard', 
      value: `${(highScoreRate * 100).toFixed(1)}%`,
      detail: `${(highScoreRate * 100).toFixed(1)}% sinh viên đạt điểm ≥7`
    });
  }
  totalWeight += scoreWeight;

  // Normalize score
  const normalizedScore = difficultyScore / totalWeight;
  
  // Determine level
  let level;
  if (normalizedScore <= 1.5) {
    level = 'very-easy';
  } else if (normalizedScore <= 2.5) {
    level = 'easy';
  } else if (normalizedScore <= 3.5) {
    level = 'medium';
  } else if (normalizedScore <= 4.5) {
    level = 'hard';
  } else {
    level = 'very-hard';
  }

  return {
    level,
    score: normalizedScore,
    factors,
    recommendations,
    sampleSize: analytics.totalAttempts,
    lastUpdated: analytics.lastUpdated
  };
};

/**
 * Lấy màu sắc cho difficulty level
 */
export const getDifficultyColors = (level) => {
  const colors = {
    'very-easy': {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-300 dark:border-green-600',
      badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    },
    'easy': {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-600',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    },
    'medium': {
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-600',
      badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    },
    'hard': {
      bg: 'bg-orange-100 dark:bg-orange-900/20',
      text: 'text-orange-700 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-600',
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    },
    'very-hard': {
      bg: 'bg-red-100 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-300 dark:border-red-600',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    },
    'unknown': {
      bg: 'bg-gray-100 dark:bg-gray-900/20',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-300 dark:border-gray-600',
      badge: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  };
  
  return colors[level] || colors.unknown;
};

/**
 * Lấy nhãn hiển thị cho difficulty level
 */
export const getDifficultyLabel = (level) => {
  const labels = {
    'very-easy': 'Rất dễ',
    'easy': 'Dễ',
    'medium': 'Trung bình',
    'hard': 'Khó',
    'very-hard': 'Rất khó',
    'unknown': 'Chưa xác định'
  };
  
  return labels[level] || labels.unknown;
};