import CustomElement from '../../abstracts/CustomElement';

import './CoinChargeForm';
import './CoinCurrentState';

class CoinChargeContainer extends CustomElement {
  template() {
    return `
      <coin-charge-form></coin-charge-form>
      <coin-current-state></coin-current-state>
    `;
  }
}

customElements.define('coin-charge-container', CoinChargeContainer);

export default CoinChargeContainer;
