import Component from '../core/Component';
import './Router.js';
import './VendingMachine';
import './pages/NotFoundPage';
import './pages/UserLoginPage';
import './pages/UserRegisterPage';

export default class App extends Component {
  template() {
    return `
      <main class="app-container">
        <page-router>
          <vending-machine path="#item-management"></vending-machine>
          <vending-machine path="#change-charge"></vending-machine>
          <vending-machine path="#item-purchase"></vending-machine>
          <user-login path="#user-login"></user-login>
          <user-register path="#register"></user-register>
          <not-found path="*"></not-found>
        </page-router>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
