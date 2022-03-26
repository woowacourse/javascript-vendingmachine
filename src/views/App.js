import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './pages/NotFoundPage';

export default class App extends Component {
  template() {
    return `
      <main class="app-container">
        <header>
          <h1 class="title">🍿 자판기 🍿</h1>
        </header>
        <nav class="nav-bar">
          <a class="nav-button styled-button selected" href="#item-management">상품 관리</a>
          <a class="nav-button styled-button" href="#change-charge">잔돈 충전</a>
          <a class="nav-button styled-button" href="#item-purchase">상품 구매</a>
        </nav>
        <div class="page-container">
          <page-router>
            <item-management class="page" path="#item-management"></item-management>
            <change-charge class="page" path="#change-charge"></change-charge>
            <item-purchase class="page" path="#item-purchase"></item-purchase>
            <not-found class="page" path="*"></not-found>
          </page-router>
        </div>
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
