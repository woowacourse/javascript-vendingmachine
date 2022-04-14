import CustomElement from '../../abstracts/CustomElement';

import './PurchaseMoneyForm';
import './PurchasePossibleProductState';
import './ProductReturnChange';

class ProductPurchaseContainer extends CustomElement {
  template() {
    return `
      <purchase-money-form></purchase-money-form>
      <purchase-possible-product-state></purchase-possible-product-state>
      <product-return-change></product-return-change>
    `;
  }
}

customElements.define('product-purchase-container', ProductPurchaseContainer);

export default ProductPurchaseContainer;
