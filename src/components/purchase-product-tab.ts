import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import { Tab } from '../types';
import './add-product-form';
import './product-inventory';

@customElement('purchase-product-tab')
class PurchaseProductTab extends Component {
  template(activeTab: Tab): string {
    if (this.localName !== activeTab) return '';
    return '<insert-money-form></insert-money-form>';
  }

  mount() {
    this.render();
  }

  render(): void {
    const { activeTab } = Store.instance.getState();
    this.innerHTML = this.template(activeTab);
  }
}

export default PurchaseProductTab;
