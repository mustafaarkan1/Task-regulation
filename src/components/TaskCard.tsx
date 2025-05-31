import React from 'react';
import { Check, Edit, Trash2, Calendar, Flag, Clock, Star } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    high: 'text-red-500 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30',
    medium: 'text-yellow-500 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
    low: 'text-green-500 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
  };

  const categoryColors = {
    work: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400',
    personal: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400',
    study: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-400',
    other: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 dark:from-gray-900/30 dark:to-slate-900/30 dark:text-gray-400'
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
    <div className={`card-modern rounded-2xl shadow-lg border p-6 transition-all duration-300 ${
      task.isCompleted ? 'opacity-75 scale-95' : 'hover-lift hover-glow'
    } ${isOverdue ? 'border-red-300 dark:border-red-700 animate-pulse-slow' : 'border-white/30'}`}>
      
      {/* Enhanced Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              task.isCompleted
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 animate-bounce-soft'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500 hover-glow'
            }`}
          >
            {task.isCompleted && <Check className="w-5 h-5 text-white" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <Star className={`w-4 h-4 ${priorityColors[task.priority].split(' ')[0]}`} />
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="mb-6">
        <h3 className={`font-bold text-xl mb-3 transition-all duration-300 ${
          task.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white hover:gradient-text'
        }`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className={`text-base leading-relaxed transition-all duration-300 ${
            task.isCompleted ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-300'
          }`}>
            {task.description}
          </p>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-2 rounded-xl font-bold text-xs ${categoryColors[task.category]}`}>
            {categoryLabels[task.category]}
          </span>
          
          {task.dueDate && (
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 ${isOverdue ? 'text-red-500 animate-pulse' : 'text-gray-600 dark:text-gray-300'}`}>
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                {new Date(task.dueDate).toLocaleDateString('ar-SA', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-medium">
            {new Date(task.createdAt).toLocaleDateString('ar-SA', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {isOverdue && (
        <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-l-4 border-red-500 animate-slide-in-bottom">
          <p className="text-sm text-red-600 dark:text-red-400 font-bold flex items-center space-x-2">
            <span>⚠️</span>
            <span>متأخر عن الموعد المحدد</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
