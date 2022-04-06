import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';

class VendingMachinePage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.VENDING_MACHINE_PAGE;
  }
}

customElements.define('vending-machine-page', VendingMachinePage);

export default VendingMachinePage;
