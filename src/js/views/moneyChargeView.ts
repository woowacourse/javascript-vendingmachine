import { $ } from '../utils/common';
import { MoneyChargeTemplate } from './template/templates';

export default class MoneyChargeView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(coins, totalMoney) {
    this.$content.innerHTML = MoneyChargeTemplate(coins, totalMoney);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
