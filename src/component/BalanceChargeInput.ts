import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeInput {
  target: HTMLDivElement;
  coinVault: CoinVault;
  submitBtn: HTMLButtonElement;
  chargeBalanceInput: HTMLInputElement;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;
  }

  templates(balance: number): string {
    return `
        <form>
            <label for="charge-balance-input">자판기가 보유할 금액을 입력해주세요</label>
            <div></div>
              <input id="charge-balance-input" type="text" placeholder="금액"></input>
              <button id='charge-balance-submit-btn' type="submit">충전</button>
            </div>
            <div>현재보유금액:<span id="current-balance">${balance}</span>원</div>
        </form>
      `;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.templates(this.coinVault.getBalance()));

    this.chargeBalanceInput = document.querySelector('#charge-balance-input');
    this.submitBtn = document.querySelector('#charge-balance-submit-btn');
    this.submitBtn.addEventListener('click', this.handleChargeBalance);
  }

  tempEvent: CustomEvent;
  handleChargeBalance = (e: Event) => {
    e.preventDefault();
    this.coinVault.chargeMoney(Number(this.chargeBalanceInput.value));

    this.updateCurrentBalance();
    this.tempEvent = new CustomEvent('coinCharged');
    this.target.dispatchEvent(this.tempEvent);
  };

  updateCurrentBalance() {
    const currentBalance = document.querySelector('#current-balance');
    currentBalance.textContent = `${this.coinVault.getBalance()}`;
  }
}
