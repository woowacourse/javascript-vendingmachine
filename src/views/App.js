import Component from '../core/Component';
import './Router.js';
import './VendingMachine';
import './pages/NotFoundPage';
import './pages/UserLoginPage';
import './pages/UserRegisterPage';

import { getData } from '../utils/commons';

export default class App extends Component {
  setup() {
    const data = getData('user');
    this.state = { isLoggedIn: !!data, userName: data?.user.name };
  }

  template() {
    const { isLoggedIn, userName } = this.state;

    return `
      <main class="app-container">
        <page-router>
          <vending-machine path="#item-management" isLoggedIn=${isLoggedIn} userName=${userName}></vending-machine>
          <vending-machine path="#change-charge" isLoggedIn=${isLoggedIn} userName=${userName}></vending-machine>
          <vending-machine path="#item-purchase" isLoggedIn=${isLoggedIn} userName=${userName}></vending-machine>
          <user-login path="#user-login" isLoggedIn=${isLoggedIn} userName=${userName}></user-login>
          <user-register path="#register" isLoggedIn=${isLoggedIn} userName=${userName}></user-register>
          <not-found path="*"></not-found>
        </page-router>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
