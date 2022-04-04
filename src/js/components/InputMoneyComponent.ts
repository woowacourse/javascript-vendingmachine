import vendingMachine from '../model/VendingMachine';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class InputMoneyComponent {
  $inputMoneyForm: HTMLElement;
  $totalMoney: HTMLElement;
  noticeStateChanged: Function;
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEventAndElement = () => {
    this.$totalMoney = document.querySelector('#total-money');
    this.$inputMoneyForm = document.querySelector('#input-money-form');
    this.$inputMoneyForm.addEventListener('submit', this.onSubmitInputMoney);
  };

  private onSubmitInputMoney = (e: SubmitEvent) => {
    e.preventDefault();
    const inputMoney = parseInt((<HTMLInputElement>this.$inputMoneyForm.querySelector('#input-money')).value);

    if (throwableFunctionHandler(() => vendingMachine.inputUserMoney(inputMoney))) {
      this.noticeStateChanged();
    }
  };

  refreshChange = () => {
    this.$totalMoney.textContent = vendingMachine.getUserMoney().toString();
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  private template = () => `
  <div id="input-money-container">
      <p>상품을 구매할 금액을 투입해주세요</p>
      <form id="input-money-form">
      <input
          type="number"
          id="input-money"
          class="single-input"
          placeholder="금액"
          required
      />
      <input type="submit" id="input-money-button" value="투입" />
      </form>
      <p>투입한 금액: <span id="total-money"></span>원</p>
  </div>`;
}

export default InputMoneyComponent;
