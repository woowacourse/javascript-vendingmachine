import Component from '../core/Component';
import './Router.js';
import './pages/ItemManagementPage';
import './pages/ChangeChargePage';
import './pages/ItemPurchasePage';
import './components/NavBar';

export default class VendingMachine extends Component {
  template() {
    const { isloggedin, username } = this.props;
    const login = JSON.parse(isloggedin);

    if (!login) {
      return `
      <a href="#user-login" class="login-button">로그인</a>
      <header>
        <h1 class="title">🍿 자판기 🍿</h1>
      </header>
      <item-purchase class="page" path="#item-purchase"></item-purchase>
      `;
    }

    return `
      <div class="dropdown">
        <button class="user-button">${username[0]}</button>
        <div id="user-dropdown" class="dropdown-content">
          <a href="#user-edit" id="user-edit">회원정보 수정</a>
          <a href="/" id="logout">로그아웃</a>
        </div>
      </div>
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

  setEvent() {
    this.addEvent('click', '#logout', () => {
      localStorage.removeItem('user');
    });
  }
}

customElements.define('vending-machine', VendingMachine);
