import Subject from '../core/Subject';
import { setData, getData } from '../utils/storageUtil';
import { deepClone } from '../utils/commons';

export default class GlobalStore {
  constructor(initialLoginState, initialLocation) {
    this.state = Subject.observable({
      loginState: initialLoginState,
      currentLocation: initialLocation,
    });
  }

  useStore(callback) {
    return deepClone(callback(this.state));
  }

  changeLocation(location) {
    if (this.state.currentLocation !== location) {
      this.state.currentLocation = location;
    }
  }

  login(response) {
    this.state.loginState = { isLoggedIn: true, data: response };
    setData('user', response);

    this.changeLocation('/');
  }

  logout() {
    this.state.loginState = { isLoggedIn: false, data: {} };
    localStorage.removeItem('user');
  }
}

const userData = getData('user');
const initialLocation = window.location.pathname;

export const globalStore = new GlobalStore(
  { isLoggedIn: !!userData, userData: userData?.user },
  initialLocation
);
