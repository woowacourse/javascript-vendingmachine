import '@Styles';
import Router from '@Display/Router';
import ProductPage from '@Display/pages/ProductPage';
import HoldingAmountPage from '@Display/pages/HoldingAmountPage';

new Router({
  product: new ProductPage().loadPage,
  holding_amount: new HoldingAmountPage().loadPage,
});
// history.pushState({page:1}, 'test', '/?page=feat');
