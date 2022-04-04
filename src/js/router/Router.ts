import { SELECTOR, URL_HASH } from '../constants/constants';
import { RouteChangeDetailType } from '../types';
import { $, onCustomEvent } from '../utils/common';
import MainView from '../views/mainView';
import ManageItemController from '../controllers/manageItemController';
import ChargeMoneyController from '../controllers/chargeMoneyController';
import PurchaseItemController from '../controllers/purchaseItemController';
import LogInController from '../controllers/logInController';
import SignUpController from '../controllers/signUpController';

export default class Router {
  mainView: MainView;
  manageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;
  logInController: LogInController;
  signUpController: SignUpController;
  $header: any;

  constructor(
    manageItemController: ManageItemController,
    chargeMoneyController: ChargeMoneyController,
    purchaseItemController: PurchaseItemController,
    logInController: LogInController,
    signUpController: SignUpController,
  ) {
    this.mainView = new MainView();
    this.manageItemController = manageItemController;
    this.chargeMoneyController = chargeMoneyController;
    this.purchaseItemController = purchaseItemController;
    this.logInController = logInController;
    this.signUpController = signUpController;
    this.$header = $('.header');

    this.bindEvents();
    this.loadRoutePage();
  }

  bindEvents() {
    onCustomEvent('ROUTE_CHANGE', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.loadRoutePage.bind(this));
  }

  handleRouteChange(event: CustomEvent) {
    const { $button }: RouteChangeDetailType = event.detail;

    if ($button.id === SELECTOR.ID_STRING.ITEM_MANGE_TAB) {
      window.history.pushState(null, null, URL_HASH.MANAGE_ITEM);
    }
    if ($button.id === SELECTOR.ID_STRING.MONEY_CHARGE_TAB) {
      window.history.pushState(null, null, URL_HASH.CHARGE_MONEY);
    }
    if ($button.id === SELECTOR.ID_STRING.ITEM_PURCHASE_TAB) {
      window.history.pushState(null, null, URL_HASH.PURCHASE_ITEM);
    }
    if ($button.id === 'login-button') {
      window.history.pushState(null, null, '#login');
    }
    this.loadRoutePage();
  }

  loadRoutePage() {
    const { hash } = window.location;

    if (!hash) {
      this.$header.classList.remove('display-none');
      this.manageItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.MANAGE_ITEM) {
      this.$header.classList.remove('display-none');
      this.manageItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.CHARGE_MONEY) {
      this.$header.classList.remove('display-none');
      this.chargeMoneyController.loadPage();
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
      this.logInController.loadPage();
      return;
    }
    if (hash === URL_HASH.SIGN_UP) {
      this.$header.classList.add('display-none');
      this.signUpController.loadPage();
    }
  }
}
