import CustomElement from './CustomElement';
import VendingMachine from '../domain/VendingMachine';
import { ELEMENT_KEY } from '../constants';
import TEMPLATE from '../templates';

class PurchaseTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe(ELEMENT_KEY.PURCHASE, this);
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.PURCHASE_TAB;
  }

  setEvent() {}

  notify() {}
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
