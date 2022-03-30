import {
  ACTION_TYPES,
  ERROR_MSG,
  NOTICE_MENTION,
  VENDING_MACHINE_STATE_KEYS,
} from '../../utils/constants';
import vendingMachineStore from '../../stores/vendingMachineStore';
import { checkProductInput } from '../../utils/validation';
import { showSnackBar } from '../../utils/showSnackBar';

class ProductTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
    this.subscribeStore();
    this.bindEventHandler();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$productTable = this.$parent.querySelector(`#${this.tableId}`);
    this.$tableBody = this.$parent.querySelector('.product-list-table-body');
    this.$emptyImg = this.$parent.querySelector('.empty-img');
  }

  generateTemplate() {
    return `<table id="${this.tableId}" class="product-list">
        <caption>
         ${this.tableCaption}
        </caption>
        <tbody class="product-list-table-body">
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>${this.tableId === 'purchase-product-list' ? '구매' : ''}</th>
        </tr>
        </tbody>
      </table>
      <div class="empty-img"><img src="./empty-img.png" width="200px" height="200px"></img></div>
      `;
  }

  subscribeStore() {
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, this);
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE, this);
  }

  bindEventHandler() {
    this.$productTable.addEventListener('click', this.onClickTable);
  }

  wakeUp() {
    const productList = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, this);
    this.render(productList);
  }

  render(productList) {
    if (productList.length === 0) {
      this.$emptyImg.classList.remove('hide');
    }
    if (productList.length !== 0) {
      this.$emptyImg.classList.add('hide');
    }
    this.$tableBody.innerHTML = `<tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>${this.tableId === 'purchase-product-list' ? '구매' : ''}</th>
    </tr>
    ${this.generateProductListTemplate(productList)}`;
  }

  generateProductListTemplate(productList) {
    return productList.reduce((prev, product) => {
      const { id, name, price, quantity } = product.getProductInfo();
      return `${prev}
        <tr class="product-row">
          <td class="product-row-name" data-product-name='${name}'>${name}</td>
          <td class="product-row-price" data-product-price='${price}'>${price}</td>
          <td class="product-row-quantity" data-product-quantity='${quantity}'>${quantity}</td>
          <td>
            ${this.generateButton(id)}
          </td>
      </tr>
      `;
    }, '');
  }

  generateButton(id) {
    if (this.tableId === 'current-product-list') {
      return `<button
        type="button"
        class="product-edit-button gray-button"
        data-product-id="${id}"
      >
        수정
      </button>
      <button
        type="button"
        class="product-delete-button gray-button"
        data-product-id="${id}"
      >
        삭제
      </button>
      <button
        type="button"
        class="product-confirm-button gray-button hide"
        data-product-id="${id}"
      >
        확인
      </button>`;
    }

    if (this.tableId === 'purchase-product-list') {
      return `  <button
        type="button"
        class="product-purchase-button gray-button"
        data-product-id="${id}"
      >
        구매
      </button>`;
    }
    return '';
  }

  onClickTable = e => {
    e.preventDefault();
    const {
      target: {
        classList,
        dataset: { productId },
      },
    } = e;

    const parentElement = e.target.closest('.product-row');

    if (classList.contains('product-edit-button')) {
      this.onClickEditButton(parentElement, classList);
    }
    if (classList.contains('product-delete-button')) {
      this.onClickDeleteButton(productId);
    }
    if (classList.contains('product-confirm-button')) {
      this.onClickConfirmButton(parentElement, classList, productId);
    }
    if (classList.contains('product-purchase-button')) {
      this.onClickPurchaseButton(parentElement, productId);
    }
  };

  onClickEditButton = (parentElement, editButtonClassList) => {
    const nameTableData = parentElement.querySelector(`td.product-row-name`);
    const priceTableData = parentElement.querySelector(`td.product-row-price`);
    const quantityTableData = parentElement.querySelector(`td.product-row-quantity`);

    nameTableData.innerHTML = `<input type="text" id="product-name-edit-input"   value="${nameTableData.dataset.productName}"/>`;
    priceTableData.innerHTML = `<input type="number" id="product-price-edit-input"   value="${priceTableData.dataset.productPrice}"/>`;
    quantityTableData.innerHTML = `<input type="number" id="product-quantity-edit-input"  value="${quantityTableData.dataset.productQuantity}"/>`;

    this.showConfirmButton(parentElement, editButtonClassList);
  };

  onClickConfirmButton = (parentElement, confirmButtonClassList, productId) => {
    const { value: name } = parentElement.querySelector('#product-name-edit-input');
    const { valueAsNumber: price } = parentElement.querySelector('#product-price-edit-input');
    const { valueAsNumber: quantity } = parentElement.querySelector('#product-quantity-edit-input');

    try {
      if (
        checkProductInput({
          nameInput: name,
          priceInput: price,
          quantityInput: quantity,
        })
      ) {
        vendingMachineStore.mutateState({
          actionType: ACTION_TYPES.EDIT_PRODUCT,
          payload: {
            id: productId,
            name,
            price,
            quantity,
          },
          stateKey: VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST,
        });
        this.showEditAndDeleteButton(parentElement, confirmButtonClassList);
        showSnackBar(NOTICE_MENTION.EDIT_PRODUCT);
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  onClickDeleteButton(productId) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      vendingMachineStore.mutateState({
        actionType: ACTION_TYPES.DELETE_PRODUCT,
        payload: { id: productId },
        stateKey: VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST,
      });
      showSnackBar(NOTICE_MENTION.DELETE_PRODUCT);
    }
  }

  onClickPurchaseButton(parentElement, productId) {
    const clickedProductPrice =
      parentElement.querySelector('td.product-row-price').dataset.productPrice;

    try {
      if (this.checkIsOverCharge(clickedProductPrice) && this.checkIsSoldOut(parentElement)) {
        vendingMachineStore.mutateState({
          actionType: ACTION_TYPES.PURCHASE_PRODUCT,
          payload: {
            id: productId,
            productPrice: clickedProductPrice,
          },
          stateKey: VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
        });
      }
      showSnackBar(NOTICE_MENTION.PURCHASE_PRODUCT);
    } catch ({ message }) {
      showSnackBar(message);
    }
  }

  checkIsOverCharge(productPrice) {
    const inputCharge = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE, this);

    if (inputCharge >= productPrice) {
      return true;
    }
    throw new Error(ERROR_MSG.OVER_CHARGE_INPUT);
  }

  checkIsSoldOut(parentElement) {
    const quantity = parentElement.querySelector(`td.product-row-quantity`).dataset.productQuantity;
    if (quantity > 0) {
      return true;
    }
    throw new Error(ERROR_MSG.PRODUCT_SOLD_OUT);
  }

  showConfirmButton(parentElement, editButtonClassList) {
    const deleteButton = parentElement.querySelector('.product-delete-button');
    const confirmButton = parentElement.querySelector('.product-confirm-button');

    editButtonClassList.add('hide');
    deleteButton.classList.add('hide');
    confirmButton.classList.remove('hide');
  }

  showEditAndDeleteButton(parentElement, confirmButtonClassList) {
    const editButton = parentElement.querySelector('.product-edit-button');
    const deleteButton = parentElement.querySelector('.product-delete-button');

    confirmButtonClassList.add('hide');
    editButton.classList.remove('hide');
    deleteButton.classList.remove('hide');
  }
}
export default ProductTableComponent;
