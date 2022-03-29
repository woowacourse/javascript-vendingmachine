import ProductTableComponent from './common/ProductTableComponent';
import CoinTableComponent from './common/CoinTableComponent';
import { checkInputChargeInput } from '../utils/validation';
import vendingMachineStore from '../stores/vendingMachineStore';
import { ACTION_TYPES, VENDING_MACHINE_STATE_KEYS } from '../utils/constants';

class PurchaseProductComponent {
  #purchaseProductComponent;
  #returnChangeComponent;
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponent();
    this.bindEventHandler();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$purchaseProductContainer = this.$parent.querySelector('#purchase-product-container');
    this.$purchaseProductForm = this.$parent.querySelector('#charge-input-form');
    this.$inputChargeInput = this.$parent.querySelector('#charge-input');
  }

  generateTemplate() {
    return `<section id="purchase-product-container" aria-labelledby="purchase-product-title" class="hide">
            <h2 id="purchase-product-title" hidden>상품을 구매하는 섹션</h2>
            <form id="charge-input-form" class="input-form">
              <label for="charge-input-form">상품을 구매할 금액을 투입해주세요</label>
              <div class="input-wrapper">
                <input id="charge-input" type="number" placeholder="금액" />
                <button class="submit-button">투입</button>
              </div>
              <div class="total-amount">투입한 금액: <span id="input-total-amount"></span>원</div>
            </form>
          </section>`;
  }

  initChildComponent() {
    this.#purchaseProductComponent = new ProductTableComponent(this.$purchaseProductContainer, {
      tableId: 'purchase-product-list',
      tableCaption: '구매 가능 상품 현황',
    });
    this.#returnChangeComponent = new CoinTableComponent(this.$purchaseProductContainer, {
      tableId: 'return-chagne-table',
      tableCaption: '잔돈 반환',
    });
    this.$purchaseProductContainer.insertAdjacentHTML(
      'beforeend',
      '<button type="button" id="return-change-button" class="gray-button">반환</button>',
    );
  }

  bindEventHandler() {
    this.$purchaseProductForm.addEventListener('submit', this.onSubmitPurchaseProductForm);
  }

  show() {
    this.$purchaseProductContainer.classList.remove('hide');
  }

  hide() {
    this.$purchaseProductContainer.classList.add('hide');
  }

  onSubmitPurchaseProductForm = e => {
    e.preventDefault();

    const { valueAsNumber: inputChargeInputValue } = this.$inputChargeInput;
    try {
      if (checkInputChargeInput(inputChargeInputValue)) {
        vendingMachineStore.mutateState({
          actionType: ACTION_TYPES.INSERT_CHARGE,
          payload: {
            inputCharge: inputChargeInputValue,
          },
          stateKey: VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
        });
      }
    } catch ({ message }) {
      alert(message);
    }
  };
}

export default PurchaseProductComponent;
