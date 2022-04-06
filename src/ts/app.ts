import HeaderView from './view/HeaderView';
import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemPurchaseTab from './view/ItemPurchaseTab';
import LoginView from './view/LoginView';
import RegisterView from './view/RegisterView';
import UserInfoEditView from './view/UserInfoEditView';
import VendingMachine from './domain/VendingMachine';
import UserStore from './domain/UserStore';
import {
  VendingMachineInterface,
  Hash,
  VendingMachineTabInterface,
  HeaderInterface,
  ViewInterface,
  UserInfo,
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

  private userInfoEditView: ViewInterface = new UserInfoEditView(
    this.userStore,
    HASH.USER_INFO_EDIT
  );

  private views: ViewInterface[] = [
    this.itemManageTab,
    this.coinRechargeTab,
    this.itemPurchaseTab,
    this.loginView,
    this.registerView,
    this.userInfoEditView,
  ];

  render() {
    const currentHash = window.location.hash as Hash;

    if (this.hasNotAuthority(currentHash)) {
      window.location.href = '/';
      return;
    }

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

  private hasNotAuthority(currentHash: Hash): boolean {
    const requiredAuthorityHashList: Hash[] = [
      HASH.ITEM_MANAGE,
      HASH.COIN_RECHARGE,
      HASH.USER_INFO_EDIT,
    ];
    const userInfo: UserInfo = this.userStore.getUserInfo();

    return !userInfo && requiredAuthorityHashList.includes(currentHash);
  }
}

export default new App();
