import Component from 'Components/Abstract';
import ProductStore from 'Store/ProductStore';
import { $, $$, convertStringToElement, createTemplate } from 'Utils';
import { validateProduct } from 'Utils/VendingMachine/validator';

import template from './template/index.html';
import templateTableRow from './template/tableRow.html';
import templateTableRowEditor from './template/tableRowEditor.html';

export default class ProductList extends Component {
  subscriberStore = [ProductStore];
  $table;

  constructor(props) {
    super(props);

    this.renderMethodList = {
      products: [this.drawProductList],
    };
  }

  template() {
    return convertStringToElement(template);
  }

  setDom() {
    this.$table = $('#product-table', this.$component);
  }

  setEvents() {
    this.$table.addEventListener('click', event => {
      if (event.target.classList.contains('product-update-button')) {
        this.onClickUpdateButton(event);
      }
      if (event.target.classList.contains('product-update-confirm-button')) {
        this.onClickUpdateConfirmButton(event);
      }
      if (event.target.classList.contains('product-update-cancel-button')) {
        this.onClickUpdateCancelButton(event);
      }
      if (event.target.classList.contains('product-delete-button')) {
        this.onClickDeleteButton(event);
      }
    });
  }

  onClickUpdateButton({ target: $target }) {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { name, price, quantity } = ProductStore.getState().products[productIndex];

    const $template = createTemplate(templateTableRowEditor, {
      elementProperty: { dataset: { 'primary-key': productIndex } },
      childTextContent: {
        'input[name="name"]': name,
        'input[name="price"]': price,
        'input[name="quantity"]': quantity,
      },
    });

    $tableRow.replaceWith($template);
  }

  onClickUpdateConfirmButton({ target: $target }) {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;
    const productIndex = $tableRow.dataset.primaryKey;

    const product = Array.from($$('input', $tableRow)).reduce(
      (previous, inputElement: HTMLInputElement) => {
        previous[inputElement.name] =
          inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
        return previous;
      },
      {},
    );

    try {
      validateProduct(product);
    } catch (error) {
      alert(error.message);
      return;
    }

    ProductStore.updateProduct(productIndex, product);
  }

  onClickUpdateCancelButton({ target: $target }) {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { name, price, quantity } = ProductStore.getState().products[productIndex];

    const $template = createTemplate(templateTableRow, {
      elementProperty: { dataset: { 'primary-key': productIndex } },
      childTextContent: {
        '.name': name,
        '.price': price,
        '.quantity': quantity,
      },
    });

    $tableRow.replaceWith($template);
  }

  onClickDeleteButton({ target: $target }) {
    if (!confirm('정말 해당 상품을 삭제하시겠습니까?')) return;

    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    ProductStore.updateProduct(productIndex);
  }

  drawProductList = ({ products }) => {
    const $fragment = products.reduce((previous, { name, price, quantity }, index) => {
      const $template = createTemplate(templateTableRow, {
        elementProperty: { dataset: { 'primary-key': index } },
        childTextContent: {
          '.name': name,
          '.price': price,
          '.quantity': quantity,
        },
      });

      previous.append($template);
      return previous;
    }, document.createDocumentFragment());

    $('tbody', this.$table).replaceChildren($fragment);
  };
}
