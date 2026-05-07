// Hệ thống chống trùng lặp thông minh
export const SIMILARITY_THRESHOLDS = {
  TITLE: 0.8,        // 80% giống nhau về tiêu đề
  GOAL: 0.7,         // 70% giống nhau về mục tiêu
  DESCRIPTION: 0.6,  // 60% giống nhau về mô tả
  OVERALL: 0.65      // 65% tổng thể = cảnh báo duplicate
};

export const DUPLICATE_TYPES = {
  EXACT: 'exact',           // Hoàn toàn giống nhau
  HIGH: 'high',             // Rất giống (>80%)
  MEDIUM: 'medium',         // Khá giống (60-80%)
  LOW: 'low',               // Hơi giống (40-60%)
  DIFFERENT: 'different'    // Khác nhau (<40%)
};

/**
 * Chuẩn hóa text để so sánh
 */
const normalizeText = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    // Loại bỏ dấu tiếng Việt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Loại bỏ ký tự đặc biệt
    .replace(/[^\w\s]/g, ' ')
    // Loại bỏ khoảng trắng thừa
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Tính độ tương đồng giữa 2 chuỗi (Jaccard similarity)
 */
const calculateJaccardSimilarity = (str1, str2) => {
  const text1 = normalizeText(str1);
  const text2 = normalizeText(str2);
  
  if (!text1 || !text2) return 0;
  if (text1 === text2) return 1;
  
  // Tách thành từ
  const words1 = new Set(text1.split(' ').filter(word => word.length > 2));
  const words2 = new Set(text2.split(' ').filter(word => word.length > 2));
  
  if (words1.size === 0 && words2.size === 0) return 1;
  if (words1.size === 0 || words2.size === 0) return 0;
  
  // Tính intersection và union
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
};

/**
 * Tính độ tương đồng Levenshtein (edit distance)
 */
const calculateLevenshteinSimilarity = (str1, str2) => {
  const text1 = normalizeText(str1);
  const text2 = normalizeText(str2);
  
  if (!text1 || !text2) return 0;
  if (text1 === text2) return 1;
  
  const matrix = [];
  const len1 = text1.length;
  const len2 = text2.length;
  
  // Khởi tạo matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }
  
  // Tính toán
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = text1[i - 1] === text2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  const maxLen = Math.max(len1, len2);
  return maxLen === 0 ? 1 : (maxLen - matrix[len1][len2]) / maxLen;
};

/**
 * So sánh tags
 */
