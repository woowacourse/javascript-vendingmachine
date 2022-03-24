import { $ } from '../../utils/common';
import { chargeMoneyTemplate } from './template';

export default class ChargeMoneyView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(coins, totalMoney) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, totalMoney));
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
