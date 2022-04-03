import { CoinVault } from '../domain/CoinVault';

interface BalanceChargeInputFormInterface {
  render();
}

export class BalanceChargeInputForm implements BalanceChargeInputFormInterface {
  #target: HTMLDivElement;
  #coinVault: CoinVault;
  #submitBtn: HTMLButtonElement;
  #chargeBalanceInput: HTMLInputElement;
  #chargeBalanceInputForm: HTMLFormElement;
  #currentBalance: HTMLSpanElement;

  constructor(props) {
    this.#target = props.target;
    this.#coinVault = props.coinVault;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template(this.#coinVault.getBalance()));
    this.#selectDom();
    this.#bindEvent();
  }

  #template(balance: number) {
    return `
      <div>
        <form id="charge-balance-input-form">
          <label id="charge-balance-input-label" for="charge-balance-input">자판기가 보유할 금액을 입력해주세요</label>
          <input id="charge-balance-input" class="input" type="text" placeholder="금액" />
          <button id="charge-balance-submit-btn" class="submit-button button" type="submit">충전</button>
        </form>
        <div id="current-balance-container">현재보유금액 : <span id="current-balance">${balance}</span>원</div>
      </div>
    `;
  }

  #selectDom() {
    this.#chargeBalanceInputForm = document.querySelector('#charge-balance-input-form');
    this.#chargeBalanceInput = document.querySelector('#charge-balance-input');
    this.#submitBtn = document.querySelector('#charge-balance-submit-btn');
    this.#currentBalance = document.querySelector('#current-balance');
  }

  #bindEvent() {
    this.#submitBtn.addEventListener('click', this.#handleChargeBalance);
  }

  #handleChargeBalance = (e: Event) => {
    e.preventDefault();

    try {
      this.#coinVault.chargeMoney(Number(this.#chargeBalanceInput.value));
    } catch (err) {
      this.#chargeBalanceInputForm.reset();
      alert(err.message);

      return;
    }

    this.#updateCurrentBalance();
    this.#target.dispatchEvent(new CustomEvent('coinCharged'));
  };

  #updateCurrentBalance() {
    this.#currentBalance.textContent = `${this.#coinVault.getBalance()}`;
  }
}
