import { itemManageTabContentTemplate, generateItemManageTableRowTemplate } from './template';
import { selectDom } from './utils';

class ItemManageTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.itemManageTabButton = selectDom('#item-manage-tab-button');
    this.tabContent = selectDom('#tab-content');
    this.itemInfoForm = selectDom('#item-info-form', this.tabContent);
    this.itemInfoInputs = this.itemInfoForm.querySelectorAll('.item-info-input');
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemManageTabButton.addEventListener('click', this.#onClickItemManageTabButton);
    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.#onClickItemStatusTableButton);
  }

  #onClickItemManageTabButton = () => {
    if (this.itemManageTabButton.classList.contains('selected')) {
      return;
    }

    this.#changeTabContent(itemManageTabContentTemplate);
  };

  #onSubmitItemInfoForm = (e) => {
    e.preventDefault();

    const [itemName, itemPrice, itemQuantity] = Array.from(this.itemInfoInputs).map(
      (itemInfoInput) => itemInfoInput.value
    );

    try {
      this.vendingMachine.validateItemInput(
        itemName.trim(),
        Number(itemPrice),
        Number(itemQuantity)
      );
    } catch (error) {
      return alert(error.message);
    }

    const newItem = this.vendingMachine.addItem(
      itemName.trim(),
      Number(itemPrice),
      Number(itemQuantity)
    );
    this.#renderAddedItem(newItem);

    this.itemInfoInputs.forEach((itemInfoInput) => (itemInfoInput.value = ''));
    this.itemInfoInputs[0].focus();
  };

  #onClickItemStatusTableButton = (e) => {
    const targetItem = e.target.closest('tr');
    if (!targetItem) {
      return;
    }

    if (e.target.classList.contains('edit-item-button')) {
      const itemInfoCellList = targetItem.querySelectorAll('.item-info-cell');

      itemInfoCellList.forEach((itemInfoCell) => {
        itemInfoCell.classList.add('editable');
        itemInfoCell.setAttribute('contenteditable', true);
      });
      itemInfoCellList[0].focus();

      const itemButtonCellList = targetItem.querySelectorAll('.item-button-cell');
      itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle('hide'));
      return;
    }

    if (
      e.target.classList.contains('delete-item-button') &&
      confirm('정말 ㅇㅇㅇ 상품을 삭제하시겠습니까?')
    ) {
      const { itemName } = targetItem.dataset;

      this.vendingMachine.deleteItem(itemName);
      targetItem.remove();
      return;
    }

    if (e.target.classList.contains('confirm-item-button')) {
      const itemInfoCellList = targetItem.querySelectorAll('.item-info-cell');
      const [itemName, itemPrice, itemQuantity] = Array.from(itemInfoCellList).map(
        (itemInfoCell) => itemInfoCell.textContent
      );

      try {
        this.vendingMachine.validateItemInput(
          itemName.trim(),
          Number(itemPrice),
          Number(itemQuantity),
          false
        );
      } catch (error) {
        return alert(error.message);
      }
      this.vendingMachine.editItem(
        itemName.trim(),
        Number(itemPrice),
        Number(itemQuantity),
        targetItem.rowIndex - 1
      );

      itemInfoCellList.forEach((itemInfoCell) => {
        itemInfoCell.classList.remove('editable');
        itemInfoCell.setAttribute('contenteditable', false);
      });

      const itemButtonCellList = targetItem.querySelectorAll('.item-button-cell');
      itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle('hide'));
    }
  };

  #changeTabContent(contentTemplate) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);
    this.itemManageTabButton.classList.add('selected');
  }

  #renderAddedItem(newItem) {
    this.itemStatusTable.insertAdjacentHTML(
      'beforeend',
      generateItemManageTableRowTemplate(newItem)
    );
  }
}

export default ItemManageTab;
