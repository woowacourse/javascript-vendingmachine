import './styles';
import ProductManagementPageView from './es/View/ProductManagementPageView';
import HoldingAmountManagementPageView from './es/View/HoldingAmountManagementPageView';
import Router from './es/Router';
import ProductPurchasePageView from './es/View/ProductPurchasePageView';
import LoginPageView from './es/View/LoginPageView';
import SignUpPageView from './es/View/SignUpPageView';

new Router({
  productManagement: new ProductManagementPageView(),
  holdingAmountManagement: new HoldingAmountManagementPageView(),
  productPurchase: new ProductPurchasePageView(),
  login: new LoginPageView(),
  signUp: new SignUpPageView(),
});
