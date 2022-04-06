import {
  generateConfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import VendingMachineTab from './VendingMachineTab';

class ItemManageTab extends VendingMachineTab {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.itemManageTabButton = null;
    this.itemInfoForm = null;
    this.itemInfoInputs = null;
    this.itemStatusTable = null;
  }

  renderInitialItemManageTabState() {
    this.renderNavBar();
    this.itemManageTabButton = selectDom('#item-manage-tab-button');

    this.changeTabContent(
      generateItemManageTabContentTemplate(this.vendingMachine.itemList),
      this.itemManageTabButton
    );

    this.itemInfoForm = selectDom('#item-info-form', this.tabContent);
    this.itemInfoInputs = selectDoms('.item-info-input', this.itemInfoForm);
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.#onClickItemStatusTableButton);
    this.itemStatusTable.addEventListener('keydown', this.#onKeyDownItemInfoRow);

    this.itemInfoInputs[0].focus();
  }

  #onSubmitItemInfoForm = (e) => {
    e.preventDefault();

    const itemInfo = this.#convertToItemInfoObject(Array.from(this.itemInfoInputs));

    try {
      this.vendingMachine.validateItemInput(itemInfo);
    } catch (error) {
      showSnackbar(this.snackbar, error.message);
      return;
    }

    const newItem = this.vendingMachine.addItem(itemInfo);
    this.#renderAddedItem(newItem);

    this.itemInfoInputs.forEach((itemInfoInput) => (itemInfoInput.value = ''));
    this.itemInfoInputs[0].focus();
  };

  #onClickItemStatusTableButton = ({ target }) => {
    const targetItem = target.closest('tr');
    if (!targetItem) {
      return;
    }

    if (this.#isEditItemButton(target)) {
      this.#handleEditButtonClickEvent(targetItem);
      return;
    }

    if (
      this.#isDeleteItemButton(target) &&
      confirm(generateConfirmMessage(targetItem.dataset.itemName))
    ) {
      this.#handleDeleteButtonClickEvent(targetItem);
      return;
    }

    if (this.#isConfirmItemButton(target)) {
      this.#handleConfirmButtonClickEvent(targetItem);
    }

    if (this.#isCancelItemButton(target)) {
      this.#handleCancelButtonClickEvent(targetItem);
    }
  };

  #onKeyDownItemInfoRow = ({ key, target }) => {
    const targetItem = target.closest('tr');

    if (key === 'Enter' && !!targetItem) {
      this.#handleConfirmButtonClickEvent(targetItem);
    }
  };

  #handleEditButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);
    const itemButtonCellList = selectDoms('.item-button-cell', targetItem);

    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
    itemInfoInputCellList[0].focus();
  }

  #handleDeleteButtonClickEvent(targetItem) {
    const { itemName } = targetItem.dataset;

    this.vendingMachine.deleteItem(itemName);
    targetItem.remove();
  }

  #handleConfirmButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);
    const itemInfo = this.#convertToItemInfoObject(Array.from(itemInfoInputCellList));
    const itemButtonCellList = selectDoms('.item-button-cell', targetItem);
    const itemIndex = targetItem.rowIndex - 1;
    try {
      this.vendingMachine.validateItemInput(itemInfo, itemIndex, false);
    } catch (error) {
      showSnackbar(this.snackbar, error.message);
      return;
    }
    this.vendingMachine.editItem(itemInfo, itemIndex);

    targetItem.dataset.itemName = itemInfo.itemName.trim();
    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList);
  }

  #handleCancelButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);
    const itemButtonCellList = selectDoms('.item-button-cell', targetItem);

    const originalItemInfo = Object.values(this.vendingMachine.itemList[targetItem.rowIndex - 1]);
    itemInfoInputCellList.forEach((input, index) => {
      input.value = originalItemInfo[index];
    });
    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList);
  }

  #toggleEditMode(itemInfoInputCellList, itemButtonCellList, isDisabled = true) {
    itemInfoInputCellList.forEach((itemInfoInputCell) => {
      itemInfoInputCell.disabled = isDisabled;
    });
    itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle('hide'));
  }

  #convertToItemInfoObject(itemInfoInputCellArray) {
    const [itemName, itemPrice, itemQuantity] = itemInfoInputCellArray.map(
      (itemInfoInputCell) => itemInfoInputCell.value
    );

    return {
      itemName: itemName.trim(),
      itemPrice: Number(itemPrice),
      itemQuantity: Number(itemQuantity),
    };
  }

  #renderAddedItem(newItem) {
    this.itemStatusTable.insertAdjacentHTML(
      'beforeend',
      generateItemManageTableRowTemplate(newItem)
    );
  }

  #isEditItemButton(target) {
    return target.classList.contains('edit-item-button');
  }

  #isDeleteItemButton(target) {
    return target.classList.contains('delete-item-button');
  }

  #isConfirmItemButton(target) {
    return target.classList.contains('confirm-item-button');
  }

  #isCancelItemButton(target) {
    return target.classList.contains('cancel-item-button');
  }
}

export default ItemManageTab;
