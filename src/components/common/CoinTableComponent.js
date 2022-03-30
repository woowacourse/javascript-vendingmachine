import vendingMachineStore from '../../stores/vendingMachineStore';
import { ACTION_TYPES, NOTICE_MENTION, VENDING_MACHINE_STATE_KEYS } from '../../utils/constants';
import { showSnackBar } from '../../utils/showSnackBar';

class CoinTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
    this.initChildComponent();
    this.subscribeStore();
    this.bindEventHandler();
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
            <td ><span id="hold-coin-500-count">0</span>개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td ><span id="hold-coin-100-count">0</span>개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td ><span id="hold-coin-50-count">0</span>개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td><span id="hold-coin-10-count">0</span>개</td>
          </tr>
        </tbody>
      </table>`;
  }

  initDOM() {
    this.$tableData500 = this.$parent.querySelector('#hold-coin-500-count');
    this.$tableData100 = this.$parent.querySelector('#hold-coin-100-count');
    this.$tableData50 = this.$parent.querySelector('#hold-coin-50-count');
    this.$tableData10 = this.$parent.querySelector('#hold-coin-10-count');
  }

  initChildComponent() {
    if (this.$parent.id === 'purchase-product-container') {
      this.$parent.insertAdjacentHTML(
        'beforeend',
        '<button type="button" id="return-change-button" class="gray-button">반환</button>',
      );
    }
  }

  subscribeStore() {
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
    vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.RETURN_COIN_WALLET, this);
  }

  wakeUp() {
    if (this.tableId === 'recharge-coin-table') {
      const coinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
      this.renderRechargeCoinTable(coinWallet);
    }
    if (this.tableId === 'return-change-table') {
      const returnCoinWallet = vendingMachineStore.getState(
        VENDING_MACHINE_STATE_KEYS.RETURN_COIN_WALLET,
        this,
      );
      this.renderReturnCoinTable(returnCoinWallet);
    }
  }

  renderRechargeCoinTable(coinWallet) {
    const { coin500, coin100, coin50, coin10 } = coinWallet.getCoinWalletInfo();

    this.$tableData500.textContent = `${coin500}`;
    this.$tableData100.textContent = `${coin100}`;
    this.$tableData50.textContent = `${coin50}`;
    this.$tableData10.textContent = `${coin10}`;
  }

  renderReturnCoinTable(returnCoinWallet) {
    const { coin500, coin100, coin50, coin10 } = returnCoinWallet;

    this.$tableData500.textContent = `${coin500}`;
    this.$tableData100.textContent = `${coin100}`;
    this.$tableData50.textContent = `${coin50}`;
    this.$tableData10.textContent = `${coin10}`;
  }

  bindEventHandler() {
    if (this.$parent.id === 'purchase-product-container') {
      this.$parent
        .querySelector('#return-change-button')
        .addEventListener('click', this.onClickReturnButton);
    }
  }

  onClickReturnButton(e) {
    e.preventDefault();
    vendingMachineStore.mutateState({
      actionType: ACTION_TYPES.RETURN_COIN_WALLET,
      payload: '',
      stateKey: VENDING_MACHINE_STATE_KEYS.COIN_WALLET,
    });
    showSnackBar(NOTICE_MENTION.RETURN_CHARGE);
  }
}

export default CoinTableComponent;
