import vendingMachine from '../model/VendingMachine';
import * as Component from './abstractComponents/Component';

class ChangeListComponent extends Component.DynamicComponent {
  $changeList: HTMLElement;
  $amountCoin500: HTMLElement;
  $amountCoin100: HTMLElement;
  $amountCoin50: HTMLElement;
  $amountCoin10: HTMLElement;
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    super();
    this.parentElement = parentElement;
  }

  protected bindEventAndElement = () => {
    this.$changeList = document.querySelector('#change-list');
    this.$amountCoin500 = document.querySelector('#amount-coin-500');
    this.$amountCoin100 = document.querySelector('#amount-coin-100');
    this.$amountCoin50 = document.querySelector('#amount-coin-50');
    this.$amountCoin10 = document.querySelector('#amount-coin-10');
  };

  refreshChange = () => {
    const { coin10, coin50, coin100, coin500 } = vendingMachine.getVendingMachineMoney();

    this.$amountCoin500.textContent = `${coin500}개`;
    this.$amountCoin100.textContent = `${coin100}개`;
    this.$amountCoin50.textContent = `${coin50}개`;
    this.$amountCoin10.textContent = `${coin10}개`;
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  protected template = () => `
  <div id="change-list-wrapper">
    <h4>자판기가 보유한 동전</h4>
    <ul id="change-list">
      <li class="list-header">
        <span>동전</span>
        <span>개수</span>
      </li>
      <li>
        <span>500원</span>
        <span id="amount-coin-500"></span>
      </li>
      <li>
        <span>100원</span>
        <span id="amount-coin-100"></span>
      </li>
      <li>
        <span>50원</span>
        <span id="amount-coin-50"></span>
      </li>
      <li>
        <span>10원</span>
        <span id="amount-coin-10"></span>
      </li>
    </ul>
  </div>`;
}

export default ChangeListComponent;
