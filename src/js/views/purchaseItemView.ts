import { $ } from '../utils/common';
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

  handleSubmitPurchaseMoneyInput(event: Event) {
    try {
      const inputMoney: number = $(SELECTOR.CLASS.PURCHASE_ITEM_INPUT).valueAsNumber;

      validateInputPurchaseMoney(inputMoney);
      emitCustomEvent('PURCHASE_MONEY_INPUT', { detail: { inputMoney } });
    } catch (error) {
      alert(error.message);
    }
  }

  render(items: ItemType[], coins: CoinsType, inputMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));

    this.bindSubmitEvent();
  }
}
