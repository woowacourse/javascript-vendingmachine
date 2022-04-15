import VendingMachineTab from './VendingMachineTab';
import { ItemInfoType, DOMEvent } from '../types';
import {
  generateConfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';
import Snackbar from '../utils/snackbar';

class ItemManageTab extends VendingMachineTab {
  itemInfoForm: HTMLElement | null = null;

  itemInfoInputs: NodeListOf<HTMLInputElement> | null = null;

  itemStatusTable: HTMLElement | null = null;

  render(): void {
    this.changeTabContent(generateItemManageTabContentTemplate(this.vendingMachine.itemList));

    this.itemInfoForm = selectDom(`#${ID.ITEM_INFO_FORM}`, this.content);
    this.itemInfoInputs = selectDoms<HTMLInputElement>(
      `.${CLASS.ITEM_INFO_INPUT}`,
      this.itemInfoForm
    );
    this.itemStatusTable = selectDom(`.${CLASS.ITEM_STATUS_TABLE}`, this.content);

    this.itemInfoForm.addEventListener('submit', this.onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.onClickItemStatusTableButton);
    this.itemStatusTable.addEventListener('keydown', this.onKeyDownItemInfoRow);
  }

  private onSubmitItemInfoForm = (e: SubmitEvent): void => {
    e.preventDefault();

    const itemInfo: ItemInfoType = this.convertToItemInfoObject(Array.from(this.itemInfoInputs));

    try {
      this.vendingMachine.validateItemInput(itemInfo);
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }

    const newItem: ItemInfoType = this.vendingMachine.addItem(itemInfo);
    this.renderAddedItem(newItem);

    this.itemInfoInputs.forEach((itemInfoInput: HTMLInputElement) => {
      itemInfoInput.value = '';
    });

    const itemNameInput = this.itemInfoInputs[0];
    itemNameInput.focus();
  };

  private onClickItemStatusTableButton = ({ target }: DOMEvent): void => {
    const targetItem: HTMLTableRowElement = target.closest('tr');
    if (!targetItem) {
      return;
    }

    if (this.isEditItemButton(target)) {
      this.handleEditButtonClickEvent(targetItem);
      return;
    }

    if (
      this.isDeleteItemButton(target) &&
      window.confirm(generateConfirmMessage(targetItem.dataset.itemName))
    ) {
      this.handleDeleteButtonClickEvent(targetItem);
      return;
    }

    if (this.isConfirmItemButton(target)) {
      this.handleConfirmButtonClickEvent(targetItem);
    }
  };

  private onKeyDownItemInfoRow = ({ key, target }: DOMEvent): void => {
    const targetItem: HTMLTableRowElement = target.closest('tr');

    if (key === 'Enter' && !!targetItem) {
      this.handleConfirmButtonClickEvent(targetItem);
    }
  };

  private handleEditButtonClickEvent(targetItem: HTMLTableRowElement): void {
    const itemInfoInputCellList: NodeListOf<HTMLInputElement> = selectDoms(
      `.${CLASS.ITEM_INFO_INPUT_CELL}`,
      targetItem
    );
    const itemButtonCellList: NodeListOf<HTMLButtonElement> = selectDoms(
      `.${CLASS.ITEM_BUTTON_CELL}`,
      targetItem
    );

    this.toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
    itemInfoInputCellList[0].focus();
  }

  private handleDeleteButtonClickEvent(targetItem: HTMLTableRowElement) {
    const { itemName } = targetItem.dataset;

    this.vendingMachine.deleteItem(itemName);
    targetItem.remove();
  }

  private handleConfirmButtonClickEvent(targetItem: HTMLTableRowElement): void | never {
    const itemInfoInputCellList: NodeListOf<HTMLInputElement> = selectDoms(
      `.${CLASS.ITEM_INFO_INPUT_CELL}`,
      targetItem
    );
    const itemInfo = this.convertToItemInfoObject(Array.from(itemInfoInputCellList));
    const itemButtonCellList: NodeListOf<HTMLButtonElement> = selectDoms(
      `.${CLASS.ITEM_BUTTON_CELL}`,
      targetItem
    );
    const itemIndex = targetItem.rowIndex - 1;

    try {
      this.vendingMachine.validateItemInput(itemInfo, false, itemIndex);
    } catch (error) {
      Snackbar.show(error.message);
      return;
    }
    this.vendingMachine.editItem(itemInfo, itemIndex);

    targetItem.dataset.itemName = itemInfo.itemName.trim();
    this.toggleEditMode(itemInfoInputCellList, itemButtonCellList);
  }

  private toggleEditMode(
    itemInfoInputCellList: NodeListOf<HTMLInputElement>,
    itemButtonCellList: NodeListOf<HTMLButtonElement>,
    isDisabled = true
  ): void {
    itemInfoInputCellList.forEach((itemInfoInputCell) => {
      itemInfoInputCell.disabled = isDisabled;
    });
    itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle(CLASS.HIDE));
  }

  private convertToItemInfoObject(itemInfoInputCellArray: HTMLInputElement[]): ItemInfoType {
    const [itemName, itemPrice, itemQuantity] = itemInfoInputCellArray.map(
      (itemInfoInputCell) => itemInfoInputCell.value
    );

    return {
      itemName: itemName.trim(),
      itemPrice: Number(itemPrice),
      itemQuantity: Number(itemQuantity),
    };
  }

  private renderAddedItem(newItem: ItemInfoType) {
    this.itemStatusTable.insertAdjacentHTML(
      'beforeend',
      generateItemManageTableRowTemplate(newItem)
    );
  }

  private isEditItemButton(target: HTMLElement) {
    return target.classList.contains(CLASS.EDIT_ITEM_BUTTON);
  }

  private isDeleteItemButton(target: HTMLElement) {
    return target.classList.contains(CLASS.DELETE_ITEM_BUTTON);
  }

  private isConfirmItemButton(target: HTMLElement) {
    return target.classList.contains(CLASS.CONFIRM_ITEM_BUTTON);
  }
}

export default ItemManageTab;
