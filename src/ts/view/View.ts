import { $, $$ } from '../utils';
import { PATH_ID, STORAGE_ID, FLAG } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';
import RechargeView, { RechargeViewInterface } from './RechargeView';
import PurchaseProductView, { PurchaseProductViewInterface } from './PurchaseProductView';

export default class View {
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  vendingMachine: VendingMachineInterface;
  productManageView: ProductManageViewInterface;
  rechargeView: RechargeViewInterface;
  purchaseProductView: PurchaseProductViewInterface;
  currentTab: string;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$$tabResultContainers = $$('.tab-result-container');
    this.$tabProductManageButton = $('#tab-product-manage');
    this.$tabRechargeButton = $('#tab-recharge');
    this.$tabPurchaseProductButton = $('#tab-purchase-product');
    this.$$tabButtons = $$('.tab-button');

    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);
    this.purchaseProductView = new PurchaseProductView(this.vendingMachine);

    this.currentTab = localStorage.getItem(STORAGE_ID.CURRENT_TAB) || PATH_ID.PURCHASE_PRODUCT;

    history.replaceState({ url: this.currentTab }, null, this.currentTab);
    this.renderTabs(this.currentTab);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.tabRouter(event.state.url, FLAG.POP_STATE);
    });
    this.$tabProductManageButton.addEventListener('click', () =>
      this.tabRouter(PATH_ID.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () => this.tabRouter(PATH_ID.RECHARGE));
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.tabRouter(PATH_ID.PURCHASE_PRODUCT),
    );
  }

  renderTabs = (id: string) => {
    this.$$tabResultContainers.forEach((container: HTMLTableSectionElement, index: number) => {
      if (container.id === id) {
        container.classList.remove('hide');
        this.$$tabButtons[index].checked = true;
        this.renderUpdatedView(id);
        return;
      }
      container.classList.add('hide');
    });

    localStorage.setItem(STORAGE_ID.CURRENT_TAB, id);
  };

  renderUpdatedView = (id: string) => {
    const containerBranch = {
      [PATH_ID.PRODUCT_MANAGE]: () => {
        this.productManageView.renderProductManage();
      },
      [PATH_ID.RECHARGE]: () => {
        this.rechargeView.renderRecharge();
      },
      [PATH_ID.PURCHASE_PRODUCT]: () => {
        this.purchaseProductView.renderPurchaseProduct();
      },
    };

    if (containerBranch[id]) {
      containerBranch[id]();
    }
  };

  tabRouter = (tabKey: string, isPopState = false) => {
    if (!isPopState && this.isSamePage(tabKey)) return;
    if (!isPopState) history.pushState({ url: tabKey }, null, tabKey);

    const routes = {
      [PATH_ID.PRODUCT_MANAGE]: () => {
        this.renderTabs(PATH_ID.PRODUCT_MANAGE);
      },
      [PATH_ID.RECHARGE]: () => {
        this.renderTabs(PATH_ID.RECHARGE);
      },
      [PATH_ID.PURCHASE_PRODUCT]: () => {
        this.renderTabs(PATH_ID.PURCHASE_PRODUCT);
      },
    };

    routes[tabKey]();
  };

  isSamePage = (tabKey: string) => tabKey === window.location.pathname + window.location.hash;
}
