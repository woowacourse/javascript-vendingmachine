import ItemManageController from './itemManageController';
import VendingMachine from '../vendingMachine/vendingMachine';
import navigation from '../views/navigation';

export default class AppController {
  vendingMachine: VendingMachine;
  itemManageController: ItemManageController;

  constructor() {
    this.vendingMachine = new VendingMachine();
    this.itemManageController = new ItemManageController(this.vendingMachine);
    // const moneyChargeController = new MoneyCharge(vendinMachine)
    // const itemPurchaseController = new ItemPurchaseController(vendinMachine)
  }

  bindEvents() {
    navigation.bindEvents(this.onClickNavButton.bind(this));
    navigation.bindPostStateEvent(this.route.bind(this));
  }

  onClickNavButton(event) {
    if (event.target.classList.contains('nav-button')) {
      if (event.target.id === 'item-manage-tab') {
        window.history.pushState(null, '상품 관리', 'itemMange');
      }
      if (event.target.id === 'money-charge-tab') {
        window.history.pushState(null, '잔돈 충전', 'moneyCharge');
      }
      if (event.target.id === 'item-purchase-tab') {
        window.history.pushState(null, '상품 구매', 'itemPurchase');
      }
    }
    this.route();
  }

  route() {
    const { pathname } = window.location;
    if (pathname === '/') {
      this.itemManageController.render();
    } else if (pathname === '/itemMange') {
      this.itemManageController.render();
    } else if (pathname === '/moneyCharge') {
      this.itemManageController.render();
    } else if (pathname === '/routemPurchase') {
      this.itemManageController.render();
    }
  }
}
