import { HASH } from './constant/hash';
import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemManage from './vendingMachine/ItemManage';
import CoinRecharge from './vendingMachine/CoinRecharge';

const initApp = function () {
  const itemManage = new ItemManage();
  const coinRecharge = new CoinRecharge();
  const itemManageTab = new ItemManageTab(itemManage);
  const coinRechargeTab = new CoinRechargeTab(coinRecharge);

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
