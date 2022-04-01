import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { EventOnElement } from '../types';

@customElement('vendingmachine-navigation')
class Navigation extends Component {
  template(): string {
    return `
      <nav class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-1 ${
          window.location.pathname === '/product-manage-tab' ? 'active' : ''
        }" data-destination="product-manage-tab">상품 관리</button>
        <button class="btn btn-secondary mr-1 ${
          window.location.pathname === '/charge-money-tab' ? 'active' : ''
        }" data-destination="charge-money-tab">잔돈 충전</button>
        <button class="btn btn-secondary ${
          window.location.pathname === '/purchase-product-tab' ? 'active' : ''
        }" data-destination="purchase-product-tab">상품 구매</button>
      </nav>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickNavTab);
  }

  onClickNavTab = ({ target }: EventOnElement) => {
    const destination = target.dataset.destination as string;
    Router.pushState(destination);
    this.render();
  };

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template();
  }
}

export default Navigation;
