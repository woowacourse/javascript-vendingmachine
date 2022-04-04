import { generateItemPurchaseContentTemplate } from '../template';
import { selectDom } from '../utils';
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

    this.itemPurchaseForm.addEventListener('submit', this.#onSubmitItemPurchaseForm);

    this.itemPurchaseInput.focus();
  }

  #onSubmitItemPurchaseForm = (e) => {
    e.preventDefault();
  };
}

export default ItemPurchaseTab;
