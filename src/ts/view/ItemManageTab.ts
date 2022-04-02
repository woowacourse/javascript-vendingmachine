import VendingMachineTab from './VendingMachineTab';
import { ItemInfoType, Hash, VendingMachineInterface } from '../types';
import {
  generateConfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class ItemManageTab extends VendingMachineTab {
  itemManageTabButton: HTMLElement | null = selectDom(`#${ID.ITEM_MANAGE_TAB_BUTTON}`);

  itemInfoForm: HTMLElement | null = null;

  itemInfoInputs: NodeListOf<HTMLInputElement> | null = null;

  itemStatusTable: HTMLElement | null = null;

  constructor(vendingMachine: VendingMachineInterface, tabHash: Hash) {
    super(vendingMachine, tabHash);

    this.itemManageTabButton?.addEventListener('click', this.onClickItemManageTabButton);
  }

  renderInitialTabState() {
    this.changeTabContent(
      generateItemManageTabContentTemplate(this.vendingMachine.itemList),
      this.itemManageTabButton
    );

    this.itemInfoForm = selectDom(`#${ID.ITEM_INFO_FORM}`, this.tabContent);
    this.itemInfoInputs = selectDoms<HTMLInputElement>(
      `.${CLASS.ITEM_INFO_INPUT}`,
      this.itemInfoForm
    );
    this.itemStatusTable = selectDom(`.${CLASS.ITEM_STATUS_TABLE}`, this.tabContent);

    this.itemInfoForm.addEventListener('submit', this.onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.onClickItemStatusTableButton);
    this.itemStatusTable.addEventListener('keydown', this.onKeyDownItemInfoRow);
  }

  private onClickItemManageTabButton = ({ target }: MouseEvent): void => {
    const targetElement = target as HTMLElement;
    const hash = targetElement.dataset.hash as Hash;

    if (this.itemManageTabButton.classList.contains(`${CLASS.SELECTED}`)) {
      return;
    }
    this.changeHashUrl(hash);
    this.renderInitialTabState();
  };

  private onSubmitItemInfoForm = (e: SubmitEvent): void => {
    e.preventDefault();

    const itemInfo: ItemInfoType = this.convertToItemInfoObject(Array.from(this.itemInfoInputs));

    try {
      this.vendingMachine.validateItemInput(itemInfo);
    } catch (error) {
      alert(error.message);
      return;
    }

    const newItem: ItemInfoType = this.vendingMachine.addItem(itemInfo);
    this.renderAddedItem(newItem);

    this.itemInfoInputs.forEach((itemInfoInput: HTMLInputElement) => {
      itemInfoInput.value = '';
    });

    const itemNameInput = this.itemInfoInputs[0] as HTMLInputElement;
    itemNameInput.focus();
  };

  private onClickItemStatusTableButton = ({ target }: MouseEvent): void => {
    const targetElement = target as HTMLElement;

    const targetItem: HTMLTableRowElement = targetElement.closest('tr');
    if (!targetItem) {
      return;
    }

    if (this.isEditItemButton(targetElement)) {
      this.handleEditButtonClickEvent(targetItem);
      return;
    }

    if (
      this.isDeleteItemButton(targetElement) &&
      window.confirm(generateConfirmMessage(targetItem.dataset.itemName))
    ) {
      this.handleDeleteButtonClickEvent(targetItem);
      return;
    }

    if (this.isConfirmItemButton(targetElement)) {
      this.handleConfirmButtonClickEvent(targetItem);
    }
  };

  private onKeyDownItemInfoRow = ({ key, target }: KeyboardEvent): void => {
    const targetElement = target as HTMLElement;

    const targetItem: HTMLTableRowElement = targetElement.closest('tr');

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

    (itemInfoInputCellList[0] as HTMLInputElement).focus();
    this.toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
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
      alert(error.message);
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

  private convertToItemInfoObject(itemInfoInputCellArray: Element[]): ItemInfoType {
    const [itemName, itemPrice, itemQuantity] = itemInfoInputCellArray.map(
      (itemInfoInputCell) => (itemInfoInputCell as HTMLInputElement).value
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
