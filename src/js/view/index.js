import User from '../domain/User';
import VendingMachine from '../domain/VendingMachine';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import Navigation from './Navigation';
import Page from './Page';
import PurchaseProductTab from './PurchaseProductTab';
import Router from './Router';

export default function initView() {
  const vendingMachine = new VendingMachine();
  const user = new User();

  const navBar = new Navigation();
  const manageProductTab = new ManageProductTab(vendingMachine);
  const purchaseProductTab = new PurchaseProductTab(vendingMachine, navBar);
  const addChangeTab = new AddChangeTab(vendingMachine, navBar);
  const router = new Router(user, navBar);
  router.addPrivateRenderList('#/charge', new Page(new Navigation(), addChangeTab));
  router.addRenderList('#/purchase', new Page(new Navigation(), purchaseProductTab));
  router.addPrivateRenderList('#/manage', new Page(new Navigation(), manageProductTab));
  router.bindEvents();
}
