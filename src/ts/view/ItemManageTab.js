import { SELECTOR, SELECTOR_NAME } from '../constant/selector';
import {
  generateConfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import AdminPage from './AdminPage';

class ItemManageTab extends AdminPage {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.itemManageTabButton = null;
    this.itemInfoForm = null;
    this.itemInfoInputs = null;
    this.itemStatusTable = null;
  }

  renderInitialItemManageTabState() {
    this.renderNavBar();
    this.itemManageTabButton = selectDom(SELECTOR.ITEM_MANAGE_TAB_BUTTON);

    this.changeTabContent(
      generateItemManageTabContentTemplate(this.vendingMachine.itemList),
      this.itemManageTabButton
    );

    this.itemInfoForm = selectDom(SELECTOR.ITEM_INFO_FORM, this.tabContent);
    this.itemInfoInputs = selectDoms(SELECTOR.ITEM_INFO_INPUT, this.itemInfoForm);
    this.itemStatusTable = selectDom(SELECTOR.ITEM_STATUS_TABLE, this.tabContent);

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

    this.itemInfoInputs.forEach((itemInfoInput) => {
      itemInfoInput.value = '';
    });
    this.itemInfoInputs[0].focus();
  };

  #onClickItemStatusTableButton = ({ target }) => {
    const targetItem = target.closest(SELECTOR.TABLE_ROW);
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
    const targetItem = target.closest(SELECTOR.TABLE_ROW);

    if (key === 'Enter' && !!targetItem) {
      this.#handleConfirmButtonClickEvent(targetItem);
    }
  };

  #handleEditButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms(SELECTOR.ITEM_INFO_INPUT_CELL, targetItem);
    const itemButtonCellList = selectDoms(SELECTOR.ITEM_BUTTON_CELL, targetItem);

    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
    itemInfoInputCellList[0].focus();
  }

  #handleDeleteButtonClickEvent(targetItem) {
    const { itemName } = targetItem.dataset;

    this.vendingMachine.deleteItem(itemName);
    targetItem.remove();
  }

  #handleConfirmButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms(SELECTOR.ITEM_INFO_INPUT_CELL, targetItem);
    const itemInfo = this.#convertToItemInfoObject(Array.from(itemInfoInputCellList));
    const itemButtonCellList = selectDoms(SELECTOR.ITEM_BUTTON_CELL, targetItem);
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
    const itemInfoInputCellList = selectDoms(SELECTOR.ITEM_INFO_INPUT_CELL, targetItem);
    const itemButtonCellList = selectDoms(SELECTOR.ITEM_BUTTON_CELL, targetItem);

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
    itemButtonCellList.forEach((itemButtonCell) =>
      itemButtonCell.classList.toggle(SELECTOR_NAME.HIDE)
    );
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
    return target.classList.contains(SELECTOR_NAME.EDIT_ITEM_BUTTON);
  }

  #isDeleteItemButton(target) {
    return target.classList.contains(SELECTOR_NAME.DELETE_ITEM_BUTTON);
  }

  #isConfirmItemButton(target) {
    return target.classList.contains(SELECTOR_NAME.CONFIRM_ITEM_BUTTON);
  }

  #isCancelItemButton(target) {
    return target.classList.contains(SELECTOR_NAME.CANCEL_ITEM_BUTTON);
  }
}

export default ItemManageTab;
