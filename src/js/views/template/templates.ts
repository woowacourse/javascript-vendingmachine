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
  purchaseItemInputContainer(inputMoney) {
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
  itemPurchaseTableContainer(items) {
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
  returnCoinTableContainer(coins) {
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

export const itemMangeTemplate = items => `
  ${sharedTemplate.addInputContainer()}
  ${sharedTemplate.itemTableContainer(items)}
`;

export const MoneyChargeTemplate = (coins, currentMoney) => `
  ${sharedTemplate.chargeMoneyInputContainer(currentMoney)}
  ${sharedTemplate.coinTableContainer(coins)}
`;

export const itemPurchaseTemplate = (items, coins, inputMoney) => `
  ${sharedTemplate.purchaseItemInputContainer(inputMoney)}
  ${sharedTemplate.itemPurchaseTableContainer(items)}
  ${sharedTemplate.returnCoinTableContainer(coins)}
`;
