import 'Styles';
import ProductPage from 'Pages/ProductPage';
import HoldingAmountPage from 'Pages/HoldingAmountPage';
import Router from 'Router';

new Router({
  product: new ProductPage(),
  holding_amount: new HoldingAmountPage(),
});
