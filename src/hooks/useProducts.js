import { useState, useEffect, useCallback } from 'react';
import { seedProducts } from '../data/seedProducts';

const STORAGE_KEY = 'sophie-boutique-produtos';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar produtos salvos:', e);
  }
  return seedProducts;
}

function saveToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Erro ao salvar produtos:', e);
  }
}

export function useProducts() {
  const [products, setProducts] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(products);
  }, [products]);

  const addProduct = useCallback((product) => {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, removeProduct };
}
