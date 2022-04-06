import Component from '../core/Component';
import './Router.js';
import './VendingMachine';
import './pages/NotFoundPage';
import './pages/UserLoginPage';
import './pages/UserRegisterPage';
import './pages/UserEditPage';

import { globalStore } from '../domains/GlobalStore';

export default class App extends Component {
  template() {
    return `
      <main>
        <page-router>
          <vending-machine path="/"class="app-container"></vending-machine>
          <user-login path="/user-login" class="app-container"></user-login>
          <user-register path="/register" class="app-container"></user-register>
          <user-edit path="/user-edit" class="app-container"></user-edit>
          <not-found path="*" class="app-container"></not-found>
        </page-router>
      </main>
    `;
  }

  setEvent() {
    window.addEventListener('popstate', ({ target }) => {
      globalStore.changeLocation(target.location.pathname);
    });
  }
}

customElements.define('app-wrapper', App);
