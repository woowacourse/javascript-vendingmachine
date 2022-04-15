import ManageItemController from './controllers/manageItemController';
import ChargeMoneyController from './controllers/chargeMoneyController';
import PurchaseItemController from './controllers/purchaseItemController';
import LogInController from './controllers/logInController';
import SignUpController from './controllers/signUpController';
import VendingMachine from './vendingMachine/vendingMachine';
import Router from './router/Router';
import { $ } from './utils/common';
import { SELECTOR } from './constants/constants';
import { initialTemplate } from './templates/initialTemplate';
import ChangeUserInfoController from './controllers/changeUserInfoController';

export default class AppManager {
  private vendingMachine: VendingMachine;
  private manageItemController: ManageItemController;
  private chargeMoneyController: ChargeMoneyController;
  private purchaseItemController: PurchaseItemController;
  private logInController: LogInController;
  private signUpController: SignUpController;
  private router: Router;
  private changeUserInfoController: ChangeUserInfoController;

  constructor() {
    this.initDom();

    this.vendingMachine = new VendingMachine();

    this.manageItemController = new ManageItemController(this.vendingMachine);
    this.chargeMoneyController = new ChargeMoneyController(this.vendingMachine);
    this.purchaseItemController = new PurchaseItemController(this.vendingMachine);
    this.logInController = new LogInController();
    this.signUpController = new SignUpController();
    this.changeUserInfoController = new ChangeUserInfoController();

    this.router = new Router(
      this.manageItemController,
      this.chargeMoneyController,
      this.purchaseItemController,
      this.logInController,
      this.signUpController,
      this.changeUserInfoController,
    );

    this.router.loadRoutePage();
  }

  private initDom() {
    $(SELECTOR.ID.APP).insertAdjacentHTML('beforeend', initialTemplate);
  }
}
