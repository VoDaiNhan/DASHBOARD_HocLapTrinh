import React from 'react';

const AcademicSummaryCards = ({ stats, yearsData, prevYear, handleCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {/* Card 1: Tốt (Xuất sắc + Giỏi) */}
      <div 
        onClick={() => handleCardClick('excellent-good')}
        className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
          stats.excellentGoodPct >= 30 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
          stats.excellentGoodPct >= 20 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
          'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.excellentGood} SV
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            stats.excellentGoodPct >= 30 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
            stats.excellentGoodPct >= 20 ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {stats.excellentGoodPct >= 30 ? '🟢 Xuất sắc' :
             stats.excellentGoodPct >= 20 ? '🔵 Tốt' : '⚪ Đạt'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tốt ({stats.excellentGoodPct}%)
            </div>
            <div className={`text-sm font-semibold ${
              stats.excellentGoodChange > 0 ? 'text-green-600' : 
              stats.excellentGoodChange < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stats.excellentGoodChange > 0 ? '+' : ''}{stats.excellentGoodChange} vs {prevYear.year}
            </div>
          </div>
          
          <div className="text-xs text-green-600 dark:text-green-400">
            {stats.excellentGoodVsAvg > 0 ? '▲' : '▼'} {Math.abs(stats.excellentGoodVsAvg).toFixed(1)}% vs trung bình ngành
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Đóng góp {((stats.excellentGood / stats.khaOrAbovePct) * 10).toFixed(0)}% vào KPI Khá+
          </div>
          
          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {stats.trendAnalysis.direction === 'improving' ? '↗ Đang tăng trưởng' : 
             stats.trendAnalysis.direction === 'declining' ? '↘ Đang giảm' : '→ Ổn định'}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
            {yearsData.length >= 2 ? (
              <>
                <div>Từ {yearsData[0].year}: {stats.trendAnalysis.totalChange > 0 ? '+' : ''}{stats.trendAnalysis.totalChange} SV</div>
                <div>TB/năm: {stats.trendAnalysis.avgAnnualGrowth > 0 ? '+' : ''}{stats.trendAnalysis.avgAnnualGrowth.toFixed(1)} SV</div>
              </>
            ) : (
              <div>Chưa đủ dữ liệu xu hướng</div>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Ổn (Khá + TB Khá) */}
      <div 
        onClick={() => handleCardClick('kha-tbkha')}
        className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
          stats.khaAndTBKhaPct >= 40 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 
          stats.khaAndTBKhaPct >= 30 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
          'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.khaAndTBKha} SV
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            stats.khaAndTBKhaPct >= 40 ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
            stats.khaAndTBKhaPct >= 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
            'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
          }`}>
            {stats.khaAndTBKhaPct >= 40 ? '🔵 Ổn' :
             stats.khaAndTBKhaPct >= 30 ? '🟡 Theo dõi' : '🟠 Cảnh báo'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Ổn ({stats.khaAndTBKhaPct}%)
            </div>
            <div className={`text-sm font-semibold ${
              stats.khaAndTBKhaChange > 0 ? 'text-green-600' : 
              stats.khaAndTBKhaChange < 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stats.khaAndTBKhaChange > 0 ? '+' : ''}{stats.khaAndTBKhaChange} vs {prevYear.year}
            </div>
          </div>
          
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {((stats.khaAndTBKha / (stats.excellentGood + stats.khaAndTBKha)) * 100).toFixed(0)}% nhóm Khá+
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Cần ~0.5 điểm để lên Tốt
          </div>
          
          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {(() => {
              const trend = yearsData.slice(-3).every((y, i, arr) => 
                i === 0 || (y.kha + y.tbKha) >= (arr[i-1].kha + arr[i-1].tbKha)
              );
              return trend ? '↗ Tăng ổn định' : '↘ Biến động';
            })()}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
            {yearsData.length >= 2 ? (
              <>
                <div>Từ {yearsData[0].year}: {stats.khaAndTBKha - (yearsData[0].kha + yearsData[0].tbKha) > 0 ? '+' : ''}{stats.khaAndTBKha - (yearsData[0].kha + yearsData[0].tbKha)} SV</div>
                <div>TB/năm: {(stats.khaAndTBKha - (yearsData[0].kha + yearsData[0].tbKha)) / (yearsData.length - 1) > 0 ? '+' : ''}{((stats.khaAndTBKha - (yearsData[0].kha + yearsData[0].tbKha)) / (yearsData.length - 1)).toFixed(1)} SV</div>
              </>
            ) : (
              <div>Chưa đủ dữ liệu xu hướng</div>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Nguy cơ (Trung bình) */}
      <div 
        onClick={() => handleCardClick('trung-binh')}
        className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
          stats.trungBinhPct <= 10 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
          stats.trungBinhPct <= 15 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
          stats.trungBinhPct <= 20 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.trungBinh} SV
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            stats.trungBinhPct <= 10 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
            stats.trungBinhPct <= 15 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
            stats.trungBinhPct <= 20 ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
            'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {stats.trungBinhPct <= 10 ? '🟢 Ổn' :
             stats.trungBinhPct <= 15 ? '🟡 Theo dõi' :
             stats.trungBinhPct <= 20 ? '🟠 Nguy cơ' : '🔴 Nguy hiểm'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Nguy cơ ({stats.trungBinhPct}%)
            </div>
            <div className={`text-sm font-semibold ${
              stats.trungBinhChange < 0 ? 'text-green-600' : 
              stats.trungBinhChange > 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stats.trungBinhChange > 0 ? '+' : ''}{stats.trungBinhChange} vs {prevYear.year}
            </div>
          </div>
          
          <div className="text-xs text-amber-600 dark:text-amber-400">
            Cản trở KPI Khá+
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Cần ~1.0 điểm để lên Khá
          </div>
          
          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {(() => {
              const trend = yearsData.slice(-3).every((y, i, arr) => 
                i === 0 || y.trungBinh <= arr[i-1].trungBinh
              );
              return trend ? '↘ Giảm tốt' : '↗ Tăng lo ngại';
            })()}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
            {yearsData.length >= 2 ? (
              <>
                <div>Từ {yearsData[0].year}: {stats.trungBinh - yearsData[0].trungBinh > 0 ? '+' : ''}{stats.trungBinh - yearsData[0].trungBinh} SV</div>
                <div>TB/năm: {(stats.trungBinh - yearsData[0].trungBinh) / (yearsData.length - 1) > 0 ? '+' : ''}{((stats.trungBinh - yearsData[0].trungBinh) / (yearsData.length - 1)).toFixed(1)} SV</div>
              </>
            ) : (
              <div>Chưa đủ dữ liệu xu hướng</div>
            )}
          </div>
        </div>
      </div>

      {/* Card 4: Nguy hiểm (Yếu + Kém) */}
      <div 
        onClick={() => handleCardClick('yeu-kem')}
        className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg ${
          stats.yeuKemPct <= 3 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
          stats.yeuKemPct <= 5 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
          stats.yeuKemPct <= 10 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.yeuKem} SV
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            stats.yeuKemPct <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
            stats.yeuKemPct <= 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
            stats.yeuKemPct <= 10 ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
            'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {stats.yeuKemPct <= 3 ? '🟢 Ổn' :
             stats.yeuKemPct <= 5 ? '🟡 Theo dõi' :
             stats.yeuKemPct <= 10 ? '🟠 Cảnh báo' : '🔴 Nguy hiểm'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Nguy hiểm ({stats.yeuKemPct}%)
            </div>
            <div className={`text-sm font-semibold ${
              stats.yeuKemChange < 0 ? 'text-green-600' : 
              stats.yeuKemChange > 0 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stats.yeuKemChange > 0 ? '+' : ''}{stats.yeuKemChange} vs {prevYear.year}
            </div>
          </div>
          
          <div className="text-xs text-red-600 dark:text-red-400">
            {stats.yeuKemPct > 5 ? 'Phá vỡ KPI' : 'Trong ngưỡng an toàn'}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Cần ~1.5 điểm để lên TB
          </div>
          
          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {stats.trendAnalysis.avgAnnualYeuKemChange < 0 ? '↘ Giảm tốt' : '↗ Tăng nguy hiểm'}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
            {yearsData.length >= 2 ? (
              <>
                <div>Từ {yearsData[0].year}: {stats.trendAnalysis.totalYeuKemChange > 0 ? '+' : ''}{stats.trendAnalysis.totalYeuKemChange} SV</div>
                <div>TB/năm: {stats.trendAnalysis.avgAnnualYeuKemChange > 0 ? '+' : ''}{stats.trendAnalysis.avgAnnualYeuKemChange.toFixed(1)} SV</div>
              </>
            ) : (
              <div>Chưa đủ dữ liệu xu hướng</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AcademicSummaryCards);
