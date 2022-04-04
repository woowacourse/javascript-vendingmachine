import Component from '../core/Component';
import './Router.js';
import './VendingMachine';
import './pages/NotFoundPage';
import './pages/UserLoginPage';
import './pages/UserRegisterPage';
import './pages/UserEditPage';

import { getData } from '../utils/storageUtil';

export default class App extends Component {
  setup() {
    const data = getData('user');
    this.state = { isLoggedIn: !!data, userData: data?.user };
  }

  template() {
    const { isLoggedIn, userData } = this.state;

    return `
      <main>
        <page-router>
          <vending-machine path="#item-management" isLoggedIn=${isLoggedIn} userName=${userData?.name} class="app-container"></vending-machine>
          <vending-machine path="#change-charge" isLoggedIn=${isLoggedIn} userName=${userData?.name} class="app-container"></vending-machine>
          <vending-machine path="#item-purchase" isLoggedIn=${isLoggedIn} userName=${userData?.name} class="app-container"></vending-machine>
          <user-login path="#user-login" isLoggedIn=${isLoggedIn} class="app-container"></user-login>
          <user-register path="#register" isLoggedIn=${isLoggedIn} class="app-container"></user-register>
          <user-edit path="#user-edit" isLoggedIn=${isLoggedIn} userId=${userData?.id} class="app-container"></user-edit>
          <not-found path="*"></not-found>
        </page-router>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
