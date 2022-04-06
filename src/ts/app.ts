import HeaderView from './view/HeaderView';
import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemPurchaseTab from './view/ItemPurchaseTab';
import LoginView from './view/LoginView';
import RegisterView from './view/RegisterView';
import VendingMachine from './domain/VendingMachine';
import UserStore from './domain/UserStore';
import {
  VendingMachineInterface,
  Hash,
  VendingMachineTabInterface,
  HeaderInterface,
  ViewInterface,
  UserStoreInterface,
} from './types';
import HASH from './constant/hash';

class App {
  private vendingMachine: VendingMachineInterface = new VendingMachine();

  private userStore: UserStoreInterface = new UserStore();

  private header: HeaderInterface = new HeaderView(this.userStore);

  private itemManageTab: VendingMachineTabInterface = new ItemManageTab(
    this.vendingMachine,
    HASH.ITEM_MANAGE
  );

  private coinRechargeTab: VendingMachineTabInterface = new CoinRechargeTab(
    this.vendingMachine,
    HASH.COIN_RECHARGE
  );

  private itemPurchaseTab: VendingMachineTabInterface = new ItemPurchaseTab(
    this.vendingMachine,
    HASH.ITEM_PURCHASE
  );

  private loginView: ViewInterface = new LoginView(this.userStore, HASH.LOGIN);

  private registerView: ViewInterface = new RegisterView(this.userStore, HASH.REGISTER);

  private views: ViewInterface[] = [
    this.itemManageTab,
    this.coinRechargeTab,
    this.itemPurchaseTab,
    this.loginView,
    this.registerView,
  ];

  render() {
    const currentHash = window.location.hash as Hash;

    this.header.render(currentHash);

    if (!currentHash) {
      this.itemPurchaseTab.render();
      return;
    }

    this.views.forEach((view) => {
      if (currentHash === view.tabHash) {
        view.render();
      }
    });
  }
}

export default new App();
