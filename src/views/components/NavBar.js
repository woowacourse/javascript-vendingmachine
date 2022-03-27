import Component from '../../core/Component';
import { PAGE } from '../../constant/constant';

export default class NavBar extends Component {
  setup() {
    const { href } = window.location;
    const { hash } = new URL(href);
    const location = hash === '' ? '#item-management' : hash;

    this.state = { location };
  }

  template() {
    const { location } = this.state;

    return `
      <a
        class="nav-button styled-button ${
          location === PAGE.ITEM_MANAGEMENT.PATH ? 'selected' : ''
        }"
        href=${PAGE.ITEM_MANAGEMENT.PATH}
      >
        ${PAGE.ITEM_MANAGEMENT.TITLE}
      </a>
      <a
        class="nav-button styled-button ${
          location === PAGE.CHANGE_CHARGE.PATH ? 'selected' : ''
        }"
        href=${PAGE.CHANGE_CHARGE.PATH}
      >
        ${PAGE.CHANGE_CHARGE.TITLE}
      </a>
      <a
        class="nav-button styled-button ${
          location === PAGE.ITEM_PURCHASE.PATH ? 'selected' : ''
        }"
        href=${PAGE.ITEM_PURCHASE.PATH}
      >
        ${PAGE.ITEM_PURCHASE.TITLE}
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
