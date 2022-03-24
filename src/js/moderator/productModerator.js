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
    this.productPageView.renderInputForm();
    this.productPageView.initDOMS();
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };

  addProduct = ({ name, price, count }) => {
    try {
      this.productProcessMachine.add({ name, price, count });
      const products = this.productProcessMachine.getProducts();
      this.productPageView.renderProductStatus(products);
    } catch (err) {
      alert(err.message);
    }
  };

  updateProduct = ({ idx, name, price, count }) => {
    try {
      this.productProcessMachine.update(idx, name, price, count);
      const products = this.productProcessMachine.getProducts();
      this.productPageView.renderProductStatus(products);
    } catch (err) {
      alert(err.message);
    }
  };

  deleteProduct = ({ id }) => {
    if (!confirm(CONFIRM_MESSAGE)) {
      return;
    }

    this.productProcessMachine.delete(id);
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };
}

export default ProductModerator;
