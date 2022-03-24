import { $ } from '../utils/common';
import { itemPurchaseTemplate } from './template/templates';

export default class ItemPurchaseView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items, coins, inputMoney) {
    this.$content.innerHTML = itemPurchaseTemplate(items, coins, inputMoney);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
