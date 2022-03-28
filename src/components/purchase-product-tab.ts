import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './add-product-form';
import './product-inventory';

@customElement('purchase-product-tab')
class PurchaseProductTab extends Component {
  template(): string {
    return '<h3 class="text-center">🤖 페이지 건설중...</h3>';
  }

  shouldSubscribe(): boolean {
    return false;
  }
}

export default PurchaseProductTab;
