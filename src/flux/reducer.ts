import { ACTION } from '../constants';
import { Action, AppState } from '../types';

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = { ...state };
  if (type === ACTION.ADD_PRODUCT) {
    newState.productList = [...newState.productList, payload];
  } else if (type === ACTION.EDIT_PRODUCT) {
    const index = newState.productList.findIndex((item) => item.name === payload.name);
    newState.productList[index] = payload;
  } else if (type === ACTION.DELETE_PRODUCT) {
    newState.productList = newState.productList.filter((item) => item.name !== payload);
  }
  return newState;
};

export default reducer;
