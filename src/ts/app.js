import { HASH } from './constant/path';
import { getCookie } from './utils/cookie';

import ItemManage from './vendingMachine/ItemManage';
import CoinRecharge from './vendingMachine/CoinRecharge';
import ItemPurchase from './vendingMachine/ItemPurchase';

import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemPurchaseTab from './view/ItemPurchaseTab';

import RegisterUserPage from './view/RegisterUserPage';
import LoginUserPage from './view/LoginUserPage';

const initApp = function () {
  const itemManage = new ItemManage();
  const coinRecharge = new CoinRecharge();
  const itemPurchase = new ItemPurchase();

  const itemManageTab = new ItemManageTab(itemManage);
  const coinRechargeTab = new CoinRechargeTab(coinRecharge);
  const itemPurchaseTab = new ItemPurchaseTab(itemPurchase, itemManage, coinRecharge);

  const registerUserPage = new RegisterUserPage();
  const loginUserPage = new LoginUserPage();

  return function () {
    const accessToken = getCookie('accessToken');
    switch (location.hash) {
      case HASH.ITEM_MANAGE:
        accessToken
          ? itemManageTab.renderInitialItemManageTabState()
          : (location.hash = HASH.LOGIN_USER);
        break;
      case HASH.COIN_RECHARGE:
        accessToken
          ? coinRechargeTab.renderInitialCoinRechargeTabState()
          : (location.href = HASH.LOGIN_USER);
        break;
      case '':
      case HASH.ITEM_PURCHASE:
        itemPurchaseTab.renderInitialItemPurchaseTabState(!!accessToken);
        break;
      case HASH.REGISTER_USER:
        !accessToken ? registerUserPage.renderInitialRegisterPageState() : (location.hash = '');
        break;
      case HASH.LOGIN_USER:
        !accessToken ? loginUserPage.renderInitialLoginPageState() : (location.hash = '');
        break;
      default:
        break;
    }
  };
};

const checkRoute = initApp();
export default checkRoute;
