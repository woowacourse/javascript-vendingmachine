import VendingMachineTab from './VendingMachineTab';
import { ItemInfoType } from '../types';
import {
  generateItemPurchaseTabContentTemplate,
  generateItemPurchaseTableDataTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class ItemPurchaseTab extends VendingMachineTab {
  private cashChargeForm: HTMLFormElement | null;

  private cashChargeInput: HTMLInputElement | null;

  private chargedAmountSpan: HTMLSpanElement | null;

  private itemStatusTable: HTMLTableElement | null;

  render(): void {
    const itemList: ItemInfoType[] = this.vendingMachine.itemList;
    const chargedCash = this.vendingMachine.getItemPurchaseCash();

    this.changeTabContent(generateItemPurchaseTabContentTemplate(itemList, chargedCash));

    this.bindEvent();
  }

  private bindEvent(): void {
    this.cashChargeForm = selectDom(`#${ID.CASH_CHARGE_FORM}`);
    this.cashChargeInput = selectDom(`.${CLASS.CASH_CHARGE_INPUT}`);
    this.chargedAmountSpan = selectDom(`#${ID.CHARGED_AMOUNT}`);
    this.itemStatusTable = selectDom(`.${CLASS.ITEM_STATUS_TABLE}`);

    this.cashChargeForm.addEventListener('submit', this.onSubmitCashChargeForm);
    this.itemStatusTable.addEventListener('click', this.onClickPurchaseItemButton);
  }

  private onSubmitCashChargeForm = (e: SubmitEvent) => {
    e.preventDefault();

    const inputedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateItemPurchaseCashInput(inputedCash);
    } catch (error) {
      return alert(error.message);
    }

    const chargedAmount = this.vendingMachine.chargeCash(inputedCash);
    this.renderChargedAmount(String(chargedAmount));
  };

  private onClickPurchaseItemButton = ({ target }: MouseEvent) => {
    const targetElement = target as HTMLElement;

    if (!targetElement.classList.contains(CLASS.PURCHASE_ITEM_BUTTON)) {
      return;
    }

    const targetItem: HTMLTableRowElement = targetElement.closest('tr');
    const itemIndex = targetItem.rowIndex - 1;

    try {
      this.vendingMachine.purchaseItem(itemIndex);
    } catch (error) {
      alert(error.message);
      return;
    }

    const itemInfo: ItemInfoType = this.vendingMachine.itemList[itemIndex];
    const chargedAmount = this.vendingMachine.getItemPurchaseCash();

    targetItem.replaceChildren();
    targetItem.insertAdjacentHTML('afterbegin', generateItemPurchaseTableDataTemplate(itemInfo));
    this.renderChargedAmount(String(chargedAmount));
  };

  private renderChargedAmount(chargedAmount: string): void {
    this.chargedAmountSpan.textContent = chargedAmount;
  }
}

export default ItemPurchaseTab;
