import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          lang === 'en' ? 'bg-primary-color text-text-primary' : 'bg-surface-color text-text-secondary hover:text-text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('pt-BR')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          lang === 'pt-BR' ? 'bg-primary-color text-text-primary' : 'bg-surface-color text-text-secondary hover:text-text-primary'
        }`}
      >
        PT
      </button>
    </div>
  );
};
