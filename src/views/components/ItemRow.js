import TableRow from '../../core/TableRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM } from '../../configs/constants';

class ItemRow extends TableRow {
  setup() {
    this.state = { isEditing: false };
  }

  template() {
    const { name, price, quantity } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      return `
        <td class="item-name styled-td">
          <input
            value="${name}"
            class="item-name-edit-input transparent-input"
            type="text"
            maxlength="${ITEM.NAME.LENGTH.MAX}"
          >
        </td>
        <td class="item-price styled-td">
          <input
            value="${price}"
            class="item-price-edit-input transparent-input"
            type="number"
            min="${ITEM.PRICE.MIN}"
            max="${ITEM.PRICE.MAX}"
            step="${ITEM.PRICE.STEP}"
          >
        </td>
        <td class="item-quantity styled-td">
          <input
            value="${quantity}"
            class="item-quantity-edit-input transparent-input"
            type="number"
            step="1"
            min="1"
            max="20"
          >
        </td>
        <td class="item-button-container">
          <button class="item-update-button styled-button">확인</button>
        </td>
      `;
    }

    return `
      <td class="item-name styled-td">${name}</td>
      <td class="item-price styled-td">${price}</td>
      <td class="item-quantity styled-td">${quantity}</td>
      <td class="item-button-container">
        <button class="item-edit-button styled-button" type="button">수정</button>
        <button class="item-remove-button styled-button" type="button">삭제</button>
      </td>
    `;
  }

  setEvent() {
    this.addEvent('click', '.item-edit-button', () => {
      this.setState({ isEditing: true });

      const input = this.querySelector('.item-name-edit-input');

      input.focus();

      setTimeout(() => {
        input.selectionStart = Number.MAX_SAFE_INTEGER;
        input.selectionEnd = Number.MAX_SAFE_INTEGER;
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
      } catch (err) {
        window.alert(err);
      }
    });

    this.addEvent('click', '.item-remove-button', () => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        const { name } = this.props;

        try {
          vendingMachine.removeItem(name);
        } catch (err) {
          window.alert(err);
        }
      }
    });
  }
}

customElements.define('item-row', ItemRow, { extends: 'tr' });
