import { $ } from '../../utils/common';
import { chargeMoneyTemplate, sectionTemplate } from '../../templates/main/chargeMoneyTemplate';
import { CoinsType } from '../../types/types';
import { SELECTOR } from '../../constants/viewConstants';
import showSnackbar from '../../utils/snackbar';
import VendingMachine from '../../vendingMachine/vendingMachine';
import { CONFIRM_MESSAGE } from '../../constants/confirmConstants';

export default class ChargeMoneyView {
  constructor(private readonly vendingMachine: VendingMachine) {}

  render() {
    const $content = $(SELECTOR.ID.CONTENT);
    const { coins, coinsSum } = this.vendingMachine;

    $content.replaceChildren();
    $content.insertAdjacentHTML('beforeend', chargeMoneyTemplate(coins, coinsSum));

    $(SELECTOR.ID.CHARGE_MONEY_FORM).addEventListener('submit', this.handleSubmitEvent.bind(this));
  }

  private handleSubmitEvent(event: Event) {
    try {
      event.preventDefault();
      const coinsSum: number = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      this.vendingMachine.chargeCoinsSum(coinsSum);

      this.repaintCurrentMoney(this.vendingMachine.coinsSum);
      this.repaintCoinsTable(this.vendingMachine.coins);
      this.clearInput();
      showSnackbar(`${coinsSum}${CONFIRM_MESSAGE.CHARGE}`);
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
