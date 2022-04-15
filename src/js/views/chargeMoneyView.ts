import { $, emitCustomEvent, showSnackBar } from '../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from '../templates/chareMoneyTemplate';
import { validateInputOwnMoney } from '../validates/validates';
import { CoinsType } from '../types';
import { SELECTOR, SNACK_BAR_MESSAGE } from '../constants/constants';

export default class ChargeMoneyView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private bindEvents() {
    $(SELECTOR.ID.CHARGE_MONEY_FORM).addEventListener(
      'submit',
      this.handleSubmitChargeMoney.bind(this),
    );
  }

  private handleSubmitChargeMoney(event) {
    event.preventDefault();
    try {
      const inputMoney: number = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      validateInputOwnMoney(inputMoney);

      emitCustomEvent('CHARGE_MONEY', { detail: { inputMoney } });
      showSnackBar(SNACK_BAR_MESSAGE.CHANGE_CHARGED);
    } catch (error) {
      alert(error.message);
    }
  }

  public render(isLogin, coins: CoinsType, totalMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(isLogin, coins, totalMoney));

    if (isLogin) {
      this.bindEvents();
    }
  }

  public repaintCoinsTable(coins: CoinsType) {
    $(SELECTOR.CLASS.COIN_TABLE).replaceChildren();
    $(SELECTOR.CLASS.COIN_TABLE).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.coinTableContent(coins),
    );
  }

  public clearInput() {
    $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).value = '';
  }
}
