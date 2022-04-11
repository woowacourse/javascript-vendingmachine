import TableRow from '../../core/TableRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { snackbar } from '../../utils/domUtil';

class PurchaseItemRow extends TableRow {
  setup() {
    this.state = { isEditing: false, tab: this.props.tab };
  }

  template() {
    const { name, price, quantity } = this.props;

    return `
      <td class="item-name styled-td">${name}</td>
      <td class="item-price styled-td">${price}</td>
      <td class="item-quantity styled-td">${quantity}</td>
      <td class="item-button-container">
        <button class="item-buy-button styled-button" type="button">구매</button>
      </td>`;
  }

  setEvent() {
    this.addEvent('click', '.item-buy-button', () => {
      const { name } = this.props;
      try {
        vendingMachine.buyItem(name);
      } catch ({ message }) {
        snackbar.showSnackBar(message);
      }
    });
  }
}

customElements.define('purchaseitem-row', PurchaseItemRow, { extends: 'tr' });
