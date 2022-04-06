import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import '../components/ItemRow';
import { ITEM, MONEY_UNIT } from '../../constant';
import { showSnackBar } from '../../utils/domUtil';

class ItemManagementPage extends Component {
  template() {
    const items = vendingMachine.useStore((state) => state.items);

    return `
      <section>
        <h2 hidden>추가할 상품 정보</h2>
        <form id="item-add-form" class="item-add-form">
          <fieldset class="fieldset">
            <legend class="description">추가할 상품 현황을 입력해주세요.</legend>
            <label hidden for="name">상품명</label>
            <input
              id="item-name-input"
              class="item-input styled-input"
              name="name"
              placeholder="상품명"
              type="text"
              maxlength="${ITEM.NAME.MAX_LENGTH}"
              required
              autofocus
            >
            <label hidden for="price">가격</label>
            <input
              id="item-price-input"
              class="item-input styled-input"
              name="price"
              placeholder="가격"
              type="number"
              step="${MONEY_UNIT}"
              min="${ITEM.PRICE.MIN}"
              max="${ITEM.PRICE.MAX}"
              required
            >
            <label hidden for="quantity">수량</label>
            <input
              id="item-quantity-input"
              class="item-input styled-input"
              name="quantity"
              placeholder="수량"
              type="number"
              step="1"
              min="${ITEM.QUANTITY.MIN}"
              max="${ITEM.QUANTITY.MAX}"
              required
            >
          </fieldset>
          <button class="add-item-button styled-button emphasized">추가</button>
        </form>
      </section>
      <section>
        <h2 class="table-title">상품 현황</h2>
        <table class="styled-table">
          <colgroup>
            <col style="width: 30%">
            <col style="width: 20%">
            <col style="width: 20%">
            <col style="width: 30%">
          </colgroup>
          <thead>
            <tr class="styled-tr">
              <th class="styled-th">상품명</th>
              <th class="styled-th">가격</th>
              <th class="styled-th">수량</th>
              <th class="styled-th"></th>
            </tr>
          </thead>
        </table>
        <div class="scrollable">
          <table class="styled-table no-border-top">
            <colgroup>
              <col style="width: 30%">
              <col style="width: 20%">
              <col style="width: 20%">
              <col style="width: 30%">
            </colgroup>
            <tbody>
              ${items
                .map(
                  ({ name, price, quantity }) => `
                    <tr
                      is="item-row"
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
      <div class="snackbar"></div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#item-add-form', (event) => {
      event.preventDefault();

      const { target } = event;
      const item = {
        name: target.querySelector('#item-name-input').value.trim(),
        price: target.querySelector('#item-price-input').valueAsNumber,
        quantity: target.querySelector('#item-quantity-input').valueAsNumber,
      };

      try {
        vendingMachine.addItem(item);
      } catch (err) {
        showSnackBar(err);
      }
    });
  }
}

customElements.define('item-management', ItemManagementPage);
