import CoinRechargeTab from './view/CoinRechargeTab';
import ItemManageTab from './view/ItemManageTab';
import VendingMachine from './domain/VendingMachine';
import { VendingMachineInterface, VendingMachineTabInterface } from './types';
import { HASH } from './constant/hash';

const initApp = function () {
  const vendingMachine: VendingMachineInterface = new VendingMachine();
  const itemManageTab: VendingMachineTabInterface = new ItemManageTab(
    vendingMachine,
    HASH.ITEM_MANAGE
  );
  const coinRechargeTab: VendingMachineTabInterface = new CoinRechargeTab(
    vendingMachine,
    HASH.COIN_RECHARGE
  );

  const tabs: VendingMachineTabInterface[] = [itemManageTab, coinRechargeTab];

  return function () {
    const currentHash = window.location.hash;

    if (!currentHash) {
      itemManageTab.renderInitialTabState();
      return;
    }

    tabs.forEach((tab) => {
      if (currentHash === tab.tabHash) {
        tab.renderInitialTabState();
      }
    });
  };
};

export default initApp();
