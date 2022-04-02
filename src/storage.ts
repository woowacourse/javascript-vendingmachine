import { CoinType, CoinCounter } from './domain/Coin';
import Product from './domain/Product';

type Key = 'products' | 'amount';
type ValueType<T> = T extends 'products' ? Product[] : T extends 'amount' ? Record<CoinType, CoinCounter> : never;

const storage = {
  setLocalStorage(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage<T extends Key>(key: T): ValueType<T> {
    const items = JSON.parse(localStorage.getItem(key));

    switch (key) {
      case 'products':
        return items ?? [];

      case 'amount':
        return (
          items ?? {
            500: { type: '500won', count: 0 },
            100: { type: '100won', count: 0 },
            50: { type: '50won', count: 0 },
            10: { type: '10won', count: 0 },
          }
        );
    }
  },
};

export default storage;
