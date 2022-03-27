import CustomElement from '../../abstracts/CustomElement';

import './CoinChargeForm';
import './CoinCurrentSituation';

class CoinChargeContainer extends CustomElement {
  template() {
    return `
      <coin-charge-form></coin-charge-form>
      <coin-current-situation></coin-current-situation>
    `;
  }
}

customElements.define('coin-charge-container', CoinChargeContainer);

export default CoinChargeContainer;
