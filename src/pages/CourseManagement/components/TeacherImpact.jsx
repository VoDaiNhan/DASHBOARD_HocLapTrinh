import React from 'react';
import { User, Award, FileText, BarChart, TrendingUp, TrendingDown, Minus, Users } from 'lucide-react';

const TeacherImpact = () => {
  const teachers = [
    {
      name: 'TS. Nguyễn Văn An',
      subject: 'Nhập môn LT, CSDL',
      gpa: 8.1,
      completion: 92,
      risk: 'low',
      students: 125,
      trend: 'up'
    },
    {
      name: 'ThS. Trần Thị Bình',
      subject: 'OOP, CTDLGT',
      gpa: 6.4,
      completion: 71,
      risk: 'high',
      students: 98,
      trend: 'down'
    },
    {
      name: 'TS. Lê Văn Cường',
      subject: 'Kỹ thuật lập trình',
      gpa: 7.5,
      completion: 85,
      risk: 'medium',
      students: 110,
      trend: 'stable'
    },
  ];

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'high': return <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-[10px] font-black uppercase">Cao</span>;
      case 'medium': return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-md text-[10px] font-black uppercase">Trung bình</span>;
      default: return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-[10px] font-black uppercase">Thấp</span>;
    }
  };

  const TrendIcon = ({ trend }) => {
    if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-100">
            <Award className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Hiệu quả Giảng dạy (Teacher Impact)</h3>
            <p className="text-sm text-gray-500 font-medium">Đánh giá giảng viên dựa trên hiệu suất học tập của sinh viên</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hiệu suất trung bình</span>
            <span className="text-lg font-black text-blue-600">82.4%</span>
          </div>
          <div className="h-10 w-px bg-gray-100 dark:bg-gray-700 mx-2"></div>
          <button className="px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all">Chi tiết nhân sự</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, idx) => (
          <div key={idx} className="p-6 border border-gray-50 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-base leading-tight">{t.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">{t.subject}</p>
                </div>
              </div>
              <TrendIcon trend={t.trend} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">GPA TB</p>
                <p className={`text-lg font-black ${t.gpa < 7 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{t.gpa}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Completion</p>
                <p className={`text-lg font-black ${t.completion < 80 ? 'text-orange-500' : 'text-emerald-500'}`}>{t.completion}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Rủi ro:</span>
                {getRiskBadge(t.risk)}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <Users size={12} /> {t.students} SV
              </div>
            </div>

            <button className="w-full mt-5 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all">
              Báo cáo hiệu quả chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherImpact;
