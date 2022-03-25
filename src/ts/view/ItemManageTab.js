import {
  generateComfirmMessage,
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from '../template';
import { selectDom, selectDoms } from '../utils';
import VendingMachineTab from './VendingMachineTab';

class ItemManageTab extends VendingMachineTab {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.itemManageTabButton = selectDom('#item-manage-tab-button');
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

    this.itemInfoForm = selectDom('#item-info-form', this.tabContent);
    this.itemInfoInputs = selectDoms('.item-info-input', this.itemInfoForm);
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.#onClickItemStatusTableButton);
  }

  #onClickItemManageTabButton = ({
    target: {
      dataset: { hash },
    },
  }) => {
    if (this.itemManageTabButton.classList.contains('selected')) {
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
      confirm(generateComfirmMessage(targetItem.dataset.itemName))
    ) {
      this.#handleDeleteButtonClickEvent(targetItem);
      return;
    }

    if (this.#isConfirmItemButton(target)) {
      this.#handleConfirmButtonClickEvent(targetItem);
    }
  };

  #handleEditButtonClickEvent(targetItem) {
    const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);
    const itemButtonCellList = selectDoms('.item-button-cell', targetItem);

    itemInfoInputCellList[0].focus();
    this.#toggleEditMode(itemInfoInputCellList, itemButtonCellList, false);
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

    try {
      this.vendingMachine.validateItemInput(itemInfo, false);
    } catch (error) {
      return alert(error.message);
    }
    this.vendingMachine.editItem(itemInfo, targetItem.rowIndex - 1);

    targetItem.dataset.itemName = itemInfo.itemName.trim();
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
}

export default ItemManageTab;
