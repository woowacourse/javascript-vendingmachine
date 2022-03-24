import ProductInputComponent from './ProductManageComponent/ProductInputComponent';
import ProductStateComponent from './ProductManageComponent/ProductsStateComponent';
import CoinInputComponent from './CoinManageComponent/CoinInputComponent';

import VendingMachineProductManager from '../VendingMachineProductManager';
import VendingMachineCoinManager from '../VendingMachineCoinManager';
import CoinsStateComponent from './CoinManageComponent/CoinsStateComponent';

import { $, on } from '../dom';

export default class NavigatorComponent {
  private $productInfoSection: HTMLElement = $('.product-info-section');
  private $chargeCoinSection: HTMLElement = $('.charge-coin-section');
  private $navProductButton: HTMLButtonElement = $('.nav__product-button');
  private $navChargeButton: HTMLButtonElement = $('.nav__charge-button');
  private $coinInput: HTMLInputElement = $('.charge-form-section__coin-input');
  private $productInput: HTMLInputElement = $(
    '.product-info-form__product-input'
  );

  private vendingMachineProductManager = new VendingMachineProductManager();
  private vendingMachineCoinManager = new VendingMachineCoinManager();

  constructor() {
    new ProductStateComponent(this.vendingMachineProductManager);
    new ProductInputComponent(this.vendingMachineProductManager);
    new CoinInputComponent(this.vendingMachineCoinManager);
    new CoinsStateComponent(this.vendingMachineCoinManager);

    on(this.$navProductButton, 'click', this.onClickNavProductButton);
    on(this.$navChargeButton, 'click', this.onClickNavChargeButton);
    on(window, 'popstate', this.popstateWindow);

    this.routeURLVisit(window.location.pathname);
  }

  private routeURLVisit(pathname: string): void {
    if (pathname === '/coins') {
      this.renderCoinComponent();
      history.pushState(null, null, '/coins');
    }

    if (pathname === '/products') {
      this.renderProductComponent();
      history.pushState(null, null, '/products');
    }
  }

  private popstateWindow = (): void => {
    if (window.location.pathname === '/coins') {
      this.renderCoinComponent();
      this.$coinInput.focus();
    }

    if (
      window.location.pathname === '/products' ||
      window.location.pathname === '/'
    ) {
      this.renderProductComponent();
    }
  };

  private onClickNavProductButton = (e: Event): void => {
    e.preventDefault();
    this.renderProductComponent();
    history.pushState(null, null, '/products');
  };

  private onClickNavChargeButton = (e: Event): void => {
    e.preventDefault();
    this.renderCoinComponent();
    history.pushState(null, null, '/coins');
  };

  private renderProductComponent(): void {
    this.$productInfoSection.classList.remove('hide');
    this.$chargeCoinSection.classList.add('hide');
    this.$navProductButton.classList.add('nav__button--focused');
    this.$navChargeButton.classList.remove('nav__button--focused');
    this.$productInput.focus();
  }

  private renderCoinComponent(): void {
    this.$productInfoSection.classList.add('hide');
    this.$chargeCoinSection.classList.remove('hide');
    this.$navProductButton.classList.remove('nav__button--focused');
    this.$navChargeButton.classList.add('nav__button--focused');
    this.$coinInput.focus();
  }
}
