import { $, $$ } from '@Utils/index';
import { validateProduct } from '@Utils/VendingMachine/validator';
import ProductStore from '@Domain/Store/ProductStore';
import { template } from '@Display/template';

export default class ProductPage {
  renderMethodList;

  $addFormSection = $('#add-product-form-section');
  $addForm = $('#add-product-form', this.$addFormSection);

  $tableSection = $('#product-table-section');
  $table = $('#product-table', this.$tableSection);

  constructor() {
    ProductStore.addSubscriber(this.render);

    this.setRenderMethodList();
    this.setEvents();
  }

  setRenderMethodList() {
    this.renderMethodList = {
      products: [this.drawProductList],
    };
  }

  setEvents() {
    this.$addForm.addEventListener('submit', this.onSubmitAddProductForm);
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

  onSubmitAddProductForm(event) {
    event.preventDefault();
    const product = Array.from($$('input', event.target)).reduce((previous, inputElement) => {
      previous[inputElement.name] =
        inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
      return previous;
    }, {});

    // 예외 처리
    try {
      validateProduct(product);
      ProductStore.addProduct(product);
    } catch (error) {
      alert(error.message);
    }
  }

  onClickUpdateButton({ target: $target }) {
    // 상품 정보를 input으로 바꿔줌
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { products } = ProductStore.getState();

    $tableRow.innerHTML = template.productTableRowUpdate(products[productIndex]);
  }

  onClickUpdateConfirmButton({ target: $target }) {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;
    const productIndex = $tableRow.dataset.primaryKey;

    const product = Array.from($$('input', $tableRow)).reduce((previous, inputElement) => {
      previous[inputElement.name] =
        inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
      return previous;
    }, {});

    try {
      validateProduct(product);
      ProductStore.updateProduct(productIndex, product);
    } catch (error) {
      alert(error.message);
    }
  }

  onClickUpdateCancelButton({ target: $target }) {
    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { products } = ProductStore.getState();

    $tableRow.innerHTML = template.productTableRowInners(products[productIndex]);
  }

  onClickDeleteButton({ target: $target }) {
    if (!confirm('정말 해당 상품을 삭제하시겠습니까?')) return;

    const $tableRow = $target.closest('tr[data-primary-key]');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    ProductStore.removeProductByIndex(productIndex);
  }

  render = ({ state, changeStates }) => {
    changeStates.forEach(stateKey => {
      this.renderMethodList[stateKey].forEach(renderMethod => renderMethod(state));
    });
  };

  drawProductList = ({ products }) => {
    // 상품 목록을 그려준다.
    const productItem = template.productTableRows(products);
    $('tbody', this.$table).innerHTML = productItem;
  };
}
