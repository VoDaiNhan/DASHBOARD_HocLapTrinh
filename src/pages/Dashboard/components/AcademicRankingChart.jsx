import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell, 
  ReferenceLine, 
  LabelList 
} from 'recharts';
import { TrendingUp, TrendingDown, Award, Users, Info, ChevronRight, Target } from 'lucide-react';

const COHORTS = ['2022-2026', '2023-2027', '2024-2028', '2025-2029'];
const courses = [
  { id: 'all', name: 'Tất cả môn học' },
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'database', name: 'Cơ sở dữ liệu' }
];

const mockYearsData = [
  { year: '2022', xuatSac: 8, gioi: 15, kha: 25, trungBinhKha: 15, trungBinh: 20, yeu: 12, kem: 5 },
  { year: '2023', xuatSac: 10, gioi: 18, kha: 22, trungBinhKha: 18, trungBinh: 17, yeu: 10, kem: 5 },
  { year: '2024', xuatSac: 12, gioi: 20, kha: 25, trungBinhKha: 15, trungBinh: 18, yeu: 7, kem: 3 },
  { year: '2025', xuatSac: 15, gioi: 22, kha: 28, trungBinhKha: 12, trungBinh: 13, yeu: 7, kem: 3 },
];

const AcademicRankingChart = () => {
  const [selectedCohort, setSelectedCohort] = useState('2022-2026');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const data = useMemo(() => {
    return mockYearsData.map(d => {
      const total = d.xuatSac + d.gioi + d.kha + d.trungBinhKha + d.trungBinh + d.yeu + d.kem;
      return {
        ...d,
        pXuatSac: d.xuatSac / total,
        pGioi: d.gioi / total,
        pKha: d.kha / total,
        pTrungBinhKha: d.trungBinhKha / total,
        pTrungBinh: d.trungBinh / total,
        pYeu: d.yeu / total,
        pKem: d.kem / total,
        vXuatSac: `${d.xuatSac}%`,
        vGioi: `${d.gioi}%`,
        vKha: `${d.kha}%`,
        vTrungBinhKha: `${d.trungBinhKha}%`,
        vTrungBinh: `${d.trungBinh}%`,
        vYeu: `${d.yeu}%`,
        vKem: `${d.kem}%`
      };
    });
  }, []);

  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (height < 20) return null;
    return (
      <text x={x + width / 2} y={y + height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-black drop-shadow-sm">
        {value}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="card p-8 group transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight uppercase">Phân bổ Xếp loại học lực</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Chu kỳ đào tạo 4 năm gần nhất</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="pl-4 pr-10 py-2 border-none rounded-xl text-[11px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat cursor-pointer"
            >
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="pl-4 pr-10 py-2 border-none rounded-xl text-[11px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat cursor-pointer"
            >
              {COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="h-[450px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} stackOffset="expand" margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorXuatSac" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#047857" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorGioi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorKha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#4338ca" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorTBKha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorTB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#b45309" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorYeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#be123c" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorKem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.5} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 14, fontWeight: 800 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc', opacity: 0.4 }}
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)' }}
                formatter={(value, name) => [typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(1)}%` : value, name]}
              />
              
              <ReferenceLine y={0.9} stroke="#10b981" strokeDasharray="8 4" strokeWidth={2} opacity={0.6}>
                <LabelList value="Mục tiêu tốt" position="top" fill="#10b981" fontSize={10} fontWeight="900" className="uppercase tracking-widest" />
              </ReferenceLine>

              <Bar dataKey="xuatSac" stackId="a" fill="url(#colorXuatSac)" name="Xuất sắc" barSize={65}>
                <LabelList dataKey="vXuatSac" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="gioi" stackId="a" fill="url(#colorGioi)" name="Giỏi">
                <LabelList dataKey="vGioi" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="kha" stackId="a" fill="url(#colorKha)" name="Khá">
                <LabelList dataKey="vKha" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="trungBinhKha" stackId="a" fill="url(#colorTBKha)" name="Trung bình Khá">
                <LabelList dataKey="vTrungBinhKha" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="trungBinh" stackId="a" fill="url(#colorTB)" name="Trung bình">
                <LabelList dataKey="vTrungBinh" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="yeu" stackId="a" fill="url(#colorYeu)" name="Yếu">
                <LabelList dataKey="vYeu" content={renderCustomLabel} />
              </Bar>
              <Bar dataKey="kem" stackId="a" fill="url(#colorKem)" name="Kém" radius={[15, 15, 0, 0]}>
                <LabelList dataKey="vKem" content={renderCustomLabel} />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { label: 'Xuất sắc', color: 'bg-emerald-500' },
            { label: 'Giỏi', color: 'bg-blue-500' },
            { label: 'Khá', color: 'bg-indigo-500' },
            { label: 'Trung bình Khá', color: 'bg-cyan-500' },
            { label: 'Trung bình', color: 'bg-amber-500' },
            { label: 'Yếu', color: 'bg-rose-500' },
            { label: 'Kém', color: 'bg-red-500' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <div className={`w-3.5 h-3.5 rounded-full ${item.color} shadow-sm shadow-black/10`}></div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Ưu tú (XS/Giỏi)', value: '37 SV', desc: 'Tăng trưởng 2% vs năm 2024', color: 'emerald', trend: '+2%' },
          { label: 'Tiềm năng (Khá/TB Khá)', value: '40 SV', desc: 'Duy trì sự ổn định chuyên môn', color: 'blue', trend: '0%' },
          { label: 'Cần hỗ trợ (TB)', value: '18 SV', desc: 'Tập trung các học phần cơ sở', color: 'amber', trend: '+3%' },
          { label: 'Nguy cơ (Yếu/Kém)', value: '10 SV', desc: 'Dưới chuẩn năng lực đào tạo', color: 'red', trend: '-1%' }
        ].map((stat, i) => (
          <div key={i} className={`card p-6 border-l-4 border-l-${stat.color}-500 transition-all hover:scale-[1.05] cursor-default bg-white dark:bg-gray-800 shadow-sm`}>
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[9px] font-black text-${stat.color}-500 uppercase tracking-widest`}>{stat.label}</span>
              <span className={`px-2 py-0.5 bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 text-[9px] font-black rounded-lg`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter">{stat.value}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase leading-tight tracking-tight">{stat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AcademicRankingChart);
