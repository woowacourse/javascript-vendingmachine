import ManageItemController from './controllers/manageItemController';
import ChargeMoneyController from './controllers/chargeMoneyController';
import PurchaseItemController from './controllers/purchaseItemController';
import VendingMachine from './vendingMachine/vendingMachine';
import MainView from './views/MainView';
import { SELECTOR, URL_HASH } from './constants/constants';
import { RouteChangeDetailType } from './types/types';
import { onCustomEvent } from './utils/common';

export default class AppManager {
  private vendingMachine: VendingMachine;
  private mainView: MainView;
  private manageItemController: ManageItemController;
  private chargeMoneyController: ChargeMoneyController;
  private purchaseItemController: PurchaseItemController;

  constructor() {
    this.vendingMachine = new VendingMachine();
    this.mainView = new MainView();
    this.manageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('ROUTE_CHANGE', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.initRouter.bind(this));
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

    this.initRouter();
  }

  initRouter() {
    const { hash } = window.location;

    if (!hash) {
      this.manageItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.MANAGE_ITEM) {
      this.manageItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === URL_HASH.CHARGE_MONEY) {
      this.chargeMoneyController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (hash === URL_HASH.PURCHASE_ITEM) {
      this.purchaseItemController.loadPage();
      this.mainView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
    }
  }
}
