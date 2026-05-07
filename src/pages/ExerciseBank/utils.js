import { LEVEL_COLORS } from './constants';

// Helper functions for creating exercises
export const ns = (id, t, g, tags) => ({ 
  id, 
  title: t, 
  goal: g, 
  score: null, 
  tags,
  activeSemester: false
});

export const ip = (id, t, g, tags) => ({ 
  id, 
  title: t, 
  goal: g, 
  score: null, 
  tags,
  activeSemester: false
});

export const sb = (id, t, g, sc, tags) => ({ 
  id, 
  title: t, 
  goal: g, 
  score: sc, 
  tags,
  activeSemester: false
});

// Color and styling helpers
export const getLvColor = (k) => {
  switch (k) {
    case 'basic': return 'blue';
    case 'advanced': return 'purple';
    default: return 'blue';
  }
};

export const getLevelColors = (level) => LEVEL_COLORS[getLvColor(level)];

// Statistics helpers
export const calculateAverageScore = (exercises) => {
  const scoredExercises = exercises.filter(ex => ex.score !== null);
  if (scoredExercises.length === 0) return 0;
  
  const totalScore = scoredExercises.reduce((sum, ex) => sum + ex.score, 0);
  return totalScore / scoredExercises.length;
};

// Search and filter helpers
export const filterExercises = (exercises, searchTerm, filters) => {
  return exercises.filter(ex => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = ex.title.toLowerCase().includes(searchLower);
      const goalMatch = ex.goal?.toLowerCase().includes(searchLower);
      const tagMatch = ex.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!titleMatch && !goalMatch && !tagMatch) {
        return false;
      }
    }
    
    // Status filter
    if (filters?.statuses?.length > 0 && !filters.statuses.includes(ex.status)) {
      return false;
    }
    
    // Tag filter
    if (filters?.tags?.length > 0 && !filters.tags.some(tag => ex.tags?.includes(tag))) {
      return false;
    }
    
    return true;
  });
};

// Data validation helpers
export const validateExercise = (exercise) => {
  const errors = [];
  
  if (!exercise.id) errors.push('ID is required');
  if (!exercise.title) errors.push('Title is required');
  if (!exercise.goal) errors.push('Goal is required');
  if (!['not_started', 'in_progress', 'submitted'].includes(exercise.status)) {
    errors.push('Invalid status');
  }
  if (exercise.status === 'submitted' && (exercise.score === null || exercise.score < 0 || exercise.score > 10)) {
    errors.push('Score must be between 0 and 10 for submitted exercises');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCourse = (course) => {
  const errors = [];
  
  if (!course.color) errors.push('Course color is required');
  if (!course.chapters || !Array.isArray(course.chapters)) {
    errors.push('Chapters must be an array');
  } else {
    course.chapters.forEach((chapter, index) => {
      if (!chapter.id) errors.push(`Chapter ${index + 1}: ID is required`);
      if (!chapter.title) errors.push(`Chapter ${index + 1}: Title is required`);
      
      ['basic', 'advanced'].forEach(level => {
        if (chapter[level]) {
          chapter[level].forEach((exercise, exIndex) => {
            const validation = validateExercise(exercise);
            if (!validation.isValid) {
              errors.push(`Chapter ${index + 1}, ${level} exercise ${exIndex + 1}: ${validation.errors.join(', ')}`);
            }
          });
        }
      });
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Performance helpers
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};