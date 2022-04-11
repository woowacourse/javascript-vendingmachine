import Component from 'Components/Abstract';
import HoldingAmountStore from 'Store/HoldingAmountStore';
import ProductStore from 'Store/ProductStore';
import { $, $$, addMultipleEventDelegate, createTemplate, Snackbar } from 'Utils';

import template from './template/index.html';
import templateManageTableRow from './template/ManageTableRow.html';
import templateManageTableRowEditor from './template/ManageTableRowEditor.html';
import templatePurchaseTableRow from './template/PurchaseTableRow.html';

export default class ProductList extends Component<IProductListProps> {
  subscribeStore = [ProductStore];

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
      '.product-purchase-button': { handler: this.onClickPurchaseButton },
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
        '.price': `${price}원`,
        '.quantity': `${quantity}개`,
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
    Snackbar('상품이 삭제되었습니다.');
  };

  onClickPurchaseButton = ({ target: $target }) => {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const product = ProductStore.getState().products[productIndex];
    const { chargedAmount } = HoldingAmountStore.getState();

    if (product.quantity <= 0) {
      Snackbar('해상 상품의 재고가 모두 소진되었습니다.', 'warning');
      return;
    }

    if (product.price > chargedAmount) {
      Snackbar('투입한 금액이 부족합니다.\n상품 구매에 필요한 금액을 충전해주세요.', 'warning');
      return;
    }

    if (!confirm(`해당 상품을 구매하시겠습니까?\n${product.price}원이 차감됩니다.`)) return;

    HoldingAmountStore.updateChargeAmount('subtract', product.price);
    ProductStore.purchaseProduct(productIndex);

    Snackbar(`${product.name} 구매가 완료되었습니다.`);
  };

  drawProductList = ({ products }) => {
    const { listType } = this.props;
    const templateTableRow =
      listType === 'manage' ? templateManageTableRow : templatePurchaseTableRow;

    const $fragment = products.reduce((previous, { name, price, quantity }, index) => {
      const $template = createTemplate(templateTableRow, {
        elementProperty: { dataset: { 'primary-key': index } },
        childTextContent: {
          '.name': name,
          '.price': `${price.toLocaleString()}원`,
          '.quantity': `${quantity}개`,
        },
      });

      previous.append($template);
      return previous;
    }, document.createDocumentFragment());

    $('tbody', this.$component).replaceChildren($fragment);
  };
}
