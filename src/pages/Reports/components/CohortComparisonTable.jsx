import React from 'react';
import { Layers } from 'lucide-react';

const CohortComparisonTable = () => {
  const cohortData = [
    { cohort: 'K20', students: 111, gpa: 7.2, gradRate: 85, debtRate: 5, status: 'Hoàn thành' },
    { cohort: 'K21', students: 117, gpa: 7.5, gradRate: 89, debtRate: 8, status: 'Tốt' },
    { cohort: 'K22', students: 132, gpa: 6.8, gradRate: 72, debtRate: 21, status: 'Cảnh báo' },
    { cohort: 'K23', students: 123, gpa: 6.5, gradRate: null, debtRate: 28, status: 'Nguy hiểm' },
    { cohort: 'K24', students: 172, gpa: 7.0, gradRate: null, debtRate: 15, status: 'Bình thường' },
    { cohort: 'K25', students: 179, gpa: 7.8, gradRate: null, debtRate: 4, status: 'Tốt' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tốt': return 'bg-emerald-100 text-emerald-800';
      case 'Hoàn thành': return 'bg-blue-100 text-blue-800';
      case 'Cảnh báo': return 'bg-amber-100 text-amber-800';
      case 'Nguy hiểm': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
          <Layers className="text-indigo-600 dark:text-indigo-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">So sánh Tổng quan các Khóa</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Góc nhìn nhanh để phát hiện vấn đề giữa các khóa</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3 rounded-tl-xl">Khóa</th>
              <th className="px-4 py-3 text-center">Sĩ số</th>
              <th className="px-4 py-3 text-center">GPA TB</th>
              <th className="px-4 py-3 text-center">Tốt nghiệp</th>
              <th className="px-4 py-3 text-center">Tỷ lệ Nợ môn</th>
              <th className="px-4 py-3 text-right rounded-tr-xl">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors last:border-0">
                <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">{row.cohort}</td>
                <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-400">{row.students}</td>
                <td className="px-4 py-4 text-center">
                  <span className={`font-bold ${row.gpa < 7 ? 'text-rose-600' : 'text-gray-700 dark:text-gray-300'}`}>
                    {row.gpa}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-400">
                  {row.gradRate ? `${row.gradRate}%` : <span className="text-gray-400">-</span>}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`font-bold ${row.debtRate > 20 ? 'text-rose-600' : row.debtRate > 10 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {row.debtRate}%
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CohortComparisonTable;
