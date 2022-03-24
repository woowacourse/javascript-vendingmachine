import Product from './domain/Product';

const storage = {
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  },

  getProducts(): Product[] {
    return this.getLocalStorage('products') ?? [];
  },

  getAmount(): number[] {
    return this.getLocalStorage('amount') ? Object.values(this.getLocalStorage('amount')) : [0, 0, 0, 0];
  },
};

export default storage;
