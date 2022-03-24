import { $, $$ } from '../../utils/common';
import { manageItemTemplate, sectionTemplate } from './template';
import { validateAddItemInput } from '../../validates/validates';

export default class ManageItemView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', manageItemTemplate(items));

    $('#add-item-form').addEventListener('submit', event => {
      event.preventDefault();
      this.customEvent();
    });

    this.bindEvents();
  }

  // 수정, 삭제 클릭 이벤트 등록
  bindEvents() {
    $$('.item-table-button-container').forEach(container => {
      container.addEventListener('click', event => {
        const target = event.target.closest('tr');
        const name = target.getElementsByClassName('table-item-name')[0].textContent;
        const price = Number(target.getElementsByClassName('table-item-price')[0].textContent);
        const quantity = Number(
          target.getElementsByClassName('table-item-quantity')[0].textContent,
        );
        const item = { name, price, quantity };

        if (event.target.textContent === '삭제') {
          if (window.confirm('정말로 삭제하시겠습니까?')) {
            this.tableItemDeleteEvent(item);
            target.remove();
            return;
          }
        }
        if (event.target.textContent === '수정') {
          target.replaceChildren();
          target.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableContainer(item));
          this.clickEventBind();
        }
      });
    });
  }

  // 확인버튼 클릭 이벤트
  clickEventBind() {
    $$('.item-table-confirm-button').forEach(button => {
      button.addEventListener('click', event => {
        try {
          const targetElement = event.target.closest('tr');
          const targetIndex = targetElement.rowIndex - 1;
          const name = targetElement
            .getElementsByClassName('table-item-input-name')[0]
            .value.trim();
          const price =
            targetElement.getElementsByClassName('table-item-input-price')[0].valueAsNumber;
          const quantity = targetElement.getElementsByClassName('table-item-input-quantity')[0]
            .valueAsNumber;
          validateAddItemInput(name, price, quantity);

          const item = { name, price, quantity };
          this.tableItemChangeEvent(item, targetIndex, targetElement);
        } catch (error) {
          alert(error.message);
        }
      });
    });
  }

  // ADD_ITEM 이벤트
  customEvent() {
    try {
      const addItemName = $('#add-item-name').value.trim();
      const addItemPrice = $('#add-item-price').valueAsNumber;
      const addItemQuantity = $('#add-item-quantity').valueAsNumber;

      validateAddItemInput(addItemName, addItemPrice, addItemQuantity);

      window.dispatchEvent(
        new CustomEvent('ADD_ITEM', { detail: { addItemName, addItemPrice, addItemQuantity } }),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  // TABLE_ITEM_CHANGE 이벤트
  tableItemChangeEvent(item, targetRowIndex, $targetTableRow) {
    window.dispatchEvent(
      new CustomEvent('TABLE_ITEM_CHANGE', { detail: { item, targetRowIndex, $targetTableRow } }),
    );
  }

  // TABLE_ITEM_DELETE 이벤트
  tableItemDeleteEvent(item) {
    window.dispatchEvent(new CustomEvent('TABLE_ITEM_DELETE', { detail: { item } }));
  }

  updateItemTable(items) {
    $('.table-container').remove();
    this.$content.insertAdjacentHTML('beforeend', sectionTemplate.tableContainer(items));
    this.bindEvents();
  }

  clearInput() {
    $('#add-item-name').value = '';
    $('#add-item-price').value = '';
    $('#add-item-quantity').value = '';
  }

  changeTableRow($targetTableRow, item) {
    $targetTableRow.replaceChildren();
    $targetTableRow.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableContainer(item));
    this.bindEvents();
  }
}
