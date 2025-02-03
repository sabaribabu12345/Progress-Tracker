import { Task } from '../types';

const STORAGE_KEY = 'taskflow-tasks';
const THEME_KEY = 'taskflow-theme';

export const loadTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const exportData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  const blob = new Blob([data || '[]'], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target?.result as string);
        saveTasks(tasks);
        resolve(tasks);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

export const loadTheme = (): 'dark' | 'light' => {
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') || 'light';
};

export const saveTheme = (theme: 'dark' | 'light') => {
  localStorage.setItem(THEME_KEY, theme);
};