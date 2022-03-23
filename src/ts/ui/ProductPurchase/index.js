import { $ } from '../../utils/dom';

export default class ProductPurchaseUI {
  constructor(productDomain) {
    this.productDomain = productDomain;
  }

  render() {
    $('#main-content').innerHTML = this.template();
    this.bindDOM();
  }

  template() {
    return `
      <div>Product Purchase (Step2 구현 예정!)</div>
    `;
  }

  bindDOM() {}
}
