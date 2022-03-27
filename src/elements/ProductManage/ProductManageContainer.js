import CustomElement from '../../abstracts/CustomElement';

import './ProductAddForm';
import './ProductCurrentSituation';

class ProductManageContainer extends CustomElement {
  template() {
    return `
      <product-add-form></product-add-form>
      <product-current-situation></product-current-situation>
    `;
  }
}

customElements.define('product-manage-container', ProductManageContainer);

export default ProductManageContainer;
