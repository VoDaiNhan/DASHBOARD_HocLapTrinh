// 🏦 Question Addressing System - Hệ thống định danh bài tập
// Tách biệt Logical ID (ổn định) và Version ID (thay đổi)

// Subject codes mapping
export const SUBJECT_CODES = {
  'Kỹ thuật lập trình': 'PROG',
  'Lập trình hướng đối tượng': 'OOP', 
  'Lập trình Back-end': 'BACKEND',
  'Lập trình Front-end': 'FRONTEND',
  'Cơ sở dữ liệu': 'DB',
  'Lập trình Mobile': 'MOBILE',
  'DevOps và Cloud': 'DEVOPS',
  'Toán học': 'MATH' // Có thể mở rộng thêm
};

// Difficulty codes
export const DIFFICULTY_CODES = {
  'basic': 'BASIC',
  'advanced': 'ADV'
};

// Counter để track số thứ tự theo từng nhóm
let questionCounters = {};

/**
 * Generate unique question code
 * Format: [SUBJECT]-[CHAPTER]-[DIFFICULTY]-[NUMBER]
 * Ví dụ: PROG-CH01-BASIC-001, OOP-CH02-ADV-015
 */
export const generateQuestionCode = (subjectName, chapterId, difficulty) => {
  const subjectCode = SUBJECT_CODES[subjectName] || 'UNKNOWN';
  const chapterCode = `CH${String(chapterId).padStart(2, '0')}`;
  const difficultyCode = DIFFICULTY_CODES[difficulty] || 'BASIC';
  
  // Tạo key để track counter
  const counterKey = `${subjectCode}-${chapterCode}-${difficultyCode}`;
  
  // Lấy số thứ tự tiếp theo
  if (!questionCounters[counterKey]) {
    questionCounters[counterKey] = 0;
  }
  questionCounters[counterKey]++;
  
  const questionNumber = String(questionCounters[counterKey]).padStart(3, '0');
  
  return `${subjectCode}-${chapterCode}-${difficultyCode}-${questionNumber}`;
};

/**
 * Parse question code thành components
 */
export const parseQuestionCode = (code) => {
  if (!code || typeof code !== 'string') return null;
  
  const parts = code.split('-');
  if (parts.length !== 4) return null;
  
  const [subjectCode, chapterCode, difficultyCode, questionNumber] = parts;
  
  return {
    subjectCode,
    chapterCode,
    difficultyCode, 
    questionNumber: parseInt(questionNumber),
    chapterId: parseInt(chapterCode.replace('CH', '')),
    difficulty: Object.keys(DIFFICULTY_CODES).find(key => DIFFICULTY_CODES[key] === difficultyCode),
    subjectName: Object.keys(SUBJECT_CODES).find(key => SUBJECT_CODES[key] === subjectCode)
  };
};

/**
 * Validate question code format
 */
export const validateQuestionCode = (code) => {
  const parsed = parseQuestionCode(code);
  return parsed !== null;
};

/**
 * Check if question code exists
 */
