import vendingMachineStore from '../../stores/vendingMachineStore';
import { VENDING_MACHINE_STATE_KEYS } from '../../utils/constants';

class CoinTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
    this.mount();
    this.initDOM();
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
            <td id="hold-coin-500-count">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="hold-coin-100-count">0개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="hold-coin-50-count">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="hold-coin-10-count">0개</td>
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
  subscribeStore() {
    if (this.tableId === 'recharge-coin-table') {
      vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
    }
    if (this.tableId === 'return-change-table') {
      vendingMachineStore.subscribe(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE, this);
    }
  }
  wakeUp() {
    if (this.tableId === 'recharge-coin-table') {
      const coinWallet = vendingMachineStore.getState(VENDING_MACHINE_STATE_KEYS.COIN_WALLET, this);
      this.renderRechargeCoinTable(coinWallet);
    }
    if (this.tableId === 'return-change-table') {
      const inputCharge = vendingMachineStore.getState(
        VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE,
        this,
      );
      this.renderReturnChangeTable(inputCharge);
    }
  }
  renderRechargeCoinTable(coinWallet) {
    const { coin500, coin100, coin50, coin10 } = coinWallet.getCoinWalletInfo();

    this.$tableData500.textContent = `${coin500}개`;
    this.$tableData100.textContent = `${coin100}개`;
    this.$tableData50.textContent = `${coin50}개`;
    this.$tableData10.textContent = `${coin10}개`;
  }
  renderReturnChangeTable() {}
}

export default CoinTableComponent;
