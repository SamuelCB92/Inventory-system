import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface StatsCardsProps {
  totalItems: number;
  lowStockCount: number;
  categoriesCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ totalItems, lowStockCount, categoriesCount }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="card text-center">
        <p className="text-sm text-text-secondary mb-1">{t('totalItems')}</p>
        <h2 className="text-3xl font-bold">{totalItems}</h2>
      </div>
      <div className="card text-center">
        <p className="text-sm text-text-secondary mb-1">{t('lowStock')}</p>
        <h2 className={`text-3xl font-bold ${lowStockCount > 0 ? 'text-error-color' : 'text-success-color'}`}>
          {lowStockCount}
        </h2>
      </div>
      <div className="card text-center">
        <p className="text-sm text-text-secondary mb-1">{t('categories')}</p>
        <h2 className="text-3xl font-bold">{categoriesCount}</h2>
      </div>
    </div>
  );
};
