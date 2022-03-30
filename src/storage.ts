import { Product } from './domain/Product';

const storage = {
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  },

  getProducts(): Product[] {
    return this.getLocalStorage('products') ? JSON.parse(this.getLocalStorage('products')) : [];
  },

  getAmount(): number[] {
    return this.getLocalStorage('amount') ? Object.values(JSON.parse(this.getLocalStorage('amount'))) : [0, 0, 0, 0];
  },
};

export default storage;
