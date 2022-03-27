import ProductTableComponent from './common/ProductTableComponent';
import { checkProductInput } from '../utils/validation';
import vendingMachineStore from '../stores/vendingMachineStore';
import { ACTION_TYPES, VENDING_MACHINE_STATE_KEYS } from '../utils/constants';
class ProductManagementComponent {
  #currentProductListComponent;
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponents();
    this.bindEventHandler();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$manageProductContainer = this.$parent.querySelector('#manage-product-container');
    this.$productInputForm = this.$parent.querySelector('#product-input-form');
    this.$productNameInput = this.$parent.querySelector('#product-name-input');
    this.$productPriceInput = this.$parent.querySelector('#product-price-input');
    this.$productQuantityInput = this.$parent.querySelector('#product-quantity-input');
  }

  generateTemplate() {
    return `<section id="manage-product-container" class="hide" aria-labelledby="manage-product-title">
    <h2 id="manage-product-title" hidden>상품을 관리하는 섹션</h2>
    <form id="product-input-form" class="input-form">
      <label for="product-input-form">추가할 상품 정보를 입력해주세요</label>
      <div class="input-wrapper">
        <input id="product-name-input" type="text" placeholder="상품명" />
        <input id="product-price-input" type="number" placeholder="가격" />
        <input id="product-quantity-input" type="number" placeholder="수량" />
        <button id="product-input-submit" class="submit-button">추가</button>
      </div>
    </form> 
  </section>`;
  }

  initChildComponents() {
    this.#currentProductListComponent = new ProductTableComponent(this.$manageProductContainer, {
      tableId: 'current-product-list',
      tableCaption: '상품 현황',
    });
  }

  bindEventHandler() {
    this.$productInputForm.addEventListener('submit', this.onSubmitProductInputForm);
  }

  show() {
    this.$manageProductContainer.classList.remove('hide');
  }

  hide() {
    this.$manageProductContainer.classList.add('hide');
  }

  onSubmitProductInputForm = e => {
    e.preventDefault();

    const { value: productNameInputValue } = this.$productNameInput;
    const { valueAsNumber: productPriceInputValue } = this.$productPriceInput;
    const { valueAsNumber: productQuantityInputValue } = this.$productQuantityInput;

    try {
      if (
        checkProductInput({
          nameInput: productNameInputValue,
          priceInput: productPriceInputValue,
          quantityInput: productQuantityInputValue,
        })
      ) {
        vendingMachineStore.mutateState({
          actionType: ACTION_TYPES.ADD_PRODUCT,
          payload: {
            name: productNameInputValue,
            price: productPriceInputValue,
            quantity: productQuantityInputValue,
          },
          stateKey: VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST,
        });
        this.clearInputForm();
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  clearInputForm() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';

    this.$productNameInput.focus();
  }
}
export default ProductManagementComponent;
