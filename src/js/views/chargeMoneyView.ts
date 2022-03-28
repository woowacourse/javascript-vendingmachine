import { $ } from '../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from '../templates/chareMoneyTemplate';
import { validateInputMoney } from '../validates/validates';
import { CoinsType } from '../types/types';
import { CUSTOM_EVENT } from '../constants/appContants';
import { SELECTOR } from '../constants/viewConstants';

export default class ChargeMoneyView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render(coins: CoinsType, totalMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, totalMoney));

    this.bindEvents();
  }

  bindEvents() {
    $(SELECTOR.ID.CHARGE_MONEY_FORM).addEventListener(
      'submit',
      this.handleSubmitChargeMoney.bind(this)
    );
  }

  handleSubmitChargeMoney(event: Event) {
    try {
      event.preventDefault();
      const inputMoney: number = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      validateInputMoney(inputMoney);
      this.clearInput();

      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.CHARGE_MONEY, { detail: { inputMoney } }));
    } catch (error) {
      alert(error.message);
    }
  }

  clearInput() {
    $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).value = '';
  }

  repaintCurrentMoney(money: number) {
    $(SELECTOR.ID.CURRENT_MONEY).textContent = money;
  }

  repaintCoinsTable(coins: CoinsType) {
    $(SELECTOR.CLASS.COIN_TABLE).replaceChildren();
    $(SELECTOR.CLASS.COIN_TABLE).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.coinTableContent(coins)
    );
  }
}
