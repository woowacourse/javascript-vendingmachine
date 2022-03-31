import InputMoneyComponent from '../components/InputMoneyComponent';

export default class ProductPurchase {
  InputMoneyComponent: InputMoneyComponent;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
    this.InputMoneyComponent = new InputMoneyComponent(this.$inputSection, this.stateChange);
  }

  render = () => {
    this.InputMoneyComponent.render();
    this.InputMoneyComponent.refreshChange();
  };

  private stateChange = () => {
    this.InputMoneyComponent.refreshChange();
  };
}
