import { $, replaceHTML } from '../../utils/dom';

export default class ProductPurchaseUI {
  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  template() {
    return `
      <div>Product Purchase (Step2 구현 예정!)</div>
    `;
  }

  bindDOM() {}
}
