import { $, $$, showSnackBar } from '../utils/common';
import { purchaseItemTemplate } from '../templates/purchaseItemTemplate';
import { SELECTOR } from '../constants/constants';
import { CoinsType, ItemType } from '../types';
import { emitCustomEvent } from '../utils/common';
import { validateInputPurchaseMoney } from '../validates/validates';

export default class PurchaseItemView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  bindSubmitEvent() {
    $('#purchase-item-form').addEventListener(
      'submit',
      this.handleSubmitPurchaseMoneyInput.bind(this),
    );
  }

  bindPurchaseClickEvents() {
    $$('.item-table-purchase-button').forEach(button => this.bindTargetPurchaseClick(button));
  }

  bindTargetPurchaseClick(button) {
    button.addEventListener('click', () => {
      const $targetTableRow = button.closest('tr');
      const itemName: string = $targetTableRow
        .getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_NAME)[0]
        .textContent.trim();

      emitCustomEvent('PURCHASE_ITEM', { detail: { itemName } });
    });
  }

  bindReturnMoneyClickEvent() {
    $('.return-money-button').addEventListener(
      'click',
      this.handleClickReturnMoneyButton.bind(this),
    );
  }

  handleSubmitPurchaseMoneyInput(event) {
    event.preventDefault();
    try {
      const inputMoney: number = $(SELECTOR.CLASS.PURCHASE_ITEM_INPUT).valueAsNumber;

      validateInputPurchaseMoney(inputMoney);
      emitCustomEvent('PURCHASE_MONEY_INPUT', { detail: { inputMoney } });
      showSnackBar('금액을 투입하였습니다.');
    } catch (error) {
      alert(error.message);
    }
  }

  handleClickReturnMoneyButton() {
    emitCustomEvent('RETURN_MONEY');
  }

  render(items: ItemType[], coins: CoinsType, inputMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));

    this.bindSubmitEvent();
    this.bindPurchaseClickEvents();
    this.bindReturnMoneyClickEvent();
  }
}
