import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './components/NavBar';

export default class VendingMachine extends Component {
  template() {
    return `
      <a id="login-button" href="#user-login">로그인</a>
      <header>
        <h1 class="title">🍿 자판기 🍿</h1>
      </header>
      <nav-bar class="nav-bar"></nav-bar>
      <div class="page-container">
        <page-router>
          <item-management class="page" path="#item-management"></item-management>
          <change-charge class="page" path="#change-charge"></change-charge>
          <item-purchase class="page" path="#item-purchase"></item-purchase>
          <not-found class="page" path="*"></not-found>
        </page-router>
      </div>
    `;
  }
}

customElements.define('vending-machine', VendingMachine);
