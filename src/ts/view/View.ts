import { $, $$ } from '../utils';
import { TAB_ID, PAGE_ID, STORAGE_ID, FLAG } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';
import RechargeView, { RechargeViewInterface } from './RechargeView';
import PurchaseProductView, { PurchaseProductViewInterface } from './PurchaseProductView';
import RegisterView, { RegisterViewInterface } from './RegisterView';
import { UserManagerInterface } from '../domain/UserManager';
import LoginView, { LoginViewInterface } from './LoginView';
import { isLogedIn } from '../utils';

export default class View {
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $$pageContainers: NodeListOf<HTMLDivElement>;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  $loginButton: HTMLButtonElement;
  $profile: HTMLDivElement;
  $app: HTMLDivElement;
  $loginRegister: HTMLSpanElement;
  $profileMenu: HTMLUListElement;
  $logout: HTMLLIElement;

  vendingMachine: VendingMachineInterface;
  userManager: UserManagerInterface;
  productManageView: ProductManageViewInterface;
  rechargeView: RechargeViewInterface;
  purchaseProductView: PurchaseProductViewInterface;
  registerView: RegisterViewInterface;
  loginView: LoginViewInterface;

  currentView: string;

  constructor(vendingMachine: VendingMachineInterface, userManager: UserManagerInterface) {
    this.$$tabResultContainers = $$('.tab-result-container');
    this.$$pageContainers = $$('.page-container');
    this.$tabProductManageButton = $('#tab-product-manage');
    this.$tabRechargeButton = $('#tab-recharge');
    this.$tabPurchaseProductButton = $('#tab-purchase-product');
    this.$$tabButtons = $$('.tab-button');
    this.$loginButton = $('.login-button');
    this.$profile = $('.profile');
    this.$app = $('#app');
    this.$loginRegister = $('.login-register');
    this.$profileMenu = $('.profile-menu');
    this.$logout = $('.logout');

    this.vendingMachine = vendingMachine;
    this.userManager = userManager;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);
    this.purchaseProductView = new PurchaseProductView(this.vendingMachine);
    this.registerView = new RegisterView(this.userManager);
    this.loginView = new LoginView(this.userManager);

    this.currentView = localStorage.getItem(STORAGE_ID.CURRENT_VIEW) || TAB_ID.PURCHASE_PRODUCT;
    this.renderCurrentView();

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.router(
        event.state ? event.state.url : location.pathname + location.hash,
        FLAG.POP_STATE,
      );
    });
    this.$tabProductManageButton.addEventListener('click', () =>
      this.router(TAB_ID.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () => this.router(TAB_ID.RECHARGE));
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.router(TAB_ID.PURCHASE_PRODUCT),
    );
    this.$loginButton.addEventListener('click', () => this.router(PAGE_ID.LOGIN));
    this.$loginRegister.addEventListener('click', () => this.router(PAGE_ID.REGISTER));
    this.$profile.addEventListener('click', this.renderProfileMenu);
    this.$logout.addEventListener('click', this.userManager.logout);
  }

  renderCurrentView = () => {
    history.replaceState({ url: this.currentView }, null, this.currentView);

    if (Object.values(TAB_ID).find((id) => id === this.currentView)) {
      this.renderTabs(this.currentView);
    }
    if (Object.values(PAGE_ID).find((id) => id === this.currentView)) {
      this.renderPages(this.currentView);
    }
  };

  renderTabs = (id: string) => {
    this.renderLogedInView();
    this.$app.classList.remove('hide');
    this.$$pageContainers.forEach((container) => container.classList.add('hide'));
    this.$$tabResultContainers.forEach((container: HTMLTableSectionElement, index: number) => {
      if (container.dataset.id === id) {
        container.classList.remove('hide');
        this.$$tabButtons[index].checked = true;
        this.renderUpdatedView(id);
        return;
      }
      container.classList.add('hide');
    });

    localStorage.setItem(STORAGE_ID.CURRENT_VIEW, id);
  };

  renderLogedInView = () => {
    if (isLogedIn()) {
      this.$profile.classList.remove('hide');
      this.$loginButton.classList.add('hide');
      $('.nav-tab').classList.remove('hide');
      return;
    }
    this.$profile.classList.add('hide');
    this.$loginButton.classList.remove('hide');
    $('.nav-tab').classList.add('hide');
  };

  renderUpdatedView = (id: string) => {
    const containerBranch = {
      [TAB_ID.PRODUCT_MANAGE]: () => this.productManageView.renderProductManage(),
      [TAB_ID.RECHARGE]: () => this.rechargeView.renderRecharge(),
      [TAB_ID.PURCHASE_PRODUCT]: () => this.purchaseProductView.renderPurchaseProduct(),
    };

    if (containerBranch[id]) {
      containerBranch[id]();
    }
  };

  router = (tabKey: string, isPopState = false) => {
    if (!isPopState && this.isSamePage(tabKey)) return;
    if (!isPopState) history.pushState({ url: tabKey }, null, tabKey);

    const routes = {
      [TAB_ID.PRODUCT_MANAGE]: () => this.renderTabs(TAB_ID.PRODUCT_MANAGE),
      [TAB_ID.RECHARGE]: () => this.renderTabs(TAB_ID.RECHARGE),
      [TAB_ID.PURCHASE_PRODUCT]: () => this.renderTabs(TAB_ID.PURCHASE_PRODUCT),
      [PAGE_ID.LOGIN]: () => this.renderPages(PAGE_ID.LOGIN),
      [PAGE_ID.REGISTER]: () => this.renderPages(PAGE_ID.REGISTER),
      [PAGE_ID.PROFILE_EDIT]: () => this.renderPages(PAGE_ID.PROFILE_EDIT),
    };

    routes[tabKey]();
  };

  isSamePage = (tabKey: string) => tabKey === window.location.pathname + window.location.hash;

  renderPages = (id: string) => {
    this.$app.classList.add('hide');
    this.$$pageContainers.forEach((container: HTMLTableSectionElement) => {
      if (container.dataset.id === id) {
        container.classList.remove('hide');
        return;
      }
      container.classList.add('hide');
    });

    localStorage.setItem(STORAGE_ID.CURRENT_VIEW, id);
  };

  renderProfileMenu = () => this.$profileMenu.classList.toggle('hide');
}
