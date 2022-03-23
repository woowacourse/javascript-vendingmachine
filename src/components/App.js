import Component from '../core/Component';
import './pages/ItemManagementPage';
import './pages/ChangeCharge';
import './pages/PurchaseItem';
import './pages/NotFound';

export default class App extends Component {
  setup() {
    this.state = { tab: '/item-management' };
  }

  setEvent() {
    this.addEvent('click', '#nav-bar', ({ target }) => {
      this.setState({ tab: target.dataset.to });
    });
  }

  template() {
    const { tab } = this.state;

    return `
      <main>
        <header>
          <h1>🍿 자판기 🍿</h1>
        </header>
        <nav id="nav-bar">
          <button class="button-tab" data-to="/item-management">상품 관리</button>
          <button class="button-tab" data-to="/change-charge">잔돈 충전</button>
          <button class="button-tab" data-to="/purchase-item">상품 구매</button>
        </nav>
        ${(() => {
          switch (tab) {
            case '/item-management':
              return `<item-management></item-management>`;
            case '/change-charge':
              return `<change-charge></change-charge>`;
            case '/purchase-item':
              return `<purchase-item></purchase-item>`;
            default:
              return `<not-found></not-found>`;
          }
        })()}
      </main>
    `;
  }
}

customElements.define('app-wrapper', App);
