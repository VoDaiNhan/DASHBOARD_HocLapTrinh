import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const TopIssues = () => {
  const issues = [
    { subject: 'Cơ sở dữ liệu', change: '-18%', status: 'critical', trend: 'down' },
    { subject: 'Mạng máy tính', change: '-12%', status: 'warning', trend: 'down' },
    { subject: 'Kỹ thuật lập trình', change: '-8%', status: 'warning', trend: 'down' },
    { subject: 'Toán rời rạc', change: '-5%', status: 'stable', trend: 'down' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          Môn học nguy hiểm nhất
        </h3>
        <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">XEM TẤT CẢ</button>
      </div>

      <div className="space-y-3">
        {issues.map((issue, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100/50 dark:border-gray-700/30 hover:border-rose-200 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                issue.status === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {i + 1}
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-rose-600 transition-colors">
                {issue.subject}
              </span>
            </div>
            <div className="flex items-center gap-2 text-rose-600 font-black text-sm">
              <ArrowDownRight size={16} />
              {issue.change}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-rose-50/50 dark:bg-rose-500/5 rounded-2xl border border-rose-100 dark:border-rose-500/10">
        <p className="text-[11px] font-medium text-rose-800 dark:text-rose-300 leading-relaxed">
          <span className="font-black">Gợi ý:</span> Cần tổ chức buổi họp với bộ môn <span className="font-bold">Hệ thống thông tin</span> để tìm hiểu nguyên nhân tỉ lệ rớt môn CSDL tăng cao.
        </p>
      </div>
    </div>
  );
};

export default TopIssues;
