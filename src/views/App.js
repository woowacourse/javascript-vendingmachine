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
import { browser } from '../domains/Browser';
import { getPathname } from '../utils/domUtils';
import { PAGES } from '../configs/constants';
import { auth } from '../domains/Auth';

export default class App extends Component {
  setup() {
    browser.setLocation(getPathname());
  }

  template() {
    const user = auth.useStore((state) => state.user);

    return `
      <main class="app-container">
        <header>
          <h1 class="title">🍿 자판기 🍿</h1>
        </header>
        <user-menu class="overlay"></user-menu>
        ${user ? '<nav-bar class="nav-bar"></nav-bar>' : ''}
        <div class="page-container">
          <page-router>
            <item-purchase
              class="page"
              path="${PAGES.ITEM_PURCHASE.PATH}"
              loginRequired="null"
            >
            </item-purchase>
            <item-management
              class="page"
              path="${PAGES.ITEM_MANAGEMENT.PATH}"
              loginRequired="true"
            >
            </item-management>
            <change-charge
              class="page"
              path="${PAGES.CHANGE_CHARGE.PATH}"
              loginRequired="true"
            >
            </change-charge>
            <login-page
              class="page"
              path="/login"
              loginRequired="false"
            >
            </login-page>
            <signup-page
              class="page"
              path="/signup"
              loginRequired="false"
            >
            </signup-page>
            <profile-page
              class="page"
              path="/profile"
              loginRequired="true"
            >
            </profile-page>
            <not-found
              class="page"
              path="${PAGES.DEFAULT.PATH}"
              loginRequired="null"
            >
            </not-found>
          </page-router>
        </div>
      </main>
      <snack-bar id="snackbar"></snack-bar>
    `;
  }

  setEvent() {
    window.addEventListener('popstate', (event) => {
      browser.setLocation(getPathname(event.path[0]));
    });
  }
}

customElements.define('app-wrapper', App);
