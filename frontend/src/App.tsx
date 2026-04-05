import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './context/LanguageContext';
import { itemsApi } from './api/items';
import type { Item, InventoryResponse } from './api/items';
import { StatsCards } from './components/StatsCards';
import { LowStockPanel } from './components/LowStockPanel';
import { ItemsTable } from './components/ItemsTable';
import { LanguageToggle } from './components/LanguageToggle';
import { AddEditModal } from './components/AddEditModal';
import { ConfirmModal } from './components/ConfirmModal';

function App() {
  const { lang, t } = useLanguage();
  
  // Data state
  const [data, setData] = useState<InventoryResponse['data']>({
    items: [],
    total: 0,
    count: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [lowStockItems, setLowStockItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await itemsApi.getItems({
        page,
        search,
        category,
        lang
      });
      if (res.success) setData(res.data);
      
      const lowStockRes = await itemsApi.getLowStock(lang);
      if (lowStockRes.success) setLowStockItems(lowStockRes.data.items);
      
      const catsRes = await itemsApi.getCategories(lang);
      if (catsRes.success) setCategories(catsRes.data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, lang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const handleSave = async (itemData: Partial<Item>) => {
    if (currentItem) {
      await itemsApi.updateItem(currentItem.id, itemData, lang);
    } else {
      await itemsApi.createItem(itemData, lang);
    }
    setIsAddEditOpen(false);
    fetchItems();
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await itemsApi.deleteItem(deleteId, lang);
        setIsConfirmOpen(false);
        setDeleteId(null);
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container min-h-screen pb-20">
      <header className="flex justify-between items-center mb-10 py-6 border-b border-border-color">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">{t('inventory')}</h1>
          <p className="text-text-secondary text-sm">{t('dashboard')}</p>
        </div>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <button
            onClick={() => {
              setCurrentItem(null);
              setIsAddEditOpen(true);
            }}
            className="px-5 py-2.5 bg-primary-color hover:bg-primary-hover text-white font-semibold shadow-lg shadow-primary-color/25 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('addItem')}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <StatsCards 
            totalItems={data.total} 
            lowStockCount={lowStockItems.length} 
            categoriesCount={categories.length} 
          />

          <div className="card">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              
              <select
                className="w-full md:w-64"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">{t('allCategories')}</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <ItemsTable 
              items={data.items} 
              loading={loading}
              onEdit={(item) => {
                setCurrentItem(item);
                setIsAddEditOpen(true);
              }}
              onDelete={(id) => {
                setDeleteId(id);
                setIsConfirmOpen(true);
              }}
            />

            {data.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-hover text-text-secondary rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium">
                  {t('page')} {data.page} {t('of')} {data.totalPages}
                </span>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-hover text-text-secondary rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <LowStockPanel items={lowStockItems} />
        </div>
      </div>

      <AddEditModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSave}
        initialData={currentItem}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('confirmDelete')}
      />
    </div>
  );
}

export default App;
