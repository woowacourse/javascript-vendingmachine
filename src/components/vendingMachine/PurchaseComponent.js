import { inputMoney } from '../../business/vendingMachine';
import { showToast } from '../../lib/toast';
import vendingMachineStore from '../../stores/vendingMachineStore';
import { VENDING_MACHINE_STATE_KEYS } from '../../utils/constants';
import { checkChangeInput } from '../../utils/validation';
import CoinTableComponent from './common/CoinTableComponent';
import ProductTableComponent from './common/ProductTableComponent';

class PurchaseComponent {
  #currentProductListComponent;
  #returnCoinTableComponent;
  constructor() {
    this.$app = document.querySelector('#app');
    this.mount();
    this.initDOM();
    this.initChildComponents();
    this.bindEventHandler();
    this.subscribeStore();
    this.initRender();
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조하게 된다. */
    this.$purchaseTab = this.$app.querySelector('#purchase-product-tab');
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$purchaseProductContainer = this.$app.querySelector('#purchase-product-container');
    this.$moneyForm = this.$app.querySelector('#money-form');
    this.$moneyInput = this.$app.querySelector('#money-input');
    this.$moneyTotal = this.$app.querySelector('#money-amount');
  }

  generateTemplate() {
    return `<section id="purchase-product-container" aria-labelledby="purchase-product-title" class="hide">
    <form id="money-form" class="input-form">
    <label for="money-form">상품을 구매할 금액을 투입해주세요</label>
    <div class="input-wrapper">
      <input id="money-input" type="number" placeholder="금액" />
      <button class="submit-button">투입</button>
    </div>
    <div class="total-amount">투입한 금액: <span id="money-amount">0</span>원</div>
    </form>
            <h2 id="purchase-product-title" hidden>상품을 구매하는 섹션</h2>
          </section>`;
  }

  initChildComponents() {
    this.#currentProductListComponent = new ProductTableComponent(this.$purchaseProductContainer, {
      tableId: 'purchase-product-list',
      tableCaption: '상품 구매',
    });

    this.#returnCoinTableComponent = new CoinTableComponent(this.$purchaseProductContainer, {
      tableId: 'return-coin-table',
      tableCaption: '잔돈 반환',
    });
  }

  bindEventHandler() {
    this.$moneyForm.addEventListener('submit', this.#onSubmitMoneyForm);
  }

  subscribeStore() {
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE, this);
  }

  initRender() {
    const moneyInput = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE);
    this.render(moneyInput);
  }

  wakeUp(stateKey) {
    const inputCharge = vendingMachineStore.getState(stateKey);
    this.render(inputCharge);
  }

  render(money) {
    this.$moneyTotal.textContent = money;
  }

  showSection() {
    this.$purchaseTab.classList.add('checked');

    this.$purchaseProductContainer.classList.remove('hide');
    this.$notAccess.classList.add('hide');
  }

  hideSection() {
    this.$purchaseTab.classList.remove('checked');
    this.$purchaseProductContainer.classList.add('hide');
  }

  #onSubmitMoneyForm = e => {
    e.preventDefault();

    const { valueAsNumber: moneyInput } = this.$moneyInput;
    try {
      if (checkChangeInput(moneyInput)) {
        inputMoney({ moneyInput });

        this.clearInputForm();

        showToast({ isErrorMessage: false, message: '금액 투입에 성공하셨습니다.' });
      }
    } catch ({ message }) {
      showToast({ isErrorMessage: true, message });
    }
  };

  clearInputForm() {
    this.$moneyInput.value = '';

    this.$moneyInput.blur();
  }
}

export default PurchaseComponent;
