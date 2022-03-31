import './styles';
import ProductManagementPageView from './es/View/ProductManagementPageView';
import HoldingAmountManagementPageView from './es/View/HoldingAmountManagementPageView';
import Router from './es/Router';

new Router({
  product: new ProductManagementPageView(),
  holding_amount: new HoldingAmountManagementPageView(),
});
