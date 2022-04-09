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
    const currentHash = location.hash;
    const pages = [
      { view: itemManageTab, hash: HASH.ITEM_MANAGE },
      { view: coinRechargeTab, hash: HASH.COIN_RECHARGE },
      { view: itemPurchaseTab, hash: HASH.ITEM_PURCHASE },
      { view: registerUserPage, hash: HASH.REGISTER_USER },
      { view: loginUserPage, hash: HASH.LOGIN_USER },
    ];

    if (currentHash === '') {
      itemPurchaseTab.renderInitialState(!!accessToken);
      return;
    }

    pages.some((page) => {
      if (page.hash === currentHash) {
        page.view.renderInitialState(!!accessToken);
        return true;
      }
      return false;
    });
  };
};

const checkRoute = initApp();
export default checkRoute;
