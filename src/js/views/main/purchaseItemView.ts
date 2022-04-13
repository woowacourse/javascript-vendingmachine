import { $ } from '../../utils/common';
import { purchaseItemTemplate, sectionTemplate } from '../../templates/main/purchaseItemTemplate';
import { SELECTOR } from '../../constants/viewConstants';
import VendingMachine from '../../vendingMachine/vendingMachine';
import showSnackbar from '../../utils/snackbar';
import { CONFIRM_MESSAGE } from '../../constants/confirmConstants';
import { MONEY } from '../../constants/vendingMachineConstants';
import { CoinsType } from '../../types/types';

export default class PurchaseItemView {
  constructor(private readonly vendingMachine: VendingMachine) {}

  render() {
    const $content = $(SELECTOR.ID.CONTENT);
    const { items, InitialCoins, money } = this.vendingMachine;

    $content.replaceChildren();
    $content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, InitialCoins, money));

    $(SELECTOR.ID.INPUT_MONEY_SUBMIT).addEventListener(
      'submit',
      this.handleMoneySubmitEvent.bind(this)
    );
    $(SELECTOR.ID.PURCHASE_ITEM_TABLE).addEventListener(
      'click',
      this.handleTableClickEvent.bind(this)
    );
    $(SELECTOR.CLASS.RETURN_CHANGE_BUTTON).addEventListener(
      'click',
      this.handleReturnChangeButtonClick.bind(this)
    );
  }

  private handleMoneySubmitEvent(event: SubmitEvent) {
    try {
      event.preventDefault();
      const inputMoney = $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).valueAsNumber;

      this.vendingMachine.chargeMoney(inputMoney);

      this.repaintCurrentMoney(this.vendingMachine.money);
      this.clearInput();
      showSnackbar(`${inputMoney}${CONFIRM_MESSAGE.CHARGE}`);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private async handleTableClickEvent(event: { target: HTMLButtonElement }) {
    try {
      if (!event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_PURCHASE_BUTTON))
        return;

      const { name, price } = event.target.dataset;
      const remainQuantity = await this.vendingMachine.purchaseItem(name, Number(price));

      this.repaintItemQuantity(event.target, remainQuantity);
      this.repaintCurrentMoney(this.vendingMachine.money);
      showSnackbar(`${name} ${CONFIRM_MESSAGE.PURCHASE}`);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private async handleReturnChangeButtonClick() {
    const { coins, restMoney } = await this.vendingMachine.returnChangeCoins();

    this.repaintCoinsTable(coins);
    this.repaintCurrentMoney(restMoney);

    showSnackbar(
      restMoney > MONEY.MIN
        ? `${restMoney}${CONFIRM_MESSAGE.NO_COINS}`
        : CONFIRM_MESSAGE.RETURN_COINS
    );
  }

  private repaintCoinsTable(coins: CoinsType) {
    $(SELECTOR.ID.CHANGE_COINS_TABLE).replaceChildren();
    $(SELECTOR.ID.CHANGE_COINS_TABLE).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.changeCoinsTable(coins)
    );
  }

  private repaintItemQuantity($targetButton: HTMLButtonElement, quantity: number) {
    const $tableItemQuantity = $targetButton
      .closest('tr')
      .getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_QUANTITY);

    $tableItemQuantity[0].innerHTML = `${quantity}`;
  }

  private repaintCurrentMoney(money: number) {
    $(SELECTOR.ID.CURRENT_INPUT_MONEY).textContent = money;
  }

  private clearInput() {
    $(SELECTOR.CLASS.CHARGE_MONEY_INPUT).value = '';
  }
}
