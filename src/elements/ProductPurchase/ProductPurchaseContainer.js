import CustomElement from '../../abstracts/CustomElement';

import './MoneyInputForm';
import './PurchasableProductCurrentSituation';
import './ChangeReturnTable';

class ProductPurchaseContainer extends CustomElement {
  template() {
    return `
      <money-input-form></money-input-form>
      <purchasable-product-current-situation></purchasable-product-current-situation>
      <change-return-table></change-return-table>
    `;
  }
}

customElements.define('product-purchase-container', ProductPurchaseContainer);

export default ProductPurchaseContainer;
