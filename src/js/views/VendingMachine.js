import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './components/NavBar';
import { globalStore } from '../domains/GlobalStore';
import { PAGE } from '../constant';

export default class VendingMachine extends Component {
  template() {
    const loginState = globalStore.useStore((state) => state.loginState);
    const login = loginState.isLoggedIn;
    const username = loginState.userData?.name;
    const location = window.location.pathname;

    let vendingMachinePage;
    switch (location) {
      case PAGE.ITEM_MANAGEMENT.PATH:
        vendingMachinePage = '<item-management class="page"></item-management>';
        break;
      case PAGE.CHANGE_CHARGE.PATH:
        vendingMachinePage = '<change-charge class="page"></change-charge>';
        break;
      case PAGE.ITEM_PURCHASE.PATH:
        vendingMachinePage = '<item-purchase class="page"></item-purchase>';
        break;
      default:
        vendingMachinePage =
          '<not-found path="*" class="app-container"></not-found>';
    }

    if (!login) {
      return `
      <a class="login-button">로그인</a>
      <header>
        <h1 class="title">🍿 자판기 🍿</h1>
      </header>
      <item-purchase class="page" path=${PAGE.ITEM_PURCHASE.PATH}></item-purchase>
      `;
    }

    return `
      <div class="dropdown">
        <button class="user-button">${username[0]}</button>
        <div id="user-dropdown" class="dropdown-content">
          <a id="user-edit">회원정보 수정</a>
          <a id="logout">로그아웃</a>
        </div>
      </div>
      <header>
        <h1 class="title">🍿 자판기 🍿</h1>
      </header>
      <nav-bar class="nav-bar" location=${location}></nav-bar>
      <div class="page-container">
        ${vendingMachinePage}
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.login-button', () => {
      const to = PAGE.LOGIN.PATH;
      const state = { to };

      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });

    this.addEvent('click', '#logout', () => {
      globalStore.logout();
    });

    this.addEvent('click', '#user-edit', (event) => {
      event.preventDefault();

      const to = PAGE.EDIT.PATH;
      const state = { to };

      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });
  }
}

customElements.define('vending-machine', VendingMachine);
