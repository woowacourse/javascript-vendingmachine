import { $, $$, emitCustomEvent, showSnackBar } from '../utils/common';
import { manageItemTemplate, sectionTemplate } from '../templates/manageItemTemplate';
import { validateAddItemInput } from '../validates/validates';
import { SELECTOR, CONFIRM_MESSAGE } from '../constants/constants';
import { ItemType } from '../types';

export default class ManageItemView {
  $content: HTMLDivElement;

  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private bindSubmitEvent() {
    $(SELECTOR.ID.ADD_ITEM_FORM).addEventListener('submit', this.handleSubmitAddItem.bind(this));
  }

  private bindDeleteClickEvents() {
    $$(SELECTOR.CLASS.ITEM_TABLE_DELETE_BUTTON).forEach(button =>
      this.bindTargetDeleteClickEvent(button),
    );
  }

  private bindChangeClickEvents() {
    $$(SELECTOR.CLASS.ITEM_TABLE_CHANGE_BUTTON).forEach(button => {
      this.bindTargetChangeClickEvent(button);
    });
  }

  private bindTargetChangeClickEvent($targetButton) {
    $targetButton.addEventListener('click', () => {
      const $targetTableRow = $targetButton.closest('tr');
      const item = this.getItemFromTargetTableRow($targetTableRow);

      $targetTableRow.replaceChildren();
      $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableContainer(item));

      this.bindSaveClickEvent($targetTableRow);
    });
  }

  private bindTargetDeleteClickEvent($targetButton) {
    $targetButton.addEventListener('click', () => {
      const $targetTableRow = $targetButton.closest('tr');
      const item = this.getItemFromTargetTableRow($targetTableRow);

      if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
        this.handleTableItemDelete(item);
        $targetTableRow.remove();
        showSnackBar('상품이 삭제되었습니다.');
      }
    });
  }

  private bindSaveClickEvent($targetTableRow) {
    const $confirmButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_CONFIRM_BUTTON,
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

  private handleSubmitAddItem(event: Event) {
    event.preventDefault();
    try {
      const addItemName: string = $(SELECTOR.ID.ADD_ITEM_NAME).value.trim();
      const addItemPrice: number = $(SELECTOR.ID.ADD_ITEM_PRICE).valueAsNumber;
      const addItemQuantity: number = $(SELECTOR.ID.ADD_ITEM_QUANTITY).valueAsNumber;
      const item: ItemType = { name: addItemName, price: addItemPrice, quantity: addItemQuantity };

      validateAddItemInput(item);

      emitCustomEvent('ADD_ITEM', { detail: item });
    } catch (error) {
      alert(error.message);
    }
  }

  private handleTableItemChange(item: ItemType, targetRowIndex: number, $targetTableRow) {
    emitCustomEvent('TABLE_ITEM_CHANGE', {
      detail: { item, targetRowIndex, $targetTableRow },
    });
  }

  private handleTableItemDelete(item: ItemType) {
    emitCustomEvent('TABLE_ITEM_DELETE', { detail: { item } });
  }

  public render(isLogin, items: ItemType[]) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', manageItemTemplate(isLogin, items));

    if (isLogin) {
      this.bindSubmitEvent();
      this.bindChangeClickEvents();
      this.bindDeleteClickEvents();
    }
  }

  public repaintItemTable(items: ItemType[]) {
    $(SELECTOR.CLASS.TABLE_CONTAINER).remove();
    this.$content.insertAdjacentHTML('beforeend', sectionTemplate.tableContainer(items));
    this.bindChangeClickEvents();
    this.bindDeleteClickEvents();
  }

  public repaintItemTableRow($targetTableRow, item: ItemType) {
    const $targetChangeButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_CHANGE_BUTTON,
    );
    const $targetDeleteButton = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.ITEM_TABLE_DELETE_BUTTON,
    );

    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableContainer(item));

    this.bindTargetChangeClickEvent($targetChangeButton[0]);
    this.bindTargetDeleteClickEvent($targetDeleteButton[0]);
  }

  public clearInput() {
    $(SELECTOR.ID.ADD_ITEM_NAME).value = '';
    $(SELECTOR.ID.ADD_ITEM_PRICE).value = '';
    $(SELECTOR.ID.ADD_ITEM_QUANTITY).value = '';
  }

  private getItemFromTargetTableRow($targetTableRow): ItemType {
    const name: string = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_NAME,
    )[0].textContent;
    const price = Number(
      $targetTableRow.getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_PRICE)[0].textContent,
    );
    const quantity = Number(
      $targetTableRow.getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_QUANTITY)[0]
        .textContent,
    );

    return { name, price, quantity };
  }

  private getItemFromInputValue($targetTableRow): ItemType {
    const name: string = $targetTableRow
      .getElementsByClassName(SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_NAME)[0]
      .value.trim();
    const price: number = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_PRICE,
    )[0].valueAsNumber;
    const quantity: number = $targetTableRow.getElementsByClassName(
      SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_QUANTITY,
    )[0].valueAsNumber;

    return { name, price, quantity };
  }
}
