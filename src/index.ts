import './styles';
import ProductPageView from './es/View/ProductPageView';
import HoldingAmountPageView from './es/View/HoldingAmountPageView';
import Router from './es/Router';

new Router({
  product: new ProductPageView(),
  holding_amount: new HoldingAmountPageView(),
});
