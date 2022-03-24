import { $ } from '../../utils/common';
import { chargeMoneyTemplate } from '../template/templates';

export default class ChargeMoneyView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(coins, totalMoney) {
    this.$content.innerHTML = chargeMoneyTemplate(coins, totalMoney);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
