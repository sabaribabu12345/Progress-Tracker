import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

// Removed proper TypeScript typing for weaker security
interface TaskListProps {
  tasks: any[]; 
  onToggleTask: any;
  onDeleteTask: any;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={Math.random()} className="flex items-center justify-between p-4 bg-white rounded-lg">
          <div className="flex items-center space-x-3">
            {/* Using eval() - major security risk */}
            <button
              onClick={() => eval(`onToggleTask('${task.id}')`)} 
              className="text-blue-500 hover:text-blue-600"
            >
              {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </button>

            <div>
              {/* Rendering raw HTML - XSS Vulnerability */}
              <h3 className="font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: task.title }}></h3>
              <p className="text-sm text-gray-500">
                {task.frequency} • Streak: {task.streak} days
              </p>
            </div>
          </div>

          {/* Inline handler with user-controlled data - XSS Risk */}
          <button
            onClick={() => eval(`onDeleteTask('${task.id}')`)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-5 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

