import { CoinsType } from '../types';
import { generateCoinTableTemplate } from '../utils/viewTemplate';

export const sectionTemplate = {
  inputContainer(currentMoney: number): string {
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
      <p>현재 보유 금액: <span id="current-money">${currentMoney}</span>원</p>
    </section>
    `;
  },

  tableContainer(coins: CoinsType): string {
    return `
    <section class="table-container">
      <h2>자판기가 보유한 동전</h2>
      <table class="coin-table">
      ${this.coinTableContent(coins)}
      </table>
    </section>`;
  },

  coinTableRowLayout(coinKey: number, coinNumber: number): string {
    return `
    <tr>
      <td>${coinKey}원</td>
      <td>${coinNumber}개</td>
    </tr>
    `;
  },

  coinTableContent(coins: CoinsType): string {
    return `
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
    ${generateCoinTableTemplate(coins, this.coinTableRowLayout)}
    `;
  },
};

export const chargeMoneyTemplate = (isLogin, coins: CoinsType, currentMoney: number): string =>
  isLogin
    ? `
  ${sectionTemplate.inputContainer(currentMoney)}
  ${sectionTemplate.tableContainer(coins)}
  `
    : `<div class="permission-info">접근 권한이 없습니다.</div>`;
