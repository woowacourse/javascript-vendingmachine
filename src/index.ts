import '@Styles';
import Router from '@Display/Router';
import ProductPage from '@Display/pages/ProductPage';
import HoldingAmountPage from '@Display/pages/HoldingAmountPage';

new Router({
  product: new ProductPage(),
  holding_amount: new HoldingAmountPage(),
});
