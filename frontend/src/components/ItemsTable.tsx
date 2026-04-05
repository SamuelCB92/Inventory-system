import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Item } from '../api/items';

interface ItemsTableProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const ItemsTable: React.FC<ItemsTableProps> = ({ items, onEdit, onDelete, loading }) => {
  const { t, lang } = useLanguage();

  if (loading) {
    return <div className="p-8 text-center text-text-secondary">{t('loading')}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-surface-color border-y border-border-color">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">{t('name')}</th>
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">{t('sku')}</th>
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">{t('category')}</th>
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider">{t('quantity')}</th>
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wider text-right">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color">
          {items.map((item) => {
            const displayName = lang === 'pt-BR' ? (item.namePT || item.name) : item.name;
            const displayCategory = lang === 'pt-BR' ? (item.categoryPT || item.category) : item.category;

            return (
              <tr key={item.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-medium text-text-primary">{displayName}</div>
                  {item.description && (
                    <div className="text-xs text-text-secondary mt-1 line-clamp-1">
                      {lang === 'pt-BR' ? (item.descriptionPT || item.description) : item.description}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-text-secondary">
                  {item.sku || '-'}
                </td>
                <td className="px-4 py-4">
                  {displayCategory && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface-color border border-border-color">
                      {displayCategory}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`font-mono font-bold ${
                    item.quantity <= item.lowStockThreshold ? 'text-error-color' : 'text-success-color'
                  }`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn-ghost text-primary-color"
                      title={t('edit')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn-ghost text-error-color"
                      title={t('delete')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
