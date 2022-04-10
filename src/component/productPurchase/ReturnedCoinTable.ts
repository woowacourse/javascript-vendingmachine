import { CoinVault } from '../../domain/CoinVault';
import { PurchaseMoney } from '../../domain/PurchaseMoney';

import { Coins } from '../../utils/interface';

interface ReturnedCoinTableInterface {
  render();
}

export class ReturnedCoinTable implements ReturnedCoinTableInterface {
  #coinVault: CoinVault;
  #purchaseMoney: PurchaseMoney;
  #target: HTMLDivElement;
  #coin500Quantity: HTMLSpanElement;
  #coin100Quantity: HTMLSpanElement;
  #coin50Quantity: HTMLSpanElement;
  #coin10Quantity: HTMLSpanElement;
  #returnBtn: HTMLButtonElement;

  constructor({ target, coinVault, purchaseMoney }) {
    this.#target = target;
    this.#coinVault = coinVault;
    this.#purchaseMoney = purchaseMoney;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
    this.#selectDom();
    this.#bindEvent();
  }

  #template() {
    return `
      <div class="table-container">
        <h2>잔돈 반환</h2>
        <table id="returned-coin-table">
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500원</td>
              <td><span class="coin500-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span class="coin100-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span class="coin50-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span class="coin10-quantity">0</span>개</td>
            </tr>
          </tbody>
        </table>
        <button class="return-button button" type="button">반환</button>
      </div>
    `;
  }

  #selectDom() {
    this.#coin500Quantity = document.querySelector('.coin500-quantity');
    this.#coin100Quantity = document.querySelector('.coin100-quantity');
    this.#coin50Quantity = document.querySelector('.coin50-quantity');
    this.#coin10Quantity = document.querySelector('.coin10-quantity');
    this.#returnBtn = document.querySelector('.return-button');
  }

  #bindEvent() {
    this.#returnBtn.addEventListener('click', this.#handleReturnCoins);
  }

  #handleReturnCoins = () => {
    try {
      const [{ coin500, coin100, coin50, coin10 }, remainder] = this.#coinVault.returnCoins(
        this.#purchaseMoney.getMoney()
      );

      this.#purchaseMoney.setMoney(remainder);
      this.#updateReturnedCoinTable({ coin500, coin100, coin50, coin10 });
      this.#target.dispatchEvent(new CustomEvent('coinsReturned', { bubbles: true }));

      this.#target.dispatchEvent(
        new CustomEvent('showSnackbar', {
          detail: { type: 'success', message: '잔돈을 반환하였습니다.' },
        })
      );
    } catch (err) {
      this.#target.dispatchEvent(
        new CustomEvent('showSnackbar', {
          detail: { type: 'fail', message: err.message },
        })
      );
    }
  };

  #updateReturnedCoinTable({ coin500, coin100, coin50, coin10 }: Coins) {
    this.#coin500Quantity.textContent = `${coin500}`;
    this.#coin100Quantity.textContent = `${coin100}`;
    this.#coin50Quantity.textContent = `${coin50}`;
    this.#coin10Quantity.textContent = `${coin10}`;
  }
}
