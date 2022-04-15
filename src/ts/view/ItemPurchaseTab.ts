import VendingMachineTab from './VendingMachineTab';
import { ItemInfoType, CoinKind, CoinInterface, DOMEvent } from '../types';
import {
  generateItemPurchaseTabContentTemplate,
  generateItemPurchaseTableDataTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import Snackbar from '../utils/snackbar';
import { ID, CLASS } from '../constant/selector';

class ItemPurchaseTab extends VendingMachineTab {
  private cashChargeForm: HTMLFormElement | null;

  private cashChargeInput: HTMLInputElement | null;

  private chargedAmountSpan: HTMLSpanElement | null;

  private itemStatusTable: HTMLTableElement | null;

  private returnButton: HTMLButtonElement | null;

  private coinCountsTableCells: NodeListOf<HTMLTableCellElement>;

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
    this.returnButton = selectDom(`.${CLASS.RETURN_BUTTON}`);
    this.coinCountsTableCells = selectDoms(`.${CLASS.COIN_COUNT}`);

    this.cashChargeForm.addEventListener('submit', this.onSubmitCashChargeForm);
    this.itemStatusTable.addEventListener('click', this.onClickPurchaseItemButton);
    this.returnButton.addEventListener('click', this.onClickReturnCoinButton);
  }

  private onSubmitCashChargeForm = (e: SubmitEvent) => {
    e.preventDefault();

    const inputtedCashAmount = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateItemPurchaseCashInput(inputtedCashAmount);
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }

    const chargedAmount = this.vendingMachine.chargeCash(inputtedCashAmount);
    this.renderChargedAmount(String(chargedAmount));
  };

  private onClickPurchaseItemButton = ({ target }: DOMEvent) => {
    if (!target.classList.contains(CLASS.PURCHASE_ITEM_BUTTON)) {
      return;
    }

    const targetItem: HTMLTableRowElement = target.closest('tr');
    const itemIndex = targetItem.rowIndex - 1;

    try {
      this.vendingMachine.purchaseItem(itemIndex);
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }

    const itemInfo: ItemInfoType = this.vendingMachine.itemList[itemIndex];
    const chargedAmount = this.vendingMachine.getItemPurchaseCash();

    this.renderItemInfo(targetItem, itemInfo);
    this.renderChargedAmount(String(chargedAmount));
  };

  private onClickReturnCoinButton = () => {
    let returnedCoinCollection: Record<CoinKind, CoinInterface>;

    try {
      returnedCoinCollection = this.vendingMachine.returnCoin();
    } catch (error) {
      Snackbar.show(error.message);

      this.renderReturnedCoinTable();
      return;
    }

    const chargedAmount = this.vendingMachine.getItemPurchaseCash();

    this.renderChargedAmount(String(chargedAmount));
    this.renderReturnedCoinTable(returnedCoinCollection);
  };

  private renderChargedAmount(chargedAmount: string): void {
    this.chargedAmountSpan.textContent = chargedAmount;
  }

  private renderItemInfo(targetItem: HTMLTableRowElement, itemInfo: ItemInfoType) {
    targetItem.replaceChildren();
    targetItem.insertAdjacentHTML('afterbegin', generateItemPurchaseTableDataTemplate(itemInfo));
  }

  private renderReturnedCoinTable(
    returnedCoinCollection: Record<CoinKind, CoinInterface> = null
  ): void {
    this.coinCountsTableCells.forEach((coinCountsTableCell) => {
      const { coinValue } = coinCountsTableCell.dataset;
      const coinCount = returnedCoinCollection ? returnedCoinCollection[coinValue].count : 0;

      coinCountsTableCell.textContent = `${coinCount}개`;
    });
  }
}

export default ItemPurchaseTab;
