import { isLoggedIn } from '../domains/Auth';

import CustomElement from '../abstracts/CustomElement';

import './Auth/AuthMenu';
import './AdministratorMenu';
import './ProductManage/ProductManageContainer';
import './CoinCharge/CoinChargeContainer';
import './ProductPurchase/ProductPurchaseContainer';

class VendingMachine extends CustomElement {
  render() {
    const isAdministrator = isLoggedIn();

    this.insertAdjacentHTML('beforeend', this.template(isAdministrator));
  }

  template(isAdministrator) {
    const isAdministratorMenuHidden = isAdministrator ? '' : 'hidden';

    return `
      <auth-menu class="auth-menu"></auth-menu>
      <h1>🍿 자판기 🍿</h1>
      <administrator-menu class="container ${isAdministratorMenuHidden}"></administrator-menu>
      <product-manage-container class="container hidden"></product-manage-container>
      <coin-charge-container class="container hidden"></coin-charge-container>
      <product-purchase-container class="container"></product-purchase-container>
    `;
  }
}

customElements.define('vending-machine', VendingMachine);

export default VendingMachine;
