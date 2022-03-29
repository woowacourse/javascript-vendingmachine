import { SELECTOR, URL_HASH } from '../constants/constants';
import { RouteChangeDetailType } from '../types/types';
import { onCustomEvent } from '../utils/common';
import NavigationView from '../views/navigationView';
import ManageItemController from '../controllers/manageItemController';
import ChargeMoneyController from '../controllers/chargeMoneyController';
import PurchaseItemController from '../controllers/purchaseItemController';

export default class Router {
  navigationView: NavigationView;
  manageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;

  constructor(
    manageItemController: ManageItemController,
    chargeMoneyController: ChargeMoneyController,
    purchaseItemController: PurchaseItemController,
  ) {
    this.navigationView = new NavigationView();
    this.manageItemController = manageItemController;
    this.chargeMoneyController = chargeMoneyController;
    this.purchaseItemController = purchaseItemController;

    this.bindEvents();
    this.loadRoutePage();
  }

  bindEvents() {
    onCustomEvent('ROUTE_CHANGE', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.loadRoutePage.bind(this));
  }

  handleRouteChange(event: CustomEvent) {
    const { $navButton }: RouteChangeDetailType = event.detail;

    if ($navButton.id === SELECTOR.ID_STRING.ITEM_MANGE_TAB) {
      window.history.pushState(null, null, URL_HASH.MANAGE_ITEM);
    }
    if ($navButton.id === SELECTOR.ID_STRING.MONEY_CHARGE_TAB) {
      window.history.pushState(null, null, URL_HASH.CHARGE_MONEY);
    }
    if ($navButton.id === SELECTOR.ID_STRING.ITEM_PURCHASE_TAB) {
      window.history.pushState(null, null, URL_HASH.PURCHASE_ITEM);
    }

    this.loadRoutePage();
  }

  loadRoutePage() {
    const { hash } = window.location;

    if (!hash) {
      this.manageItemController.loadPage();
      this.navigationView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.MANAGE_ITEM) {
      this.manageItemController.loadPage();
      this.navigationView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.CHARGE_MONEY) {
      this.chargeMoneyController.loadPage();
      this.navigationView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (hash === URL_HASH.PURCHASE_ITEM) {
      this.purchaseItemController.loadPage();
      this.navigationView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
    }
  }
}
