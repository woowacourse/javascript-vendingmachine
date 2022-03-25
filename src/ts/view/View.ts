import { $, $$ } from '../utils';
import { URL, ID } from '../constants';
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

  constructor(vendingMachine: VendingMachineInterface) {
    this.$$tabResultContainers = <NodeListOf<HTMLTableSectionElement>>$$('.tab-result-container');
    this.$tabProductManageButton = <HTMLInputElement>$('#tab-product-manage');
    this.$tabRechargeButton = <HTMLInputElement>$('#tab-recharge');
    this.$tabPurchaseProductButton = <HTMLInputElement>$('#tab-purchase-product');
    this.$$tabButtons = <NodeListOf<HTMLInputElement>>$$('.tab-button');
    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);

    history.replaceState({ url: URL.PRODUCT_MANAGE }, null, URL.PRODUCT_MANAGE);
    this.renderTabResult(ID.PRODUCT_MANAGE);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.tabRouter(event.state.url, true);
    });
    this.$tabProductManageButton.addEventListener('click', () =>
      this.tabRouter(URL.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () => this.tabRouter(URL.RECHARGE));
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.tabRouter(URL.PURCHASE_PRODUCT),
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
  };

  renderUpdatedView = (id: string) => {
    const containerBranch = {
      'product-manage-container': () => {
        this.productManageView.renderProductManage();
      },
      'recharge-container': () => {
        this.rechargeView.renderRecharge();
      },
      'purchase-product-container': () => {
        // this.renderPurchaseProduct();
      },
    };
    if (containerBranch[id]) {
      containerBranch[id]();
    }
  };

  tabRouter = (url: string, isPopState = false) => {
    if (!isPopState) history.pushState({ url }, null, url);
    const routes = {
      '/#!/product-manage': () => {
        this.renderTabResult(ID.PRODUCT_MANAGE);
      },
      '/#!/recharge': () => {
        this.renderTabResult(ID.RECHARGE);
      },
      '/#!/purchase-product': () => {
        this.renderTabResult(ID.PURCHASE_PRODUCT);
      },
    };
    routes[url]();
  };
}
