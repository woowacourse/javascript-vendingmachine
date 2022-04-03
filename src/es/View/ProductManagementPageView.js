import { template } from './template';
import { validateProduct } from '../validator';
import { $, getInnerInputValues, clearInnerInputValues, showSnackBar } from '../utils';
import ProductManagementPageManager from '../manager/ProductManagementPageManager';

class ProductManagementPageView {
  renderMethodList;

  $addFormSection;
  $addForm;
  $tableSection;
  $table;

  isTableUpdating;

  constructor() {
    ProductManagementPageManager.addSubscriber(this.render);
    this.setRenderMethodList();

    this.isTableUpdating = false;
  }

  loadPage = () => {
    $('main').innerHTML = template.productManagementPage;

    this.setDom();
    this.render({
      state: ProductManagementPageManager.getState(),
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
      products: [this.drawProductList],
    };
  }

  setEvents() {
    this.$addForm.addEventListener('submit', this.onSubmitAddProductForm);
    this.$table.addEventListener('click', this.onClickTableInnerButton);
  }

  render = ({ state, changeStates }) => {
    const renderMethods = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderMethods.forEach(renderMethod => renderMethod(state));
  };

  onSubmitAddProductForm = (event) => {
    event.preventDefault();
    const product = getInnerInputValues(event.target);

    try {
      validateProduct(product);
    } catch (error) {
      showSnackBar(error.message);
      return;
    }

    ProductManagementPageManager.addOrUpdateProduct(product);
    clearInnerInputValues(event.target);
  };

  onClickTableInnerButton = (event) => {
    if (event.target.type !== 'button') return;
    switch (event.target.name) {
      case 'product-update':
        this.onClickUpdateButton(event);
        break;
      case 'product-delete':
        this.onClickDeleteButton(event);
        break;
      case 'product-update-confirm':
        this.onClickUpdateConfirmButton(event);
        break;
      case 'product-update-cancel':
        this.onClickUpdateCancelButton(event);
        break;
    }
  };

  onClickUpdateButton({ target: $target }) {
    if (this.isTableUpdating) {
      showSnackBar('한 번에 하나의 상품만 수정 가능합니다.');
      return;
    }
    this.isTableUpdating = !this.isTableUpdating;
    const $tableRow = $target.closest('tr');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { products } = ProductManagementPageManager.getState();

    $tableRow.innerHTML = template.productTableRowUpdate(products[productIndex]);
  }

  onClickUpdateConfirmButton({ target: $target }) {
    const $tableRow = $target.closest('tr');
    if (!$tableRow) return;
    const productIndex = $tableRow.dataset.primaryKey;
    const product = getInnerInputValues($tableRow);

    try {
      validateProduct(product);
    } catch (error) {
      showSnackBar(error.message);
      return;
    }
    ProductManagementPageManager.updateProduct(productIndex, product);
    this.isTableUpdating = !this.isTableUpdating;
  }

  onClickUpdateCancelButton({ target: $target }) {
    const $tableRow = $target.closest('tr');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { products } = ProductManagementPageManager.getState();

    $tableRow.innerHTML = template.productTableRowInners(products[productIndex]);
    this.isTableUpdating = !this.isTableUpdating;
  }

  onClickDeleteButton({ target: $target }) {
    if (!confirm('정말 해당 상품을 삭제하시겠습니까?')) return;

    const $tableRow = $target.closest('tr');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    ProductManagementPageManager.removeProductByIndex(productIndex);
  }

  drawProductList = ({ products }) => {
    const productItem = template.productTableRows(products);
    $('tbody', this.$table).innerHTML = productItem;
  };
}

export default new ProductManagementPageView();
