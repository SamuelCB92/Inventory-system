const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Item {
  id: string;
  name: string;
  namePT?: string | null;
  sku: string | null;
  category: string | null;
  categoryPT?: string | null;
  description: string | null;
  descriptionPT?: string | null;
  quantity: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryResponse {
  success: boolean;
  message: string;
  data: {
    items: Item[];
    total: number;
    count: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetItemsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: 'name' | 'quantity' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  lang?: string;
}

export const itemsApi = {
  async getItems(params: GetItemsParams = {}): Promise<InventoryResponse> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        query.append(key, value.toString());
      }
    });

    const response = await fetch(`${BASE_URL}/items?${query.toString()}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch items');
    return result;
  },

  async getItemById(id: string, lang = 'en'): Promise<{ success: boolean; data: Item }> {
    const response = await fetch(`${BASE_URL}/items/${id}?lang=${lang}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch item');
    return result;
  },

  async createItem(data: Partial<Item>, lang = 'en'): Promise<{ success: boolean; data: Item; message: string }> {
    const response = await fetch(`${BASE_URL}/items?lang=${lang}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create item');
    return result;
  },

  async updateItem(id: string, data: Partial<Item>, lang = 'en'): Promise<{ success: boolean; data: Item; message: string }> {
    const response = await fetch(`${BASE_URL}/items/${id}?lang=${lang}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update item');
    return result;
  },

  async deleteItem(id: string, lang = 'en'): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${BASE_URL}/items/${id}?lang=${lang}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete item');
    return result;
  },

  async getLowStock(lang = 'en'): Promise<{ success: boolean; data: { items: Item[]; count: number } }> {
    const response = await fetch(`${BASE_URL}/items/low-stock?lang=${lang}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch low stock items');
    return result;
  },

  async getCategories(lang = 'en'): Promise<{ success: boolean; data: { categories: string[] } }> {
    const response = await fetch(`${BASE_URL}/items/categories?lang=${lang}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch categories');
    return result;
  },
};
