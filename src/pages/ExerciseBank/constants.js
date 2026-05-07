import { BookOpen, Zap } from 'lucide-react';

export const LEVELS = [
  { 
    key: 'basic', 
    label: 'Cơ bản', 
    sublabel: '', 
    icon: BookOpen, 
    goal: '', 
    activeTab: 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm', 
    banner: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300', 
    bannerIcon: 'text-blue-500' 
  },
  { 
    key: 'advanced', 
    label: 'Nâng cao', 
    sublabel: '', 
    icon: Zap, 
    goal: '', 
    activeTab: 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm', 
    banner: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300', 
    bannerIcon: 'text-purple-500' 
  },
];

export const LEVEL_COLORS = {
  blue: { 
    card: 'border-blue-200 dark:border-blue-700 bg-blue-50/40 dark:bg-blue-900/10', 
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 
    dot: 'bg-blue-500', 
    bar: 'bg-blue-500', 
    ch: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700', 
    sb: 'bg-blue-50 dark:bg-blue-900/20', 
    st: 'text-blue-600 dark:text-blue-400' 
  },
  amber: { 
    card: 'border-amber-200 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-900/10', 
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', 
    dot: 'bg-amber-500', 
    bar: 'bg-amber-500', 
    ch: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700', 
    sb: 'bg-amber-50 dark:bg-amber-900/20', 
    st: 'text-amber-600 dark:text-amber-400' 
  },
  purple: { 
    card: 'border-purple-200 dark:border-purple-700 bg-purple-50/40 dark:bg-purple-900/10', 
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', 
    dot: 'bg-purple-500', 
    bar: 'bg-purple-500', 
    ch: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700', 
    sb: 'bg-purple-50 dark:bg-purple-900/20', 
    st: 'text-purple-600 dark:text-purple-400' 
  },
  green: { 
    card: 'border-green-200 dark:border-green-700 bg-green-50/40 dark:bg-green-900/10', 
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', 
    dot: 'bg-green-500', 
    bar: 'bg-green-500', 
    ch: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700', 
    sb: 'bg-green-50 dark:bg-green-900/20', 
    st: 'text-green-600 dark:text-green-400' 
  },
  orange: { 
    card: 'border-orange-200 dark:border-orange-700 bg-orange-50/40 dark:bg-orange-900/10', 
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', 
    dot: 'bg-orange-500', 
    bar: 'bg-orange-500', 
    ch: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700', 
    sb: 'bg-orange-50 dark:bg-orange-900/20', 
    st: 'text-orange-600 dark:text-orange-400' 
  },
  teal: { 
    card: 'border-teal-200 dark:border-teal-700 bg-teal-50/40 dark:bg-teal-900/10', 
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300', 
    dot: 'bg-teal-500', 
    bar: 'bg-teal-500', 
    ch: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700', 
    sb: 'bg-teal-50 dark:bg-teal-900/20', 
    st: 'text-teal-600 dark:text-teal-400' 
  },
  yellow: { 
    card: 'border-yellow-200 dark:border-yellow-700 bg-yellow-50/40 dark:bg-yellow-900/10', 
    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', 
    dot: 'bg-yellow-500', 
    bar: 'bg-yellow-500', 
    ch: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700', 
    sb: 'bg-yellow-50 dark:bg-yellow-900/20', 
    st: 'text-yellow-600 dark:text-yellow-400' 
  },
  red: { 
    card: 'border-red-200 dark:border-red-700 bg-red-50/40 dark:bg-red-900/10', 
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', 
    dot: 'bg-red-500', 
    bar: 'bg-red-500', 
    ch: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700', 
    sb: 'bg-red-50 dark:bg-red-900/20', 
    st: 'text-red-600 dark:text-red-400' 
  },
};

