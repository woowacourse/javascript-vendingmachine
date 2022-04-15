import { CoinsType, ItemType } from '../types';
import { generateCoinTableTemplate } from '../utils/viewTemplate';

const sectionTemplate = {
  inputContainer(inputMoney: number): string {
    return `
    <section class="input-container">
      <h2 hidden>상품 구매</h2>
      <form id="purchase-item-form">
        <label>상품을 구매할 금액을 투입해주세요</label>
        <div>
          <input class="purchase-item-input" placeholder="금액" type="number"/>
          <button class="submit-button">충전</button>
        </div>
      </form>
      <p>투입한 금액: <span id="purchase-money-input">${inputMoney}</span>원</p>
    </section>
    `;
  },

  itemTableContainer(items: ItemType[]): string {
    return `
    <section class="table-container">
      <h2>구매 가능 상품 현황</h2>
      <table class="item-table">
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
        ${items
          .map(item => {
            return `
          <tr>
            <td class="table-item-input-name">${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>
              <button class="item-table-purchase-button">구매</button>
            </td>
          </tr>`;
          })
          .join('')}
      </table>
    </section>
    `;
  },

  coinTableRowLayout(coinKey: number, coinNumber: number): string {
    return `
    <tr>
      <td>${coinKey}원</td>
      <td>${coinNumber}개</td>
    </tr>
    `;
  },

  coinTableContainer(coins: CoinsType): string {
    return `
    <section class="table-container">
      <h2>잔돈 반환</h2>
      <table class="coin-table">
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
          ${generateCoinTableTemplate(coins, this.coinTableRowLayout)}
        </table>
      <button class="return-money-button">반환</button>
    </section>
    `;
  },
};

export const purchaseItemTemplate = (
  items: ItemType[],
  coins: CoinsType,
  inputMoney: number,
): string => `
  ${sectionTemplate.inputContainer(inputMoney)}
  ${sectionTemplate.itemTableContainer(items)}
  ${sectionTemplate.coinTableContainer(coins)}
`;
