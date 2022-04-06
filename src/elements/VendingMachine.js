import CustomElement from '../abstracts/CustomElement';

import './Auth/AuthMenu';
import './AdministratorMenu';
import './ProductManage/ProductManageContainer';
import './CoinCharge/CoinChargeContainer';
import './ProductPurchase/ProductPurchaseContainer';

class VendingMachine extends CustomElement {
  template() {
    return `
      <auth-menu></auth-menu>
      <h1 id="main-header">🍿 자판기 🍿</h1>
      <administrator-menu hidden></administrator-menu>
      <product-manage-container hidden></product-manage-container>
      <coin-charge-container hidden></coin-charge-container>
      <product-purchase-container class="container"></product-purchase-container>
    `;
  }
}

customElements.define('vending-machine', VendingMachine);

export default VendingMachine;
