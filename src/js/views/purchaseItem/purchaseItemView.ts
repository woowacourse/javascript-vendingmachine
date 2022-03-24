import { $ } from '../../utils/common';
import { purchaseItemTemplate } from '../template/templates';

export default class PurchaseItemView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items, coins, inputMoney) {
    this.$content.innerHTML = purchaseItemTemplate(items, coins, inputMoney);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
