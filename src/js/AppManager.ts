import ManageItemController from './controllers/manageItemController';
import ChargeMoneyController from './controllers/chargeMoneyController';
import PurchaseItemController from './controllers/purchaseItemController';
import VendingMachine from './vendingMachine/vendingMachine';
import Router from './router/Router';
import { $ } from './utils/common';
import { SELECTOR } from './constants/constants';
import { initialTemplate } from './templates/initialTemplate';

export default class AppManager {
  private vendingMachine: VendingMachine;
  private manageItemController: ManageItemController;
  private chargeMoneyController: ChargeMoneyController;
  private purchaseItemController: PurchaseItemController;
  private router: Router;

  constructor() {
    this.initDom();

    this.vendingMachine = new VendingMachine();
    this.manageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);
    this.router = new Router(
      this.manageItemController,
      this.chargeMoneyController,
      this.purchaseItemController,
    );

    this.router.loadRoutePage();
  }

  initDom() {
    $(SELECTOR.ID.APP).insertAdjacentHTML('beforeend', initialTemplate);
  }
}
