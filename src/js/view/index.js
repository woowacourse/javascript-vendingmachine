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

  const navBar = new Navigation();
  const manageProductPage = new Page(
    new Navigation(),
    new ManageProductTab(vendingMachine)
  );
  const purchaseProductPage = new Page(
    new Navigation(),
    new PurchaseProductTab(vendingMachine)
  );
  const addChangePage = new Page(new Navigation(), new AddChangeTab(vendingMachine));
  const router = new Router(user, navBar);
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
