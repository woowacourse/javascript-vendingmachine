import Component from '../../core/Component';
import './Link';
import { browser } from '../../domains/Browser';
import { PAGES } from '../../configs/constants';

class NavBar extends Component {
  template() {
    const location = browser.useStore((state) => state.location);

    return `
      <a-link
        id="item-management-link"
        class="nav-button styled-button ${
          location === PAGES.ITEM_MANAGEMENT.PATH ? 'selected' : ''
        }"
        href="${PAGES.ITEM_MANAGEMENT.PATH}"
      >
        ${PAGES.ITEM_MANAGEMENT.TITLE}
      </a-link>
      <a-link
        id="change-charge-link"
        class="nav-button styled-button ${
          location === PAGES.CHANGE_CHARGE.PATH ? 'selected' : ''
        }"
        href="${PAGES.CHANGE_CHARGE.PATH}"
      >
        ${PAGES.CHANGE_CHARGE.TITLE}
      </a-link>
      <a-link
        id="item-purchase-link"
        class="nav-button styled-button ${
          location === PAGES.LANDING.PATH ||
          location === PAGES.ITEM_PURCHASE.PATH
            ? 'selected'
            : ''
        }"
        href="${PAGES.ITEM_PURCHASE.PATH}"
      >
        ${PAGES.ITEM_PURCHASE.TITLE}
      </a-link>
    `;
  }
}

customElements.define('nav-bar', NavBar);
