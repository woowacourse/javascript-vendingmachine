import { $ } from '../../utils/common';
import { manageItemTemplate, sectionTemplate } from '../../templates/main/manageItemTemplate';
import { CONFIRM_MESSAGE } from '../../constants/confirmConstants';
import { SELECTOR } from '../../constants/viewConstants';
import { ItemType } from '../../types/types';
import showSnackbar from '../../utils/snackbar';
import VendingMachine from '../../vendingMachine/vendingMachine';

export default class ManageItemView {
  constructor(private readonly vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  render() {
    const $content = $(SELECTOR.ID.CONTENT);
    const { items } = this.vendingMachine;
    $content.replaceChildren();
    $content.insertAdjacentHTML('beforeend', manageItemTemplate(items));

    $(SELECTOR.ID.ADD_ITEM_FORM).addEventListener('submit', this.handleSubmitEvent.bind(this));
    $(SELECTOR.CLASS.ITEM_TABLE).addEventListener('click', this.handleTableClickEvent.bind(this));
  }

  private handleSubmitEvent(event) {
    try {
      event.preventDefault();
      const item: ItemType = this.getItemFromAddItemInput();

      this.vendingMachine.addItem(item);
      this.clearInput();
      this.appendItemTableRow(item);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private handleTableClickEvent(event) {
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_CHANGE_BUTTON)) {
      this.onChangeButtonClick(event.target);
      return;
    }
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_DELETE_BUTTON)) {
      this.onDeleteButtonClick(event.target);
      return;
    }
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_CONFIRM_BUTTON)) {
      this.onConfirmButtonClick(event.target);
    }
  }

  private onChangeButtonClick($targetButton) {
    const $targetTableRow = $targetButton.closest('tr');
    const item = this.getItemFromTargetButton($targetButton);

    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableRow(item));
  }

  private onDeleteButtonClick($targetButton) {
    const $targetTableRow = $targetButton.closest('tr');
    const item = this.getItemFromTargetButton($targetButton);

    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      this.vendingMachine.deleteItem(item);
      $targetTableRow.remove();
    }
  }

  private onConfirmButtonClick($targetButton) {
    try {
      const $targetTableRow = $targetButton.closest('tr');
      const targetRowIndex = $targetTableRow.rowIndex - 1;
      const item = this.getItemFromChangeInput($targetTableRow);

      this.vendingMachine.changeItem(targetRowIndex, item);
      this.repaintItemTableRow($targetTableRow, item);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private getItemFromAddItemInput() {
    const name: string = $(SELECTOR.ID.ADD_ITEM_NAME).value.trim();
    const price: number = $(SELECTOR.ID.ADD_ITEM_PRICE).valueAsNumber;
    const quantity: number = $(SELECTOR.ID.ADD_ITEM_QUANTITY).valueAsNumber;

    return { name, price, quantity };
  }

  private getItemFromTargetButton($targetButton): ItemType {
    const { name, price, quantity } = $targetButton.dataset;
    return { name, price, quantity };
  }

  private getItemFromChangeInput($targetTableRow): ItemType {
    const name: string = $targetTableRow
      .getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_NAME)[0]
      .value.trim();
    const price: number = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_PRICE
    )[0].valueAsNumber;
    const quantity: number = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_QUANTITY
    )[0].valueAsNumber;

    return { name, price, quantity };
  }

  private appendItemTableRow(item: ItemType) {
    $(SELECTOR.CLASS.ITEM_TABLE_BODY).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.normalTableRow(item)
    );
  }

  private repaintItemTableRow($targetTableRow, item: ItemType) {
    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableRow(item));
  }

  private clearInput() {
    $(SELECTOR.ID.ADD_ITEM_NAME).value = '';
    $(SELECTOR.ID.ADD_ITEM_PRICE).value = '';
    $(SELECTOR.ID.ADD_ITEM_QUANTITY).value = '';
  }
}
