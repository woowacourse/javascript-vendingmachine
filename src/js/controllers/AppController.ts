import ManageItemController from './manageItemController';
import ChargeMoneyController from './chargeMoneyController';
import PurchaseItemController from './purchaseItemController';
import VendingMachine from '../vendingMachine/vendingMachine';
import AppView from '../views/AppView';
import { URL, CUSTOM_EVENT } from '../constants/appContants';
import { SELECTOR } from '../constants/viewConstants';
import { RouteChangeDetailType } from '../types/types';

export default class AppController {
  appView: AppView;
  vendingMachine: VendingMachine;
  manageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;

  constructor() {
    this.appView = new AppView();
    this.vendingMachine = new VendingMachine();
    this.manageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);

    window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.route.bind(this));
  }

  handleRouteChange(event: CustomEvent) {
    const { $navButton }: RouteChangeDetailType = event.detail;

    switch ($navButton.id) {
      case SELECTOR.ID_STRING.ITEM_MANGE_TAB:
        window.history.pushState(null, null, URL.MANAGE_ITEM);
        break;
      case SELECTOR.ID_STRING.MONEY_CHARGE_TAB:
        window.history.pushState(null, null, URL.CHARGE_MONEY);
        break;
      case SELECTOR.ID_STRING.ITEM_PURCHASE_TAB:
        window.history.pushState(null, null, URL.PURCHASE_ITEM);
    }

    this.route();
  }

  route() {
    const { pathname } = window.location;

    switch (pathname) {
      case `${URL.BASE_URL}/${URL.MANAGE_ITEM}`:
        this.manageItemController.loadPage();
        this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
        break;
      case `${URL.BASE_URL}/${URL.CHARGE_MONEY}`:
        this.chargeMoneyController.loadPage();
        this.appView.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
        break;
      case `${URL.BASE_URL}/${URL.PURCHASE_ITEM}`:
        this.purchaseItemController.render();
        this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
        break;
      default:
        this.manageItemController.loadPage();
        this.appView.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
    }
  }
}
