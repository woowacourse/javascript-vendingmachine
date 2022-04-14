import { Notification, Tab } from '../CustomElement';
import TEMPLATE from '../../templates';
import { $, addEvent, emit, markUnit } from '../../utils';
import VendingMachine from '../../domain/VendingMachine';
import storage from '../../storage';
import { COINS, CUSTOM_EVENT, ELEMENT_KEY } from '../../constants';

class ChargeTab extends Tab {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe({ key: ELEMENT_KEY.CHARGE, element: this });
  }

  render() {
    this.innerHTML = this.template();
    const amount = storage.getLocalStorage('amount');

    $('.charge-amount', this).textContent = markUnit(
      Object.entries(amount).reduce((previous, [key, value]) => previous + value.count * Number(key), 0),
    );
    COINS.forEach((coin) => ($(`.coin-${coin}-quantity`).textContent = String(amount[coin].count)));
  }

  template() {
    return TEMPLATE.CHARGE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.charge-form', (e: SubmitEvent & { target: HTMLFormElement }) => this.handleCharge(e));
  }

  handleCharge(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    const change = e.target.change.valueAsNumber;

    emit('.charge-form', CUSTOM_EVENT.CHARGE, { change }, this);
  }

  notify({ amount }: Notification) {
    $('.charge-amount', this).textContent = markUnit(amount.getAmount());
    COINS.forEach((coin) => ($(`.coin-${coin}-quantity`).textContent = amount.counter[coin].count));
  }
}

customElements.define('charge-tab', ChargeTab);

export default ChargeTab;
