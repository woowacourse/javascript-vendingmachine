import { $ } from '../utils/common';
import { purchaseItemTemplate } from '../templates/purchaseItemTemplate';
import { SELECTOR } from '../constants/viewConstants';
import { CoinsType, ItemType } from '../types/types';

export default class PurchaseItemView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render(items: ItemType[], coins: CoinsType, inputMoney: number) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));
  }
}
