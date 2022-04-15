import { Page } from '../CustomElement';
import TEMPLATE from '../../templates';
import { $ } from '../../utils';

class VendingMachinePage extends Page {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();

    const isLogin = !!localStorage.getItem('accessToken');

    $('.nav', this).classList.toggle('hidden', !isLogin);
  }

  template() {
    return TEMPLATE.VENDING_MACHINE_PAGE;
  }
}

customElements.define('vending-machine-page', VendingMachinePage);

export default VendingMachinePage;
