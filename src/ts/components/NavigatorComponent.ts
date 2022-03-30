import ProductInputComponent from '../components/ProductManageComponents/ProductInputComponent';
import ProductStateComponent from '../components/ProductManageComponents/ProductsStateComponent';
import ChargeMoneyInputComponent from '../components/ChargeMoneyManageComponents/ChargeMoneyInputComponent';
import ChargeMoneyStateComponent from '../components/ChargeMoneyManageComponents/ChargeMoneyStateComponent';

import VendingMachineProductManager from '../domains/VendingMachineProductManager';
import VendingMachineChargeMoneyManager from '../domains/VendingMachineChargeMoneyManager';

import { $, on } from '../dom/domHelper';
import { ROUTES } from '../constants/routes';

export default class NavigatorComponent {
  private $productInfoSection: HTMLElement = $('.product-info-section');
  private $chargeMoneySection: HTMLElement = $('.charge-money-section');
  private $navProductButton = $('.nav__product-button') as HTMLButtonElement;
  private $navChargeButton = $('.nav__charge-button') as HTMLButtonElement;
  private $chargeMoneyInput = $(
    '.charge-form-section__charge-money-input'
  ) as HTMLInputElement;
  private $productInput = $(
    '.product-info-form__product-input'
  ) as HTMLInputElement;

  private vendingMachineProductManager = new VendingMachineProductManager();
  private vendingMachineChargeMoneyManager =
    new VendingMachineChargeMoneyManager();

  constructor() {
    new ProductStateComponent(this.vendingMachineProductManager);
    new ProductInputComponent(this.vendingMachineProductManager);
    new ChargeMoneyInputComponent(this.vendingMachineChargeMoneyManager);
    new ChargeMoneyStateComponent();

    on(this.$navProductButton, 'click', this.onClickNavProductButton);
    on(this.$navChargeButton, 'click', this.onClickNavChargeButton);
    on(window, 'popstate', this.onPopstateRoute);
    this.routeURLVisit(window.location.pathname);
  }

  private routeURLVisit(pathname: string): void {
    if (
      !Object.values(ROUTES).some((route) => route === window.location.pathname)
    ) {
      window.history.replaceState(null, null, '/');

      return;
    }

    if (pathname === ROUTES.COINS) {
      this.renderCoinComponent();
      window.history.pushState({}, '', ROUTES.COINS);

      return;
    }

    if (pathname === ROUTES.PRODUCTS) {
      this.renderProductComponent();
      window.history.pushState({}, '', ROUTES.PRODUCTS);

      return;
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
    window.history.pushState({}, '', ROUTES.PRODUCTS);
  };

  private onClickNavChargeButton = (e: Event): void => {
    e.preventDefault();
    this.renderCoinComponent();
    window.history.pushState({}, '', ROUTES.COINS);
  };

  private renderProductComponent(): void {
    this.$productInfoSection.classList.remove('hide');
    this.$chargeMoneySection.classList.add('hide');
    this.$navProductButton.classList.add('nav__button--focused');
    this.$navChargeButton.classList.remove('nav__button--focused');
    this.$productInput.focus();
  }

  private renderCoinComponent(): void {
    this.$productInfoSection.classList.add('hide');
    this.$chargeMoneySection.classList.remove('hide');
    this.$navProductButton.classList.remove('nav__button--focused');
    this.$navChargeButton.classList.add('nav__button--focused');
    this.$chargeMoneyInput.focus();
  }
}
