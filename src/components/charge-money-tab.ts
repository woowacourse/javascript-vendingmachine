import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './charge-money-form';
import './changes-inventory';
import { Tab } from '../types';
import Store from '../flux/store';

@customElement('charge-money-tab')
class ChargeMoneyTab extends Component {
  template(activeTab: Tab): string {
    if (this.localName !== activeTab) return '';
    return `
      <charge-money-form class="mb-12"></charge-money-form>
      <changes-inventory></changes-inventory>
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

export default ChargeMoneyTab;
