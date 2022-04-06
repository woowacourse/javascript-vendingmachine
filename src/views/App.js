import Component from '../core/Component';
import './Router.js';
import './components/UserMenu';
import './components/NavBar';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './pages/LoginPage';
import './pages/SignupPage';
import './pages/ProfilePage';
import './pages/NotFoundPage';
import './components/Snackbar';
import { vendingMachine } from '../domains/VendingMachine';
import { getPathname } from '../utils/domUtils';
import { PAGES } from '../configs/constants';

export default class App extends Component {
  setup() {
    vendingMachine.setLocation(getPathname());
  }

  template() {
    return `
      <main class="app-container">
        <header>
          <h1 class="title">🍿 자판기 🍿</h1>
        </header>
        <user-menu class="overlay"></user-menu>
        <nav-bar class="nav-bar"></nav-bar>
        <div class="page-container">
          <page-router>
            <item-management class="page" path="${PAGES.ITEM_MANAGEMENT.PATH}"></item-management>
            <change-charge class="page" path="${PAGES.CHANGE_CHARGE.PATH}"></change-charge>
            <item-purchase class="page" path="${PAGES.ITEM_PURCHASE.PATH}"></item-purchase>
            <login-page class="page" path="/login"></login-page>
            <signup-page class="page" path="/signup"></signup-page>
            <profile-page class="page" path="/profile"></profile-page>
            <not-found class="page" path="${PAGES.DEFAULT.PATH}"></not-found>
          </page-router>
        </div>
      </main>
      <snack-bar id="snackbar"></snack-bar>
    `;
  }

  setEvent() {
    window.addEventListener('popstate', (event) => {
      vendingMachine.setLocation(getPathname(event.path[0]));
    });
  }
}

customElements.define('app-wrapper', App);
