export type TaskFrequency = 'daily' | 'weekly' | 'custom';

export interface Task {
  id: string;
  title: string;
  frequency: TaskFrequency;
  customDays?: number[];
  completed: boolean[];
  createdAt: string;
  lastCompleted?: string;
  streak: number;
}

export interface TaskStats {
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
}