export const isQuestionCodeExists = (code, exerciseBank) => {
  if (!exerciseBank) return false;
  
  for (const [subjectName, subject] of Object.entries(exerciseBank)) {
    for (const chapter of subject.chapters) {
      for (const difficulty of ['basic', 'advanced']) {
        const exercises = chapter[difficulty] || [];
        if (exercises.some(ex => ex.code === code)) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Find question by code
 */
export const findQuestionByCode = (code, exerciseBank) => {
  if (!exerciseBank) return null;
  
  for (const [subjectName, subject] of Object.entries(exerciseBank)) {
    for (const chapter of subject.chapters) {
      for (const difficulty of ['basic', 'advanced']) {
        const exercises = chapter[difficulty] || [];
        const exercise = exercises.find(ex => ex.code === code);
        if (exercise) {
          return {
            exercise,
            subjectName,
            chapter,
            difficulty,
            path: {
              subject: subjectName,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              difficulty
            }
          };
        }
      }
    }
  }
  return null;
};

/**
 * Initialize counters từ existing exercise bank
 * Để tránh duplicate codes khi restart
 */
export const initializeCounters = (exerciseBank) => {
  questionCounters = {};
  
  if (!exerciseBank) return;
  
  for (const [subjectName, subject] of Object.entries(exerciseBank)) {
    for (const chapter of subject.chapters) {
      for (const difficulty of ['basic', 'advanced']) {
        const exercises = chapter[difficulty] || [];
        
        exercises.forEach(exercise => {
          if (exercise.code) {
            const parsed = parseQuestionCode(exercise.code);
            if (parsed) {
              const counterKey = `${parsed.subjectCode}-${parsed.chapterCode}-${parsed.difficultyCode}`;
              questionCounters[counterKey] = Math.max(
                questionCounters[counterKey] || 0,
                parsed.questionNumber
              );
            }
          }
        });
      }
    }
  }
  
  console.log('Initialized question counters:', questionCounters);
};

/**
 * Generate next available code for a group
 */
export const getNextQuestionCode = (subjectName, chapterId, difficulty) => {
  const subjectCode = SUBJECT_CODES[subjectName] || 'UNKNOWN';
  const chapterCode = `CH${String(chapterId).padStart(2, '0')}`;
  const difficultyCode = DIFFICULTY_CODES[difficulty] || 'BASIC';
  
  const counterKey = `${subjectCode}-${chapterCode}-${difficultyCode}`;
  const nextNumber = (questionCounters[counterKey] || 0) + 1;
  
  return `${subjectCode}-${chapterCode}-${difficultyCode}-${String(nextNumber).padStart(3, '0')}`;
};

/**
 * Migrate existing exercises to use new addressing system
 */
export const migrateExercisesToNewAddressing = (exerciseBank) => {
  console.log('🔄 Migrating exercises to new addressing system...');
  
  // Initialize counters first
  initializeCounters(exerciseBank);
  
  const migratedBank = JSON.parse(JSON.stringify(exerciseBank)); // Deep clone
  
  for (const [subjectName, subject] of Object.entries(migratedBank)) {
    for (const chapter of subject.chapters) {
      for (const difficulty of ['basic', 'advanced']) {
        const exercises = chapter[difficulty] || [];
        
        exercises.forEach(exercise => {
          // Nếu chưa có code, generate mới
          if (!exercise.code) {
            exercise.code = generateQuestionCode(subjectName, chapter.id, difficulty);
            console.log(`Generated code for "${exercise.title}": ${exercise.code}`);
          }
          
          // Đảm bảo có internal ID
          if (!exercise.internalId) {
            exercise.internalId = exercise.id; // Giữ ID cũ làm internal ID
          }
          
          // Thêm metadata
          exercise.addressing = {
            subject: subjectName,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            difficulty: difficulty,
            createdAt: exercise.createdAt || new Date().toISOString(),
            lastModified: exercise.lastModified || new Date().toISOString()
          };
        });
      }
    }
  }
  
  console.log('✅ Migration completed');
  return migratedBank;
};

/**
 * Create new question với addressing system
 */
export const createQuestionWithAddressing = (questionData, subjectName, chapterId, difficulty) => {
  const code = generateQuestionCode(subjectName, chapterId, difficulty);
  const internalId = `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    ...questionData,
    id: questionData.id || internalId, // Backward compatibility
    internalId: internalId,
    code: code,
    addressing: {
      subject: subjectName,
      chapterId: chapterId,
      chapterTitle: questionData.chapterTitle || `Chương ${chapterId}`,
      difficulty: difficulty,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
  };
};

/**
 * Update question addressing khi move giữa các chương/môn
 */
export const updateQuestionAddressing = (exercise, newSubject, newChapterId, newDifficulty, strategy = 'keep_code') => {
  if (strategy === 'keep_code') {
    // Giữ code cũ, chỉ update metadata
    exercise.addressing = {
      ...exercise.addressing,
      subject: newSubject,
      chapterId: newChapterId,
      difficulty: newDifficulty,
      lastModified: new Date().toISOString(),
      moved: true,
      originalCode: exercise.code
    };
  } else if (strategy === 'new_code') {
    // Tạo code mới
    const oldCode = exercise.code;
    exercise.code = generateQuestionCode(newSubject, newChapterId, newDifficulty);
    exercise.addressing = {
      ...exercise.addressing,
      subject: newSubject,
      chapterId: newChapterId,
      difficulty: newDifficulty,
      lastModified: new Date().toISOString(),
      previousCode: oldCode
    };
  }
  
  return exercise;
};

/**
 * Get statistics về addressing system
 */
export const getAddressingStats = (exerciseBank) => {
  const stats = {
    totalQuestions: 0,
    bySubject: {},
    byDifficulty: { basic: 0, advanced: 0 },
    withCodes: 0,
    withoutCodes: 0,
    counters: { ...questionCounters }
  };
  
  for (const [subjectName, subject] of Object.entries(exerciseBank)) {
    stats.bySubject[subjectName] = { basic: 0, advanced: 0, total: 0 };
    
    for (const chapter of subject.chapters) {
      for (const difficulty of ['basic', 'advanced']) {
        const exercises = chapter[difficulty] || [];
        const count = exercises.length;
        
        stats.totalQuestions += count;
        stats.bySubject[subjectName][difficulty] += count;
        stats.bySubject[subjectName].total += count;
        stats.byDifficulty[difficulty] += count;
        
        exercises.forEach(exercise => {
          if (exercise.code) {
            stats.withCodes++;
          } else {
            stats.withoutCodes++;
          }
        });
      }
    }
  }
  
  return stats;
};

// Export utilities
export const AddressingUtils = {
  generateQuestionCode,
  parseQuestionCode,
  validateQuestionCode,
  isQuestionCodeExists,
  findQuestionByCode,
  initializeCounters,
  getNextQuestionCode,
  migrateExercisesToNewAddressing,
  createQuestionWithAddressing,
  updateQuestionAddressing,
  getAddressingStats
};

export default AddressingUtils;