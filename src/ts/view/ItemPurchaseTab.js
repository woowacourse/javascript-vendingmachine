import { generateItemPurchaseContentTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';
import VendingMachineTab from './VendingMachineTab';

class ItemPurchaseTab extends VendingMachineTab {
  constructor(vendingMachine, itemManage, coinRecharge) {
    super(vendingMachine);
    this.itemManage = itemManage;
    this.coinRecharge = coinRecharge;
    this.itemPurchaseTabButton = selectDom('#item-purchase-tab-button');
  }

  renderInitialItemPurchaseTabState() {
    this.changeTabContent(
      generateItemPurchaseContentTemplate(
        this.vendingMachine.money,
        this.itemManage.itemList,
        this.vendingMachine.change
      ),
      this.itemPurchaseTabButton
    );

    this.itemPurchaseForm = selectDom('#item-purchase-form', this.tabContent);
    this.itemPurchaseInput = selectDom('.item-purchase-input', this.itemPurchaseForm);
    this.inputAmountText = selectDom('#input-amount', this.tabContent);
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemPurchaseForm.addEventListener('submit', this.#onSubmitItemPurchaseForm);
    this.itemStatusTable.addEventListener('click', this.#onClickPurchaseItemButton);

    this.itemPurchaseInput.focus();
  }

  #onSubmitItemPurchaseForm = (e) => {
    e.preventDefault();

    const moneyInput = this.itemPurchaseInput.valueAsNumber;

    try {
      this.vendingMachine.validateMoneyInput(moneyInput);
    } catch (error) {
      alert(error.message);
      this.itemPurchaseInput.value = '';
      this.itemPurchaseInput.focus();
      return;
    }
    this.vendingMachine.insertMoney(moneyInput);
    this.inputAmountText.textContent = this.vendingMachine.money;
  };

  #onClickPurchaseItemButton = ({ target }) => {
    if (target.classList.contains('purchase-item-button')) {
      const targetItem = target.closest('tr');
      const targetItemInfoIndex = this.itemManage.itemList.findIndex(
        (itemInfo) => itemInfo.itemName === targetItem.dataset.itemName
      );
      const { itemQuantity, itemPrice } = this.itemManage.itemList[targetItemInfoIndex];

      try {
        this.vendingMachine.validatePurchasingBehavior(
          itemQuantity,
          itemPrice,
          this.vendingMachine.money
        );
      } catch (error) {
        alert(error.message);
        return;
      }

      this.vendingMachine.purchaseItem(itemPrice);
      this.itemManage.itemList[targetItemInfoIndex].itemQuantity -= 1;

      const itemQuantityCell = selectDom('.item-quantity', targetItem);
      itemQuantityCell.textContent = itemQuantity - 1;
      this.inputAmountText.textContent = this.vendingMachine.money;
    }
  };
}

export default ItemPurchaseTab;
