import Component from '../../abstract/component';
import { customElement } from '../../decorators/decortators';
import '../product-manage/add-product-form';
import '../product-manage/product-inventory';

@customElement('purchase-product-tab')
class PurchaseProductTab extends Component {
  template(): string {
    return `
      <insert-money-form class="mb-12"></insert-money-form>
      <product-menu class="mb-15"></product-menu>
      <release-coin></release-coin>
    `;
  }

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.shouldRender() ? this.template() : '';
  }
}

export default PurchaseProductTab;
