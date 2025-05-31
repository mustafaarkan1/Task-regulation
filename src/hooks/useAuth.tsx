
import { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    // محاولة استرداد المستخدم من localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState(prev => ({ ...prev, user, isLoading: false }));
      } catch {
        localStorage.removeItem('user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // محاكاة API call - في التطبيق الحقيقي ستستخدم Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Math.random().toString(36),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        provider: 'email',
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isLoading: false, error: null });
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${user.name}`,
      });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'فشل في تسجيل الدخول' 
      }));
    }
  };

  const loginWithGoogle = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // محاكاة Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Math.random().toString(36),
        email: 'user@gmail.com',
        name: 'مستخدم Google',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        provider: 'google',
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isLoading: false, error: null });
      
      toast({
        title: "تم تسجيل الدخول عبر Google",
        description: `مرحباً ${user.name}`,
      });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'فشل في تسجيل الدخول عبر Google' 
      }));
    }
  };

  const loginWithFacebook = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // محاكاة Facebook OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Math.random().toString(36),
        email: 'user@facebook.com',
        name: 'مستخدم Facebook',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        provider: 'facebook',
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isLoading: false, error: null });
      
      toast({
        title: "تم تسجيل الدخول عبر Facebook",
        description: `مرحباً ${user.name}`,
      });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'فشل في تسجيل الدخول عبر Facebook' 
      }));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Math.random().toString(36),
        email: credentials.email,
        name: credentials.name,
        provider: 'email',
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isLoading: false, error: null });
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً ${user.name}`,
      });
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'فشل في إنشاء الحساب' 
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    setAuthState({ user: null, isLoading: false, error: null });
    
    toast({
      title: "تم تسجيل الخروج",
      description: "نراك قريباً",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        loginWithGoogle,
        loginWithFacebook,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
