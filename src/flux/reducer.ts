import { Action, AppState } from '../types';

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = { ...state };
  return newState;
};

export default reducer;
