import { AUTH_ACTION } from '../actions';

class AuthStateStore {
  #isLogined = Boolean(JSON.parse(localStorage.getItem('userAuth')));

  reducer = {
    [AUTH_ACTION.LOGIN]: () => {
      this.#isLogined = true;
    },
    [AUTH_ACTION.LOGOUT]: () => {
      this.#isLogined = false;
    },
  };

  get isLogined() {
    return this.#isLogined;
  }
}

const AuthStateStoreInstance = new AuthStateStore();
export default AuthStateStoreInstance;
