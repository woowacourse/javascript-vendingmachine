import ProductManageManage from '../core/ProductManageManage';
import ChargeMoneyManage from '../core/ChargeMoneyManage';
import ProductBuyManage from '../core/ProductBuyManage';
import { Product, Coin } from '../declarations/resourceDeclaration';
import { $ } from '../utils/dom';
import { COINS } from '../constants/index';
import VerifyValueValidation from '../validations/verifyValueValidation';
import LoginManage from '../core/LoginManage';
import SignUpManage from '../core/SignUpManage';
import EditProfileManage from '../core/EditProfileManage';
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
    new ProductManageManage(this.products, this.verifyValue);
    new ChargeMoneyManage(this.coins, this.verifyValue);
    new ProductBuyManage(this.products, this.coins, this.verifyValue);
    new LoginManage(this.verifyValue);
    new SignUpManage(this.verifyValue);
    new EditProfileManage(this.verifyValue);
    $('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
    $('.login-button-container').addEventListener('click', this.handleLoginInfo.bind(this));
    $('#link').addEventListener('click', this.handleSignUp.bind(this));
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

  handleSignUp() {
    history.pushState({}, '', window.location.pathname + `#signup`);
    this.switchTab('signup');
  }

  handleLoginInfo(e) {
    if (e.target.classList.contains('login-button')) {
      history.pushState({}, '', window.location.pathname + `#login`);
      this.switchTab('login');
    }
  }

  handleEditProfile() {
    history.pushState({}, '', window.location.pathname + `#edit-profile`);
    this.switchTab('edit-profile');
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
    const accessToken = localStorage.getItem('accessToken');
    const hash = window.location.hash.slice(1);
    if (!accessToken) {
      if (hash !== 'buy' && hash !== 'login') {
        return;
      }
    }
    if (accessToken && hash === 'signup') {
      return;
    }
    this.switchTab(hash);
  }

  switchTab(tabName) {
    $('#app').className = 'app';
    $('#header').className = 'app__header';
    $('#app').classList.add(tabName);
    $('#header').classList.add(tabName);
  }
}

export default VendingMachine;
