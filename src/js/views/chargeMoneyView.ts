import { $, emitCustomEvent } from '../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from '../templates/chareMoneyTemplate';
import { validateInputMoney } from '../validates/validates';
import { CoinsType } from '../types';
import { SELECTOR } from '../constants/constants';

export default class ChargeMoneyView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  bindEvents() {
    $(SELECTOR.ID.CHARGE_MONEY_FORM).addEventListener(
      'submit',
      this.handleSubmitChargeMoney.bind(this),
    );
  }

  handleSubmitChargeMoney(event: Event) {
    try {
      event.preventDefault();
      const inputMoney: number = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      validateInputMoney(inputMoney);
      this.clearInput();

      emitCustomEvent('CHARGE_MONEY', { detail: { inputMoney } });
    } catch (error) {
      alert(error.message);
    }
  }

  render(coins: CoinsType, totalMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, totalMoney));

    this.bindEvents();
  }

  repaintCurrentMoney(money: number) {
    $(SELECTOR.ID.CURRENT_MONEY).textContent = money;
  }

  repaintCoinsTable(coins: CoinsType) {
    $(SELECTOR.CLASS.COIN_TABLE).replaceChildren();
    $(SELECTOR.CLASS.COIN_TABLE).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.coinTableContent(coins),
    );
  }

  clearInput() {
    $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).value = '';
  }
}
