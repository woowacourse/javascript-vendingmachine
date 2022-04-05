import Component from '../abstract/component';
import RouteComponent from '../abstract/route-component';
import { customElement } from '../decorators/decortators';
import { LoggedInUser, WhiteList } from '../types';
import { getUserInfoFromLocalStorage } from '../utils';

@customElement('vendingmachine-page')
class VendingMachinePage extends RouteComponent {
  template(userInfo?: LoggedInUser): string {
    if (userInfo) {
      return `
        <logged-in-btn data-user-name="${userInfo.name}"></logged-in-btn>
        <header class="mb-13">
          <h1 class="mb-8">🍿 자판기 🍿</h1>
          <vendingmachine-navigation></vendingmachine-navigation>
        </header>
        <product-manage-tab data-to='["${WhiteList.Home}", "${WhiteList.VendingMachinePage}", "${WhiteList.ProductManage}"]'></product-manage-tab>
        <charge-money-tab data-to='["${WhiteList.ChargeMoney}"]'></charge-money-tab>
        <purchase-product-tab data-to='["${WhiteList.PurchaseProduct}"]'></purchase-product-tab>
      `;
    }
    return `
      <login-btn></login-btn>
      <header class="mb-13">
        <h1 class="mb-8">🍿 자판기 🍿</h1>
      </header>
      <purchase-product-tab data-to='["${WhiteList.Home}"]'></purchase-product-tab>
    `;
  }

  render() {
    const userInfo = getUserInfoFromLocalStorage();
    this.innerHTML = this.shouldRender() ? this.template(userInfo) : '';
  }
}

export default VendingMachinePage;
