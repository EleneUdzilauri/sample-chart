import { createContext, useCallback, useContext, useState } from 'react';
import { ToastType } from './types';
import { Toast } from '@/components/Toast';

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  null;
  const [toasts, setToasts] = useState<{
    type: ToastType,
    message: string
  }[]>([]);

  // eslint-disable-next-line
  const renderToast = useCallback((type: ToastType, message: string) => {
    setToasts((st) => ([
      ...st,
      {
        type,
        message,
      },
    ]));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        renderToast,
      }}>
      {children}
      <div className='flex flex-col gap-2 fixed bottom-5 right-5'>
        {
          toasts.map((i) => <Toast key={i.message} {...i} />)
        }
      </div>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
