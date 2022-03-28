import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { Tab } from '../types';
import './add-product-form';
import './product-inventory';

@customElement('product-manage-tab')
class ProductManageTab extends Component {
  template(activeTab: Tab): string {
    if (this.localName !== activeTab) return '';
    return `
      <add-product-form></add-product-form>
      <product-inventory></product-inventory>
    `;
  }

  mount() {
    this.render();
  }

  render(): void {
    const { activeTab } = Store.instance.getState();
    this.innerHTML = this.template(activeTab);
  }
}

export default ProductManageTab;
