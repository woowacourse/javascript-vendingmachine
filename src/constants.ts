import { AppState } from './types';

export const initialState: AppState = {
  productList: [
    {
      id: '1',
      name: '콜라',
      price: 1500,
      quantity: 20,
    },
    {
      id: '2',
      name: '사이다',
      price: 2000,
      quantity: 15,
    },
  ],
};
