import { $, $$ } from '../utils/common';
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

  bindSubmitEvent() {
    $(SELECTOR.ID.ADD_ITEM_FORM).addEventListener('submit', this.handleSubmitAddItem.bind(this));
  }

  bindChangeClickEvents() {
    $$(SELECTOR.CLASS.ITEM_TABLE_CHANGE_BUTTON).forEach(button => {
      this.bindTargetChangeClickEvent(button);
    });
  }

  bindDeleteClickEvents() {
    $$(SELECTOR.CLASS.ITEM_TABLE_DELETE_BUTTON).forEach(button =>
      this.bindTargetDeleteClickEvent(button)
    );
  }

  bindTargetChangeClickEvent($targetButton) {
    $targetButton.addEventListener('click', () => {
      const $targetTableRow = $targetButton.closest('tr');
      const item = this.getItemFromTargetTableRow($targetTableRow);

      $targetTableRow.replaceChildren();
      $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableContainer(item));

      this.bindSaveClickEvent($targetTableRow);
    });
  }

  bindTargetDeleteClickEvent($targetButton) {
    $targetButton.addEventListener('click', () => {
      const $targetTableRow = $targetButton.closest('tr');
      const item = this.getItemFromTargetTableRow($targetTableRow);

      if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
        this.handleTableItemDelete(item);
        $targetTableRow.remove();
      }
    });
  }

  bindSaveClickEvent($targetTableRow) {
    const $confirmButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_CONFIRM_BUTTON
    )[0];

    $confirmButton.addEventListener('click', () => {
      try {
        const targetRowIndex = $targetTableRow.rowIndex - 1;
        const item = this.getItemFromInputValue($targetTableRow);

        validateAddItemInput(item);

        this.handleTableItemChange(item, targetRowIndex, $targetTableRow);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  handleSubmitAddItem(event: Event) {
    event.preventDefault();
    try {
      const addItemName: string = $(SELECTOR.ID.ADD_ITEM_NAME).value.trim();
      const addItemPrice: number = $(SELECTOR.ID.ADD_ITEM_PRICE).valueAsNumber;
      const addItemQuantity: number = $(SELECTOR.ID.ADD_ITEM_QUANTITY).valueAsNumber;
      const item: ItemType = { name: addItemName, price: addItemPrice, quantity: addItemQuantity };

      validateAddItemInput(item);

      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.ADD_ITEM, { detail: item }));
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemChange(item: ItemType, targetRowIndex: number, $targetTableRow) {
    window.dispatchEvent(
      new CustomEvent(CUSTOM_EVENT.TABLE_ITEM_CHANGE, {
        detail: { item, targetRowIndex, $targetTableRow },
      })
    );
  }

  handleTableItemDelete(item: ItemType) {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.TABLE_ITEM_DELETE, { detail: { item } }));
  }

  render(items: ItemType[]) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', manageItemTemplate(items));

    this.bindSubmitEvent();
    this.bindChangeClickEvents();
    this.bindDeleteClickEvents();
  }

  repaintItemTable(items: ItemType[]) {
    $(SELECTOR.CLASS.TABLE_CONTAINER).remove();
    this.$content.insertAdjacentHTML('beforeend', sectionTemplate.tableContainer(items));
    this.bindChangeClickEvents();
    this.bindDeleteClickEvents();
  }

  repaintItemTableRow($targetTableRow, item: ItemType) {
    const $targetChangeButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_CHANGE_BUTTON
    );
    const $targetDeleteButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_DELETE_BUTTON
    );

    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableContainer(item));

    this.bindTargetChangeClickEvent($targetChangeButton[0]);
    this.bindTargetDeleteClickEvent($targetDeleteButton[0]);
  }

  clearInput() {
    $(SELECTOR.ID.ADD_ITEM_NAME).value = '';
    $(SELECTOR.ID.ADD_ITEM_PRICE).value = '';
    $(SELECTOR.ID.ADD_ITEM_QUANTITY).value = '';
  }

  getItemFromTargetTableRow($targetTableRow): ItemType {
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

  getItemFromInputValue($targetTableRow): ItemType {
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
