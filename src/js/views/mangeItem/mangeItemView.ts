import { $, $$ } from '../../utils/common';
import { manageItemTemplate, sectionTemplate } from './template';
import { validateAddItemInput } from '../../validates/inputValidates';

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
          target.remove();
          return;
        }
        if (event.target.textContent === '수정') {
          target.replaceChildren();
          target.insertAdjacentHTML('beforeEnd', sectionTemplate.changeTableContainer(item));
        }
        this.clickEventBind();
      });
    });
  }

  // 확인버튼 클릭 이벤트
  clickEventBind() {
    $$('.item-table-confirm-button').forEach(button => {
      button.addEventListener('click', event => {
        try {
          const target = event.target.closest('tr');

          const name = target.getElementsByClassName('table-item-input-name')[0].value;
          const price = target.getElementsByClassName('table-item-input-price')[0].value;
          const quantity = target.getElementsByClassName('table-item-input-quantity')[0].value;
          validateAddItemInput(name, price, quantity);

          const item = { name, price, quantity };
          target.replaceChildren();
          target.insertAdjacentHTML('beforeEnd', sectionTemplate.normalTableContainer(item));
          this.bindEvents();
        } catch (error) {
          alert(error.message);
        }
      });
    });
  }

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
}
