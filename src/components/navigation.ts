import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { EventOnElement } from '../types';

@customElement('vendingmachine-navigation')
class Navigation extends Component {
  template(): string {
    return `
      <nav class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-1 active" data-destination="product-manage-tab">상품 관리</button>
        <button class="btn btn-secondary mr-1" data-destination="charge-money-tab">잔돈 충전</button>
        <button class="btn btn-secondary">상품 구매</button>
      </nav>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickNavLink);
  }

  onClickNavLink = ({ target }: EventOnElement) => {
    this.activeLink(target);
    const destination = target.dataset.destination as string;
    Router.pushState(destination);
  };

  activeLink(target: HTMLElement) {
    [...this.querySelectorAll('button')].forEach(($button) => $button.classList.remove('active'));
    target.classList.add('active');
  }

  shouldSubscribe(): boolean {
    return false;
  }
}

export default Navigation;
