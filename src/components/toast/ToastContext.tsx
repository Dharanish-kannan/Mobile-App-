import React, { createContext, useCallback, useContext, useState } from 'react';

import { ToastOptions, ToastContextValue } from './types';
import { ToastView } from './ToastView';

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<(ToastOptions & { id: number }) | null>(
    null
  );

  const show = useCallback((options: ToastOptions) => {
    setToast({
      ...options,
      type: options.type || 'info',
      duration: options.duration || 3000,
      id: Date.now(),
    });
  }, []);

  const hide = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {toast && (
        <ToastView
          key={toast.id}
          message={toast.message}
          type={toast.type || 'info'}
          duration={toast.duration}
          onDismiss={hide}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
