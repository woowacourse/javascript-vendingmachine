import { HASH } from './constant/hash';
import ItemManageTab from './view/ItemManageTab';
import CoinRechargeTab from './view/CoinRechargeTab';
import ItemManage from './vendingMachine/ItemManage';
import CoinRecharge from './vendingMachine/CoinRecharge';
import ItemPurchase from './vendingMachine/ItemPurchase';
import ItemPurchaseTab from './view/ItemPurchaseTab';
import LoginUserPage from './view/LoginUserPage';
import RegisterUserPage from './view/RegisterUserPage';
import RegisterUser from './vendingMachine/RegisterUser';

const initApp = function () {
  const itemManage = new ItemManage();
  const coinRecharge = new CoinRecharge();
  const itemPurchase = new ItemPurchase();

  const itemManageTab = new ItemManageTab(itemManage);
  const coinRechargeTab = new CoinRechargeTab(coinRecharge);
  const itemPurchaseTab = new ItemPurchaseTab(itemPurchase, itemManage, coinRecharge);

  const registerUser = new RegisterUser();

  const loginUserPage = new LoginUserPage();
  const registerUserPage = new RegisterUserPage(registerUser);

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
        itemPurchaseTab.renderInitialItemPurchaseTabState();
        break;
      case HASH.LOGIN_USER:
        loginUserPage.renderInitialLoginPageState();
        break;
      case HASH.REGISTER_USER:
        registerUserPage.renderInitialRegisterPageState();
        break;
      default:
        break;
    }
  };
};

const checkRoute = initApp();
export default checkRoute;
