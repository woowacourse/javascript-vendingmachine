import 'Styles';
import ProductPurchasePage from 'Pages/ProductPurchasePage';
import Router from 'Router';

new Router({
  purchase: ProductPurchasePage,
  product: () => import('Pages/ProductPage'),
  holdingAmount: () => import('Pages/HoldingAmountPage'),
  login: () => import('Pages/LoginPage'),
  register: () => import('Pages/RegisterPage'),
  profile: () => import('Pages/UserProfileEditPage'),
});
