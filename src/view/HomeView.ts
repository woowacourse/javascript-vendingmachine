import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { AppProps } from '../interfaces/interface';

export class HomeView {
  app: HTMLDivElement;
  nav: HTMLElement;
  productManageNavBtn: HTMLButtonElement;
  balanceChargeNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;
  target: HTMLDivElement;

  constructor(props: AppProps) {
    this.app = props.app;
    this.nav = document.querySelector('.nav');
    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);
    this.productPurchaseNavBtn.addEventListener('click', this.handleShowProductPurchaseTab);

    this.target = props.contentsContainer;
  }

  hideNav = () => {
    this.nav.classList.add('hide');
  };

  handleShowProductManageTab = () => {
    this.target.dispatchEvent(new CustomEvent('productManageTabClick'));
  };

  handleShowBalanceChargeTab = () => {
    this.target.dispatchEvent(new CustomEvent('balanceChargeTabClick'));
  };

  handleShowProductPurchaseTab = () => {
    this.target.dispatchEvent(new CustomEvent('productPurchaseTabClick'));
  };

  contentsContainer: HTMLDivElement;
  renderHome() {
    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';
  }
}
