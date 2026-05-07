import { useState } from 'react';
import { BarChart3, Hash, Database, TrendingUp, X } from 'lucide-react';
import { getAddressingStats, SUBJECT_CODES, DIFFICULTY_CODES } from '../addressing';

const AddressingStats = ({ exerciseBank, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const stats = getAddressingStats(exerciseBank);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Thống kê mã định danh bài tập</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Thống kê hệ thống định danh bài tập
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1">
            {[
              { key: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { key: 'subjects', label: 'Theo môn học', icon: Hash },
              { key: 'codes', label: 'Mã định danh', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalQuestions}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Tổng bài tập</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.withCodes}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Có mã định danh</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.byDifficulty.basic}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Cơ bản</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.byDifficulty.advanced}</p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Nâng cao</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Codes Mapping */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Mã môn học</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(SUBJECT_CODES).map(([subject, code]) => (
                    <div key={code} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-mono rounded">
                        {code}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 truncate" title={subject}>
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Phân bố theo môn học</h3>
              {Object.entries(stats.bySubject).map(([subject, data]) => (
                <div key={subject} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-mono rounded">
                        {SUBJECT_CODES[subject] || 'N/A'}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white">{subject}</h4>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {data.total} bài
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cơ bản</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{data.basic}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nâng cao</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">{data.advanced}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'codes' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Counters hiện tại</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(stats.counters).map(([key, count]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{key}</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Format mã định danh</h4>
                <div className="space-y-2 text-sm">
                  <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                    [SUBJECT]-[CHAPTER]-[DIFFICULTY]-[NUMBER]
                  </div>
                  <div className="text-blue-700 dark:text-blue-300">
                    Ví dụ: <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">PROG-CH01-BASIC-001</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressingStats;