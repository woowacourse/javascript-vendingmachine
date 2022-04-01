import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './purchase-product-form';

@customElement('purchase-product-page')
class PurchaseProductPage extends Component {
  template(): string {
    return '<purchase-product-form></purchase-product-form>';
  }

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.template();
  }
}

export default PurchaseProductPage;
