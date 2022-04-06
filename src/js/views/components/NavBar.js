import Component from '../../core/Component';
import { PAGE } from '../../constant/constant';
import { globalStore } from '../../domains/GlobalStore';

export default class NavBar extends Component {
  template() {
    const { location } = this.props;
    // 왜 재랜더링 되는거지....ㅠ
    // 이전 location 값이 한 번 더 랜더링됨. 근데 또 template에는 영향이 없음. 뭐야.
    // delayed된 이전 값....?
    console.log('!!!!!!!', this.props, location);
    console.log('🥲');

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
