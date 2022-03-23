import { $ } from '../../utils/dom';

export default class CoinChargeUI {
  constructor(productDomain) {
    this.productDomain = productDomain;
  }

  render() {
    $('#main-content').innerHTML = this.template();
    this.bindDOM();
  }

  template() {
    return `
      <div>Coin Charge</div>
    `;
  }

  bindDOM() {}
}
