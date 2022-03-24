import TableRow from '../../core/TableRow';
import { vendingMachine } from '../../domains/VendingMachine';

class ItemRow extends TableRow {
  setup() {
    const { name, price, quantity } = this.props;
    this.state = {
      isEditing: false,
      item: { name, price, quantity },
    };
  }

  template() {
    const {
      isEditing,
      item: { name, price, quantity },
    } = this.state;

    return `
       ${
         isEditing
           ? `
            <td class="item-name"><input value="${name}" class="item-name-edit-input" type="text" maxlength="10" ></td>
            <td class="item-price"><input value="${price}" class="item-price-edit-input" type="number" step="10" min="100" max="10000"></td>
            <td class="item-quantity"><input value="${quantity}" class="item-quantity-edit-input" type="number" step="1" min="1" max="20"></td>
            <td>
              <button class="item-update-button">완료</button>
            </td>
          `
           : `
            <td class="item-name">${name}</td>
            <td class="item-price">${price}</td>
            <td class="item-quantity">${quantity}</td>
            <td>
              <button class="item-edit-button" type="button">수정</button>
              <button class="item-remove-button" type="button">삭제</button>
            </td>
          `
       }
    `;
  }

  setEvent() {
    this.addEvent('click', '.item-edit-button', () => {
      this.setState({ isEditing: true });
    });

    this.addEvent('click', '.item-update-button', () => {
      const { item } = this.state;
      const updatedItem = {
        name: this.querySelector('.item-name-edit-input').value.trim(),
        price: this.querySelector('.item-price-edit-input').valueAsNumber,
        quantity: this.querySelector('.item-quantity-edit-input').valueAsNumber,
      };

      if (
        !updatedItem.name.length ||
        !updatedItem.price ||
        !updatedItem.quantity
      ) {
        window.alert('error');

        return;
      }

      vendingMachine.updateItem(item.name, updatedItem);

      this.setState({
        isEditing: false,
        item: updatedItem,
      });
    });

    this.addEvent('click', '.item-remove-button', () => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        const { name } = this.state.item;

        vendingMachine.removeItem(name);

        this.remove();
      }
    });
  }
}

customElements.define('item-row', ItemRow, { extends: 'tr' });
