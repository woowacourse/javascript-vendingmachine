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
    const loginState = globalStore.useStore((state) => state.loginState);
    const { isLoggedIn, userData } = loginState;

    return `
      <main>
        <page-router>
          <vending-machine path="/" isLoggedIn=${isLoggedIn} userName=${userData?.name} class="app-container"></vending-machine>
          <user-login path="/user-login" isLoggedIn=${isLoggedIn} class="app-container"></user-login>
          <user-register path="/register" isLoggedIn=${isLoggedIn} class="app-container"></user-register>
          <user-edit path="/user-edit" isLoggedIn=${isLoggedIn} userId=${userData?.id} class="app-container"></user-edit>
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
