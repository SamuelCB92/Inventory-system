import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
        <div className="w-12 h-12 rounded-full bg-error-color/10 text-error-color mx-auto mb-4 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">{t('delete')}</h2>
        <p className="text-text-secondary mb-6">{title}</p>
        
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-error-color hover:bg-error-color/80 text-white font-medium shadow-lg shadow-error-color/20"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
};
