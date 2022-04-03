import { $ } from '../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from '../templates/chareMoneyTemplate';
import { CoinsType } from '../types/types';
import { SELECTOR } from '../constants/viewConstants';
import showSnackbar from '../utils/snackbar';
import VendingMachine from '../vendingMachine/vendingMachine';

export default class ChargeMoneyView {
  private $content: HTMLDivElement;

  constructor(private readonly vendingMachine: VendingMachine) {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render() {
    const { coins, coinsSum } = this.vendingMachine;
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, coinsSum));

    $(SELECTOR.ID.CHARGE_MONEY_FORM).addEventListener('submit', this.handleSubmitEvent.bind(this));
  }

  private handleSubmitEvent(event: Event) {
    try {
      event.preventDefault();
      const inputMoney: number = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      this.vendingMachine.chargeCoins(inputMoney);

      this.repaintCurrentMoney(this.vendingMachine.coinsSum);
      this.repaintCoinsTable(this.vendingMachine.coins);
      this.clearInput();
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private clearInput() {
    $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).value = '';
  }

  private repaintCurrentMoney(coinsSum: number) {
    $(SELECTOR.ID.CURRENT_CHARGE_MONEY).textContent = coinsSum;
  }

  private repaintCoinsTable(coins: CoinsType) {
    $(SELECTOR.CLASS.COIN_TABLE).replaceChildren();
    $(SELECTOR.CLASS.COIN_TABLE).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.coinTableContent(coins)
    );
  }
}
