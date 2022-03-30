import ProductInputComponent from '../components/ProductManageComponents/ProductInputComponent';
import ProductStateComponent from '../components/ProductManageComponents/ProductsStateComponent';
import ChargeMoneyInputComponent from '../components/ChargeMoneyManageComponents/ChargeMoneyInputComponent';
import ChargeMoneyStateComponent from '../components/ChargeMoneyManageComponents/ChargeMoneyStateComponent';

import VendingMachineProductManager from '../domains/VendingMachineProductManager';
import VendingMachineChargeMoneyManager from '../domains/VendingMachineChargeMoneyManager';

import { $, on } from '../dom/domHelper';
import { PATH_NAME } from '../routes/routes';

export default class NavigatorComponent {
  private $productInfoSection: HTMLElement = $('.product-info-section');
  private $chargeMoneySection: HTMLElement = $('.charge-money-section');

  private $navProductButton = $('.nav__product-button') as HTMLButtonElement;
  private $navChargeMoneyButton = $('.nav__charge-button') as HTMLButtonElement;

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
    on(this.$navChargeMoneyButton, 'click', this.onClickNavChargeMoneyButton);
    on(window, '@popstateRenderChargeMoney', this.renderChargeMoneyComponent);
    on(window, '@popstateRenderProduct', this.renderProductComponent);
  }

  private onClickNavProductButton = (event: Event): void => {
    event.preventDefault();
    this.renderProductComponent();
    window.history.pushState({}, '', PATH_NAME.PRODUCTS);
  };

  private onClickNavChargeMoneyButton = (event: Event): void => {
    event.preventDefault();
    this.renderChargeMoneyComponent();
    window.history.pushState({}, '', PATH_NAME.CHARGE_MONEY);
  };

  renderProductComponent(): void {
    this.$productInfoSection.classList.remove('hide');
    this.$chargeMoneySection.classList.add('hide');
    this.$navProductButton.classList.add('nav__button--focused');
    this.$navChargeMoneyButton.classList.remove('nav__button--focused');
    this.$productInput.focus();
  }

  renderChargeMoneyComponent(): void {
    this.$productInfoSection.classList.add('hide');
    this.$chargeMoneySection.classList.remove('hide');
    this.$navProductButton.classList.remove('nav__button--focused');
    this.$navChargeMoneyButton.classList.add('nav__button--focused');
    this.$chargeMoneyInput.focus();
  }
}
