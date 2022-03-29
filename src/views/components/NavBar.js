import Component from '../../core/Component';
import { vendingMachine } from '../../domains/VendingMachine';
import { PAGES } from '../../configs/constants';

export default class NavBar extends Component {
  template() {
    const location = vendingMachine.useStore((state) => state.location);

    return `
      <a
        class="nav-button styled-button ${
          location === PAGES.LANDING.PATH ||
          location === PAGES.ITEM_MANAGEMENT.PATH
            ? 'selected'
            : ''
        }"
        href="${PAGES.ITEM_MANAGEMENT.PATH}"
      >
        ${PAGES.ITEM_MANAGEMENT.TITLE}
      </a>
      <a
        class="nav-button styled-button ${
          location === PAGES.CHANGE_CHARGE.PATH ? 'selected' : ''
        }"
        href="${PAGES.CHANGE_CHARGE.PATH}"
      >
        ${PAGES.CHANGE_CHARGE.TITLE}
      </a>
      <a
        class="nav-button styled-button ${
          location === PAGES.ITEM_PURCHASE.PATH ? 'selected' : ''
        }"
        href="${PAGES.ITEM_PURCHASE.PATH}"
      >
        ${PAGES.ITEM_PURCHASE.TITLE}
      </a>
    `;
  }

  setEvent() {
    this.addEvent('click', '.nav-button', (event) => {
      event.preventDefault();

      const to = event.target.getAttribute('href');
      const state = {};

      window.history.pushState(state, '', to);
      dispatchEvent(new PopStateEvent('popstate', { state }));
    });
  }
}

customElements.define('nav-bar', NavBar);
