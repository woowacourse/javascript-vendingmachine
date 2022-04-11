import Component from '../../core/Component';
import { PAGE } from '../../constant';
import { globalStore } from '../../domains/GlobalStore';

export default class NavBar extends Component {
  template() {
    const { location } = this.props;

    return `
      <a
        id="item-management"
        class="nav-button styled-button ${
          location === PAGE.ITEM_MANAGEMENT.PATH ? 'selected' : ''
        }"
      >
        ${PAGE.ITEM_MANAGEMENT.TITLE}
      </a>
      <a
        id="change-charge"
        class="nav-button styled-button ${
          location === PAGE.CHANGE_CHARGE.PATH ? 'selected' : ''
        }"
      >
        ${PAGE.CHANGE_CHARGE.TITLE}
      </a>
      <a
        id="item-purchase"
        class="nav-button styled-button ${
          location === PAGE.ITEM_PURCHASE.PATH ? 'selected' : ''
        }"
      >
        ${PAGE.ITEM_PURCHASE.TITLE}
      </a>
    `;
  }

  setEvent() {
    this.addEvent('click', '.nav-button', ({ target }) => {
      let to;
      if (target.id === 'item-management') to = PAGE.ITEM_MANAGEMENT.PATH;
      if (target.id === 'change-charge') to = PAGE.CHANGE_CHARGE.PATH;
      if (target.id === 'item-purchase') to = PAGE.ITEM_PURCHASE.PATH;

      const state = { path: to };

      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });
  }
}

customElements.define('nav-bar', NavBar);
