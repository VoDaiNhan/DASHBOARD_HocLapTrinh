import React from 'react';
import { Users, BookOpen } from 'lucide-react';

const ClassKPIs = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Tổng số lớp',
      value: stats.totalClasses || 0,
      sub: 'lớp trong hệ thống ngành CNTT',
      icon: BookOpen,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-700',
      val: 'text-blue-700 dark:text-blue-300',
    },
    {
      title: 'Tổng sinh viên',
      value: stats.totalStudents || 0,
      sub: 'sinh viên trong toàn bộ ngành CNTT',
      icon: Users,
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-700',
      val: 'text-indigo-700 dark:text-indigo-300',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 ${card.border} p-8 hover:shadow-md transition-all`}
          >
            <div className={`inline-flex p-3 rounded-lg ${card.bg} mb-4`}>
              <Icon className={card.text} size={28} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">{card.title}</p>
            <p className={`text-4xl font-bold ${card.val}`}>{card.value}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ClassKPIs;
