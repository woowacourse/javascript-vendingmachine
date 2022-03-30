import { $, $$ } from '../utils';
import { PATH_ID, STORAGE_ID, FLAG, DOMAIN_LENGH } from '../constants';
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
    this.renderTabResult(this.currentTab);

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

  renderTabResult = (id: string) => {
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
        // this.renderPurchaseProduct();
      },
    };
    
    if (containerBranch[id]) {
      containerBranch[id]();
    }
  };

  isSamePage = (url: string) => url.substring(DOMAIN_LENGH) === window.location.hash;

  tabRouter = (url: string, isPopState = false) => {
    if (!isPopState && this.isSamePage(url)) return;
    if (!isPopState) history.pushState({ url }, null, url);
    
    const routes = {
      [PATH_ID.PRODUCT_MANAGE]: () => {
        this.renderTabResult(PATH_ID.PRODUCT_MANAGE);
      },
      [PATH_ID.RECHARGE]: () => {
        this.renderTabResult(PATH_ID.RECHARGE);
      },
      [PATH_ID.PURCHASE_PRODUCT]: () => {
        this.renderTabResult(PATH_ID.PURCHASE_PRODUCT);
      },
    };
    
    routes[url]();
  };
}
