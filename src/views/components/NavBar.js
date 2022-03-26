import Component from '../../core/Component';
import { PAGES } from '../../configs/constants';
import { getHash } from '../../utils/domUtils';

export default class NavBar extends Component {
  setup() {
    this.state = { location: getHash() };
  }

  template() {
    const { location } = this.state;

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
    this.addEvent('click', '.nav-button', ({ target }) => {
      const location = target.getAttribute('href');

      this.setState({ location });
    });
  }
}

customElements.define('nav-bar', NavBar);
