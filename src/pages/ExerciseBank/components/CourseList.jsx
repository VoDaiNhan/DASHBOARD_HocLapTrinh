import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { LEVELS, LEVEL_COLORS } from '../constants';
import { getLvColor } from '../utils';

const CourseList = ({ onSelect, exerciseBank }) => {
  const [al, setAl] = useState('basic');
  const lm = LEVELS.find(l => l.key === al);
  const lc = LEVEL_COLORS[getLvColor(al)];
  const LI = lm.icon;
  
  return (
    <div>
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl p-1 mb-6 w-fit">
        {LEVELS.map(lv => { 
          const I = lv.icon; 
          return (
            <button 
              key={lv.key} 
              onClick={() => setAl(lv.key)} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                al === lv.key 
                  ? lv.activeTab 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <I className="h-4 w-4"/>{lv.label}
            </button>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {/* Removed descriptive text */}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(exerciseBank).map(([name, course]) => {
          const cc = LEVEL_COLORS[course.color] || lc;
          let total = 0;
          course.chapters.forEach(ch => { 
            total += (ch[al] || []).length; 
          });
          
          return (
            <button 
              key={name} 
              onClick={() => onSelect(name, al)} 
              className={`text-left border-2 rounded-2xl p-5 hover:shadow-lg transition-all group ${lc.card}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-3 h-3 rounded-full ${cc.dot}`}/>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform"/>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{name}</h3>
              <p className="text-xs text-gray-500 mb-2">
                {course.chapters.length} chương · {total} bài {lm.label.toLowerCase()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;