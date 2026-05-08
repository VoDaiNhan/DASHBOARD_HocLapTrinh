import React from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

const AcademicInsights = ({ 
  showInsights, 
  setShowInsights, 
  insights, 
  actions, 
  openNotificationModal, 
  courses, 
  selectedCourse, 
  selectedCohort, 
  yearsData 
}) => {
  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
      <button
        onClick={() => setShowInsights(!showInsights)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Phân tích & Đề xuất
          </h4>
        </div>
        {showInsights ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      
      {showInsights && (
        <div className="space-y-4">
          {/* Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-blue-600">📊</span> Phân tích (Hiện tượng → Ý nghĩa)
            </h5>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 font-medium">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-green-600">🎯</span> Hành động cụ thể
              </h5>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                {actions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 font-medium">
                      {action.startsWith('🔴') ? '🔴' : 
                       action.startsWith('🎯') ? '🎯' : 
                       action.startsWith('⚠️') ? '⚠️' : 
                       action.startsWith('📈') ? '📈' : '•'}
                    </span>
                    <span className={action.startsWith('🔴') ? 'font-medium text-red-700 dark:text-red-300' : ''}>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
            <button
              onClick={openNotificationModal}
              className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none flex items-center gap-2 transition-all active:scale-95"
            >
              🔔 Gửi thông báo & Hỗ trợ học tập
            </button>

            <button
              onClick={() => {
                const csvContent = [
                  ['Báo cáo quản lý xếp loại học lực'],
                  ['Môn học: ' + courses.find(c => c.id === selectedCourse)?.name],
                  ['Khóa: ' + selectedCohort],
                  ['Năm', 'Xuất sắc', 'Giỏi', 'Khá', 'TB Khá', 'Trung bình', 'Yếu', 'Kém', 'Tỷ lệ Nguy cơ (%)'],
                  ...yearsData.map(y => [
                    y.year, y.excellent, y.good, y.kha, y.tbKha, y.trungBinh, y.yeu, y.kem, 
                    ((y.yeu + y.kem) / y.total * 100).toFixed(1)
                  ]),
                ].map(row => row.join(',')).join('\n');
                
                const BOM = '\uFEFF';
                const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `bao-cao-quan-ly-nganh-${new Date().getTime()}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2 border border-transparent hover:border-gray-300"
            >
              📄 Xuất báo cáo (Excel)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AcademicInsights);
