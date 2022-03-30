import { CONFIRM_MESSAGE, EVENT_TYPE } from "../constant";
import ProductProcessMachine from "../domain/productProcessMachine";
import ProductPageView from "../ui/productPageView";
import { on } from "../util/event";

class ProductModerator {
  constructor() {
    this.productProcessMachine = new ProductProcessMachine();
    this.productPageView = new ProductPageView();
    on(window, EVENT_TYPE.ADD, (e) => this.addProduct(e.detail));
    on(window, EVENT_TYPE.DELETE, (e) => this.deleteProduct(e.detail));
    on(window, EVENT_TYPE.EDIT, (e) => this.updateProduct(e.detail));
  }

  init = () => {
    this.productPageView.init();
    const products = this.productProcessMachine.getProducts();
    this.productPageView.initProductsStatus(products);
  };

  addProduct = ({ name, price, count }) => {
    try {
      const product = this.productProcessMachine.add({ name, price, count });
      this.productPageView.renderNewProduct(product);
    } catch (err) {
      alert(err.message);
    }
  };

  updateProduct = ({ id, name, price, count }) => {
    try {
      const product = this.productProcessMachine.update(id, name, price, count);
      this.productPageView.renderUpdatedProduct(id, product);
    } catch (err) {
      alert(err.message);
    }
  };

  deleteProduct = ({ id }) => {
    if (!confirm(CONFIRM_MESSAGE)) {
      return;
    }

    this.productProcessMachine.delete(id);
    this.productPageView.renderDeleteProduct(id);
  };
}

export default ProductModerator;
