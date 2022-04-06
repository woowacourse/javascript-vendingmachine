import Component from 'Components/Abstract';
import ProductStore from 'Store/ProductStore';
import { $, $$, addMultipleEventDelegate, createTemplate } from 'Utils';

import template from './template/index.html';
import templateManageTableRow from './template/ManageTableRow.html';
import templateManageTableRowEditor from './template/ManageTableRowEditor.html';
import templatePurchaseTableRow from './template/PurchaseTableRow.html';

export default class ProductList extends Component<IProductListProps> {
  subscriberStore = [ProductStore];

  constructor(props) {
    super(props);

    this.renderMethodList = {
      products: [this.drawProductList],
    };
  }

  template() {
    const { caption } = this.props;
    return createTemplate(template, {
      childTextContent: {
        caption,
      },
    });
  }

  setEvents() {
    addMultipleEventDelegate(this.$component, 'click', {
      '.product-update-button': { handler: this.onClickUpdateButton },
      '.product-update-confirm-button': { handler: this.onClickUpdateConfirmButton },
      '.product-update-cancel-button': { handler: this.onClickUpdateCancelButton },
      '.product-delete-button': { handler: this.onClickDeleteButton },
    });
  }

  onClickUpdateButton = ({ target: $target }) => {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { name, price, quantity } = ProductStore.getState().products[productIndex];

    const $template = createTemplate(templateManageTableRowEditor, {
      elementProperty: { dataset: { 'primary-key': productIndex } },
      childTextContent: {
        'input[name="name"]': name,
        'input[name="price"]': price,
        'input[name="quantity"]': quantity,
      },
    });

    $tableRow.replaceWith($template);
  };

  onClickUpdateConfirmButton = ({ target: $target }) => {
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

    const { onProductUpdate } = this.props;
    typeof onProductUpdate === 'function' && onProductUpdate(productIndex, product);
  };

  onClickUpdateCancelButton = ({ target: $target }) => {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { name, price, quantity } = ProductStore.getState().products[productIndex];

    const $template = createTemplate(templateManageTableRow, {
      elementProperty: { dataset: { 'primary-key': productIndex } },
      childTextContent: {
        '.name': name,
        '.price': price,
        '.quantity': quantity,
      },
    });

    $tableRow.replaceWith($template);
  };

  onClickDeleteButton = ({ target: $target }) => {
    if (!confirm('정말 해당 상품을 삭제하시겠습니까?')) return;

    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;

    const { onRemoveProduct } = this.props;
    typeof onRemoveProduct === 'function' && onRemoveProduct(productIndex);
  };

  drawProductList = ({ products }) => {
    console.log(products);
    const { listType } = this.props;
    const templateTableRow =
      listType === 'manage' ? templateManageTableRow : templatePurchaseTableRow;

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

    $('tbody', this.$component).replaceChildren($fragment);
  };
}
