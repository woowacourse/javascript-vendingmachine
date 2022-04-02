import CustomElement from '../../abstracts/CustomElement';

import './PurchaseMoneyForm';
import './PurchasePossibleProductSituation';
import './ProductReturnChange';

class ProductPurchaseContainer extends CustomElement {
  template() {
    return `
      <purchase-money-form></purchase-money-form>
      <purchase-possible-product-situation></purchase-possible-product-situation>
      <product-return-change></product-return-change>
    `;
  }
}

customElements.define('product-purchase-container', ProductPurchaseContainer);

export default ProductPurchaseContainer;
