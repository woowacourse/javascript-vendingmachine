import Component from '../../core/Component';
import '../components/ItemRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM } from '../../configs/constants';

class ItemManagementPage extends Component {
  template() {
    const items = vendingMachine.useStore((state) => state.items);

    return `
      <section>
        <h2 hidden>추가할 상품 정보</h2>
        <form id="item-add-form" class="item-add-form">
          <fieldset class="fieldset">
            <legend class="description">추가할 상품 현황을 입력해주세요.</legend>
            <label hidden for="name">${ITEM.NAME.LABEL}</label>
            <input
              id="item-name-input"
              class="item-input styled-input"
              name="name"
              placeholder="${ITEM.NAME.LABEL}"
              type="text"
              maxlength="${ITEM.NAME.LENGTH.MAX}"
              required
              autofocus
            >
            <label hidden for="price">${ITEM.PRICE.LABEL}</label>
            <input
              id="item-price-input"
              class="item-input styled-input"
              name="price"
              placeholder="${ITEM.PRICE.LABEL}"
              type="number"
              min="${ITEM.PRICE.MIN}"
              max="${ITEM.PRICE.MAX}"
              step="${ITEM.PRICE.STEP}"
              required
            >
            <label hidden for="quantity">${ITEM.QUANTITY.LABEL}</label>
            <input
              id="item-quantity-input"
              class="item-input styled-input"
              name="quantity"
              placeholder="${ITEM.QUANTITY.LABEL}"
              type="number"
              min="${ITEM.QUANTITY.MIN}"
              max="${ITEM.QUANTITY.MAX}"
              step="1"
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
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
            <col style="width: 25%">
          </colgroup>
          <thead>
            <tr class="styled-tr">
              <th class="styled-th">${ITEM.NAME.LABEL}</th>
              <th class="styled-th">${ITEM.PRICE.LABEL}</th>
              <th class="styled-th">${ITEM.QUANTITY.LABEL}</th>
              <th class="styled-th"></th>
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
        window.alert(err);
      }
    });
  }
}

customElements.define('item-management', ItemManagementPage);
