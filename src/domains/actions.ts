import { CoinActionType, ModifyDetail, ProductActionType, Product } from '../abstracts/interfaces';

export const createAction = (type: string, detail?: Product | ModifyDetail | string | number) => ({
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
