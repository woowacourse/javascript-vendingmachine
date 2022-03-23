import { itemManageTabContentTemplate, generateItemManageTableRowTemplate } from './template';
import { selectDom } from './utils';

class ItemManageTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.itemManageTabButton = selectDom('#item-manage-tab-button');
    this.tabContent = selectDom('#tab-content');
    this.itemInfoForm = selectDom('#item-info-form', this.tabContent);
    this.itemInfoInputs = Array.from(this.itemInfoForm.querySelectorAll('.item-info-input'));
    this.itemStatusTable = selectDom('.item-status-table', this.tabContent);

    this.itemManageTabButton.addEventListener('click', this.#onClickItemManageTabButton);
    this.itemInfoForm.addEventListener('submit', this.#onSubmitItemInfoForm);
  }

  #onClickItemManageTabButton = () => {
    if (this.itemManageTabButton.classList.contains('selected')) {
      return;
    }

    this.#changeTabContent(itemManageTabContentTemplate);
  };

  #onSubmitItemInfoForm = (e) => {
    e.preventDefault();

    const itemInfo = this.itemInfoInputs.map((itemInfoInput) => itemInfoInput.value);

    try {
      this.vendingMachine.validateItemInput(...itemInfo);
    } catch (error) {
      return alert(error.message);
    }

    const newItem = this.vendingMachine.addItem(...itemInfo);

    this.#renderAddedItem(newItem);
  };

  #changeTabContent(contentTemplate) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);
    this.itemManageTabButton.classList.add('selected');
  }

  #renderAddedItem(newItem) {
    const newItemTemplate = generateItemManageTableRowTemplate(newItem);

    this.itemStatusTable.insertAdjacentHTML('beforeend', newItemTemplate);
  }
}

export default ItemManageTab;
