import { $ } from '../../dom';
import { on } from '../../events';
import ProductInputComponent from './ProductInputComponent';
import ProductStateComponent from './ProductsStateComponent';

export default class ProductsComponent {
  private $app = $('#app');
  private productInputComponent = new ProductInputComponent(
    this.vendingMachineProductManager
  );
  private productStateComponent = new ProductStateComponent(
    this.vendingMachineProductManager
  );

  constructor(private vendingMachineProductManager) {
    on(this.$app, '@productsTabClicked', this.render);
  }

  render = () => {
    this.productStateComponent.render();
  };
}
