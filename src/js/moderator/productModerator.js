import ProductProcessMachine from "../domain/productProcessMachine";
import ProductPageView from "../ui/productPageView";
import { on } from "../util/event";

class ProductModerator {
  constructor() {
    this.productProcessMachine = new ProductProcessMachine();
    this.productPageView = new ProductPageView();
    on(window, "@add", (e) => this.addProduct(e.detail));
    on(window, "@delete", (e) => this.deleteProduct(e.detail));
    on(window, "@edit", (e) => this.updateProduct(e.detail));
  }

  init = () => {
    this.productPageView.renderInputForm();
    this.productPageView.initDOMS();
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };

  addProduct = ({ name, price, count }) => {
    this.productProcessMachine.add({ name, price, count });
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };

  updateProduct = ({ idx, name, price, count }) => {
    this.productProcessMachine.update(idx, name, price, count);
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };

  deleteProduct = ({ id }) => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    this.productProcessMachine.delete(id);
    const products = this.productProcessMachine.getProducts();
    this.productPageView.renderProductStatus(products);
  };

  editProduct = () => {};
}

export default ProductModerator;
