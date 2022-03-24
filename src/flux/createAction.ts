import { Action, ActionPayLoad } from '../types';

const createAction = (type: string, payload: ActionPayLoad): Action => {
  return {
    type,
    payload,
  };
};

export default createAction;
