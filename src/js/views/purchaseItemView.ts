import { $ } from '../utils/common';
import { purchaseItemTemplate, sectionTemplate } from '../templates/purchaseItemTemplate';
import { SELECTOR } from '../constants/viewConstants';
import VendingMachine from '../vendingMachine/vendingMachine';
import showSnackbar from '../utils/snackbar';

export default class PurchaseItemView {
  private $content: HTMLDivElement;

  constructor(private readonly vendingMachine: VendingMachine) {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render() {
    const { items, InitialCoins, money } = this.vendingMachine;

    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', purchaseItemTemplate(items, InitialCoins, money));

    $('#input-money-submit').addEventListener('submit', this.handleMoneySubmitEvent.bind(this));
    $('#purchase-item-table').addEventListener('click', this.handleTableClickEvent.bind(this));
    $('.return-change-button').addEventListener(
      'click',
      this.handleReturnChangeButtonClick.bind(this)
    );
  }

  private handleMoneySubmitEvent(event) {
    try {
      event.preventDefault();
      const inputMoney = $('.charge-money-input').valueAsNumber;

      this.vendingMachine.chargeMoney(inputMoney);

      this.repaintCurrentMoney(this.vendingMachine.money);
      this.clearInput();
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private handleTableClickEvent(event) {
    try {
      if (!event.target.classList.contains('item-table-purchase-button')) return;
      if (!window.confirm('구매하시겠습니까?')) return;

      const { name, price } = event.target.dataset;
      const remainQuantity = this.vendingMachine.purchaseItem(name, price);

      this.repaintItemQuantity(event.target, remainQuantity);
      this.repaintCurrentMoney(this.vendingMachine.money);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private handleReturnChangeButtonClick() {
    try {
      if (!window.confirm('잔돈을 반환하시겠습니까?')) return;
      const { coins, restMoney } = this.vendingMachine.returnChangeCoins();

      this.repaintCoinsTable(coins);
      this.repaintCurrentMoney(restMoney);

      if (restMoney > 0) {
        throw new Error('반환할 동전이 부족합니다.');
      }
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private repaintCoinsTable(coins) {
    $('#change-coins-table').replaceChildren();
    $('#change-coins-table').insertAdjacentHTML(
      'beforeend',
      sectionTemplate.changeCoinsTable(coins)
    );
  }

  private repaintItemQuantity($targetButton, quantity) {
    const $tableItemQuantity = $targetButton
      .closest('tr')
      .getElementsByClassName('table-item-quantity');

    $tableItemQuantity[0].innerHTML = quantity;
  }

  private repaintCurrentMoney(money: number) {
    $('#current-input-money').textContent = money;
  }

  private clearInput() {
    $('.charge-money-input').value = '';
  }
}
