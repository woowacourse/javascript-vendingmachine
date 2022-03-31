import InputMoneyComponent from '../components/InputMoneyComponent';
import PurchasableProductListComponent from '../components/PurchasableProductListComponent';

export default class ProductPurchase {
  InputMoneyComponent: InputMoneyComponent;
  PurchasableProductListComponent: PurchasableProductListComponent;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.InputMoneyComponent = new InputMoneyComponent(this.$inputSection, this.stateChange);
    this.PurchasableProductListComponent = new PurchasableProductListComponent(
      this.$contentsContainer,
      this.stateChange,
    );
  }

  render = () => {
    this.InputMoneyComponent.render();
    this.PurchasableProductListComponent.render();
    this.InputMoneyComponent.refreshChange();
    this.PurchasableProductListComponent.refreshComponent();
  };

  private stateChange = () => {
    this.InputMoneyComponent.refreshChange();
  };
}
