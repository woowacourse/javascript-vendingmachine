import { expireCookie } from '../utils/cookie';
import { selectDom, generateSnackBar } from '../utils/dom';
import { listenEvents } from '../utils/event';

export default class UserController {
  #user;

  // eslint-disable-next-line max-lines-per-function
  constructor(user, loginTab, signUpTab, myProfileTab, pages) {
    this.#user = user;
    this.loginTab = loginTab;
    this.myProfileTab = myProfileTab;
    this.navTabs = pages.map((page) => page.header);
    this.signTab = signUpTab;
    this.#initLoginStatus();
    listenEvents(loginTab.element, [{ type: 'login', cb: this.#login }]);
    listenEvents(signUpTab.element, [{ type: 'sign-up', cb: this.#signUp }]);
    listenEvents(myProfileTab.element, [{ type: 'update-user', cb: this.#updateUser }]);
    listenEvents(selectDom('body'), [{ type: 'logout', cb: this.#logout }]);
  }

  #renderTabMenu() {
    this.navTabs.forEach((nav) => {
      nav.renderMenuNavigation(this.#user.isLogined, this.#user.name);
    });
  }

  async #initLoginStatus() {
    await this.#user.initLoginStatus();
    this.#renderTabMenu();
    this.#renderProfile();
  }

  #renderProfile() {
    this.myProfileTab.renderUser(this.#user.email, this.#user.name);
  }

  #login = async (e) => {
    const { email, password } = e.detail;
    try {
      await this.#user.signIn(email, password);
    } catch (err) {
      generateSnackBar(err.message);
      return;
    }
    this.#renderTabMenu();
    this.#renderProfile();
    const tabChange = new CustomEvent('tabChange', {
      detail: {
        newHash: '/#/purchase',
      },
    });
    window.dispatchEvent(tabChange);
  };

  #signUp = async (e) => {
    const { email, password, name } = e.detail;
    try {
      await this.#user.signUp(email, name, password);
    } catch (err) {
      generateSnackBar(err.message);
      return;
    }
    this.#renderTabMenu();
    const tabChange = new CustomEvent('tabChange', {
      detail: {
        newHash: '/#/purchase',
      },
    });
    window.dispatchEvent(tabChange);
  };

  #updateUser = async (e) => {
    const { email, password, name } = e.detail;
    try {
      await this.#user.updateUser(email, name, password);
      this.#renderTabMenu();
      this.#renderProfile();
    } catch (err) {
      generateSnackBar(err.message);
      return;
    }
    const tabChange = new CustomEvent('tabChange', {
      detail: {
        newHash: '/#/purchase',
      },
    });
    window.dispatchEvent(tabChange);
  };

  #logout = () => {
    expireCookie('accessToken');
    this.#user.init();
    this.#renderTabMenu();
    const tabChange = new CustomEvent('tabChange', {
      detail: {
        newHash: '/#/purchase',
      },
    });
    window.dispatchEvent(tabChange);
  };
}
