import CoinRechargeTab from './view/CoinRechargeTab';
import { HASH } from './constant/hash';
import ItemManageTab from './view/ItemManageTab';
import VendingMachine from './VendingMachine';

const initApp = function () {
  const vendingMachine = new VendingMachine();
  const itemManageTab = new ItemManageTab(vendingMachine);
  const coinRechargeTab = new CoinRechargeTab(vendingMachine);

  return function () {
    switch (location.hash) {
      case '':
      case HASH.ITEM_MANAGE:
        itemManageTab.renderInitialItemManageTabState();
        break;
      case HASH.COIN_RECHARGE:
        coinRechargeTab.renderInitialCoinRechargeTabState();
        break;
      case HASH.ITEM_PURCHASE:
        break;
      default:
        break;
    }
  };
};

const checkRoute = initApp();
export default checkRoute;
