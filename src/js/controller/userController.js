import { listenEvents } from '../utils/event';

export default class UserController {
  #user;

  // eslint-disable-next-line max-lines-per-function
  constructor(user, loginTab, pages) {
    this.#user = user;
    this.loginTab = loginTab;
    this.navTabs = pages.map((page) => page.header);

    this.#initLoginStatus();
    listenEvents(loginTab.element, [{ type: 'login', cb: this.#login }]);
  }

  #renderTabMenu() {
    this.navTabs.forEach((nav) => {
      nav.renderMenuNavigation();
    });
  }

  async #initLoginStatus() {
    await this.#user.initLoginStatus();
    this.#renderTabMenu();
  }

  #login = async (e) => {
    const { email, password } = e.detail;
    try {
      await this.#user.signIn(email, password);
    } catch (err) {
      alert(err.message);
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
}
