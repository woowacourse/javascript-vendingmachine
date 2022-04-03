import Component from '../../abstract/component';
import { customElement } from '../../decorators/decortators';
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

  mount() {
    this.render();
  }

  render(): void {
    this.innerHTML = this.shouldRender() ? this.template() : '';
  }
}

export default ChargeMoneyTab;