const compareTagsSimilarity = (tags1, tags2) => {
  if (!tags1 || !tags2) return 0;
  if (tags1.length === 0 && tags2.length === 0) return 1;
  if (tags1.length === 0 || tags2.length === 0) return 0;
  
  const set1 = new Set(tags1.map(tag => normalizeText(tag)));
  const set2 = new Set(tags2.map(tag => normalizeText(tag)));
  
  const intersection = new Set([...set1].filter(tag => set2.has(tag)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
};

/**
 * Phát hiện bài tập trùng lặp
 */
export const detectDuplicates = (newExercise, existingExercises) => {
  const duplicates = [];
  
  existingExercises.forEach(existing => {
    // Skip nếu cùng ID (đang edit)
    if (existing.id === newExercise.id) return;
    
    // Chỉ so sánh trong cùng môn học và chương
    if (existing.courseName !== newExercise.courseName || 
        existing.chapterTitle !== newExercise.chapterTitle) {
      return;
    }
    
    // Tính độ tương đồng cho từng field
    const titleSimilarity = Math.max(
      calculateJaccardSimilarity(newExercise.title, existing.title),
      calculateLevenshteinSimilarity(newExercise.title, existing.title)
    );
    
    const goalSimilarity = Math.max(
      calculateJaccardSimilarity(newExercise.goal, existing.goal),
      calculateLevenshteinSimilarity(newExercise.goal, existing.goal)
    );
    
    const descriptionSimilarity = newExercise.description && existing.description ? 
      Math.max(
        calculateJaccardSimilarity(newExercise.description, existing.description),
        calculateLevenshteinSimilarity(newExercise.description, existing.description)
      ) : 0;
    
    const tagsSimilarity = compareTagsSimilarity(newExercise.tags, existing.tags);
    
    // Tính điểm tổng thể (weighted average)
    const weights = {
      title: 0.4,
      goal: 0.3,
      description: 0.2,
      tags: 0.1
    };
    
    const overallSimilarity = 
      titleSimilarity * weights.title +
      goalSimilarity * weights.goal +
      descriptionSimilarity * weights.description +
      tagsSimilarity * weights.tags;
    
    // Xác định mức độ trùng lặp
    let duplicateType;
    if (overallSimilarity >= 0.9) {
      duplicateType = DUPLICATE_TYPES.EXACT;
    } else if (overallSimilarity >= 0.8) {
      duplicateType = DUPLICATE_TYPES.HIGH;
    } else if (overallSimilarity >= 0.6) {
      duplicateType = DUPLICATE_TYPES.MEDIUM;
    } else if (overallSimilarity >= 0.4) {
      duplicateType = DUPLICATE_TYPES.LOW;
    } else {
      duplicateType = DUPLICATE_TYPES.DIFFERENT;
    }
    
    // Chỉ báo cáo nếu có mức độ trùng lặp đáng kể
    if (overallSimilarity >= SIMILARITY_THRESHOLDS.OVERALL) {
      duplicates.push({
        exercise: existing,
        similarity: {
          overall: overallSimilarity,
          title: titleSimilarity,
          goal: goalSimilarity,
          description: descriptionSimilarity,
          tags: tagsSimilarity
        },
        type: duplicateType,
        warnings: generateWarnings(titleSimilarity, goalSimilarity, descriptionSimilarity, tagsSimilarity)
      });
    }
  });
  
  // Sắp xếp theo độ tương đồng giảm dần
  return duplicates.sort((a, b) => b.similarity.overall - a.similarity.overall);
};

/**
 * Tạo cảnh báo chi tiết
 */
const generateWarnings = (titleSim, goalSim, descSim, tagsSim) => {
  const warnings = [];
  
  if (titleSim >= SIMILARITY_THRESHOLDS.TITLE) {
    warnings.push({
      type: 'title',
      message: 'Tiêu đề rất giống nhau',
      severity: titleSim >= 0.9 ? 'high' : 'medium',
      similarity: titleSim
    });
  }
  
  if (goalSim >= SIMILARITY_THRESHOLDS.GOAL) {
    warnings.push({
      type: 'goal',
      message: 'Mục tiêu học tập tương tự',
      severity: goalSim >= 0.85 ? 'high' : 'medium',
      similarity: goalSim
    });
  }
  
  if (descSim >= SIMILARITY_THRESHOLDS.DESCRIPTION) {
    warnings.push({
      type: 'description',
      message: 'Mô tả bài tập giống nhau',
      severity: descSim >= 0.8 ? 'high' : 'medium',
      similarity: descSim
    });
  }
  
  if (tagsSim >= 0.7) {
    warnings.push({
      type: 'tags',
      message: 'Tags trùng lặp nhiều',
      severity: tagsSim >= 0.9 ? 'high' : 'low',
      similarity: tagsSim
    });
  }
  
  return warnings;
};

/**
 * Lấy màu sắc cho mức độ trùng lặp
 */
export const getDuplicateColors = (type) => {
  const colors = {
    [DUPLICATE_TYPES.EXACT]: {
      bg: 'bg-red-100 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-300 dark:border-red-600',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    },
    [DUPLICATE_TYPES.HIGH]: {
      bg: 'bg-orange-100 dark:bg-orange-900/20',
      text: 'text-orange-700 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-600',
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    },
    [DUPLICATE_TYPES.MEDIUM]: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-600',
      badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    },
    [DUPLICATE_TYPES.LOW]: {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-600',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    }
  };
  
  return colors[type] || colors[DUPLICATE_TYPES.LOW];
};

/**
 * Lấy nhãn hiển thị cho mức độ trùng lặp
 */
export const getDuplicateLabel = (type) => {
  const labels = {
    [DUPLICATE_TYPES.EXACT]: 'Trùng lặp hoàn toàn',
    [DUPLICATE_TYPES.HIGH]: 'Trùng lặp cao',
    [DUPLICATE_TYPES.MEDIUM]: 'Trùng lặp trung bình',
    [DUPLICATE_TYPES.LOW]: 'Hơi tương tự'
  };
  
  return labels[type] || 'Không xác định';
};

/**
 * Tạo gợi ý để tránh trùng lặp
 */
export const generateDuplicateAvoidanceSuggestions = (duplicates) => {
  if (duplicates.length === 0) return [];
  
  const suggestions = [];
  const topDuplicate = duplicates[0];
  
  if (topDuplicate.similarity.title >= 0.8) {
    suggestions.push({
      type: 'title',
      message: 'Thay đổi tiêu đề để phân biệt rõ ràng với bài tập hiện có',
      example: 'VD: Thêm ngữ cảnh cụ thể, phương pháp khác, hoặc yêu cầu bổ sung'
    });
  }
  
  if (topDuplicate.similarity.goal >= 0.7) {
    suggestions.push({
      type: 'goal',
      message: 'Điều chỉnh mục tiêu học tập để tập trung vào khía cạnh khác',
      example: 'VD: Thêm yêu cầu tối ưu hóa, xử lý edge case, hoặc áp dụng pattern mới'
    });
  }
  
  if (topDuplicate.similarity.description >= 0.6) {
    suggestions.push({
      type: 'description',
      message: 'Thay đổi mô tả và yêu cầu để tạo ra bài tập độc đáo',
      example: 'VD: Thay đổi input/output, thêm constraints, hoặc đổi context'
    });
  }
  
  if (topDuplicate.similarity.tags >= 0.7) {
    suggestions.push({
      type: 'tags',
      message: 'Sử dụng tags khác để phản ánh đúng nội dung bài tập mới',
      example: 'VD: Thêm tags về technique, complexity, hoặc application domain'
    });
  }
  
  return suggestions;
};