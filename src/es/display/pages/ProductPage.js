import { $, $$ } from '@Utils/index';
import { validateProduct } from '@Utils/VendingMachine/validator';
import ProductStore from '@Store/ProductStore';
import { template } from '@Display/template';

export default class ProductPage {
  renderMethodList;

  $addFormSection;
  $addForm;
  $tableSection;
  $table;

  constructor() {
    ProductStore.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.productPage;

    this.setDom();
    this.render({
      state: ProductStore.getState(),
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$addFormSection = $('#add-product-form-section');
    this.$addForm = $('#add-product-form', this.$addFormSection);

    this.$tableSection = $('#product-table-section');
    this.$table = $('#product-table', this.$tableSection);
  }

  setRenderMethodList() {
    this.renderMethodList = {
      products: [this.drawProductList, this.drawProductList],
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

  render = ({ state, changeStates }) => {
    const renderTargetMethod = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());

    renderTargetMethod.forEach(renderMethod => renderMethod(state));
  };

  onSubmitAddProductForm(event) {
    event.preventDefault();
    const $$inputs = $$('input', event.target);
    const product = Array.from($$inputs).reduce((previous, inputElement) => {
      previous[inputElement.name] =
        inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
      return previous;
    }, {});

    try {
      validateProduct(product);
    } catch (error) {
      alert(error.message);
      return;
    }

    const productIndex = ProductStore.findProductIndexByName(product.name);

    if (productIndex === -1) {
      ProductStore.addProduct(product);
      $$inputs.forEach($input => ($input.value = ''));
      return;
    }

    if (confirm('이미 존재하는 상품입니다.\n기존 상품 목록에서 덮어씌우시겠습니까?')) {
      ProductStore.updateProduct(productIndex, product);
    }
  }

  onClickUpdateButton({ target: $target }) {
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

  drawProductList = ({ products }) => {
    const productItem = template.productTableRows(products);
    $('tbody', this.$table).innerHTML = productItem;
  };
}
