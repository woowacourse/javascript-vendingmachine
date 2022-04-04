import { EMPTY_COIN } from '../../constant/constant';
import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import { sortCoins } from '../../utils/coinUtil';
import { showSnackBar } from '../../utils/domUtil';

class ItemPurchasePage extends Component {
  setup() {
    this.state = { returnCoins: { ...EMPTY_COIN } };
  }

  template() {
    const purchaseMoney = vendingMachine.useStore(
      (state) => state.purchaseMoney
    );
    const items = vendingMachine.useStore((state) => state.items);
    const coinArray = sortCoins(this.state.returnCoins);

    return `
    <section>
      <h2 hidden>상품 구매</h2>
      <form id="add-money-form" class="add-money-form">
        <div>
          <label for="amount" class="description">상품을 구매할 금액을 투입해주세요</label>
          <input
            id="add-money-amount"
            class="add-money-amount styled-input"
            name="amount"
            placeholder="금액"
            type="number"
            min="10"
            max="10000"
            step="10"
            required
            autofocus
          >
        </div>
        <button class="add-money-button styled-button emphasized">투입</button>
      </form>
      <p class="current-money-indicator">투입한 금액: <span>${purchaseMoney}원</span></p>
    </section>
    <section>
      <h2 class="table-title">구매 가능 상품 현황</h2>
      <table class="styled-table">
            <colgroup>
              <col style="width: 25%">
              <col style="width: 25%">
              <col style="width: 25%">
              <col style="width: 25%">
            </colgroup>
            <thead>
              <tr class="styled-tr">
                <th class="styled-th">상품명</th>
                <th class="styled-th">가격</th>
                <th class="styled-th">수량</th>
                <th class="styled-th">구매</th>
              </tr>
            </thead>
          </table>
          <div class="scrollable">
            <table class="styled-table no-border-top">
              <colgroup>
                <col style="width: 25%">
                <col style="width: 25%">
                <col style="width: 25%">
                <col style="width: 25%">
              </colgroup>
              <tbody>
              ${items
                .map(
                  ({ name, price, quantity }) => `
                    <tr
                      is="item-row"
                      tab="buy"
                      class="styled-tr"
                      name="${name}"
                      price="${price}"
                      quantity="${quantity}"
                    >
                    </tr>
                  `
                )
                .join('')}
              </tbody>
            </table>
          </div>
    </section>
    <section>
      <h2 class="table-title">잔돈 반환</h2>
      <table class="styled-table">
        <thead>
          <tr class="styled-tr">
            <th class="styled-th">동전</th>
            <th class="styled-th">개수</th>
          </tr>
        </thead>
        <tbody>
          ${coinArray
            .map(
              ([key, value]) => `
                <tr class="styled-tr">
                  <td class="styled-td">${key}원</td>
                  <td class="styled-td">${value}개</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
      <button id="return-button" class="return-button styled-button">반환</button>
    </section>
    <div class="snackbar"></div>
  `;
  }

  setEvent() {
    this.addEvent('submit', '#add-money-form', (event) => {
      event.preventDefault();

      const money = this.querySelector('#add-money-amount').valueAsNumber;

      try {
        vendingMachine.addPurchaseMoney(money);
      } catch (err) {
        const snackbar = this.querySelector('.snackbar');
        showSnackBar(snackbar, err);
      }
    });

    this.addEvent('click', '#return-button', (event) => {
      event.preventDefault();

      try {
        this.state.returnCoins = vendingMachine.returnChange();
      } catch ({ message }) {
        const snackbar = this.querySelector('.snackbar');
        showSnackBar(snackbar, message);
      }
    });
  }
}

customElements.define('item-purchase', ItemPurchasePage);
