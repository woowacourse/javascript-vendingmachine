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
    const { items, InitialCoins, money } = this.vendingMachine;

    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, InitialCoins, money));

    $('#input-money-submit').addEventListener('submit', this.handleSubmitEvent.bind(this));
  }

  private handleSubmitEvent(event) {
    try {
      event.preventDefault();
      const inputMoney = $('.charge-money-input').valueAsNumber;

      this.vendingMachine.chargeMoney(inputMoney);

      this.repaintCurrentMoney(this.vendingMachine.money);
      this.clearInput();
    } catch (error) {
      alert(error.message);
    }
  }

  private repaintCurrentMoney(money: number) {
    $('#current-input-money').textContent = money;
  }

  private clearInput() {
    $('.charge-money-input').value = '';
  }
}
