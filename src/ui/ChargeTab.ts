import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { $, addEvent, emit, markUnit } from '../utils';
import VendingMachine from '../domain/VendingMachine';
import storage from '../storage';
import Coin from '../domain/Coin';
import { COINS, ELEMENT_KEY } from '../constants';

class ChargeTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe(ELEMENT_KEY.CHARGE, this);
  }

  render() {
    this.innerHTML = this.template();
    const amount: number[] = storage.getAmount();

    $('.charge-amount', this).textContent = markUnit(
      COINS.map((coin, i) => coin * amount[i]).reduce((acc, cur) => acc + cur, 0),
    );
    COINS.forEach((coin, i) => ($(`.coin-${coin}-quantity`).textContent = String(amount[i])));
  }

  template() {
    return TEMPLATE.CHARGE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.charge-form', (e) => this.handleCharge(e));
  }

  handleCharge(e) {
    e.preventDefault();

    const change = e.target.change.valueAsNumber;

    emit('.charge-form', '@charge', { change }, this);
  }

  notify(_: never, amount: Coin, __: never) {
    $('.charge-amount', this).textContent = markUnit(amount.getAmount());
    COINS.forEach((coin) => ($(`.coin-${coin}-quantity`).textContent = amount[coin]));
  }
}

customElements.define('charge-tab', ChargeTab);

export default ChargeTab;
