import ProductInputComponent from './ProductManageComponent/ProductInputComponent';
import ProductStateComponent from './ProductManageComponent/ProductsStateComponent';
import VendingMachineProductManager from '../VendingMachineProductManager';

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
  vendingMachineProductManager = new VendingMachineProductManager();

  constructor() {
    new ProductStateComponent(this.vendingMachineProductManager);
    new ProductInputComponent(this.vendingMachineProductManager);

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
    }

    if (window.location.pathname === '/products') {
      this.$productInfoSection.classList.remove('hide');
      this.$chargeCoinSection.classList.add('hide');
      this.$navProductButton.classList.add('nav__button--focused');
      this.$navChargeButton.classList.remove('nav__button--focused');
      history.pushState(null, null, '/products');
    }

    window.addEventListener('popstate', (): void => {
      if (window.location.pathname === '/coins') {
        this.$productInfoSection.classList.add('hide');
        this.$chargeCoinSection.classList.remove('hide');
        this.$navProductButton.classList.remove('nav__button--focused');
        this.$navChargeButton.classList.add('nav__button--focused');
      }

      if (
        window.location.pathname === '/products' ||
        window.location.pathname === '/'
      ) {
        this.$productInfoSection.classList.remove('hide');
        this.$chargeCoinSection.classList.add('hide');
        this.$navProductButton.classList.add('nav__button--focused');
        this.$navChargeButton.classList.remove('nav__button--focused');
      }
    });
  }

  renderByRoute(route) {}

  onClickNavProductButton = (e) => {
    e.preventDefault();
    this.$productInfoSection.classList.remove('hide');
    this.$chargeCoinSection.classList.add('hide');
    this.$navProductButton.classList.add('nav__button--focused');
    this.$navChargeButton.classList.remove('nav__button--focused');
    history.pushState(null, null, '/products');
  };

  onClickNavChargeButton = (e) => {
    e.preventDefault();
    this.$productInfoSection.classList.add('hide');
    this.$chargeCoinSection.classList.remove('hide');
    this.$navProductButton.classList.remove('nav__button--focused');
    this.$navChargeButton.classList.add('nav__button--focused');
    history.pushState(null, null, '/coins');
  };
}
