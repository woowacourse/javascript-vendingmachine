import { $, $$ } from '../utils';
import { TAB_ID, PAGE_ID, STORAGE_ID, FLAG } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';
import RechargeView, { RechargeViewInterface } from './RechargeView';
import PurchaseProductView, { PurchaseProductViewInterface } from './PurchaseProductView';

export default class View {
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $$pageContainers: NodeListOf<HTMLDivElement>;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  $loginButton: HTMLButtonElement;
  $app: HTMLDivElement;
  $loginRegister: HTMLSpanElement;

  vendingMachine: VendingMachineInterface;
  productManageView: ProductManageViewInterface;
  rechargeView: RechargeViewInterface;
  purchaseProductView: PurchaseProductViewInterface;
  currentView: string;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$$tabResultContainers = $$('.tab-result-container');
    this.$$pageContainers = $$('.page-container');
    this.$tabProductManageButton = $('#tab-product-manage');
    this.$tabRechargeButton = $('#tab-recharge');
    this.$tabPurchaseProductButton = $('#tab-purchase-product');
    this.$$tabButtons = $$('.tab-button');
    this.$loginButton = $('.login-button');
    this.$app = $('#app');
    this.$loginRegister = $('.login-register');

    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);
    this.purchaseProductView = new PurchaseProductView(this.vendingMachine);

    this.currentView = localStorage.getItem(STORAGE_ID.CURRENT_VIEW) || TAB_ID.PURCHASE_PRODUCT;
    this.renderCurrentView();

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.router(event.state.url, FLAG.POP_STATE);
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
    this.$app.classList.remove('hide');
    this.$$pageContainers.forEach((container) => container.classList.add('hide'));
    this.$$tabResultContainers.forEach((container: HTMLTableSectionElement, index: number) => {
      if (container.id === id) {
        container.classList.remove('hide');
        this.$$tabButtons[index].checked = true;
        this.renderUpdatedView(id);
        return;
      }
      container.classList.add('hide');
    });

    localStorage.setItem(STORAGE_ID.CURRENT_VIEW, id);
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
      [PAGE_ID.USERINFO_EDIT]: () => this.renderPages(PAGE_ID.USERINFO_EDIT),
    };

    routes[tabKey]();
  };

  isSamePage = (tabKey: string) => tabKey === window.location.pathname + window.location.hash;

  renderPages = (id: string) => {
    this.$app.classList.add('hide');
    this.$$pageContainers.forEach((container: HTMLTableSectionElement) => {
      if (container.id === id) {
        container.classList.remove('hide');
        return;
      }
      container.classList.add('hide');
    });

    localStorage.setItem(STORAGE_ID.CURRENT_VIEW, id);
  };
}
