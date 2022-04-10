import { CoinVault } from '../../domain/CoinVault';
import { Coins } from '../../utils/interface';

interface CoinVaultTableInterface {
  render();
}

export class CoinVaultTable implements CoinVaultTableInterface {
  #target: HTMLDivElement;
  #coinVault: CoinVault;
  #coin500Quantity: HTMLSpanElement;
  #coin100Quantity: HTMLSpanElement;
  #coin50Quantity: HTMLSpanElement;
  #coin10Quantity: HTMLSpanElement;

  constructor({ target, coinVault }) {
    this.#target = target;
    this.#coinVault = coinVault;

    this.#target.addEventListener('coinCharged', this.#updateCoinVaultTable);
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template(this.#coinVault.getCoins()));
    this.#selectDom();
    this.#bindEvent();
  }

  #template(coinsQuantity: Coins) {
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
              <td><span class="coin500-quantity">${coinsQuantity.coin500}</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span class="coin100-quantity">${coinsQuantity.coin100}</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span class="coin50-quantity">${coinsQuantity.coin50}</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span class="coin10-quantity">${coinsQuantity.coin10}</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  #selectDom() {
    this.#coin500Quantity = document.querySelector('.coin500-quantity');
    this.#coin100Quantity = document.querySelector('.coin100-quantity');
    this.#coin50Quantity = document.querySelector('.coin50-quantity');
    this.#coin10Quantity = document.querySelector('.coin10-quantity');
  }

  #bindEvent() {
    document.addEventListener('coinsReturned', this.#updateCoinVaultTable);
  }

  #updateCoinVaultTable = () => {
    const { coin500, coin100, coin50, coin10 } = this.#coinVault.getCoins();

    this.#coin500Quantity.textContent = `${coin500}`;
    this.#coin100Quantity.textContent = `${coin100}`;
    this.#coin50Quantity.textContent = `${coin50}`;
    this.#coin10Quantity.textContent = `${coin10}`;
  };
}
