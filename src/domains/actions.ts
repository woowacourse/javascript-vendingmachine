import { CoinActionType, ModifyDetail, ProductActionType, Product } from '../abstracts/types';

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
  COIN_CHARGE: 'coin-charge',
  PURCHASE_MONEY_INPUT: 'purchase-money-input',
  UPDATE_MONEY_INPUT: 'update-money-input',
};
