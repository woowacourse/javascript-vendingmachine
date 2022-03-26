import Component from '../../core/Component';

export default class NavBar extends Component {
  setup() {
    const { href } = window.location;
    const location = new URL(href).hash;

    this.state = { location };
  }

  template() {
    const { location } = this.state;

    return `
      <a
        class="nav-button styled-button ${
          location === '' || location === '#item-management' ? 'selected' : ''
        }"
        href="#item-management"
      >
        상품 관리
      </a>
      <a
        class="nav-button styled-button ${
          location === '#change-charge' ? 'selected' : ''
        }"
        href="#change-charge"
      >
        잔돈 충전
      </a>
      <a
        class="nav-button styled-button ${
          location === '#item-purchase' ? 'selected' : ''
        }"
        href="#item-purchase"
      >
        상품 구매
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
