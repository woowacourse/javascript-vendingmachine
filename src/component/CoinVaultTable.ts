import { CoinVault } from '../domain/CoinVault';
import { Coins } from '../utils/interface';

export class CoinVaultTable {
  target: HTMLDivElement;
  coinVault: CoinVault;

  coin500Quantity: HTMLSpanElement;
  coin100Quantity: HTMLSpanElement;
  coin50Quantity: HTMLSpanElement;
  coin10Quantity: HTMLSpanElement;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;

    this.target.addEventListener('coinCharged', this.updateCoinVaultTableTemplate);
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.template(this.coinVault.getCoins()));
    this.selectDom();
  }

  template(coinsQuantity: Coins): string {
    return `
      <div class="table-container">
        <h2>자판기가 보유한 동전</h2>
        <table id="coin-vault-table">
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500원</td>
              <td><span id="coin500-quantity">${coinsQuantity.coin500}</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span id="coin100-quantity">${coinsQuantity.coin100}</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span id="coin50-quantity">${coinsQuantity.coin50}</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span id="coin10-quantity">${coinsQuantity.coin10}</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  selectDom() {
    this.coin500Quantity = document.querySelector('#coin500-quantity');
    this.coin100Quantity = document.querySelector('#coin100-quantity');
    this.coin50Quantity = document.querySelector('#coin50-quantity');
    this.coin10Quantity = document.querySelector('#coin10-quantity');
  }

  updateCoinVaultTableTemplate = () => {
    const { coin500, coin100, coin50, coin10 } = this.coinVault.getCoins();

    this.coin500Quantity.textContent = `${coin500}`;
    this.coin100Quantity.textContent = `${coin100}`;
    this.coin50Quantity.textContent = `${coin50}`;
    this.coin10Quantity.textContent = `${coin10}`;
  };
}
