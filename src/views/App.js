import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './pages/NotFoundPage';
import './components/NavBar';
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
        <nav-bar class="nav-bar"></nav-bar>
        <div class="page-container">
          <page-router>
            <item-management class="page" path="${PAGES.ITEM_MANAGEMENT.PATH}"></item-management>
            <change-charge class="page" path="${PAGES.CHANGE_CHARGE.PATH}"></change-charge>
            <item-purchase class="page" path="${PAGES.ITEM_PURCHASE.PATH}"></item-purchase>
            <not-found class="page" path="${PAGES.DEFAULT.PATH}"></not-found>
          </page-router>
        </div>
      </main>
    `;
  }

  setEvent() {
    window.addEventListener('popstate', (event) => {
      vendingMachine.setLocation(getPathname(event.path[0]));
    });
  }
}

customElements.define('app-wrapper', App);
