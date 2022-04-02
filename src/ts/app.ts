import CoinRechargeTab from './view/CoinRechargeTab';
import ItemManageTab from './view/ItemManageTab';
import VendingMachine from './domain/VendingMachine';
import { VendingMachineInterface, Hash, VendingMachineTabInterface } from './types';
import { HASH } from './constant/hash';

class App {
  private vendingMachine: VendingMachineInterface = new VendingMachine();

  private itemManageTab: VendingMachineTabInterface = new ItemManageTab(
    this.vendingMachine,
    HASH.ITEM_MANAGE as Hash
  );

  private coinRechargeTab: VendingMachineTabInterface = new CoinRechargeTab(
    this.vendingMachine,
    HASH.COIN_RECHARGE
  );

  private tabs: VendingMachineTabInterface[] = [this.itemManageTab, this.coinRechargeTab];

  checkRoute() {
    const currentHash = window.location.hash;

    if (!currentHash) {
      this.itemManageTab.renderInitialTabState();
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
