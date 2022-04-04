import Component from '../core/Component';
import './Router.js';
import './VendingMachine';
import './pages/NotFoundPage';
import './pages/UserLoginPage';
import './pages/UserRegisterPage';
import './pages/UserEditPage';

import { getData } from '../utils/commons';

export default class App extends Component {
  setup() {
    const data = getData('user');
    this.state = { isLoggedIn: !!data, userData: data?.user };
  }

  template() {
    const { isLoggedIn, userData } = this.state;

    return `
      <main class="app-container">
        <page-router>
          <vending-machine path="#item-management" isLoggedIn=${isLoggedIn} userName=${userData?.name}></vending-machine>
          <vending-machine path="#change-charge" isLoggedIn=${isLoggedIn} userName=${userData?.name}></vending-machine>
          <vending-machine path="#item-purchase" isLoggedIn=${isLoggedIn} userName=${userData?.name}></vending-machine>
          <user-login path="#user-login" isLoggedIn=${isLoggedIn}></user-login>
          <user-register path="#register" isLoggedIn=${isLoggedIn}></user-register>
          <user-edit path="#user-edit" isLoggedIn=${isLoggedIn} userId=${userData?.id}></user-edit>
          <not-found path="*"></not-found>
        </page-router>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
