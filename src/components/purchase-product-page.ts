import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('purchase-product-page')
class PurchaseProductPage extends Component {
  template(): string {
    return '<h3 class="text-center">🤖 페이지 건설중...</h3>';
  }

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.template();
  }
}

export default PurchaseProductPage;
