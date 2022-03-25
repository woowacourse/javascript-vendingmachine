import ProductInputComponent from './ProductManageComponent/ProductInputComponent';
import ProductStateComponent from './ProductManageComponent/ProductsStateComponent';
import CoinInputComponent from './CoinManageComponent/CoinInputComponent';

import VendingMachineProductManager from '../VendingMachineProductManager';
import VendingMachineCoinManager from '../VendingMachineCoinManager';
import CoinsStateComponent from './CoinManageComponent/CoinsStateComponent';

import { $, on } from '../dom';
import { ROUTES } from '../constants';

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
    new CoinsStateComponent();

    on(this.$navProductButton, 'click', this.onClickNavProductButton);
    on(this.$navChargeButton, 'click', this.onClickNavChargeButton);
    on(window, 'popstate', this.onPopstateRoute);

    this.routeURLVisit(window.location.pathname);
  }

  private routeURLVisit(pathname: string): void {
    if (pathname === ROUTES.COINS) {
      this.renderCoinComponent();
      window.history.pushState(null, null, ROUTES.COINS);
    }

    if (pathname === ROUTES.PRODUCTS) {
      this.renderProductComponent();
      window.history.pushState(null, null, ROUTES.PRODUCTS);
    }
  }

  private onPopstateRoute = (): void => {
    if (window.location.pathname === ROUTES.COINS) {
      this.renderCoinComponent();
    }

    if (
      window.location.pathname === ROUTES.PRODUCTS ||
      window.location.pathname === '/'
    ) {
      this.renderProductComponent();
    }
  };

  private onClickNavProductButton = (e: Event): void => {
    e.preventDefault();
    this.renderProductComponent();
    window.history.pushState(null, null, ROUTES.PRODUCTS);
  };

  private onClickNavChargeButton = (e: Event): void => {
    e.preventDefault();
    this.renderCoinComponent();
    window.history.pushState(null, null, ROUTES.COINS);
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
