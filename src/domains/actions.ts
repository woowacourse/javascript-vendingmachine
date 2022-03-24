import { ActionType, Product } from '../abstracts/interfaces';

export const createAction: object = (type: string, detail?: Product) => ({
  type,
  detail,
});

export const PRODUCT_ACTION: ActionType = {
  ADD: 'product-add',
};
