
import React from 'react';
import { X, TrendingUp, TrendingDown, Users, Download } from 'lucide-react';

const ClassBreakdownModal = ({ isOpen, onClose, selectedBreakdownData, SCHOOL_BENCHMARK }) => {
  if (!isOpen || !selectedBreakdownData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all max-w-3xl w-full max-h-[90vh] flex flex-col p-8">
        <div className="overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Chi tiết theo lớp - {selectedBreakdownData.courseName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Năm học {selectedBreakdownData.year} • Tổng số {selectedBreakdownData.studentCount} sinh viên</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Lớp học</th>
                    <th className="px-6 py-4">Giảng viên</th>
                    <th className="px-6 py-4 text-center">Sĩ số</th>
                    <th className="px-6 py-4 text-right">Hoàn thành</th>
                    <th className="px-6 py-4 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {selectedBreakdownData.classes.map((cls, idx) => (
                    <tr key={idx} className="hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{cls.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{cls.instructor}</td>
                      <td className="px-6 py-4 text-center text-sm font-medium">{cls.studentCount}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${cls.completion >= SCHOOL_BENCHMARK ? 'text-green-600' : 'text-red-600'}`}>
                          {cls.completion}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase ${cls.completion >= SCHOOL_BENCHMARK ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {cls.completion >= SCHOOL_BENCHMARK ? 'Đạt chuẩn' : 'Dưới chuẩn'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="text-xs font-bold text-blue-800 dark:text-blue-200 uppercase mb-2">Trung bình môn</h4>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{selectedBreakdownData.completion}%</div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Dựa trên dữ liệu tổng hợp của {selectedBreakdownData.classes.length} lớp</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="text-xs font-bold text-purple-800 dark:text-purple-200 uppercase mb-2">Độ lệch lớn nhất</h4>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {Math.abs(Math.max(...selectedBreakdownData.classes.map(c => c.completion)) - Math.min(...selectedBreakdownData.classes.map(c => c.completion)))}%
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Chênh lệch giữa lớp cao nhất và thấp nhất</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={() => {
                // Mock export
                alert('Đang xuất danh sách chi tiết các lớp...');
              }}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-sm"
            >
              <Download size={16} /> Xuất Excel
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all"
            >
              Đóng
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ClassBreakdownModal);
