import { COINS } from '../constants/vendingMachineConstants';
import { CoinsType, ItemType } from '../types/types';

export const sectionTemplate = {
  inputContainer(inputMoney: number) {
    return `
    <section class="input-container">
      <h2 hidden>상품 구매</h2>
      <form id="input-money-submit">
        <label>상품을 구매할 금액을 투입해주세요</label>
        <div>
          <input class="charge-money-input" placeholder="금액" type="number" />
          <button class="submit-button">충전</button>
        </div>
      </form>
      <p>투입한 금액: <span id="current-input-money">${inputMoney}</span>원</p>
    </section>
    `;
  },

  itemTableContainer(items: ItemType[]) {
    return `
    <section class="table-container">
      <h2>구매 가능 상품 현황</h2>
      <table id="purchase-item-table" class="item-table">
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
            <td class="table-item-name">${item.name}</td>
            <td class="table-item-price">${item.price}</td>
            <td class="table-item-quantity">${item.quantity}</td>
            <td>
              <button class="item-table-purchase-button" data-name=${item.name} data-price=${item.price}>구매</button>
            </td>
          </tr>`;
          })
          .join('')}
      </table>
    </section>
    `;
  },

  coinTableContainer(coins: CoinsType) {
    return `
    <section class="table-container">
      <h2>잔돈 반환</h2>
      <table id="change-coins-table" class="coin-table">
        ${this.changeCoinsTable(coins)}
      </table>
      <button class="return-change-button">반환</button>
    </section>
    `;
  },

  changeCoinsTable(coins: CoinsType) {
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

export const purchaseItemTemplate = (items: ItemType[], coins: CoinsType, inputMoney: number) => `
  ${sectionTemplate.inputContainer(inputMoney)}
  ${sectionTemplate.itemTableContainer(items)}
  ${sectionTemplate.coinTableContainer(coins)}
`;
