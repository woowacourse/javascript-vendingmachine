import { Action, AppState } from '../types';

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = { ...state };
  if (type === 'HI') {
    newState.money = payload;
  }

  return newState;
};

export default reducer;
