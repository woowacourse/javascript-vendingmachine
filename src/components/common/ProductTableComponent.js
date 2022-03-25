import { ACTION_TYPES, VENDING_MACHINE_STATE_KEYS } from '../../utils/constants';
import vendingMachineStore from '../../stores/vendingMachineStore';
import { checkProductInput } from '../../utils/validation';
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

  initDOM() {
    this.$tableBody = this.$parent.querySelector('.product-list-table-body');
    this.$emptyImg = this.$parent.querySelector('.empty-img');
  }

  subscribeStore() {
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST, this);
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
      return (
        prev +
        `<tr class="product-row">
          <td data-product-name='${name}'>${name}</td>
          <td data-product-price='${price}'>${price}</td>
          <td data-product-quantity='${quantity}'>${quantity}</td>
          <td>
            ${this.generateButton(id)}
          </td>
      </tr>
      `
      );
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

  bindEventHandler() {
    document.querySelector(`#${this.tableId}`).addEventListener('click', this.onClickTable);
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
  };

  onClickEditButton = (parentElement, targetClassList) => {
    this.showConfirmButton(parentElement, targetClassList);
    const [nameTableData, priceTableData, quantityTableData] = [
      ...parentElement.querySelectorAll('td'),
    ];

    nameTableData.innerHTML = `<input type="text" id="product-name-edit-input"   value="${nameTableData.dataset.productName}"/>`;
    priceTableData.innerHTML = `<input type="number" id="product-price-edit-input"   value="${priceTableData.dataset.productPrice}"/>`;
    quantityTableData.innerHTML = `<input type="number" id="product-quantity-edit-input"  value="${quantityTableData.dataset.productQuantity}"/>`;
  };

  onClickConfirmButton = (parentElement, targetClassList, productId) => {
    const productInputs = parentElement.querySelectorAll('input');

    const [{ value: name }, { valueAsNumber: price }, { valueAsNumber: quantity }] = productInputs;
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
        this.showEditAndDeleteButton(parentElement, targetClassList);
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
    }
  }

  showConfirmButton(parentElement, targetClassList) {
    const deleteButton = parentElement.querySelector('.product-delete-button');
    const confirmButton = parentElement.querySelector('.product-confirm-button');

    targetClassList.add('hide');
    deleteButton.classList.add('hide');
    confirmButton.classList.remove('hide');
  }

  showEditAndDeleteButton(parentElement, targetClassList) {
    const editButton = parentElement.querySelector('.product-edit-button');
    const deleteButton = parentElement.querySelector('.product-delete-button');

    targetClassList.add('hide');
    editButton.classList.remove('hide');
    deleteButton.classList.remove('hide');
  }
}
export default ProductTableComponent;
