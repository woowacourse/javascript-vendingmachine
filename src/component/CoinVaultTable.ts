import { CoinVault } from '../domain/CoinVault';
import { Coins } from '../utils/domain.interface';

export class CoinVaultTable {
  target: HTMLDivElement;
  coinVault: CoinVault;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;

    this.target.addEventListener('coinCharged', this.updateCoinVaultTableTemplate);
  }

  templates(coinsQuantity: Coins): string {
    return `
      <div class = 'table-container'>
        <h2>자판기가 보유한 동전</h2>
        <table id= 'coin-vault-table'>
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

  render = () => {
    this.target.insertAdjacentHTML('beforeend', this.templates(this.coinVault.getCoins()));
  };

  updateCoinVaultTableTemplate = () => {
    const coin500Quantity = document.querySelector('#coin500-quantity');
    const coin100Quantity = document.querySelector('#coin100-quantity');
    const coin50Quantity = document.querySelector('#coin50-quantity');
    const coin10Quantity = document.querySelector('#coin10-quantity');

    coin500Quantity.textContent = `${this.coinVault.getCoins().coin500}`;
    coin100Quantity.textContent = `${this.coinVault.getCoins().coin100}`;
    coin50Quantity.textContent = `${this.coinVault.getCoins().coin50}`;
    coin10Quantity.textContent = `${this.coinVault.getCoins().coin10}`;
  };
}
