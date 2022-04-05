import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';

class PurchaseTab extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.PURCHASE_TAB;
  }

  setEvent() {}
}

customElements.define('purchase-tab', PurchaseTab);

export default PurchaseTab;
