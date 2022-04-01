import InputMoneyComponent from '../components/InputMoneyComponent';
import PurchasableProductListComponent from '../components/PurchasableProductListComponent';
import ReturnChangeComponent from '../components/ReturnChangeComponent';

export default class ProductPurchase {
  InputMoneyComponent: InputMoneyComponent;
  PurchasableProductListComponent: PurchasableProductListComponent;
  ReturnChangeComponent: ReturnChangeComponent;
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
    this.ReturnChangeComponent = new ReturnChangeComponent(this.$contentsContainer, this.stateChange);
  }

  render = () => {
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
