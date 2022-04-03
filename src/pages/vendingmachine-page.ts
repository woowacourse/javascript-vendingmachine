import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import { WhiteList } from '../types';

@customElement('vendingmachine-page')
class VendingMachinePage extends Component {
  template(): string {
    return `
      <login-btn></login-btn>
      <header class="mb-13">
        <h1 class="mb-8">🍿 자판기 🍿</h1>
        <vendingmachine-navigation></vendingmachine-navigation>
      </header>
      <product-manage-tab data-to='["${WhiteList.Home}", "${WhiteList.VendingMachinePage}", "${WhiteList.ProductManage}"]'></product-manage-tab>
      <charge-money-tab data-to='["${WhiteList.ChargeMoney}"]'></charge-money-tab>
      <purchase-product-tab data-to='["${WhiteList.PurchaseProduct}"]'></purchase-product-tab>
    `;
  }

  render() {
    this.innerHTML = this.shouldRender() ? this.template() : '';
  }
}

export default VendingMachinePage;
