import { $, $$ } from '../utils';
import { URL, ID } from '../constants';
import { VendingMachineInterface } from '../domain/VendingMachine';
import ProductManageView, { ProductManageViewInterface } from './ProductManageView';

class View {
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  vendingMachine: VendingMachineInterface;
  productManageView: ProductManageViewInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$$tabResultContainers = $$('.tab-result-container');
    this.$tabProductManageButton = $('#tab-product-manage');
    this.$tabRechargeButton = $('#tab-recharge');
    this.$tabPurchaseProductButton = $('#tab-purchase-product');
    this.$$tabButtons = $$('.tab-button');
    this.vendingMachine = vendingMachine;
    this.productManageView = new ProductManageView(this.vendingMachine);

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
        return;
      }
      container.classList.add('hide');
    });
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

export default View;
