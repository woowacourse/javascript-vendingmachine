import Subject from '../core/Subject';
import { setData, getData } from '../utils/storageUtil';
import { deepClone } from '../utils/commons';
import { PAGE, LOCALSTORAGE_KEY } from '../constant';

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
    setData(LOCALSTORAGE_KEY.USER, response);

    this.changeLocation(PAGE.ITEM_PURCHASE.PATH);
  }

  logout() {
    this.state.loginState = {
      isLoggedIn: false,
      userData: { email: '', id: '', name: '' },
    };
    localStorage.removeItem(LOCALSTORAGE_KEY.USER);

    this.changeLocation(PAGE.ITEM_PURCHASE.PATH);
  }
}

const userData = getData(LOCALSTORAGE_KEY.USER);
const initialLocation = window.location.pathname;

export const globalStore = new GlobalStore(
  { isLoggedIn: !!userData, userData: userData?.user },
  initialLocation
);
