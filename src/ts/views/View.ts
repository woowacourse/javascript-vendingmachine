import { $, $$, renderTemplate } from '../utils';
import { PATH_ID } from '../constants';
import { VendingMachineInterface } from '../domains/VendingMachine';
import ProductManageView from './ProductManageView';
import RechargeView from './RechargeView';
import PurchaseView from './PurchaseView';
import { renderComponent } from '../utils';
import { getNotFoundTemplate } from './template';
import auth from '../Auth.js';

export default class View {
  $app: HTMLDivElement;
  $tabResult: HTMLDivElement;
  $$tabResultContainers: NodeListOf<HTMLTableSectionElement>;
  $$tabButtons: NodeListOf<HTMLInputElement>;
  $notFound: HTMLDivElement;
  $navTab: HTMLDivElement;
  $tabProductManageButton: HTMLInputElement;
  $tabRechargeButton: HTMLInputElement;
  $tabPurchaseProductButton: HTMLInputElement;
  $userMenu: HTMLElement;
  vendingMachine: VendingMachineInterface;
  currentTab: string;
  productManageView: ProductManageView;
  rechargeView: RechargeView;
  purchaseView: PurchaseView;

  constructor(vendingMachine: VendingMachineInterface) {
    this.vendingMachine = vendingMachine;

    this.$app = <HTMLDivElement>$('#app');
    this.$tabResult = <HTMLDivElement>$('#tab-result');
    this.$notFound = <HTMLDivElement>$('#not-found');
    this.$navTab = <HTMLDivElement>$('.nav-tab');

    this.$$tabButtons = <NodeListOf<HTMLInputElement>>$$('.tab-input');
    this.$tabProductManageButton = <HTMLInputElement>$('#tab-product-manage');
    this.$tabRechargeButton = <HTMLInputElement>$('#tab-recharge');
    this.$tabPurchaseProductButton = <HTMLInputElement>$('#tab-purchase-product');
    this.$userMenu = document.querySelector('user-menu');

    this.productManageView = new ProductManageView(this.vendingMachine);
    this.rechargeView = new RechargeView(this.vendingMachine);
    this.purchaseView = new PurchaseView(this.vendingMachine);

    this.$tabProductManageButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.PRODUCT_MANAGE),
    );
    this.$tabRechargeButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.RECHARGE),
    );
    this.$tabPurchaseProductButton.addEventListener('click', () =>
      this.handleClickTabButton(PATH_ID.PURCHASE_PRODUCT),
    );

    // 웹컴포넌트에서 보낸 커스텀 이벤트
    window.addEventListener('@render-login', () => {
      renderComponent('log-in');
    });
    window.addEventListener('@render-signup', () => {
      renderComponent('sign-up');
    });
    window.addEventListener('@render-profile-edit', () => {
      renderComponent('profile-edit');
    });

    this.$app.addEventListener('click', this.hideMenu);
  }

  private hideMenu = (event: PointerEvent) => {
    event.target !== this.$userMenu &&
      this.$userMenu.shadowRoot.querySelector('#menu').classList.add('hide');
  };

  private handleClickTabButton = (url: string) => {
    const detail = url;
    const event = new CustomEvent('@route-tab', { detail });
    this.$navTab.dispatchEvent(event);
  };

  public renderPage = (url: string) => {
    this.removePage();

    switch (url) {
      case PATH_ID.PRODUCT_MANAGE:
        if (!auth.isLoggedIn) {
          return;
        }
        this.productManageView.render();
        this.$tabProductManageButton.checked = true;
        break;
      case PATH_ID.RECHARGE:
        if (!auth.isLoggedIn) {
          return;
        }
        this.rechargeView.render();
        this.$tabRechargeButton.checked = true;
        break;
      case PATH_ID.PURCHASE_PRODUCT:
        this.purchaseView.render();
        this.$tabPurchaseProductButton.checked = true;
        break;
      case PATH_ID.LOGIN:
        this.purchaseView.render();
        renderComponent('log-in');
        break;
      case PATH_ID.SIGNUP:
        this.purchaseView.render();
        renderComponent('sign-up');
        break;
      default:
        renderTemplate(getNotFoundTemplate);
        break;
    }
  };

  public removePage = () => {
    this.$tabResult.replaceChildren();
    $('log-in') && $('log-in').remove();
    $('sign-up') && $('sign-up').remove();
  };
}
