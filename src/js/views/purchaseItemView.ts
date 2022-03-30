import { $ } from '../utils/common';
import { purchaseItemTemplate } from '../templates/purchaseItemTemplate';
import { SELECTOR } from '../constants/viewConstants';
import VendingMachine from '../vendingMachine/vendingMachine';

export default class PurchaseItemView {
  private $content: HTMLDivElement;

  constructor(private readonly vendingMachine: VendingMachine) {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render() {
    const { items } = this.vendingMachine;
    const coins = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
    const inputMoney = 0;
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, coins, inputMoney));
  }
}
