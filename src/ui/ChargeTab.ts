import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { $, addEvent, emit } from '../utils';
import VendingMachine from '../domain/VendingMachine';

class ChargeTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe('subscribeChargeTab', this);
  }

  template() {
    return TEMPLATE.CHARGE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.charge-form', (e: any) => this.handleCharge(e));
  }

  handleCharge(e: any) {
    e.preventDefault();

    const change = e.target.change.valueAsNumber;

    emit('.charge-form', '@charge', { change }, this);
  }

  notify(action, amount, _) {
    $('.charge-amount', this).textContent = amount.getAmount();
    $('.coin-500-quantity', this).textContent = amount['500'];
    $('.coin-100-quantity', this).textContent = amount['100'];
    $('.coin-50-quantity', this).textContent = amount['50'];
    $('.coin-10-quantity', this).textContent = amount['10'];
  }
}

customElements.define('charge-tab', ChargeTab);

export default ChargeTab;
