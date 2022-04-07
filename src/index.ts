import 'Styles';
import Router from 'Router';

new Router({
  product: () => import('Pages/ProductPage'),
  holdingAmount: () => import('Pages/HoldingAmountPage'),
  purchase: () => import('Pages/ProductPurchasePage'),
  login: () => import('Pages/LoginPage'),
  register: () => import('Pages/RegisterPage'),
  profile: () => import('Pages/UserProfileEditPage'),
});
