import { Action } from '../types';

const createAction = (type: string, payload: any): Action => {
  return {
    type,
    payload,
  };
};

export default createAction;
