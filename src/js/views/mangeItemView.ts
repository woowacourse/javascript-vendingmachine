import { $, emit } from '../utils/common';
import { manageItemTemplate, sectionTemplate } from '../templates/manageItemTemplate';
import { validateAddItemInput } from '../validates/validates';
import { CUSTOM_EVENT } from '../constants/appContants';
import { SELECTOR } from '../constants/viewConstants';
import { CONFIRM_MESSAGE } from '../constants/confirmConstants';
import { ItemType } from '../types/types';

export default class ManageItemView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  render(items: ItemType[]) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', manageItemTemplate(items));

    $(SELECTOR.ID.ADD_ITEM_FORM).addEventListener('submit', this.handleSubmitEvent.bind(this));
    $(SELECTOR.CLASS.ITEM_TABLE).addEventListener('click', this.handleTableClickEvent.bind(this));
  }

  appendItemTableRow(item: ItemType) {
    $(SELECTOR.CLASS.ITEM_TABLE_BODY).insertAdjacentHTML(
      'beforeend',
      sectionTemplate.normalTableRow(item)
    );
  }

  repaintItemTableRow($targetTableRow, item: ItemType) {
    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableRow(item));
  }

  clearInput() {
    $(SELECTOR.ID.ADD_ITEM_NAME).value = '';
    $(SELECTOR.ID.ADD_ITEM_PRICE).value = '';
    $(SELECTOR.ID.ADD_ITEM_QUANTITY).value = '';
  }

  private handleSubmitEvent(event) {
    event.preventDefault();
    try {
      const item: ItemType = this.getItemFromAddItemInput();

      validateAddItemInput(item);

      emit({ eventName: CUSTOM_EVENT.ADD_ITEM, detail: { item } });
    } catch (error) {
      alert(error.message);
    }
  }

  private handleTableClickEvent(event) {
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_CHANGE_BUTTON)) {
      const $targetTableRow = event.target.closest('tr');
      this.onChangeButtonClick($targetTableRow);
      return;
    }
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_DELETE_BUTTON)) {
      const $targetTableRow = event.target.closest('tr');
      this.onDeleteButtonClick($targetTableRow);
      return;
    }
    if (event.target.classList.contains(SELECTOR.CLASS_STRING.ITEM_TABLE_CONFIRM_BUTTON)) {
      const $targetTableRow = event.target.closest('tr');
      this.onConfirmButtonClick($targetTableRow);
    }
  }

  private onChangeButtonClick($targetTableRow) {
    const item = this.getItemFromTargetTableRow($targetTableRow);

    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableRow(item));
  }

  private onDeleteButtonClick($targetTableRow) {
    const item = this.getItemFromTargetTableRow($targetTableRow);

    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      emit({ eventName: CUSTOM_EVENT.TABLE_ITEM_DELETE, detail: { item } });
      $targetTableRow.remove();
    }
  }

  private onConfirmButtonClick($targetTableRow) {
    try {
      const targetRowIndex = $targetTableRow.rowIndex - 1;
      const item = this.getItemFromChangeInput($targetTableRow);

      validateAddItemInput(item);

      emit({
        eventName: CUSTOM_EVENT.TABLE_ITEM_CHANGE,
        detail: { item, targetRowIndex, $targetTableRow },
      });
    } catch (error) {
      alert(error.message);
    }
  }

  private getItemFromAddItemInput() {
    const name: string = $(SELECTOR.ID.ADD_ITEM_NAME).value.trim();
    const price: number = $(SELECTOR.ID.ADD_ITEM_PRICE).valueAsNumber;
    const quantity: number = $(SELECTOR.ID.ADD_ITEM_QUANTITY).valueAsNumber;

    return { name, price, quantity };
  }

  private getItemFromTargetTableRow($targetTableRow): ItemType {
    const name: string = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_NAME
    )[0].textContent;
    const price = Number(
      $targetTableRow.getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_PRICE)[0].textContent
    );
    const quantity = Number(
      $targetTableRow.getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_QUANTITY)[0]
        .textContent
    );

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
}
