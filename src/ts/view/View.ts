import { $, $$ } from '../utils';
import { PATH_ID, STORAGE_ID } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';
import RechargeView, { RechargeViewInterface } from './RechargeView';

export default class View {
  $notFound: HTMLDivElement;
  $navTab: HTMLDivElement;
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
    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);

    this.$notFound = <HTMLDivElement>$('#not-found');
    this.$navTab = <HTMLDivElement>$('.nav-tab');
    this.$$tabResultContainers = <NodeListOf<HTMLTableSectionElement>>$$('.tab-result-container');
    this.$tabProductManageButton = <HTMLInputElement>$('#tab-product-manage');
    this.$tabRechargeButton = <HTMLInputElement>$('#tab-recharge');
    this.$tabPurchaseProductButton = <HTMLInputElement>$('#tab-purchase-product');
    this.$$tabButtons = <NodeListOf<HTMLInputElement>>$$('.tab-input');

    this.$tabProductManageButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.RECHARGE),
    );
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.PURCHASE_PRODUCT),
    );
  }

  private handleClickTabButton(url: string) {
    const detail = url;
    const event = new CustomEvent('@route-tab', { detail });
    this.$navTab.dispatchEvent(event);
  }

  public renderTabs = (url: string) => {
    this.$$tabResultContainers.forEach((container: HTMLTableSectionElement, index: number) => {
      if (container.id === url) {
        container.classList.remove('hide');
        this.$$tabButtons[index].checked = true;
        localStorage.setItem(STORAGE_ID.CURRENT_TAB, url);
        return;
      }
      container.classList.add('hide');
    });

    this.$notFound.classList.toggle('hide', url !== PATH_ID.NOT_FOUND);
    this.renderUpdatedView(url);
  };

  private renderUpdatedView = (url: string) => {
    switch (url) {
      case PATH_ID.PRODUCT_MANAGE:
        this.productManageView.renderProductManage();
        break;
      case PATH_ID.RECHARGE:
        this.rechargeView.renderRecharge();
        break;
      case PATH_ID.PURCHASE_PRODUCT:
        // this.purchaseView.renderPurchase();
        break;
      default:
        break;
    }
  };
}
