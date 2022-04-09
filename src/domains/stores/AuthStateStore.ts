import { Action } from '../../abstracts/types';
import { createAction, AUTH_ACTION } from '../actions';

class AuthStateaStore {
  #isLogined = Boolean(JSON.parse(localStorage.getItem('userAuth')));

  dispatchAction(actionType: string) {
    const action: Action = createAction(actionType);

    switch (action.type) {
      case AUTH_ACTION.LOGIN: {
        this.#isLogined = true;
        break;
      }
      case AUTH_ACTION.LOGOUT: {
        this.#isLogined = false;
      }
    }
  }

  get isLogined() {
    return this.#isLogined;
  }
}

const AuthStateaStoreInstance = new AuthStateaStore();
export default AuthStateaStoreInstance;
