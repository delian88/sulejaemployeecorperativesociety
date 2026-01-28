
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Loader2 } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    if (type !== 'loading') {
      setTimeout(() => {
        hideToast(id);
      }, 4000);
    }
  }, []);

  const hideToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border min-w-[320px] max-w-md animate-in slide-in-from-right-10 duration-300 ${
              toast.type === 'success' ? 'bg-white border-emerald-100 text-emerald-900' :
              toast.type === 'error' ? 'bg-white border-rose-100 text-rose-900' :
              toast.type === 'loading' ? 'bg-white border-indigo-100 text-indigo-900' :
              'bg-white border-slate-100 text-slate-900'
            }`}
          >
            <div className={`shrink-0 ${
              toast.type === 'success' ? 'text-emerald-500' :
              toast.type === 'error' ? 'text-rose-500' :
              toast.type === 'loading' ? 'text-indigo-500 animate-spin' :
              'text-indigo-500'
            }`}>
              {toast.type === 'success' && <CheckCircle2 size={20} />}
              {toast.type === 'error' && <AlertCircle size={20} />}
              {toast.type === 'loading' && <Loader2 size={20} />}
              {toast.type === 'info' && <Info size={20} />}
            </div>
            <p className="text-sm font-bold flex-1">{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
