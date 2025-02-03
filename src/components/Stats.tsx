import React from 'react';
import { Task } from '../types';
import { BarChart2 } from 'lucide-react';

interface StatsProps {
  tasks: Task[];
}

export const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const calculateStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.completed[task.completed.length - 1]
    ).length;
    const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    
    return {
      totalTasks,
      completedTasks,
      completionRate: Math.round(completionRate),
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Progress</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{stats.completedTasks}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{stats.totalTasks}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{stats.completionRate}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
        </div>
      </div>
    </div>
  );
};