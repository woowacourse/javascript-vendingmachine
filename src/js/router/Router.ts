import { SELECTOR, URL_HASH } from '../constants/constants';
import { RouteChangeDetailType } from '../types';
import { $, onCustomEvent } from '../utils/common';
import HeaderView from '../views/headerView';
import ManageItemController from '../controllers/manageItemController';
import ChargeMoneyController from '../controllers/chargeMoneyController';
import PurchaseItemController from '../controllers/purchaseItemController';
import LogInController from '../controllers/logInController';
import SignUpController from '../controllers/signUpController';
import { headerButtonTemplate } from '../templates/initialTemplate';
import ChangeUserInfoController from '../controllers/changeUserInfoController';

export default class Router {
  headerView: HeaderView;
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
    this.headerView = new HeaderView();
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
    if (targetId === SELECTOR.ID_STRING.LOGIN_BUTTON) {
      window.history.pushState(null, null, SELECTOR.ID.LOGIN);
    }
    if (targetId === SELECTOR.ID_STRING.GO_TO_SIGNUP) {
      window.history.pushState(null, null, SELECTOR.ID.SIGNUP);
    }
    if (targetId === SELECTOR.ID_STRING.LOGIN_FORM) {
      window.history.pushState(null, null, SELECTOR.ID.PURCHASE_ITEM);
    }
    if (targetId === SELECTOR.ID_STRING.SIGNUP_FORM) {
      window.history.pushState(null, null, SELECTOR.ID.LOGIN);
    }
    if (targetId === SELECTOR.ID_STRING.CHANGE_FORM) {
      window.history.pushState(null, null, SELECTOR.ID.PURCHASE_ITEM);
    }
    if (targetId === SELECTOR.ID_STRING.CHANGE_USER_INFO) {
      window.history.pushState(null, null, SELECTOR.ID.CHANGE_USER_INFO);
    }
    if (targetId === SELECTOR.ID_STRING.LOGOUT) {
      window.history.pushState(null, null, SELECTOR.ID.PURCHASE_ITEM);
    }
    this.loadRoutePage();
  }

  loadRoutePage() {
    const { hash } = window.location;
    const isLogin = sessionStorage.getItem('isLogIn') === 'true' ? true : false;
    const user = JSON.parse(sessionStorage.getItem('user'));

    $(SELECTOR.ID.HEADER_BUTTON_CONTAINER).replaceChildren();
    $(SELECTOR.ID.HEADER_BUTTON_CONTAINER).insertAdjacentHTML(
      'beforeend',
      headerButtonTemplate(isLogin),
    );

    if (isLogin) {
      $(SELECTOR.ID.USER_NAME).textContent = user.name[0];
      $(SELECTOR.CLASS.NAV_CONTAINER).classList.remove('display-none');
    } else {
      $(SELECTOR.CLASS.NAV_CONTAINER).classList.add('display-none');
    }

    if (!hash) {
      this.$header.classList.add('display-none');
      this.logInController.loadPage(isLogin);
      this.headerView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.MANAGE_ITEM) {
      this.$header.classList.remove('display-none');
      this.manageItemController.loadPage(isLogin);
      this.headerView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.CHARGE_MONEY) {
      this.$header.classList.remove('display-none');
      this.chargeMoneyController.loadPage(isLogin);
      this.headerView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (hash === URL_HASH.PURCHASE_ITEM) {
      this.$header.classList.remove('display-none');
      this.purchaseItemController.loadPage();
      this.headerView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
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
