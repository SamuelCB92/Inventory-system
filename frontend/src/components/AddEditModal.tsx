import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Item } from '../api/items';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<Item>) => Promise<void>;
  initialData?: Item | null;
}

export const AddEditModal: React.FC<AddEditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const { t } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);
  const [formData, setFormData] = useState<Partial<Item>>({
    name: '',
    namePT: '',
    sku: '',
    category: '',
    categoryPT: '',
    description: '',
    descriptionPT: '',
    quantity: 0,
    lowStockThreshold: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        namePT: initialData.namePT || '',
        categoryPT: initialData.categoryPT || '',
        descriptionPT: initialData.descriptionPT || '',
      });
    } else {
      setFormData({
        name: '',
        namePT: '',
        sku: '',
        category: '',
        categoryPT: '',
        description: '',
        descriptionPT: '',
        quantity: 0,
        lowStockThreshold: 0,
      });
    }
    setError(null);
    setShowTranslations(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card w-full max-w-lg shadow-2xl animate-in">
        <h2 className="text-xl font-bold mb-6">{initialData ? t('edit') : t('addItem')}</h2>
        
        {error && (
          <div className="error-message animate-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
            <div className="md-col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('name')} (EN) *</label>
              <input
                required
                type="text"
                className="w-full"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('sku')}</label>
              <input
                type="text"
                placeholder={t('skuPlaceholder')}
                className="w-full"
                value={formData.sku || ''}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('category')} (EN)</label>
              <input
                type="text"
                placeholder={t('categoryPlaceholder')}
                className="w-full"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('quantity')} *</label>
              <input
                required
                type="number"
                min="0"
                className="w-full"
                value={formData.quantity || 0}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('threshold')}</label>
              <input
                type="number"
                min="0"
                className="w-full"
                value={formData.lowStockThreshold || 0}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">{t('description')} (EN)</label>
            <textarea
              rows={2}
              placeholder={t('descPlaceholder')}
              className="w-full resize-none"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <button 
              type="button" 
              onClick={() => setShowTranslations(!showTranslations)}
              className="text-primary-color text-sm font-medium hover:underline flex items-center gap-1"
            >
              {showTranslations ? '↑ Hide Translations' : '↓ Add Portuguese Translations'}
            </button>
            
            {showTranslations && (
              <div className="mt-4 p-4 rounded-lg bg-surface-hover border border-border-color space-y-4 animate-in">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Nome (PT)</label>
                  <input
                    type="text"
                    className="w-full bg-surface-color"
                    value={formData.namePT || ''}
                    onChange={(e) => setFormData({ ...formData, namePT: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Categoria (PT)</label>
                  <input
                    type="text"
                    className="w-full bg-surface-color"
                    value={formData.categoryPT || ''}
                    onChange={(e) => setFormData({ ...formData, categoryPT: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Descrição (PT)</label>
                  <textarea
                    rows={2}
                    className="w-full bg-surface-color resize-none"
                    value={formData.descriptionPT || ''}
                    onChange={(e) => setFormData({ ...formData, descriptionPT: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-6 sticky bottom-0 bg-surface-color">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? '...' : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
