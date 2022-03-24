import { $, $$ } from '../../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from './template';
import { validateInputMoney } from '../../validates/inputValidates';

export default class ChargeMoneyView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(coins, totalMoney) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, totalMoney));

    this.bindChargeButton();
  }

  bindChargeButton() {
    $('#charge-money-form').addEventListener('submit', this.clickChargeButtonEvent.bind(this));
  }

  clickChargeButtonEvent(event) {
    try {
      event.preventDefault();
      const inputMoney = $('.charge-money-input').valueAsNumber;
      validateInputMoney(inputMoney);
      this.clearInput();
      window.dispatchEvent(new CustomEvent('CHARGE_MONEY', { detail: { inputMoney } }));
    } catch (error) {
      alert(error.message);
    }
  }

  clearInput() {
    $('.charge-money-input').value = '';
  }

  updateCurrentMoney(money) {
    $('#current-money').textContent = money;
  }

  updateCoinsTable(coins) {
    $('.coin-table').replaceChildren();
    $('.coin-table').insertAdjacentHTML('beforeend', sectionTemplate.coinTableContent(coins));
  }
}
