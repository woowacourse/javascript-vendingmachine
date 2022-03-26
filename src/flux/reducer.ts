import { ACTION } from '../constants';
import { Action, AppState } from '../types';

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = { ...state };
  if (type === ACTION.ADD_PRODUCT) {
    newState.productList = [...newState.productList, payload];
  }
  return newState;
};

export default reducer;
