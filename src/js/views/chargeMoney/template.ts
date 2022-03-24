import { COINS } from '../../constants/constant';

const sectionTemplate = {
  inputContainer(currentMoney) {
    return `
    <section class="input-container">
      <h2 hidden>잔돈 충전</h2>
      <form>
      <label>자판기가 보유할 금액을 입력해주세요.</label>
      <div>
       <input class="charge-money-input" placeholder="금액" />
        <button class="submit-button">충전</button>
       </div>
      </form>
      <p>현재 보유 금액: <span>${currentMoney}</span>원</p>
    </section>
    `;
  },

  tableContainer(coins) {
    return `
    <section class="table-container">
      <h2>자판기가 보유한 동전</h2>
      <table class="coin-table">
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
      </table>
    </section>`;
  },
};

export const chargeMoneyTemplate = (coins, currentMoney) => `
  ${sectionTemplate.inputContainer(currentMoney)}
  ${sectionTemplate.tableContainer(coins)}
`;
