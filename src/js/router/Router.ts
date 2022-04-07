import { SELECTOR, URL_HASH } from '../constants/constants';
import { RouteChangeDetailType } from '../types';
import { $, onCustomEvent } from '../utils/common';
import MainView from '../views/mainView';
import ManageItemController from '../controllers/manageItemController';
import ChargeMoneyController from '../controllers/chargeMoneyController';
import PurchaseItemController from '../controllers/purchaseItemController';
import LogInController from '../controllers/logInController';
import SignUpController from '../controllers/signUpController';
import { headerButtonTemplate } from '../templates/initialTemplate';
import ChangeUserInfoController from '../controllers/changeUserInfoController';

export default class Router {
  mainView: MainView;
  manageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;
  logInController: LogInController;
  signUpController: SignUpController;
  $header: any;
  changeUserInfoController: any;

  constructor(
    manageItemController: ManageItemController,
    chargeMoneyController: ChargeMoneyController,
    purchaseItemController: PurchaseItemController,
    logInController: LogInController,
    signUpController: SignUpController,
    changeUserInfoController: ChangeUserInfoController,
  ) {
    this.mainView = new MainView();
    this.manageItemController = manageItemController;
    this.chargeMoneyController = chargeMoneyController;
    this.purchaseItemController = purchaseItemController;
    this.logInController = logInController;
    this.signUpController = signUpController;
    this.changeUserInfoController = changeUserInfoController;
    this.$header = $('.header');

    this.bindEvents();
    this.loadRoutePage();
  }

  bindEvents() {
    onCustomEvent('ROUTE_CHANGE', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.loadRoutePage.bind(this));
  }

  handleRouteChange(event: CustomEvent) {
    const { targetId }: RouteChangeDetailType = event.detail;

    if (targetId === SELECTOR.ID_STRING.ITEM_MANGE_TAB) {
      window.history.pushState(null, null, URL_HASH.MANAGE_ITEM);
    }
    if (targetId === SELECTOR.ID_STRING.MONEY_CHARGE_TAB) {
      window.history.pushState(null, null, URL_HASH.CHARGE_MONEY);
    }
    if (targetId === SELECTOR.ID_STRING.ITEM_PURCHASE_TAB) {
      window.history.pushState(null, null, URL_HASH.PURCHASE_ITEM);
    }
    if (targetId === 'login-button') {
      window.history.pushState(null, null, '#login');
    }
    if (targetId === 'go-to-signup') {
      window.history.pushState(null, null, '#signup');
    }
    if (targetId === 'login-form') {
      window.history.pushState(null, null, '#purchaseItem');
    }
    if (targetId === 'signup-form') {
      window.history.pushState(null, null, '#login');
    }
    if (targetId === 'change-form') {
      window.history.pushState(null, null, '#purchaseItem');
    }
    if (targetId === 'change-user-info') {
      window.history.pushState(null, null, '#changeUserInfo');
    }
    if (targetId === 'logout') {
      window.history.pushState(null, null, '#purchaseItem');
    }
    this.loadRoutePage();
  }

  loadRoutePage() {
    const { hash } = window.location;
    const isLogin = sessionStorage.getItem('isLogIn') === 'true' ? true : false;
    const user = JSON.parse(sessionStorage.getItem('user'));

    $('#header-button-container').replaceChildren();
    $('#header-button-container').insertAdjacentHTML('beforeend', headerButtonTemplate(isLogin));

    if (isLogin) {
      $('#user-name').textContent = user.name[0];
      $('.nav-container').classList.remove('display-none');
    } else {
      $('.nav-container').classList.add('display-none');
    }

    if (!hash) {
      this.$header.classList.add('display-none');
      this.logInController.loadPage(isLogin);
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.MANAGE_ITEM) {
      this.$header.classList.remove('display-none');
      this.manageItemController.loadPage(isLogin);
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.CHARGE_MONEY) {
      this.$header.classList.remove('display-none');
      this.chargeMoneyController.loadPage(isLogin);
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (hash === URL_HASH.PURCHASE_ITEM) {
      this.$header.classList.remove('display-none');
      this.purchaseItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
      return;
    }
    if (hash === URL_HASH.LOG_IN) {
      this.$header.classList.add('display-none');
      this.logInController.loadPage(isLogin);
      return;
    }
    if (hash === URL_HASH.SIGN_UP) {
      this.$header.classList.add('display-none');
      this.signUpController.loadPage(isLogin);
    }
    if (hash === URL_HASH.CHANGE_USER_INFO) {
      this.$header.classList.add('display-none');
      this.changeUserInfoController.loadPage(isLogin);
    }
  }
}
