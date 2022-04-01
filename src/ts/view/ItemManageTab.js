import VendingMachineTab from './VendingMachineTab';
import {
  generateConfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class ItemManageTab extends VendingMachineTab {
  constructor(vendingMachine, tabHash) {
    super(vendingMachine, tabHash);

    this.itemManageTabButton = selectDom(`#${ID.ITEM_MANAGE_TAB_BUTTON}`);
    this.itemInfoForm = null;
    this.itemInfoInputs = null;
    this.itemStatusTable = null;

    this.itemManageTabButton.addEventListener('click', this.#onClickItemManageTabButton);
  }

  renderInitialTabState() {
    this.changeTabContent(
      generateItemManageTabContentTemplate(this.vendingMachine.itemList),
      this.itemManageTabButton
    );

    this.itemInfoForm = selectDom(`#${ID.ITEM_INFO_FORM}`, this.tabContent);
    this.itemInfoInputs = selectDoms(`.${CLASS.ITEM_INFO_INPUT}`, this.itemInfoForm);
    this.itemStatusTable = selectDom(`.${CLASS.ITEM_STATUS_TABLE}`, this.tabContent);

    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.#onClickItemStatusTableButton);
    this.itemStatusTable.addEventListener('keydown', this.#onKeyDownItemInfoRow);
  }

  #onClickItemManageTabButton = ({
    target: {
      dataset: { hash },
    },
  }) => {
    if (this.itemManageTabButton.classList.contains(`${CLASS.SELECTED}`)) {
      return;
    }
    this.changeHashUrl(hash);
    this.renderInitialTabState();
  };

  #onSubmitItemInfoForm = (e) => {
    e.preventDefault();

    const itemInfo = this.#convertToItemInfoObject(Array.from(this.itemInfoInputs));

    try {
      this.vendingMachine.validateItemInput(itemInfo);
    } catch (error) {
      return alert(error.message);
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
  };

  #onKeyDownItemInfoRow = ({ key, target }) => {
    const targetItem = target.closest('tr');

    if (key === 'Enter' && !!targetItem) {
      this.#handleConfirmButtonClickEvent(targetItem);
    }
  };

  #handleEditButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms(`.${CLASS.ITEM_INFO_INPUT_CELL}`, targetItem);
    const itemButtonCellList = selectDoms(`.${CLASS.ITEM_BUTTON_CELL}`, targetItem);

    itemInfoInputCellList[0].focus();
    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
  }

  #handleDeleteButtonClickEvent(targetItem) {
    const { itemName } = targetItem.dataset;

    this.vendingMachine.deleteItem(itemName);
    targetItem.remove();
  }

  #handleConfirmButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms(`.${CLASS.ITEM_INFO_INPUT_CELL}`, targetItem);
    const itemInfo = this.#convertToItemInfoObject(Array.from(itemInfoInputCellList));
    const itemButtonCellList = selectDoms(`.${CLASS.ITEM_BUTTON_CELL}`, targetItem);
    const itemIndex = targetItem.rowIndex - 1;

    try {
      this.vendingMachine.validateItemInput(itemInfo, false, itemIndex);
    } catch (error) {
      return alert(error.message);
    }
    this.vendingMachine.editItem(itemInfo, itemIndex);

    targetItem.dataset.itemName = itemInfo.itemName.trim();
    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList);
  }

  #toggleEditMode(itemInfoInputCellList, itemButtonCellList, isDisabled = true) {
    itemInfoInputCellList.forEach((itemInfoInputCell) => {
      itemInfoInputCell.disabled = isDisabled;
    });
    itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle(CLASS.HIDE));
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
    return target.classList.contains(CLASS.EDIT_ITEM_BUTTON);
  }

  #isDeleteItemButton(target) {
    return target.classList.contains(CLASS.DELETE_ITEM_BUTTON);
  }

  #isConfirmItemButton(target) {
    return target.classList.contains(CLASS.CONFIRM_ITEM_BUTTON);
  }
}

export default ItemManageTab;
