
import React from 'react';
import { Filter, CheckCircle, Clock, Flag, Briefcase, Home, Book, MoreHorizontal } from 'lucide-react';

interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) => {
  const filterOptions = [
    { value: 'all', label: 'الكل', icon: Filter },
    { value: 'pending', label: 'معلقة', icon: Clock },
    { value: 'completed', label: 'مكتملة', icon: CheckCircle },
    { value: 'high', label: 'أولوية عالية', icon: Flag },
    { value: 'work', label: 'عمل', icon: Briefcase },
    { value: 'personal', label: 'شخصي', icon: Home },
    { value: 'study', label: 'دراسة', icon: Book },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filterOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === option.value
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
