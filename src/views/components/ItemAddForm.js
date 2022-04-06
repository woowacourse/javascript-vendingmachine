import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM } from '../../configs/constants';

export default class ItemAddForm extends Component {
  template() {
    return `
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
    `;
  }

  setEvent() {
    this.addEvent('submit', '#item-add-form', (event) => {
      event.preventDefault();

      const { target } = event;
      const nameInput = target.querySelector('#item-name-input');
      const priceInput = target.querySelector('#item-price-input');
      const quantityInput = target.querySelector('#item-quantity-input');
      const item = {
        name: nameInput.value.trim(),
        price: priceInput.valueAsNumber,
        quantity: quantityInput.valueAsNumber,
      };

      try {
        vendingMachine.addItem(item);

        nameInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('add-form', ItemAddForm);
