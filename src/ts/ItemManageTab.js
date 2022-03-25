import {
  generateItemManageTabContentTemplate,
  generateItemManageTableRowTemplate,
} from './template';
import { selectDom, selectDoms } from './utils';

class ItemManageTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.navTabButtonList = selectDoms('.nav-tab-button');
    this.itemManageTabButton = selectDom('#item-manage-tab-button');
    this.tabContent = selectDom('#tab-content');

    this.itemInfoForm = null;
    this.itemInfoInputs = null;
    this.itemStatusTable = null;

    this.itemManageTabButton.addEventListener('click', this.#onClickItemManageTabButton);
  }

  renderInitialTabState() {
    this.#changeTabContent(
      generateItemManageTabContentTemplate(this.vendingMachine.itemList),
      this.itemManageTabButton
    );

    this.itemInfoForm = selectDom('#item-info-form', this.tabContent);
    this.itemInfoInputs = selectDoms('.item-info-input', this.itemInfoForm);
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
    this.itemStatusTable.addEventListener('click', this.#onClickItemStatusTableButton);
  }

  #onClickItemManageTabButton = ({ target: targetTabButton }) => {
    if (this.itemManageTabButton.classList.contains('selected')) {
      return;
    }

    const path = targetTabButton.dataset.hash;
    history.pushState({ path }, null, path);

    this.renderInitialTabState();
  };

  #onSubmitItemInfoForm = (e) => {
    e.preventDefault();

    const [itemName, itemPrice, itemQuantity] = Array.from(this.itemInfoInputs).map(
      (itemInfoInput) => itemInfoInput.value
    );

    try {
      this.vendingMachine.validateItemInput({
        itemName: itemName.trim(),
        itemPrice: Number(itemPrice),
        itemQuantity: Number(itemQuantity),
      });
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
      const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);

      itemInfoInputCellList.forEach((itemInfoInputCell) => {
        itemInfoInputCell.disabled = false;
      });
      itemInfoInputCellList[0].focus();

      const itemButtonCellList = selectDoms('.item-button-cell', targetItem);
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
      const itemInfoInputCellList = selectDoms('.item-info-input-cell', targetItem);
      const [itemName, itemPrice, itemQuantity] = Array.from(itemInfoInputCellList).map(
        (itemInfoInputCell) => itemInfoInputCell.value
      );

      try {
        this.vendingMachine.validateItemInput(
          {
            itemName: itemName.trim(),
            itemPrice: Number(itemPrice),
            itemQuantity: Number(itemQuantity),
          },
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

      itemInfoInputCellList.forEach((itemInfoInputCell) => {
        itemInfoInputCell.disabled = true;
      });

      const itemButtonCellList = selectDoms('.item-button-cell', targetItem);
      itemButtonCellList.forEach((itemButtonCell) => itemButtonCell.classList.toggle('hide'));

      targetItem.dataset.itemName = itemName.trim();
    }
  };

  #changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle('selected', targetTabButton === navTabButton)
    );
  }

  #renderAddedItem(newItem) {
    this.itemStatusTable.insertAdjacentHTML(
      'beforeend',
      generateItemManageTableRowTemplate(newItem)
    );
  }
}

export default ItemManageTab;
