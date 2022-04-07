import Component from '../core/Component';
import './Router.js';
import './pages/LandingPage';
import './pages/LoginPage';
import './pages/SignupPage';
import './pages/ProfilePage';
import './pages/NotFoundPage';
import './components/Snackbar';
import { browser } from '../domains/Browser';
import { getPathname } from '../utils/domUtils';
import { PAGES } from '../configs/constants';

export default class App extends Component {
  setup() {
    browser.setLocation(getPathname());
  }

  template() {
    return `
      <main class="app-container">
        <component-router>
          <landing-page
            class="page"
            path="${PAGES.ITEM_MANAGEMENT.PATH}|${PAGES.CHANGE_CHARGE.PATH}|${PAGES.ITEM_PURCHASE.PATH}"
            loginRequired="null"
          >
          </landing-page>
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
        </component-router>
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
