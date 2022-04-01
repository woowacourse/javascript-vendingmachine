import './styles';
import ProductManagementPageView from './es/View/ProductManagementPageView';
import HoldingAmountManagementPageView from './es/View/HoldingAmountManagementPageView';
import Router from './es/Router';
import PurchaseProductPageView from './es/View/PurchaseProductPageView';

new Router({
  productManagement: new ProductManagementPageView(),
  holdingAmountManagement: new HoldingAmountManagementPageView(),
  purchaseProduct: new PurchaseProductPageView(),
});
