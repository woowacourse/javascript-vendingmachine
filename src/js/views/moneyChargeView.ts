import { $ } from '../utils/common';
import { itemPurchaseTemplate } from './template/templates';

export default class MoneyChargeView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(coins, totalMoney) {
    this.$content.innerHTML = itemPurchaseTemplate(coins, totalMoney);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
