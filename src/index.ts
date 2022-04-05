import 'Styles';
import Router from 'Router';

new Router({
  product: () => import('Pages/ProductPage'),
  holdingAmount: () => import('Pages/HoldingAmountPage'),
  purchase: () => import('Pages/ProductPurchasePage'),
});
