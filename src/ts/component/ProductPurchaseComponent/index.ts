import { $, replaceHTML } from '../../utils/dom';

export default class ProductPurchaseComponent {
  render() {
    replaceHTML($('#main-content'), this.template());
    this.bindDOM();
  }

  private template() {
    return `
      <div>Product Purchase (Step2 구현 예정!)</div>
    `;
  }

  private bindDOM() {}
}
