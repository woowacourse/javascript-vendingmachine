import ManageItemController from './manageItemController';
import ChargeMoneyController from './chargeMoneyController';
import PurchaseItemController from './purchaseItemController';
import VendingMachine from '../vendingMachine/vendingMachine';
import AppView from '../views/AppView';
import { SELECTOR, CUSTOM_EVENT } from '../constants/constants';
import { RouteChangeDetailType } from '../types/types';

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
    window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.route.bind(this));
  }

  handleRouteChange(event: CustomEvent) {
    const { $navButton }: RouteChangeDetailType = event.detail;

    if ($navButton.id === SELECTOR.ID_STRING.ITEM_MANGE_TAB) {
      window.history.pushState(null, null, '#mangeItem');
    }

    if ($navButton.id === SELECTOR.ID_STRING.MONEY_CHARGE_TAB) {
      window.history.pushState(null, null, '#chargeMoney');
    }

    if ($navButton.id === SELECTOR.ID_STRING.ITEM_PURCHASE_TAB) {
      window.history.pushState(null, null, '#purchaseItem');
    }

    this.route();
  }

  route() {
    const { hash } = window.location;

    if (hash === '') {
      this.manageItemController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === '#mangeItem') {
      this.manageItemController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
      return;
    }
    if (hash === '#chargeMoney') {
      this.chargeMoneyController.loadPage();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
      return;
    }
    if (hash === '#purchaseItem') {
      this.purchaseItemController.render();
      this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
    }
  }
}
