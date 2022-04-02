import { COINS } from '../constants/vendingMachineConstants';
import { CoinsType } from '../types/types';

export const sectionTemplate = {
  inputContainer(currentMoney: number) {
    return `
    <section class="input-container">
      <h2 hidden>잔돈 충전</h2>
      <form id="charge-money-form">
      <label>자판기가 보유할 금액을 입력해주세요.</label>
      <div>
       <input class="charge-money-input" placeholder="금액" type="number" />
        <button class="submit-button">충전</button>
       </div>
      </form>
      <p>현재 보유 금액: <span id="current-charge-money">${currentMoney}</span>원</p>
    </section>
    `;
  },

  tableContainer(coins: CoinsType) {
    return `
    <section class="table-container">
      <h2>자판기가 보유한 동전</h2>
      <table class="coin-table">
      ${this.coinTableContent(coins)}
      </table>
    </section>`;
  },

  coinTableContent(coins: CoinsType) {
    return `
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
    ${Object.keys(coins)
      .map(coinKey => {
        return `
        <tr>
          <td>${COINS[coinKey]}원</td>
          <td>${coins[coinKey]}개</td>
        </tr>
      `;
      })
      .join('')}
      `;
  },
};

export const chargeMoneyTemplate = (coins: CoinsType, currentMoney: number) => `
  ${sectionTemplate.inputContainer(currentMoney)}
  ${sectionTemplate.tableContainer(coins)}
`;
