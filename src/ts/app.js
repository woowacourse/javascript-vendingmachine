import { HASH } from './constant/path';
import { getCookie } from './utils/cookie';

import ItemManage from './vendingMachine/ItemManage';
import CoinRecharge from './vendingMachine/CoinRecharge';
import ItemPurchase from './vendingMachine/ItemPurchase';

import {
  ItemManageTab,
  CoinRechargeTab,
  ItemPurchaseTab,
  RegisterUserPage,
  LoginUserPage,
} from './view';

import { KEY } from './constant/storageKey';

const initApp = () => {
  const itemManage = new ItemManage();
  const coinRecharge = new CoinRecharge();
  const itemPurchase = new ItemPurchase();

  const itemManageTab = new ItemManageTab(itemManage);
  const coinRechargeTab = new CoinRechargeTab(coinRecharge);
  const itemPurchaseTab = new ItemPurchaseTab(itemPurchase, itemManage, coinRecharge);

  const registerUserPage = new RegisterUserPage();
  const loginUserPage = new LoginUserPage();

  return () => {
    const accessToken = getCookie(KEY.ACCESS_TOKEN);

    switch (location.hash) {
      case HASH.ITEM_MANAGE:
        accessToken
          ? itemManageTab.renderInitialItemManageTabState()
          : (location.hash = HASH.LOGIN_USER);
        break;
      case HASH.COIN_RECHARGE:
        accessToken
          ? coinRechargeTab.renderInitialCoinRechargeTabState()
          : (location.hash = HASH.LOGIN_USER);
        break;
      case '':
      case HASH.ITEM_PURCHASE:
        itemPurchaseTab.renderInitialItemPurchaseTabState(!!accessToken);
        break;
      case HASH.REGISTER_USER:
        accessToken ? (location.hash = '') : registerUserPage.renderInitialRegisterPageState();
        break;
      case HASH.LOGIN_USER:
        accessToken ? (location.hash = '') : loginUserPage.renderInitialLoginPageState();
        break;
      default:
        break;
    }
  };
};

const checkRoute = initApp();
export default checkRoute;
