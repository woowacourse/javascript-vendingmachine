import Component from '../../core/Component';
import './Link';
import { vendingMachine } from '../../domains/VendingMachine';
import { PAGES } from '../../configs/constants';

export default class NavBar extends Component {
  template() {
    const location = vendingMachine.useStore((state) => state.location);

    return `
      <a-link
        class="nav-button styled-button ${
          location === PAGES.LANDING.PATH ||
          location === PAGES.ITEM_MANAGEMENT.PATH
            ? 'selected'
            : ''
        }"
        href="${PAGES.ITEM_MANAGEMENT.PATH}"
      >
        ${PAGES.ITEM_MANAGEMENT.TITLE}
      </a-link>
      <a-link
        class="nav-button styled-button ${
          location === PAGES.CHANGE_CHARGE.PATH ? 'selected' : ''
        }"
        href="${PAGES.CHANGE_CHARGE.PATH}"
      >
        ${PAGES.CHANGE_CHARGE.TITLE}
      </a-link>
      <a-link
        class="nav-button styled-button ${
          location === PAGES.ITEM_PURCHASE.PATH ? 'selected' : ''
        }"
        href="${PAGES.ITEM_PURCHASE.PATH}"
      >
        ${PAGES.ITEM_PURCHASE.TITLE}
      </a-link>
    `;
  }
}

customElements.define('nav-bar', NavBar);
