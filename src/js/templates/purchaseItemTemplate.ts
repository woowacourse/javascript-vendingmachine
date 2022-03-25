import { COINS } from '../constants/constants';
import { CoinsType, ItemType, TemplateType } from '../types/types';

const sectionTemplate = {
  inputContainer(inputMoney: number): TemplateType {
    return `
    <section class="input-container">
      <h2 hidden>상품 구매</h2>
      <form>
        <label>상품을 구매할 금액을 투입해주세요</label>
        <div>
          <input class="charge-money-input" placeholder="금액" />
          <button class="submit-button">충전</button>
        </div>
      </form>
      <p>투입한 금액: <span>${inputMoney}</span>원</p>
    </section>
    `;
  },

  itemTableContainer(items: ItemType[]): TemplateType {
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
            <td>${item.name}</td>
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

  coinTableContainer(coins: CoinsType): TemplateType {
    return `
    <section class="table-container">
      <h2>잔돈 반환</h2>
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
      <button class="return-money-button">반환</button>
    </section>
    `;
  },
};

export const purchaseItemTemplate = (
  items: ItemType[],
  coins: CoinsType,
  inputMoney: number,
): TemplateType => `
  ${sectionTemplate.inputContainer(inputMoney)}
  ${sectionTemplate.itemTableContainer(items)}
  ${sectionTemplate.coinTableContainer(coins)}
`;
