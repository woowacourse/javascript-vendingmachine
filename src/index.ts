import './styles';
import ProductManagementPageView from './es/View/ProductManagementPageView';
import VendingMachineChargeManagementPageView from './es/View/VendingMachineChargeManagementPageView';
import Router from './es/Router';
import ProductPurchasePageView from './es/View/ProductPurchasePageView';
import LoginPageView from './es/View/LoginPageView';
import SignUpPageView from './es/View/SignUpPageView';
import { requestUserInfo } from './es/utils/auth';

function checkUser() {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));
  if (!userAuth) return;
  if (userAuth.expiration < Date.now()) {
    localStorage.removeItem('userAuth');
    return;
  }

  requestUserInfo(userAuth);
}

checkUser();

new Router({
  productManagement: new ProductManagementPageView(),
  vendingMachineChargeManagement: new VendingMachineChargeManagementPageView(),
  productPurchase: new ProductPurchasePageView(),
  login: new LoginPageView(),
  signUp: new SignUpPageView(),
});
