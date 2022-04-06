import { CoinType, CoinCounter } from './domain/Safe';
import Product from './domain/Product';

type User = {
  email: string;
  name: string;
  id: number;
};
type Key = 'products' | 'amount' | 'user' | 'accessToken';
type ValueType<T> = T extends 'products'
  ? Product[]
  : T extends 'amount'
  ? Record<CoinType, CoinCounter>
  : T extends 'user'
  ? User
  : never;

const storage = {
  setLocalStorage(key: string, value: object | string) {
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
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

      case 'user':
        return items;
    }
  },
};

export default storage;
