import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCoffee();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
        let borderClass = 'border-emerald-200 bg-[#FDFBF7]';

        if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;
          borderClass = 'border-blue-200 bg-[#FDFBF7]';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
          borderClass = 'border-amber-200 bg-[#FDFBF7]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-start justify-between gap-3 animate-slideUp transition-all duration-300 ${borderClass}`}
          >
            <div className="flex items-start gap-3">
              {icon}
              <div>
                <h4 className="text-sm font-semibold text-[#2C1810]">{toast.title}</h4>
                <p className="text-xs text-[#6B5A50] mt-0.5 leading-snug">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#998A80] hover:text-[#2C1810] transition p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
