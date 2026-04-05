import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt-BR';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    totalItems: 'Total Items',
    lowStock: 'Low Stock',
    categories: 'Categories',
    searchPlaceholder: 'Search by name...',
    addItem: 'Add Item',
    name: 'Name',
    sku: 'SKU',
    category: 'Category',
    quantity: 'Quantity',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirmDelete: 'Are you sure you want to delete this item?',
    lowStockAlerts: 'Low Stock Alerts',
    noLowStock: 'No low stock items. Everything is good!',
    threshold: 'Low Stock Threshold',
    description: 'Description',
    page: 'Page',
    of: 'of',
    allCategories: 'All Categories',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    itemCreated: 'Item created successfully',
    itemUpdated: 'Item updated successfully',
    itemDeleted: 'Item deleted successfully',
    skuPlaceholder: 'Optional unique SKU',
    categoryPlaceholder: 'Optional category',
    descPlaceholder: 'Optional description',
  },
  'pt-BR': {
    dashboard: 'Painel',
    inventory: 'Estoque',
    totalItems: 'Total de Itens',
    lowStock: 'Estoque Baixo',
    categories: 'Categorias',
    searchPlaceholder: 'Buscar por nome...',
    addItem: 'Adicionar Item',
    name: 'Nome',
    sku: 'SKU',
    category: 'Categoria',
    quantity: 'Quantidade',
    actions: 'Ações',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    confirmDelete: 'Tem certeza que deseja excluir este item?',
    lowStockAlerts: 'Alertas de Estoque Baixo',
    noLowStock: 'Sem itens com estoque baixo. Tudo certo!',
    threshold: 'Limite de Estoque Baixo',
    description: 'Descrição',
    page: 'Página',
    of: 'de',
    allCategories: 'Todas as Categorias',
    loading: 'Carregando...',
    success: 'Sucesso',
    error: 'Erro',
    itemCreated: 'Item criado com sucesso',
    itemUpdated: 'Item atualizado com sucesso',
    itemDeleted: 'Item excluído com sucesso',
    skuPlaceholder: 'SKU único opcional',
    categoryPlaceholder: 'Categoria opcional',
    descPlaceholder: 'Descrição opcional',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('inventory-lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('inventory-lang', lang);
  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
