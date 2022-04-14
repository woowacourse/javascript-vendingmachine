import RouteComponent from '../../abstract/route-component';
import { customElement } from '../../decorators/decortators';
import './add-product-form';
import './product-inventory';

@customElement('product-manage-tab')
class ProductManageTab extends RouteComponent {
  template(): string {
    return `
      <add-product-form></add-product-form>
      <product-inventory></product-inventory>
    `;
  }

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.shouldRender() ? this.template() : '';
  }
}

export default ProductManageTab;
