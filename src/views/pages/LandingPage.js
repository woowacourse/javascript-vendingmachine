import Component from '../../core/Component';
import '../components/UserMenu';
import '../components/NavBar';
import './ItemManagementPage';
import './ChangeChargePage';
import './ItemPurchasePage';
import { auth } from '../../domains/Auth';
import { PAGES } from '../../configs/constants';

class LandingPage extends Component {
  template() {
    const user = auth.useStore((state) => state.user);

    return `
      <header>
        <h1 class="title">🍿 자판기 🍿</h1>
      </header>
      <user-menu class="overlay"></user-menu>
      ${user ? '<nav-bar class="nav-bar"></nav-bar>' : ''}
      <div class="tab-container">
        <component-router>
          <item-purchase
            class="tab"
            path="${PAGES.ITEM_PURCHASE.PATH}"
            loginRequired="null"
          >
          </item-purchase>
          <item-management
            class="tab"
            path="${PAGES.ITEM_MANAGEMENT.PATH}"
            loginRequired="true"
          >
          </item-management>
          <change-charge
            class="tab"
            path="${PAGES.CHANGE_CHARGE.PATH}"
            loginRequired="true"
          >
          </change-charge>
          <not-found
            class="tab"
            path="${PAGES.DEFAULT.PATH}"
            loginRequired="null"
          >
          </not-found>
        </component-router>
      </div>
    `;
  }
}

customElements.define('landing-page', LandingPage);
