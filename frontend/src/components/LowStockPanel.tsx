import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Item } from '../api/items';

interface LowStockPanelProps {
  items: Item[];
}

export const LowStockPanel: React.FC<LowStockPanelProps> = ({ items }) => {
  const { t, lang } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success-color"></span>
          {t('lowStockAlerts')}
        </h3>
        <p className="text-text-secondary text-sm">{t('noLowStock')}</p>
      </div>
    );
  }

  return (
    <div className="card mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-error-color"></span>
        {t('lowStockAlerts')}
      </h3>
      <div className="space-y-3">
        {items.map((item) => {
          const displayName = lang === 'pt-BR' ? (item.namePT || item.name) : item.name;
          
          return (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-surface-hover border border-border-color">
              <div>
                <p className="font-medium text-text-primary">{displayName}</p>
                <p className="text-xs text-text-secondary">{item.sku || 'No SKU'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-error-color">{item.quantity} / {item.lowStockThreshold}</p>
                <p className="text-xs text-text-secondary">qty / threshold</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
