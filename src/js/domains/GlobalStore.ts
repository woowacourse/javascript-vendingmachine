import Subject from '../core/Subject';
import { setData, getData } from '../utils/storageUtil';
import { deepClone } from '../utils/commons';

interface UserData {
  email: string;
  id: string;
  name: string;
}

interface LoginState {
  isLoggedIn: boolean;
  userData: UserData;
}

interface Response {
  accessToken: string;
  user: UserData;
}

interface GlobalStoreInterface {
  loginState: LoginState;
  currentLocation: string;
}

export default class GlobalStore {
  state: GlobalStoreInterface;

  constructor(initialLoginState: LoginState, initialLocation: string) {
    this.state = Subject.observable({
      loginState: initialLoginState,
      currentLocation: initialLocation,
    });
  }

  useStore(callback) {
    return deepClone(callback(this.state));
  }

  changeLocation(location: string) {
    if (this.state.currentLocation !== location) {
      this.state.currentLocation = location;
    }
  }

  login(response: Response) {
    this.state.loginState = { isLoggedIn: true, userData: response.user };
    setData('user', response);

    this.changeLocation('/');
  }

  logout() {
    this.state.loginState = {
      isLoggedIn: false,
      userData: { email: '', id: '', name: '' },
    };
    localStorage.removeItem('user');

    this.changeLocation('/');
  }
}

const userData = getData('user');
const initialLocation = window.location.pathname;

export const globalStore = new GlobalStore(
  { isLoggedIn: !!userData, userData: userData?.user },
  initialLocation
);
