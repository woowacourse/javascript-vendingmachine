import VendingMachineController from './controller/vendingMachineController';
import UserController from './controller/userController';
import User from './domain/User';
import VendingMachine from './domain/VendingMachine';
import Navigation from './view/Navigation';
import Page from './view/Page';
import AddChangeTab from './view/pages/addChangeTab';
import LoginTab from './view/pages/loginTab';
import ManageProductTab from './view/pages/manageProduct';
import MyProfile from './view/pages/myProfile';
import PurchaseProductTab from './view/pages/purchaseProduct';
import SignUpTab from './view/pages/signUp';
import Router from './view/Router';

const vendingMachine = new VendingMachine();
const user = new User();

const manageProductPage = new Page(new Navigation(user), new ManageProductTab());
const purchaseProductPage = new Page(new Navigation(user), new PurchaseProductTab());
const addChangePage = new Page(new Navigation(user), new AddChangeTab());
const loginTab = new LoginTab();
const signUpTab = new SignUpTab();
const myProfileTab = new MyProfile();
const router = new Router(user);
const vendingMachineController = new VendingMachineController(
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
