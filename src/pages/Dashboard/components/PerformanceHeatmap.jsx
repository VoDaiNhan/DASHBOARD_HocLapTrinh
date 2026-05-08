import React from 'react';

const PerformanceHeatmap = () => {
  const cohorts = ['K20', 'K21', 'K22', 'K23'];
  const subjects = [
    { name: 'Lập trình hướng đối tượng', results: ['green', 'green', 'yellow', 'red'] },
    { name: 'Cơ sở dữ liệu', results: ['green', 'yellow', 'red', 'red'] },
    { name: 'Cấu trúc dữ liệu', results: ['green', 'green', 'green', 'yellow'] },
    { name: 'Mạng máy tính', results: ['yellow', 'green', 'yellow', 'red'] },
  ];

  const getColorClass = (status) => {
    switch (status) {
      case 'green': return 'bg-emerald-500 shadow-emerald-500/20';
      case 'yellow': return 'bg-amber-500 shadow-amber-500/20';
      case 'red': return 'bg-rose-500 shadow-rose-500/20';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
          Heatmap Hiệu suất theo Khóa
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] font-bold text-gray-400 uppercase">Tốt</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] font-bold text-gray-400 uppercase">Cảnh báo</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[10px] font-bold text-gray-400 uppercase">Nguy kịch</span></div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-black text-gray-400 uppercase tracking-wider pb-4 pr-4">Môn học</th>
              {cohorts.map(c => (
                <th key={c} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-wider pb-4 px-2">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {subjects.map((subject, idx) => (
              <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-4 pr-4">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">
                    {subject.name}
                  </span>
                </td>
                {subject.results.map((result, i) => (
                  <td key={i} className="py-4 px-2 text-center">
                    <div className="flex justify-center">
                      <div className={`w-6 h-6 rounded-lg ${getColorClass(result)} shadow-lg transform transition-transform group-hover:scale-110`}></div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceHeatmap;
