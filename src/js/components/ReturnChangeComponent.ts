import vendingMachine from '../model/VendingMachine';

class ReturnChangeComponent {
  $changeList: HTMLElement;
  $returnChangeButton: HTMLElement;
  $amountCoin500: HTMLElement;
  $amountCoin100: HTMLElement;
  $amountCoin50: HTMLElement;
  $amountCoin10: HTMLElement;
  parentElement: HTMLElement;
  noticeStateChanged: Function;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindElementAndEvent = () => {
    this.$changeList = document.querySelector('#change-list');
    this.$returnChangeButton = document.querySelector('#return-change-button');
    this.$amountCoin500 = document.querySelector('#amount-coin-500');
    this.$amountCoin100 = document.querySelector('#amount-coin-100');
    this.$amountCoin50 = document.querySelector('#amount-coin-50');
    this.$amountCoin10 = document.querySelector('#amount-coin-10');

    this.$returnChangeButton.addEventListener('click', this.onClickReturnButton);
  };

  private onClickReturnButton = () => {
    try {
      vendingMachine.returnChanges();
    } catch (message) {
      alert(message);
    }

    this.noticeStateChanged();
  };

  refreshChange = () => {
    const { coin10, coin50, coin100, coin500 } = vendingMachine.getUserChanges();
    this.$amountCoin500.textContent = `${coin500}개`;
    this.$amountCoin100.textContent = `${coin100}개`;
    this.$amountCoin50.textContent = `${coin50}개`;
    this.$amountCoin10.textContent = `${coin10}개`;
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindElementAndEvent();
  };

  private template = () => `
  <div id="change-list-wrapper">
    <h4>잔돈 반환</h4>
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
    <button id="return-change-button">반환</button>
  </div>`;
}

export default ReturnChangeComponent;
