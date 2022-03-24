import { COINS } from '../../constants/constant';

const sharedTemplate = {
  addInputContainer() {
    return `
      <section class="input-container">
      <h2 hidden>상품 정보 입력</h2>
      <form>
        <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input class="add-item-input" placeholder="상품명" />
          <input class="add-item-input" placeholder="가격" />
          <input class="add-item-input" placeholder="수량" />
          <button class="submit-button">추가</button>
        </div>
      </form>
      </section>
    `;
  },
  chargeMoneyInputContainer(currentMoney) {
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
  itemTableContainer(items) {
    return `
    <section class="table-container">
          <h2>상품 현황</h2>
          <table class="item-table">
          <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </tr>
          ${items
            .map(item => {
              return `
            <tr>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>${item.quantity}</td>
              <td>
                <button class="item-table-change-button">수정</button>
                <button class="item-table-delete-button">삭제</button>
              </td>
            </tr>`;
            })
            .join('')}
          </table>
        </section>
    `;
  },
  coinTableContainer(coins) {
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

export const itemMangeTemplate = items => `
  ${sharedTemplate.addInputContainer()}
  ${sharedTemplate.itemTableContainer(items)}
`;

export const itemPurchaseTemplate = (coins, currentMoney) => `
  ${sharedTemplate.chargeMoneyInputContainer(currentMoney)}
  ${sharedTemplate.coinTableContainer(coins)}
`;

const MoneyChargeTemplate = {};
