import InputMoneyComponent from '../components/InputMoneyComponent';
import PurchasableProductListComponent from '../components/PurchasableProductListComponent';
import ReturnChangeComponent from '../components/ReturnChangeComponent';

export default class ProductPurchase {
  InputMoneyComponent: InputMoneyComponent;
  PurchasableProductListComponent: PurchasableProductListComponent;
  ReturnChangeComponent: ReturnChangeComponent;
  $userMenu: HTMLElement;
  $inputSection: HTMLElement;
  $sectionContainer: HTMLElement;
  $contentsContainer: HTMLElement;
  $loginInputSection: HTMLElement;

  constructor() {
    this.$userMenu = document.querySelector('.user-menu');
    this.$sectionContainer = document.querySelector('.section-container');
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.$loginInputSection = document.querySelector('#login-input-container');
    this.InputMoneyComponent = new InputMoneyComponent(this.$inputSection, this.stateChange);
    this.PurchasableProductListComponent = new PurchasableProductListComponent(
      this.$contentsContainer,
      this.stateChange,
    );
    this.ReturnChangeComponent = new ReturnChangeComponent(this.$contentsContainer, this.stateChange);
  }

  render = () => {
    this.$userMenu.classList.remove('hide');
    this.$sectionContainer.classList.remove('hide');
    this.$loginInputSection.classList.add('hide');

    this.InputMoneyComponent.render();
    this.PurchasableProductListComponent.render();
    this.ReturnChangeComponent.render();
    this.InputMoneyComponent.refreshChange();
    this.PurchasableProductListComponent.refreshComponent();
    this.ReturnChangeComponent.refreshChange();
  };

  private stateChange = () => {
    this.InputMoneyComponent.refreshChange();
    this.ReturnChangeComponent.refreshChange();
  };
}
