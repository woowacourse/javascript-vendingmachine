import { $, $$, showSnackBar, emitCustomEvent } from '../utils/common';
import { purchaseItemTemplate } from '../templates/purchaseItemTemplate';
import { SELECTOR, SNACK_BAR_MESSAGE } from '../constants/constants';
import { CoinsType, ItemType } from '../types';
import { validateInputPurchaseMoney } from '../validates/validates';

export default class PurchaseItemView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private bindSubmitEvent() {
    $(SELECTOR.ID.PURCHASE_ITEM_FORM).addEventListener(
      'submit',
      this.handleSubmitPurchaseMoneyInput.bind(this),
    );
  }

  private bindPurchaseClickEvents() {
    $$(SELECTOR.CLASS.ITEM_TABLE_PURCHASE_BUTTON).forEach(button =>
      this.bindTargetPurchaseClick(button),
    );
  }

  private bindTargetPurchaseClick(button) {
    button.addEventListener('click', () => {
      const $targetTableRow = button.closest('tr');
      const itemName: string = $targetTableRow
        .getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_NAME)[0]
        .textContent.trim();

      emitCustomEvent('PURCHASE_ITEM', { detail: { itemName } });
    });
  }

  private bindReturnMoneyClickEvent() {
    $(SELECTOR.CLASS.RETURN_MONEY_BUTTON).addEventListener(
      'click',
      this.handleClickReturnMoneyButton.bind(this),
    );
  }

  private handleSubmitPurchaseMoneyInput(event) {
    event.preventDefault();
    try {
      const inputMoney: number = $(SELECTOR.CLASS.PURCHASE_ITEM_INPUT).valueAsNumber;

      validateInputPurchaseMoney(inputMoney);
      emitCustomEvent('PURCHASE_MONEY_INPUT', { detail: { inputMoney } });
      showSnackBar(SNACK_BAR_MESSAGE.MONEY_INPUT);
    } catch (error) {
      alert(error.message);
    }
  }

  private handleClickReturnMoneyButton() {
    emitCustomEvent('RETURN_MONEY');
  }

  public render(items: ItemType[], coins: CoinsType, inputMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));

    this.bindSubmitEvent();
    this.bindPurchaseClickEvents();
    this.bindReturnMoneyClickEvent();
  }
}
