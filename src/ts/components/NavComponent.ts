import ProductInputComponent from './ProductManageComponent/ProductInputComponent';
import ProductStateComponent from './ProductManageComponent/ProductsStateComponent';
import CoinInputComponent from './CoinManageComponent/CoinInputComponent';

import VendingMachineProductManager from '../VendingMachineProductManager';
import VendingMachineCoinManager from '../VendingMachineCoinManager';
import CoinsStateComponent from './CoinManageComponent/CoinsStateComponent';

export default class NavComponent {
  $productInfoSection: HTMLElement = document.querySelector(
    '.product-info-section'
  );
  $chargeCoinSection: HTMLElement = document.querySelector(
    '.charge-coin-section'
  );
  $navProductButton: HTMLButtonElement = document.querySelector(
    '.nav__product-button'
  );
  $navChargeButton: HTMLButtonElement = document.querySelector(
    '.nav__charge-button'
  );
  $coinInput: HTMLInputElement = document.querySelector(
    '.charge-form-section__coin-input'
  );
  $productInput: HTMLInputElement = document.querySelector(
    '.product-info-form__product-input'
  );

  vendingMachineProductManager = new VendingMachineProductManager();
  vendingMachineCoinManager = new VendingMachineCoinManager();

  constructor() {
    new ProductStateComponent(this.vendingMachineProductManager);
    new ProductInputComponent(this.vendingMachineProductManager);
    new CoinInputComponent(this.vendingMachineCoinManager);
    new CoinsStateComponent(this.vendingMachineCoinManager);
    this.$navProductButton.addEventListener(
      'click',
      this.onClickNavProductButton
    );

    this.$navChargeButton.addEventListener(
      'click',
      this.onClickNavChargeButton
    );

    if (window.location.pathname === '/coins') {
      this.$productInfoSection.classList.add('hide');
      this.$chargeCoinSection.classList.remove('hide');
      this.$navProductButton.classList.remove('nav__button--focused');
      this.$navChargeButton.classList.add('nav__button--focused');
      history.pushState(null, null, '/coins');
      this.$coinInput.focus();
    }

    if (window.location.pathname === '/products') {
      this.$productInfoSection.classList.remove('hide');
      this.$chargeCoinSection.classList.add('hide');
      this.$navProductButton.classList.add('nav__button--focused');
      this.$navChargeButton.classList.remove('nav__button--focused');
      history.pushState(null, null, '/products');
      this.$productInput.focus();
    }

    window.addEventListener('popstate', (): void => {
      if (window.location.pathname === '/coins') {
        this.$productInfoSection.classList.add('hide');
        this.$chargeCoinSection.classList.remove('hide');
        this.$navProductButton.classList.remove('nav__button--focused');
        this.$navChargeButton.classList.add('nav__button--focused');
        this.$coinInput.focus();
      }

      if (
        window.location.pathname === '/products' ||
        window.location.pathname === '/'
      ) {
        this.$productInfoSection.classList.remove('hide');
        this.$chargeCoinSection.classList.add('hide');
        this.$navProductButton.classList.add('nav__button--focused');
        this.$navChargeButton.classList.remove('nav__button--focused');
        this.$productInput.focus();
      }
    });
  }

  onClickNavProductButton = (e) => {
    e.preventDefault();
    this.$productInfoSection.classList.remove('hide');
    this.$chargeCoinSection.classList.add('hide');
    this.$navProductButton.classList.add('nav__button--focused');
    this.$navChargeButton.classList.remove('nav__button--focused');
    history.pushState(null, null, '/products');
    this.$productInput.focus();
  };

  onClickNavChargeButton = (e) => {
    e.preventDefault();
    this.$productInfoSection.classList.add('hide');
    this.$chargeCoinSection.classList.remove('hide');
    this.$navProductButton.classList.remove('nav__button--focused');
    this.$navChargeButton.classList.add('nav__button--focused');
    history.pushState(null, null, '/coins');
    this.$coinInput.focus();
  };
}
