
import React from 'react';
import { X, Users, Search, Download as DownloadIcon } from 'lucide-react';
import { RANKING_META } from '../services/academicDataService';

const StudentDrawer = ({ 
  isOpen, 
  onClose, 
  modalStudentData, 
  selectedYear, 
  filteredStudents, 
  searchTerm, 
  setSearchTerm, 
  sortedStudents,
  getAcademicRank 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl h-full flex flex-col border-l border-gray-200 dark:border-gray-800">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Users size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {modalStudentData.categoryName || 'Chi tiết sinh viên'}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-[10px] font-bold uppercase">Niên khóa: {selectedYear}</span>
                   <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold uppercase">{filteredStudents.length} Kết quả</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Tìm MSSV, tên, lớp..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 dark:bg-black text-white text-xs font-bold uppercase rounded-2xl hover:bg-black shadow-xl shadow-gray-200">
              <DownloadIcon size={14} /> Xuất
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-4">
            {sortedStudents.map((student) => {
              const actualCategory = getAcademicRank(student.grade);
              const categoryInfo = RANKING_META.find(r => r.key === actualCategory);
              return (
                <div key={student.id} className="p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all group relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-bold shadow-sm border border-indigo-100 dark:border-indigo-800">
                        {student.name.split(' ').pop()[0]}
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-900 dark:text-white leading-none mb-1">{student.name}</div>
                        <div className="text-xs text-gray-500 font-bold tracking-tight uppercase">{student.id} • {student.class}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold mb-1 ${student.grade >= 8.5 ? 'text-emerald-600' : student.grade >= 7.0 ? 'text-indigo-600' : student.grade >= 5.0 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {student.grade.toFixed(2)}
                      </div>
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: `${categoryInfo?.color}15`, color: categoryInfo?.color }}>
                        {categoryInfo?.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StudentDrawer);
