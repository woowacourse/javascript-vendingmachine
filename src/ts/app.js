import CoinRechargeTab from './CoinRechargeTab';
import { HASH } from './constant/hash';
import ItemManageTab from './ItemManageTab';
import VendingMachine from './VendingMachine';

const initApp = function () {
  const vendingMachine = new VendingMachine();
  const itemManageTab = new ItemManageTab(vendingMachine);
  const coinRechargeTab = new CoinRechargeTab(vendingMachine);

  return function () {
    if (!location.hash || location.hash === HASH.ITEM_MANAGE) {
      itemManageTab.render();
      return;
    }
    if (location.hash === HASH.COIN_RECHARGE) {
      coinRechargeTab.render();
      return;
    }
    if (location.hash === HASH.ITEM_PURCHASE) {
      return;
    }
  };
};

export default initApp();
