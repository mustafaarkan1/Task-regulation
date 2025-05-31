
import React from 'react';
import { Check, Edit, Trash2, Calendar, Flag, Clock } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    high: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    medium: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
    low: 'text-green-500 bg-green-100 dark:bg-green-900/30'
  };

  const categoryColors = {
    work: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    study: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  };

  const categoryLabels = {
    work: 'عمل',
    personal: 'شخصي',
    study: 'دراسة',
    other: 'أخرى'
  };

  const priorityLabels = {
    high: 'عالية',
    medium: 'متوسطة',
    low: 'منخفضة'
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.isCompleted;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 ${
      task.isCompleted ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-300 dark:border-red-700' : ''}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.isCompleted
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            }`}
          >
            {task.isCompleted && <Check className="w-4 h-4 text-white" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-block w-2 h-2 rounded-full ${priorityColors[task.priority].split(' ')[1]}`}></span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`font-semibold text-lg mb-2 ${
          task.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
        }`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className={`text-sm leading-relaxed ${
            task.isCompleted ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
          }`}>
            {task.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded-full font-medium ${categoryColors[task.category]}`}>
            {categoryLabels[task.category]}
          </span>
          
          {task.dueDate && (
            <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-500' : ''}`}>
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(task.dueDate).toLocaleDateString('ar-SA', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>
            {new Date(task.createdAt).toLocaleDateString('ar-SA', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {isOverdue && (
        <div className="mt-3 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            ⚠️ متأخر عن الموعد المحدد
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
