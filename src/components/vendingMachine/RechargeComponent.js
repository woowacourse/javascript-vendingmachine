import { rechargeCoin } from '../../business/vendingMachine';
import vendingMachineStore from '../../stores/vendingMachineStore';
import { VENDING_MACHINE_STATE_KEYS } from '../../utils/constants';
import { checkChangeInput } from '../../utils/validation';
import CoinTableComponent from './common/CoinTableComponent';

class RechargeComponent {
  #rechargeCoinTableComponent;
  constructor() {
    this.$app = document.querySelector('#app');
    this.mount();
    this.initDOM();
    this.initChildComponents();
    this.subscribeStore();
    this.bindEventHandler();

    this.render(vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this));
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조하게 된다. */
    this.$rechargeTab = this.$app.querySelector('#recharge-change-tab');
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$rechargeChangeContainer = this.$app.querySelector('#recharge-change-container');
    this.$rechargeChangeForm = this.$app.querySelector('#recharge-change-form');
    this.$rechargeChangeInput = this.$app.querySelector('#recharge-change-input');
    this.$rechargeChangeTotal = this.$app.querySelector('#change-total-amount');
  }

  generateTemplate() {
    return `<section id="recharge-change-container" aria-labelledby="recharge-change-title" class="hide">
      <h2 id="recharge-change-title" hidden>자판기의 잔돈을 충전하는 섹션</h2>
      <form id="recharge-change-form" class="input-form">
        <label for="recharge-change-form">자판기가 보유할 금액을 입력해주세요</label>
        <div class="input-wrapper">
          <input id="recharge-change-input" type="number" placeholder="금액" />
          <button  class="submit-button">충전</button>
        </div>
        <div class="total-amount">투입한 금액: <span id="change-total-amount">0</span>원</div>
        </form>
    </section>
    `;
  }

  initChildComponents() {
    this.#rechargeCoinTableComponent = new CoinTableComponent(this.$rechargeChangeContainer, {
      tableId: 'recharge-coin-table',
      tableCaption: '자판기가 보유한 동전',
    });
  }

  subscribeStore() {
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
  }

  bindEventHandler() {
    this.$rechargeChangeForm.addEventListener('submit', this.onSubmitRechargeChangeForm);
  }

  wakeUp(stateKey) {
    const coinWallet = vendingMachineStore.getState(stateKey, this);
    this.render(coinWallet);
  }

  render(coinWallet) {
    const coinTotalAmount = coinWallet.computeCoinTotalAmount();
    this.$rechargeChangeTotal.textContent = coinTotalAmount;
  }

  showSection(isLoggedIn) {
    this.$rechargeTab.classList.add('checked');

    if (isLoggedIn) {
      this.$rechargeChangeContainer.classList.remove('hide');
      this.$notAccess.classList.add('hide');
      return;
    }

    this.$rechargeChangeContainer.classList.add('hide');
    this.$notAccess.classList.remove('hide');
  }

  hideSection() {
    this.$rechargeTab.classList.remove('checked');
    this.$rechargeChangeContainer.classList.add('hide');
  }

  onSubmitRechargeChangeForm = e => {
    e.preventDefault();

    const { valueAsNumber: changeInput } = this.$rechargeChangeInput;
    try {
      if (checkChangeInput(changeInput)) {
        rechargeCoin({ changeInput });
      }
      this.clearInputForm();
    } catch ({ message }) {
      alert(message);
    }
  };

  clearInputForm() {
    this.$rechargeChangeInput.value = '';

    this.$rechargeChangeInput.blur();
  }
}

export default RechargeComponent;
