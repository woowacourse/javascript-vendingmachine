import CustomElement from '../../abstracts/CustomElement';

import './ProductAddForm';
import './ProductCurrentState';

class ProductManageContainer extends CustomElement {
  template() {
    return `
      <product-add-form></product-add-form>
      <product-current-state></product-current-state>
    `;
  }
}

customElements.define('product-manage-container', ProductManageContainer);

export default ProductManageContainer;
