import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import '../components/ItemRow';

class ItemManagementPage extends Component {
  setup() {
    this.state = { editItems: [] };
  }

  template() {
    const items = vendingMachine.useStore((state) => state.items);

    return `
      <section>
        <h2 hidden>추가할 상품 정보</h2>
        <form id="item-add-form">
          <fieldset>
            <legend>추가할 상품 현황을 입력해주세요.</legend>
            <label hidden for="name"">상품명</label>
            <input id="item-name-input" name="name" placeholder="상품명" type="text" maxlength="10" required autofocus>
            <label hidden for="price">가격</label>
            <input id="item-price-input" name="price" placeholder="가격" type="number" step="10" min="100" max="10000" required>
            <label hidden for="quantity">수량</label>
            <input id="item-quantity-input" name="quantity" placeholder="수량" type="number" step="1" min="1" max="20" required>
          </fieldset>
          <button>추가</button>
        </form>
      </section>
      <section>
        <h2>상품현황</h2>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                ({ name, price, quantity }) => `
                  <tr is="item-row" name="${name}" price="${price}" quantity="${quantity}"></tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </section>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#item-add-form', ({ target }) => {
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
