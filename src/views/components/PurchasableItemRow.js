import TableRow from '../../core/TableRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM } from '../../configs/constants';
import { showSnackbar } from './Snackbar';

class PurchasableItemRow extends TableRow {
  template() {
    const { name, price, quantity } = this.props;

    return `
      <td class="item-name styled-td">${name}</td>
      <td class="item-price styled-td">${price}</td>
      <td class="item-quantity styled-td">${quantity}</td>
      <td class="item-button-container">
        <button class="item-purchase-button styled-button" type="button">구매</button>
      </td>
    `;
  }

  setEvent() {
    this.addEvent('click', '.item-purchase-button', () => {
      const { name } = this.props;

      try {
        vendingMachine.purchaseItem(name);
      } catch (err) {
        showSnackbar(err.message);
      }
    });
  }
}

customElements.define('purchasable-row', PurchasableItemRow, { extends: 'tr' });
