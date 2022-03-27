import TableRow from '../../core/TableRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM, MONEY_UNIT, CONFIRM_MESSAGE } from '../../constant/constant';

class ItemRow extends TableRow {
  setup() {
    this.state = { isEditing: false };
  }

  template() {
    const { name, price, quantity } = this.props;
    const { isEditing } = this.state;

    return `
       ${
         isEditing
           ? `
            <td class="item-name styled-td">
              <input
                value="${name}"
                class="item-name-edit-input transparent-input"
                type="text"
                maxlength="${ITEM.NAME.MAX_LENGTH}"
              >
            </td>
            <td class="item-price styled-td">
              <input
                value="${price}"
                class="item-price-edit-input transparent-input"
                type="number"
                step="${MONEY_UNIT}"
                min="${ITEM.PRICE.MIN}"
                max="${ITEM.PRICE.MAX}"
              >
            </td>
            <td class="item-quantity styled-td">
              <input
                value="${quantity}"
                class="item-quantity-edit-input transparent-input"
                type="number"
                step="1"
                min="${ITEM.QUANTITY.MIN}"
                max="${ITEM.QUANTITY.MAX}"
              >
            </td>
            <td class="item-button-container">
              <button class="item-update-button styled-button">완료</button>
            </td>
          `
           : `
            <td class="item-name styled-td">${name}</td>
            <td class="item-price styled-td">${price}</td>
            <td class="item-quantity styled-td">${quantity}</td>
            <td class="item-button-container">
              <button class="item-edit-button styled-button" type="button">수정</button>
              <button class="item-remove-button styled-button" type="button">삭제</button>
            </td>
          `
       }
    `;
  }

  setEvent() {
    this.addEvent('click', '.item-edit-button', () => {
      this.setState({ isEditing: true });

      const input = this.querySelector('.item-name-edit-input');

      input.focus();

      setTimeout(() => {
        input.selectionStart = ITEM.NAME.MAX_LENGTH;
        input.selectionEnd = ITEM.NAME.MAX_LENGTH;
      }, 0);
    });

    this.addEvent('click', '.item-update-button', () => {
      const prevName = this.props.name;
      const updatedItem = {
        name: this.querySelector('.item-name-edit-input').value.trim(),
        price: this.querySelector('.item-price-edit-input').valueAsNumber,
        quantity: this.querySelector('.item-quantity-edit-input').valueAsNumber,
      };

      try {
        vendingMachine.updateItem(prevName, updatedItem);
      } catch ({ message }) {
        window.alert(message);
      }
    });

    this.addEvent('click', '.item-remove-button', () => {
      if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
        const { name } = this.props;

        vendingMachine.removeItem(name);
      }
    });
  }
}

customElements.define('item-row', ItemRow, { extends: 'tr' });
