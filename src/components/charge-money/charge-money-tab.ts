import { customElement } from '../../decorators/decortators';
import './charge-money-form';
import './changes-inventory';
import RouteComponent from '../../abstract/route-component';

@customElement('charge-money-tab')
class ChargeMoneyTab extends RouteComponent {
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
