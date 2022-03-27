import { ACTION } from '../constants';
import { Action, AppState } from '../types';

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = { ...state };
  if (type === ACTION.ADD_PRODUCT) {
    newState.productList = [...newState.productList, { ...payload, isEditing: false }];
  } else if (type === ACTION.CHANGE_EDIT_MODE) {
    const { name, isEditing } = payload;
    const index = newState.productList.findIndex((item) => item.name === name);
    newState.productList[index].isEditing = isEditing;
  } else if (type === ACTION.EDIT_PRODUCT) {
    const { originalName, name, price, quantity } = payload;
    const index = newState.productList.findIndex((item) => item.name === originalName);
    newState.productList[index] = { name, price, quantity, isEditing: false };
  } else if (type === ACTION.DELETE_PRODUCT) {
    newState.productList = newState.productList.filter((item) => item.name !== payload);
  }
  return newState;
};

export default reducer;
