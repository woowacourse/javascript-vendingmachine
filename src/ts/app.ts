import Header from './view/Header';
import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemPurchaseTab from './view/ItemPurchaseTab';
import VendingMachine from './domain/VendingMachine';
import {
  VendingMachineInterface,
  Hash,
  VendingMachineTabInterface,
  HeaderInterface,
} from './types';
import HASH from './constant/hash';

class App {
  private vendingMachine: VendingMachineInterface = new VendingMachine();

  private header: HeaderInterface = new Header();

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

  private tabs: VendingMachineTabInterface[] = [
    this.itemManageTab,
    this.coinRechargeTab,
    this.itemPurchaseTab,
  ];

  render() {
    const currentHash = window.location.hash as Hash;

    this.header.render(currentHash);

    if (!currentHash) {
      this.itemPurchaseTab.renderInitialTabState();
      return;
    }

    this.tabs.forEach((tab) => {
      if (currentHash === tab.tabHash) {
        tab.renderInitialTabState();
      }
    });
  }
}

export default new App();
