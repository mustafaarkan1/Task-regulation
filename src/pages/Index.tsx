import React, { useState, useEffect } from 'react';
import { Plus, Check, Search, Sun, Moon, Shield, Sparkles, Zap, Target } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import FilterBar from '@/components/FilterBar';
import AuthModal from '@/components/AuthModal';
import UserProfile from '@/components/UserProfile';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Task, TaskPriority, TaskCategory } from '@/types/task';

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, isLoading } = useAuth();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user && tasks.length >= 0) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isCompleted: false,
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const updateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData }
        : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'completed':
        return task.isCompleted && matchesSearch;
      case 'pending':
        return !task.isCompleted && matchesSearch;
      case 'high':
        return task.priority === 'high' && matchesSearch;
      case 'work':
        return task.category === 'work' && matchesSearch;
      case 'personal':
        return task.category === 'personal' && matchesSearch;
      case 'study':
        return task.category === 'study' && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center animate-zoom-in">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <Check className="w-10 h-10 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-white font-medium mt-4 animate-glow">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-zoom-in hover-lift hover-glow">
              <Check className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-7xl font-bold mb-6 animate-slide-in-bottom">
              <span className="gradient-text">إدارة المهام</span>
              <br />
              <span className="text-white">الذكية</span>
            </h1>
            
            <p className="text-2xl text-gray-200 mb-12 leading-relaxed animate-slide-in-bottom max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
              نظام متطور وعصري لإدارة مهامك اليومية مع تصميم حديث وميزات ذكية لتحسين إنتاجيتك وتنظيم حياتك
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-modern text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 hover-lift"
              >
                <Shield className="w-6 h-6" />
                <span>ابدأ رحلتك الآن</span>
                <Sparkles className="w-6 h-6" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="card-modern rounded-3xl p-8 hover-lift animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 animate-bounce-soft">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">إدارة ذكية</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  تنظيم مهامك بطريقة ذكية مع فلاتر وتصنيفات متقدمة وواجهة عصرية
                </p>
              </div>
              
              <div className="card-modern rounded-3xl p-8 hover-lift animate-slide-in-bottom" style={{ animationDelay: '0.8s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">حماية متقدمة</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  بياناتك محمية ومشفرة مع إمكانية الوصول الآمن من أي جهاز
                </p>
              </div>
              
              <div className="card-modern rounded-3xl p-8 hover-lift animate-slide-in-right" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.4s' }}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">سرعة وسهولة</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  واجهة سريعة وبديهية مع حركات سلسة تجعل إدارة المهام متعة
                </p>
              </div>
            </div>
          </div>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-rotate-slow">
                <Check className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  إدارة المهام
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {totalTasks > 0 ? `${completedTasks} من ${totalTasks} مهمة مكتملة` : 'ابدأ بإضافة مهمتك الأولى'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl glass-effect hover-lift transition-all duration-300"
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="btn-modern text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-3 hover-lift"
              >
                <Plus className="w-5 h-5" />
                <span>مهمة جديدة</span>
              </button>
              
              <UserProfile />
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          {totalTasks > 0 && (
            <div className="mt-6 animate-slide-in-bottom">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">التقدم العام</span>
                <span className="text-sm font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 animate-gradient"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto animate-slide-in-bottom">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="ابحث في مهامك بذكاء..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-14 pl-6 py-4 rounded-2xl glass-effect focus:ring-4 focus:ring-purple-500/20 focus:border-transparent outline-none transition-all text-lg font-medium"
            />
          </div>
          
          <div className="animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? updateTask : addTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}

        {/* Enhanced Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-zoom-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TaskCard
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-zoom-in">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
              <Check className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              {searchTerm || filter !== 'all' ? 'لا توجد مهام مطابقة' : 'لا توجد مهام بعد'}
            </h3>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm || filter !== 'all' 
                ? 'جرب تغيير معايير البحث أو الفلتر'
                : 'ابدأ بإضافة مهمتك الأولى وشاهد السحر يحدث'
              }
            </p>
            {(!searchTerm && filter === 'all') && (
              <button
                onClick={() => setShowTaskForm(true)}
                className="btn-modern text-white px-10 py-4 rounded-2xl font-bold text-lg hover-lift"
              >
                إضافة مهمة جديدة
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <TaskManager />
    </AuthProvider>
  );
};

export default Index;
