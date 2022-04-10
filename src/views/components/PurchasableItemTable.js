import Component from '../../core/Component';
import './PurchasableItemRow';
import { vendingMachine } from '../../domains/VendingMachine';
import { ITEM } from '../../configs/constants';

class PurchasableItemTable extends Component {
  template() {
    const items = vendingMachine.useStore((state) => state.items);

    return `
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
                    is="purchasable-row"
                    class="purchasable-item-row styled-tr"
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
    `;
  }
}

customElements.define('purchasable-table', PurchasableItemTable);
