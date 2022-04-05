import { HASH } from './constant/path';
import ItemManage from './vendingMachine/ItemManage';
import CoinRecharge from './vendingMachine/CoinRecharge';
import ItemPurchase from './vendingMachine/ItemPurchase';

import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemPurchaseTab from './view/ItemPurchaseTab';

import RegisterUser from './vendingMachine/RegisterUser';
import LoginUser from './vendingMachine/LoginUser';

import RegisterUserPage from './view/RegisterUserPage';
import LoginUserPage from './view/LoginUserPage';

const initApp = function () {
  const itemManage = new ItemManage();
  const coinRecharge = new CoinRecharge();
  const itemPurchase = new ItemPurchase();

  const itemManageTab = new ItemManageTab(itemManage);
  const coinRechargeTab = new CoinRechargeTab(coinRecharge);
  const itemPurchaseTab = new ItemPurchaseTab(itemPurchase, itemManage, coinRecharge);

  const registerUser = new RegisterUser();
  const loginUser = new LoginUser();

  const registerUserPage = new RegisterUserPage(registerUser);
  const loginUserPage = new LoginUserPage(loginUser);

  return function () {
    switch (location.hash) {
      case HASH.ITEM_MANAGE:
        itemManageTab.renderInitialItemManageTabState();
        break;
      case HASH.COIN_RECHARGE:
        coinRechargeTab.renderInitialCoinRechargeTabState();
        break;
      case '':
      case HASH.ITEM_PURCHASE:
        itemPurchaseTab.renderInitialItemPurchaseTabState();
        break;
      case HASH.REGISTER_USER:
        registerUserPage.renderInitialRegisterPageState();
        break;
      case HASH.LOGIN_USER:
        loginUserPage.renderInitialLoginPageState();
        break;
      default:
        break;
    }
  };
};

const checkRoute = initApp();
export default checkRoute;
