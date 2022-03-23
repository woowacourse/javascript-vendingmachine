import ProductProcessMachine from "../domain/productProcessMachine";
import ProductPageView from "../ui/productPageView";
import { on } from "../util/event";

class ProductModerator {
  constructor() {
    this.productProcessMachine = new ProductProcessMachine();
    this.productPageView = new ProductPageView();
    on(window, "@add", (e) => this.addProduct(e.detail));
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
}

export default ProductModerator;
