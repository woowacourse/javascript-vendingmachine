import { CoinVault } from '../domain/CoinVault';
import { SnackBar } from './SnackBar';

export class BalanceChargeInput {
  target: HTMLDivElement;
  coinVault: CoinVault;
  snackbar: SnackBar;
  submitBtn: HTMLButtonElement;
  chargeBalanceInput: HTMLInputElement;
  chargeBalanceInputForm: HTMLFormElement;
  currentBalance: HTMLSpanElement;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;
    this.snackbar = props.snackBar;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.template(this.coinVault.getBalance()));
    this.selectDom();
    this.bindEvent();
  }

  template(balance: number): string {
    return `
          <form class = 'charge-balance-input-container'>
            <label id ='charge-balance-input-label' for="charge-balance-input">자판기가 보유할 금액을 입력해주세요</label>
              <input id = 'charge-balance-input' type="text" placeholder="금액" class = 'input'></input>
              <button type="submit" class ='charge-balance-submit-btn submit-button button'>충전</button>
              <div id = 'current-balance-container'>현재보유금액 : <span class="current-balance">${balance}</span>원</div>
          </form>
      `;
  }

  selectDom() {
    this.chargeBalanceInputForm = document.querySelector('.charge-balance-input-container');
    this.chargeBalanceInput = document.querySelector('#charge-balance-input');
    this.submitBtn = document.querySelector('.charge-balance-submit-btn');
    this.currentBalance = document.querySelector('.current-balance');
  }

  bindEvent() {
    this.submitBtn.addEventListener('click', this.handleChargeBalance);
  }

  handleChargeBalance = (e: Event) => {
    e.preventDefault();
    try {
      this.coinVault.chargeChanges(Number(this.chargeBalanceInput.value));
      this.updateCurrentBalance();
      this.snackbar.render('동전이 충전됐습니다');
      this.target.dispatchEvent(new CustomEvent('coinCharged'));
    } catch (err) {
      this.snackbar.render(err);
      this.chargeBalanceInputForm.reset();
    }
  };

  updateCurrentBalance() {
    this.currentBalance.textContent = `${this.coinVault.getBalance()}`;
  }
}
