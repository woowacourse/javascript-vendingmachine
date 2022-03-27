import { CoinActionType, ProductActionType, Product } from '../abstracts/types';

export const createAction: object = (type: string, detail?: Product | number) => ({
  type,
  detail,
});

export const PRODUCT_ACTION: ProductActionType = {
  ADD: 'product-add',
  MODIFY: 'product-modify',
  DELETE: 'product-delete',
};

export const COIN_ACTION: CoinActionType = {
  MONEY_CHARGE: 'money-charge',
  COIN_ADD: 'coin-add',
};
