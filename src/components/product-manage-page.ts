import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './add-product-form';
import './product-inventory';

@customElement('product-manage-page')
class ProductManagePage extends Component {
  template(): string {
    return `
      <add-product-form></add-product-form>
      <product-inventory></product-inventory>
    `;
  }

  mount() {
    this.render();
  }

  async render() {
    this.innerHTML = this.template();
  }
}

export default ProductManagePage;
