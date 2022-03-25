import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './pages/NotFoundPage';

export default class App extends Component {
  template() {
    return `
      <main>
        <header>
          <h1>🍿 자판기 🍿</h1>
        </header>
        <nav id="nav-bar">
          <a class="button-tab" href="#item-management">상품 관리</a>
          <a class="button-tab" href="#change-charge">잔돈 충전</a>
          <a class="button-tab" href="#item-purchase">상품 구매</a>
          <a class="button-tab" href="#nowhere">/</a>
        </nav>
        <page-router>
          <item-management path="#item-management"></item-management>
          <change-charge path="#change-charge"></change-charge>
          <item-purchase path="#item-purchase"></item-purchase>
          <not-found path="*"></not-found>
        </page-router>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
