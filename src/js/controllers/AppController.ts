import ManageItemController from './manageItemController';
import ChargeMoneyController from './chargeMoneyController';
import PurchaseItemController from './purchaseItemController';
import VendingMachine from '../vendingMachine/vendingMachine';
import AppView from '../views/AppView';
import { SELECTOR, URL, CUSTOM_EVENT } from '../constants/constant';

export default class AppController {
  vendingMachine: VendingMachine;
  manageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;
  appView: AppView;

  constructor() {
    this.vendingMachine = new VendingMachine();
    this.appView = new AppView();
    this.manageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);

    this.bindEvents();
  }

  bindEvents() {
    this.appView.bindPopStateEvent(this.route.bind(this));
    window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, this.handleRouteChange.bind(this));
  }

  handleRouteChange(event) {
    const { $navButton } = event.detail;

    if ($navButton.id === SELECTOR.ID_STRING.ITEM_MANGE_TAB) {
      window.history.pushState(null, null, URL.MANAGE_ITEM);
    }

    if ($navButton.id === SELECTOR.ID_STRING.MONEY_CHARGE_TAB) {
      window.history.pushState(null, null, URL.CHARGE_MONEY);
    }

    if ($navButton.id === SELECTOR.ID_STRING.ITEM_PURCHASE_TAB) {
      window.history.pushState(null, null, URL.PURCHASE_ITEM);
    }

    this.route();
  }

  route() {
    const { pathname } = window.location;

    if (pathname === '/') {
      this.manageItemController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (pathname === `/${URL.MANAGE_ITEM}`) {
      this.manageItemController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (pathname === `/${URL.CHARGE_MONEY}`) {
      this.chargeMoneyController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (pathname === `/${URL.PURCHASE_ITEM}`) {
      this.purchaseItemController.render();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
    }
  }
}
