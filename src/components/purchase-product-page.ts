import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './purchase-product-form';
import './purchase-product-inventory';

@customElement('purchase-product-page')
class PurchaseProductPage extends Component {
  template(): string {
    return `
      <purchase-product-form class="mb-12"></purchase-product-form>
      <purchase-product-inventory></purchase-product-inventory>
      `;
  }

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.template();
  }
}

export default PurchaseProductPage;
