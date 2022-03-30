import { ProductManageView } from './ProductManageView';
import { BalanceChargeView } from './BalanceChargeView';
import { pushHistoryPath, Router } from '../utils/router';

export class HomeView {
  productManageNavBtn: HTMLButtonElement;
  balanceChargeNavBtn: HTMLButtonElement;
  productPurchaseNavBtn: HTMLButtonElement;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;
  target: HTMLDivElement;
  router: Router;

  constructor() {
    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();

    this.productManageNavBtn = document.querySelector('#product-manage-nav-button');
    this.balanceChargeNavBtn = document.querySelector('#charge-balance-nav-button');
    this.productPurchaseNavBtn = document.querySelector('#product-purchase-nav-button');

    this.productManageNavBtn.addEventListener('click', this.handleShowProductManageTab);
    this.balanceChargeNavBtn.addEventListener('click', this.handleShowBalanceChargeTab);

    this.target = document.querySelector('#contents-container');

    this.renderHome();
    window.addEventListener('popstate', (savedData) => {
      this.handlePopstate(savedData);
    });
  }

  handlePopstate = (savedData) => {
    if (savedData.state.path === '/javascript-vendingmachine') {
      this.renderHome();
    }
    if (savedData.state.path === '/javascript-vendingmachine/productManage') {
      this.productManageView.eraseAll();
      this.productManageView.renderAll();
    }
    if (savedData.state.path === '/javascript-vendingmachine/balanceCharge') {
      this.balanceChargeView.eraseAll();
      this.balanceChargeView.renderAll();
    }
  };

  handleShowProductManageTab = () => {
    this.target.dispatchEvent(new CustomEvent('productManageTabClick'));

    const path = '/javascript-vendingmachine/productManage';
    pushHistoryPath(path);
  };

  handleShowBalanceChargeTab = () => {
    this.target.dispatchEvent(new CustomEvent('balanceChargeTabClick'));

    const path = '/javascript-vendingmachine/balanceCharge';
    pushHistoryPath(path);
  };

  contentsContainer: HTMLDivElement;
  renderHome() {
    const path = '/javascript-vendingmachine';
    pushHistoryPath(path);
    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';
  }
}
