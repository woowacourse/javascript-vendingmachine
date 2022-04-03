import './styles';
import ProductManagementPageView from './es/View/ProductManagementPageView';
import VendingMachineChargeManagementPageView from './es/View/VendingMachineChargeManagementPageView';
import Router from './es/Router';
import ProductPurchasePageView from './es/View/ProductPurchasePageView';
import LoginPageView from './es/View/LoginPageView';
import SignUpPageView from './es/View/SignUpPageView';
import { requestUserInfo } from './es/utils/auth';
import UpdateMyInfoPageView from './es/View/UpdateMyInfoPageView';

function initialize() {
  new Router({
    productManagement: new ProductManagementPageView(),
    vendingMachineChargeManagement: new VendingMachineChargeManagementPageView(),
    productPurchase: new ProductPurchasePageView(),
    login: new LoginPageView(),
    signUp: new SignUpPageView(),
    updateMyInfo: new UpdateMyInfoPageView(),
  });
}

function checkUser() {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));
  if (!userAuth) {
    initialize();
    return;
  }
  if (userAuth.expiration < Date.now()) {
    localStorage.removeItem('userAuth');
    initialize();
    return;
  }

  requestUserInfo(userAuth).then(() => initialize());
}

checkUser();
