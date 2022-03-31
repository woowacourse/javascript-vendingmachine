import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Store from '../flux/store';
import Router from '../router';
import { EventOnElement, Tab } from '../types';

@customElement('vendingmachine-navigation')
class Navigation extends Component {
  template(activeTab: Tab): string {
    return `
      <nav class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-1 ${
          activeTab === Tab.ProductManageTab ? 'active' : ''
        }" data-destination="product-manage-tab">상품 관리</button>
        <button class="btn btn-secondary mr-1 ${
          activeTab === Tab.ChargeMoneyTab ? 'active' : ''
        }" data-destination="charge-money-tab">잔돈 충전</button>
        <button class="btn btn-secondary ${
          activeTab === Tab.PurchaseProductTab ? 'active' : ''
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
  };

  mount() {
    this.render();
  }

  render() {
    const { activeTab } = Store.instance.getState();
    this.innerHTML = this.template(activeTab);
  }
}

export default Navigation;
