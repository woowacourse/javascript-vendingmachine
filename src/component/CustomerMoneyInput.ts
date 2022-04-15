import { CoinVault } from '../domain/CoinVault';
import { getStorageCoinVault } from '../utils/sessionStorage';
import { SnackBar } from './SnackBar';

export class CustomerMoneyInput {
  target: HTMLDivElement;
  coinVault: CoinVault;
  snackBar: SnackBar;
  customerMoneyInputForm: HTMLFormElement;
  customerMoneyInput: HTMLInputElement;
  customerMoneyInputBtn: HTMLButtonElement;
  currentMoneyInput: HTMLSpanElement;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;
    this.snackBar = props.snackBar;
  }

  setCoinVault(coinVault) {
    this.coinVault = coinVault;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.template(this.coinVault.getCustomerInput()));
    this.selectDom();
    this.bindEvent();
  }

  template(input: number): string {
    return `
          <form class = 'customer-money-input-container'>
            <label class ='charge-balance-input-label' for="charge-balance-input">상품을 구매할 금액을 투입해주세요</label>
              <input id="customer-money-input" type="text" placeholder="금액" class='input'></input>
              <button type="submit" class ='customer-money-input-btn submit-button button'>투입</button>
              <div id = 'current-balance-container'>투입한금액 : <span class="current-balance">${input}</span>원</div>
          </form>
      `;
  }

  selectDom() {
    this.customerMoneyInputForm = document.querySelector('.customer-money-input-container');
    this.customerMoneyInput = document.querySelector('#customer-money-input');
    this.customerMoneyInputBtn = document.querySelector('.customer-money-input-btn');
    this.currentMoneyInput = document.querySelector('.current-balance');
  }

  bindEvent() {
    this.customerMoneyInputBtn.addEventListener('click', this.handleChargeMoney);
    this.target.addEventListener('purchased', this.handleDeductMoneyInput);
    this.target.addEventListener('giveChanges', this.updateCurrentMoneyInput);
  }

  handleChargeMoney = (e: Event) => {
    e.preventDefault();
    try {
      this.coinVault.chargeCustomerInput(Number(this.customerMoneyInput.value));
      this.updateCurrentMoneyInput(e);
      sessionStorage.setItem('coinVault', JSON.stringify(this.coinVault));
      this.snackBar.render('현금이 투입되었습니다');
    } catch (err) {
      this.customerMoneyInputForm.reset();
      this.snackBar.render(err);
    }
  };

  updateCurrentMoneyInput = (e: Event) => {
    if (e.type === 'giveChanges') {
      this.coinVault = getStorageCoinVault();
    }
    this.currentMoneyInput.textContent = `${this.coinVault.getCustomerInput()}`;
  };

  handleDeductMoneyInput = (e: CustomEvent) => {
    const productPrice = e.detail.price;
    this.coinVault.deductCustomerInput(productPrice);
    sessionStorage.setItem('coinVault', JSON.stringify(this.coinVault));
    this.updateCurrentMoneyInput(e);
  };
}
