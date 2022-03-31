import Coin from './domain/Coin';
import Product from './domain/Product';

type Key = 'products' | 'amount';
type ValueType<T> = T extends 'products' ? Product : T extends 'amount' ? number : never;

const storage = {
  setLocalStorage(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage<T extends Key>(key: T): ValueType<T>[] {
    const items = JSON.parse(localStorage.getItem(key));

    switch (key) {
      case 'products':
        return items ?? [];

      case 'amount':
        return items ? Object.values(items as Coin) : [0, 0, 0, 0];
    }
  },
};

export default storage;
