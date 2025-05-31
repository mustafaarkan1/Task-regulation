
import React from 'react';
import { Filter, CheckCircle, Clock, Flag, Briefcase, Home, Book } from 'lucide-react';

interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) => {
  const filterOptions = [
    { value: 'all', label: 'الكل', icon: Filter, color: 'from-gray-500 to-gray-600' },
    { value: 'pending', label: 'معلقة', icon: Clock, color: 'from-orange-500 to-red-500' },
    { value: 'completed', label: 'مكتملة', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { value: 'high', label: 'أولوية عالية', icon: Flag, color: 'from-red-500 to-pink-500' },
    { value: 'work', label: 'عمل', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { value: 'personal', label: 'شخصي', icon: Home, color: 'from-purple-500 to-pink-500' },
    { value: 'study', label: 'دراسة', icon: Book, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-4">
      {filterOptions.map((option) => {
        const Icon = option.icon;
        const isActive = filter === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 hover:scale-105 ${
              isActive
                ? `bg-gradient-to-r ${option.color} text-white shadow-lg hover-glow animate-bounce-soft`
                : 'glass-effect text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20 hover-lift'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
