import './styles';
import ProductPage from './es/display/pages/ProductPage';
import HoldingAmountPage from './es/display/pages/HoldingAmountPage';
import Router from './es/display/Router';

new Router({
  product: new ProductPage(),
  holding_amount: new HoldingAmountPage(),
});
