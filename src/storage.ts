import { Product } from './domain/Product';

type StorageKey = 'products' | 'amount' | 'userMoney' | 'userInfo' | 'accessToken';
const storage = {
  setLocalStorage(key: StorageKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key: StorageKey) {
    return localStorage.getItem(key);
  },

  getProducts(): Product[] {
    return this.getLocalStorage('products') ? JSON.parse(this.getLocalStorage('products')) : [];
  },

  getAmount(): number[] {
    return this.getLocalStorage('amount') ? Object.values(JSON.parse(this.getLocalStorage('amount'))) : [0, 0, 0, 0];
  },

  getUserMoney(): number {
    return this.getLocalStorage('userMoney') ? JSON.parse(this.getLocalStorage('userMoney')) : 0;
  },

  getUserInfo() {
    return this.getLocalStorage('userInfo') ? JSON.parse(this.getLocalStorage('userInfo')) : {};
  },

  getAccessToken() {
    return this.getLocalStorage('accessToken') ? JSON.parse(this.getLocalStorage('accessToken')) : '';
  },
};

export default storage;
