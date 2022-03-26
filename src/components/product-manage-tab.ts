import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './add-product-form';
import './product-inventory';

@customElement('product-manage-tab')
class ProductManageTab extends Component {
  template(): string {
    return `
      <add-product-form></add-product-form>
      <product-inventory></product-inventory>
    `;
  }

  shouldSubscribe(): boolean {
    return false;
  }
}

export default ProductManageTab;
