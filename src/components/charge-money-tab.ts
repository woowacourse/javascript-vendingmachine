import Component from '../abstract/component';
import { customElement, event } from '../decorators/decortators';
import './charge-money-form';
import './changes-inventory';

@customElement('charge-money-tab')
class ChargeMoneyTab extends Component {
  template(): string {
    return `
      <charge-money-form class="mb-12"></charge-money-form>
      <changes-inventory></changes-inventory>
    `;
  }
}

export default ChargeMoneyTab;
