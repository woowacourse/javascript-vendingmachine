import Controller from '../controller/controller';
import UserController from '../controller/userController';
import User from '../domain/User';
import VendingMachine from '../domain/VendingMachine';
import AddChangeTab from './AddChangeTab';
import LoginTab from './LoginTab';
import ManageProductTab from './ManageProductTab';
import MyProfile from './MyProfieTab';
import Navigation from './Navigation';
import Page from './Page';
import PurchaseProductTab from './PurchaseProductTab';
import Router from './Router';
import SignUpTab from './SignUpTab';

// eslint-disable-next-line max-lines-per-function
export default function initView() {
  const vendingMachine = new VendingMachine();
  const user = new User();

  const manageProductPage = new Page(new Navigation(user), new ManageProductTab());
  const purchaseProductPage = new Page(new Navigation(user), new PurchaseProductTab());
  const addChangePage = new Page(new Navigation(user), new AddChangeTab());
  const loginTab = new LoginTab();
  const signUpTab = new SignUpTab();
  const myProfileTab = new MyProfile();
  const router = new Router(user);
  const controller = new Controller(
    vendingMachine,
    addChangePage,
    manageProductPage,
    purchaseProductPage
  );
  const userController = new UserController(user, loginTab, signUpTab, myProfileTab, [
    addChangePage,
    manageProductPage,
    purchaseProductPage,
  ]);
  router.addUserRenderList('#/login', loginTab);
  router.addUserRenderList('#/signup', signUpTab);
  router.addPrivateRenderList('#/charge', addChangePage);
  router.addRenderList('#/purchase', purchaseProductPage);
  router.addPrivateRenderList('#/manage', manageProductPage);
  router.addPrivateRenderList('#/myprofile', myProfileTab);

  router.bindEvents();
}
