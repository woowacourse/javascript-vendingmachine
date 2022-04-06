import { CoinVault } from '../domain/CoinVault';
import { Coins } from '../interfaces/interface';
import { getStorageCoinVault } from '../utils/sessionStorage';
import { SnackBar } from './SnackBar';

export class CoinChangesTable {
  target: HTMLDivElement;
  coinVault: CoinVault;
  snackBar: SnackBar;

  coin500Quantity: HTMLSpanElement;
  coin100Quantity: HTMLSpanElement;
  coin50Quantity: HTMLSpanElement;
  coin10Quantity: HTMLSpanElement;
  giveChangesBtn: HTMLButtonElement;

  constructor(props) {
    this.target = props.target;
    this.coinVault = props.coinVault;
    this.snackBar = props.snackBar;
  }

  render = () => {
    this.target.insertAdjacentHTML('beforeend', this.template());
    this.selectDom();
    this.giveChangesBtn.addEventListener('click', this.handleGiveChanges);
  };

  template(): string {
    return `
      <div class = 'table-container'>
        <h2>잔돈 반환</h2>
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
              <td><span id="coin500-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span id="coin100-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span id="coin50-quantity">0</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span id="coin10-quantity">0</span>개</td>
            </tr>
          </tbody>
        </table>
        <button id='give-changes-button' type="submit" class ='submit-button button'>반환</button>
      </div>
    `;
  }

  selectDom() {
    this.coin500Quantity = document.querySelector('#coin500-quantity');
    this.coin100Quantity = document.querySelector('#coin100-quantity');
    this.coin50Quantity = document.querySelector('#coin50-quantity');
    this.coin10Quantity = document.querySelector('#coin10-quantity');
    this.giveChangesBtn = document.querySelector('#give-changes-button');
  }

  handleGiveChanges = () => {
    this.coinVault = getStorageCoinVault();
    this.updateCoinVaultTableTemplate(this.coinVault.giveChanges());
    sessionStorage.setItem('coinVault', JSON.stringify(this.coinVault));
    this.snackBar.render('동전이 반환됐습니다');
    this.target.dispatchEvent(new CustomEvent('giveChanges'));
  };

  updateCoinVaultTableTemplate = (coins: Coins) => {
    const { coin500, coin100, coin50, coin10 } = coins;
    this.coin500Quantity.textContent = `${coin500}`;
    this.coin100Quantity.textContent = `${coin100}`;
    this.coin50Quantity.textContent = `${coin50}`;
    this.coin10Quantity.textContent = `${coin10}`;
  };
}
