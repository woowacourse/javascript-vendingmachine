import Controller from '../controller/controller';
import User from '../domain/User';
import VendingMachine from '../domain/VendingMachine';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import Navigation from './Navigation';
import Page from './Page';
import PurchaseProductTab from './PurchaseProductTab';
import Router from './Router';

// eslint-disable-next-line max-lines-per-function
export default function initView() {
  const vendingMachine = new VendingMachine();
  const user = new User();

  const manageProductPage = new Page(new Navigation(user), new ManageProductTab());
  const purchaseProductPage = new Page(new Navigation(user), new PurchaseProductTab());
  const addChangePage = new Page(new Navigation(user), new AddChangeTab());
  const router = new Router(user);
  const controller = new Controller(
    vendingMachine,
    addChangePage,
    manageProductPage,
    purchaseProductPage
  );
  router.addPrivateRenderList('#/charge', addChangePage);
  router.addRenderList('#/purchase', purchaseProductPage);
  router.addPrivateRenderList('#/manage', manageProductPage);
  router.bindEvents();
}
