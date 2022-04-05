import { CustomElement, Notification } from './CustomElement';
import TEMPLATE from '../templates';
import storage from '../storage';
import Product from '../domain/Product';
import { $, markUnit, addEvent, emit } from '../utils';
import VendingMachine from '../domain/VendingMachine';

class PurchaseTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe('subscribePurchaseTab', this);
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.PURCHASE_TAB;
  }

  setEvent() {
    addEvent(this, 'submit', '.user-amount-form', (e: SubmitEvent & { target: HTMLFormElement }) =>
      this.handleInsertCoin(e),
    );
  }

  handleInsertCoin(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    emit('.user-amount-form', '@insert-coin', { userInputMoney: e.target.change.valueAsNumber }, this);
  }

  notify({ action, userAmount }: Notification) {
    switch (action) {
      case 'insert-coin':
        $('.user-amount', this).textContent = markUnit(userAmount);
        return;
    }
  }
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
