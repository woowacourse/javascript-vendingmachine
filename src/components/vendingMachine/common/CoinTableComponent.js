import { returnCoin } from '../../../business/logic/vendingMachine.js';
import { showToast } from '../../../lib/toast.js';
import vendingMachineStore from '../../../business/store/vendingMachineStore.ts';
import { VENDING_MACHINE_STATE_KEYS } from '../../../utils/constants/index.ts';

class CoinTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
    this.bindEventHandler();
    this.subscribeStore();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  generateTemplate() {
    return `<table id="${this.tableId}">
    <caption>
      ${this.tableCaption}
    </caption>
    <tbody>
      <tr>
        <th>동전</th>
        <th>개수</th>
      </tr>
      <tr>
        <td>500원</td>
        <td><span id="${this.tableId}-coin-500-count">0</span>개</td>
      </tr>
      <tr>
        <td>100원</td>
        <td><span id="${this.tableId}-coin-100-count">0</span>개</td>
      </tr>
      <tr>
        <td>50원</td>
        <td ><span id="${this.tableId}-coin-50-count">0</span>개</td>
      </tr>
      <tr>
        <td>10원</td>
        <td ><span id="${this.tableId}-coin-10-count">0</span>개</td>
      </tr>
    </tbody>
  </table>${
    this.tableId === 'return-coin-table'
      ? ` <button
  id="return-coin-button"
  type="button"
  class="gray-button"
>
  반환하기
</button>`
      : ''
  }
   
  `;
  }

  initDOM() {
    this.$tableData500 = this.$parent.querySelector(`#${this.tableId}-coin-500-count`);
    this.$tableData100 = this.$parent.querySelector(`#${this.tableId}-coin-100-count`);
    this.$tableData50 = this.$parent.querySelector(`#${this.tableId}-coin-50-count`);
    this.$tableData10 = this.$parent.querySelector(`#${this.tableId}-coin-10-count`);
    this.$returnButton = this.$parent.querySelector('#return-coin-button');
  }

  bindEventHandler() {
    this.$returnButton?.addEventListener('click', this.#onClickReturnButton);
  }

  subscribeStore() {
    if (this.tableId === 'recharge-coin-table') {
      vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
    }
    if (this.tableId === 'return-coin-table') {
      vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.RETURN_COIN, this);
    }
    this.update();
  }

  update() {
    if (this.tableId === 'recharge-coin-table') {
      const coinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET);
      this.render(coinWallet);
    }

    if (this.tableId === 'return-coin-table') {
      const returnCoinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.RETURN_COIN);
      this.render(returnCoinWallet);
    }
  }

  render(coinWallet) {
    const { coin500, coin100, coin50, coin10 } = coinWallet.getCoinWalletInfo();
    this.$tableData500.textContent = `${coin500}`;
    this.$tableData100.textContent = `${coin100}`;
    this.$tableData50.textContent = `${coin50}`;
    this.$tableData10.textContent = `${coin10}`;
  }

  #onClickReturnButton = () => {
    try {
      returnCoin();
      showToast({ isErrorMessage: false, message: '동전 반환에 성공하셨습니다.' });
    } catch ({ message }) {
      showToast({ isErrorMessage: true, message });
    }
  };
}

export default CoinTableComponent;
