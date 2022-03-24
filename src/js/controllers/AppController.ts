import ManageItemController from './manageItemController';
import ChargeMoneyController from './chargeMoneyController';
import PurchaseItemController from './purchaseItemController';
import VendingMachine from '../vendingMachine/vendingMachine';
import AppView from '../views/AppView';
import { $ } from '../utils/common';

export default class AppController {
  vendingMachine: VendingMachine;
  ManageItemController: ManageItemController;
  chargeMoneyController: ChargeMoneyController;
  purchaseItemController: PurchaseItemController;
  appView: AppView;

  constructor() {
    this.vendingMachine = new VendingMachine();

    this.appView = new AppView();
    this.ManageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);

    this.bindEvents();
  }

  bindEvents() {
    this.appView.bindPostStateEvent(this.route.bind(this));
    window.addEventListener('ROUTE_CHANGE', this.onClickNavButton.bind(this));
  }

  onClickNavButton(event) {
    const target = event.detail;
    if (target.classList.contains('nav-button')) {
      if (target.id === 'item-manage-tab') {
        window.history.pushState(null, '상품 관리', 'mangeItem');
      }
      if (target.id === 'money-charge-tab') {
        window.history.pushState(null, '잔돈 충전', 'chargeMoney');
      }
      if (target.id === 'item-purchase-tab') {
        window.history.pushState(null, '상품 구매', 'purchaseItem');
      }
    }
    this.route();
  }

  route() {
    const { pathname } = window.location;
    if (pathname === '/') {
      this.ManageItemController.render();
    } else if (pathname === '/mangeItem') {
      this.ManageItemController.render();
    } else if (pathname === '/chargeMoney') {
      this.chargeMoneyController.render();
    } else if (pathname === '/purchaseItem') {
      this.purchaseItemController.render();
    }
  }
}
