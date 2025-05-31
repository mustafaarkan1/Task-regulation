
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'work' | 'personal' | 'study' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: Date;
  isCompleted: boolean;
  createdAt: Date;
}
