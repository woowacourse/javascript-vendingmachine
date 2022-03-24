import { $, $$ } from '../../utils/common';
import { purchaseItemTemplate } from './template';

export default class PurchaseItemView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items, coins, inputMoney) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));
  }
}
