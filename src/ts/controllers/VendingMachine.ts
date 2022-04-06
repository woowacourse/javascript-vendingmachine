import ProductManageImpl from '../core/ProductManageTab';
import ChargeMoneyImpl from '../core/ChargeMoneyTab';
import { Product, Coin } from '../declarations/resourceDeclaration';
import { $ } from '../utils/dom';
import { COINS } from '../constants/index';
import ProductBuyImpl from '../core/ProductBuyTab';
import VerifyValueValidation from '../validations/verifyValueValidation';
import LoginTab from '../core/LoginTab';
import SignUpTab from '../core/SignUpTab';
import EditProfileTab from '../core/EditProfileTab';
import { loginnedMode, logOutedMode } from '../utils/loginUtil';

class VendingMachine {
  private products: Array<Product> = [];
  private coins: Array<Coin> = [
    { amount: COINS.VAULE_10, count: 0 },
    { amount: COINS.VAULE_50, count: 0 },
    { amount: COINS.VAULE_100, count: 0 },
    { amount: COINS.VAULE_500, count: 0 },
  ];
  verifyValue: VerifyValueValidation;

  constructor() {
    this.verifyValue = new VerifyValueValidation(this.products, this.coins);
    new ProductManageImpl(this.products, this.verifyValue);
    new ChargeMoneyImpl(this.coins, this.verifyValue);
    new ProductBuyImpl(this.products, this.coins, this.verifyValue);
    new LoginTab(this.verifyValue);
    new SignUpTab(this.verifyValue);
    new EditProfileTab(this.verifyValue);
    $('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
    $('.login-button-container').addEventListener('click', this.handleLoginInfoManage.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
    this.initWebPage();
  }

  initWebPage() {
    if (localStorage.getItem('accessToken')) {
      loginnedMode();
    } else {
      logOutedMode();
    }
  }

  handleLoginInfoManage(e) {
    if (e.target.classList.contains('login-button')) {
      history.pushState({}, '', window.location.pathname + `#login`);
      this.switchTab('login');
    }
  }

  handleClickTabButtons(e) {
    if (e.target === e.currentTarget) {
      return;
    }
    const tabName = e.target.dataset.name;
    if (!localStorage.getItem('accessToken') && tabName !== 'buy') {
      return;
    }
    history.pushState({}, '', window.location.pathname + `#${tabName}`);
    this.switchTab(tabName);
  }

  handlePopstate() {
    if (!window.location.hash) {
      return;
    }

    const hash = window.location.hash.slice(1);
    if (!localStorage.getItem('accessToken')) {
      if (hash !== 'buy' && hash !== 'login') {
        return;
      }
    }
    if (localStorage.getItem('accessToken') && hash === 'signup') {
      return;
    }
    this.switchTab(hash);
  }

  switchTab(tabName) {
    $('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#app').classList.add(tabName);
    $('#header').classList.add(tabName);
  }
}

export default VendingMachine;
