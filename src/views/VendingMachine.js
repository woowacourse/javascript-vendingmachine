import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './components/NavBar';
import { globalStore } from '../domains/GlobalStore';

export default class VendingMachine extends Component {
  template() {
    const { isloggedin, username } = this.props;
    const login = JSON.parse(isloggedin);
    const location = window.location.pathname;

    let vendingMachinePage;
    switch (location) {
      case '/item-management':
        vendingMachinePage = '<item-management class="page"></item-management>';
        break;
      case '/change-charge':
        vendingMachinePage = '<change-charge class="page"></change-charge>';
        break;
      case '/':
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
      <item-purchase class="page" path="/"></item-purchase>
      `;
    }

    return `
      <div class="dropdown">
        <button class="user-button">${username[0]}</button>
        <div id="user-dropdown" class="dropdown-content">
          <a href="/user-edit" id="user-edit">회원정보 수정</a>
          <a href="/" id="logout">로그아웃</a>
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
      const to = '/user-login';
      const state = { to };

      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });

    this.addEvent('click', '#logout', () => {
      globalStore.logout();
    });

    this.addEvent('click', '#user-edit', (event) => {
      event.preventDefault();

      const to = event.target.getAttribute('href');
      const state = { to };

      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });
  }
}

customElements.define('vending-machine', VendingMachine);
