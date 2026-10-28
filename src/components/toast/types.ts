export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number; // ms, defaults to 3000
}

export interface ToastContextValue {
  show: (options: ToastOptions) => void;
  hide: () => void;
}
