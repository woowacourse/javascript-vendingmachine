import { $, $$ } from '../utils';
import { PATH_ID, STORAGE_ID } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';
import RechargeView, { RechargeViewInterface } from './RechargeView';

export default class View {
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  vendingMachine: VendingMachineInterface;
  productManageView: ProductManageViewInterface;
  rechargeView: RechargeViewInterface;
  currentTab: string;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$$tabResultContainers = <NodeListOf<HTMLTableSectionElement>>$$('.tab-result-container');
    this.$tabProductManageButton = <HTMLInputElement>$('#tab-product-manage');
    this.$tabRechargeButton = <HTMLInputElement>$('#tab-recharge');
    this.$tabPurchaseProductButton = <HTMLInputElement>$('#tab-purchase-product');
    this.$$tabButtons = <NodeListOf<HTMLInputElement>>$$('.tab-button');
    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);
    this.currentTab = localStorage.getItem(STORAGE_ID.CURRENT_TAB) || PATH_ID.PRODUCT_MANAGE;

    history.replaceState({ url: this.currentTab }, null, this.currentTab);
    this.tabRouter(this.currentTab, true);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.tabRouter(event.state.url, true);
    });

    this.$tabProductManageButton.addEventListener('click', () =>
      this.tabRouter(PATH_ID.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () => this.tabRouter(PATH_ID.RECHARGE));
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.tabRouter(PATH_ID.PURCHASE_PRODUCT),
    );
  }

  renderUpdatedView = (id: string) => {
    const containerBranch = {
      '/javascript-vendingmachine/#!/product-manage': () => {
        this.productManageView.renderProductManage();
      },
      '/javascript-vendingmachine/#!/recharge': () => {
        this.rechargeView.renderRecharge();
      },
      '/javascript-vendingmachine/#!/purchase-product': () => {
        // this.renderPurchaseProduct();
      },
    };
    if (containerBranch[id]) {
      containerBranch[id]();
    }
  };

  tabRouter = (tabId: string, isPushState = false) => {
    if (!isPushState) history.pushState({ tabId }, null, tabId);
    this.$$tabResultContainers.forEach((container: HTMLTableSectionElement, index: number) => {
      if (container.id === tabId) {
        container.classList.remove('hide');
        this.$$tabButtons[index].checked = true;
        this.renderUpdatedView(tabId);
        return;
      }
      container.classList.add('hide');
    });
    localStorage.setItem(STORAGE_ID.CURRENT_TAB, tabId);
  };
}
