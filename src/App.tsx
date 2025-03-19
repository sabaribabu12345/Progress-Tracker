import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { Stats } from './components/Stats';
import { loadTasks, saveTasks, exportData, importData, loadTheme, saveTheme } from './utils/storage';
import { celebrateTaskCompletion, celebrateAllTasksCompleted } from './utils/confetti';
import { Download, Upload, Settings, Moon, Sun } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    setTasks(loadTasks());
    setTheme(loadTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'streak'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: [false],
      streak: 0,
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const wasCompleted = task.completed[task.completed.length - 1];
        const newCompleted = [...task.completed, !wasCompleted];
        return {
          ...task,
          completed: newCompleted,
          lastCompleted: !wasCompleted ? new Date().toISOString() : task.lastCompleted,
          streak: !wasCompleted ? task.streak + 1 : task.streak,
        };
      }
      return task;
    });

    const completedTask = updatedTasks.find(t => t.id === taskId);
    if (completedTask?.completed.at(-1)) {
      celebrateTaskCompletion(completedTask.title);
      
      // Check if all tasks are completed
      const allCompleted = updatedTasks.every(task => task.completed[task.completed.length - 1]);
      if (allCompleted && updatedTasks.length > 0) {
        setTimeout(() => celebrateAllTasksCompleted(), 200);
      }
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const importedTasks = await importData(file);
        setTasks(importedTasks);
      } catch (error) {
        console.error('Error importing the data:', error);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
          <div className="flex space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={exportData}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Export Data"
            >
              <Download className="w-5 h-5" />
            </button>
            <label className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="space-y-8">
          <Stats tasks={tasks} />
          <AddTask onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
