import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Router from '../router';
import { EventOnElement, WhiteList } from '../types';

@customElement('vendingmachine-navigation')
class Navigation extends Component {
  template(currentPath: string): string {
    return `
      <nav class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-1 ${
          currentPath === WhiteList.ProductManage ? 'active' : ''
        }" data-destination="${
      WhiteList.ProductManage
    }" data-test-id="product-manage-link">상품 관리</button>
        <button class="btn btn-secondary mr-1 ${
          currentPath === WhiteList.ChargeMoney ? 'active' : ''
        }" data-destination="${
      WhiteList.ChargeMoney
    }" data-test-id="charge-money-link">잔돈 충전</button>
        <button class="btn btn-secondary ${
          currentPath === WhiteList.PurchaseProduct ? 'active' : ''
        }" data-destination="${
      WhiteList.PurchaseProduct
    }" data-test-id="purchase-product-link">상품 구매</button>
      </nav>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickNavLink);
  }

  onClickNavLink = ({ target }: EventOnElement) => {
    const destination = target.dataset.destination as string;
    Router.pushState(destination);
  };

  mount() {
    this.render();
  }

  render() {
    const currentPath = Router.instance.getCurrentPath();
    this.innerHTML = this.template(currentPath);
  }
}

export default Navigation;
