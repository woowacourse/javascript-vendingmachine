import { CONFIRM_MESSAGE, EVENT_TYPE } from "../constant";
import ProductPageView from "../ui/productPageView";
import { on } from "../util/event";
import {
  IDeleteProductEvent,
  IAddProductEvent,
  IUpdateProductEvent,
} from "../type";
import VendingMachine from "../domain/vendingMachine";
import Authorization from "../domain/authorization";

class ProductModerator {
  productPageView;
  vendingMachine;
  authorization;

  constructor() {
    this.authorization = new Authorization();
    this.productPageView = new ProductPageView();
    this.vendingMachine = VendingMachine.getInstance();
    on<IAddProductEvent>(window, EVENT_TYPE.ADD, (e) =>
      this.addProduct(e.detail)
    );
    on<IDeleteProductEvent>(window, EVENT_TYPE.DELETE, (e) =>
      this.deleteProduct(e.detail)
    );
    on<IUpdateProductEvent>(window, EVENT_TYPE.EDIT, (e) =>
      this.updateProduct(e.detail)
    );
  }

  async init() {
    const { isError } = await this.authorization.isLoggedIn();
    if (isError) {
      alert("권한이 없습니다.");
      location.href = "/";
      return;
    }
    this.productPageView.init();
    const products = this.vendingMachine.getProducts();
    this.productPageView.renderProductsStatus(products);
  }

  addProduct = ({ name, price, count }: IAddProductEvent): void => {
    try {
      const product = this.vendingMachine.addProduct({ name, price, count });
      this.productPageView.renderNewProduct(product);
    } catch (err) {
      alert(err.message);
    }
  };

  updateProduct = ({ id, name, price, count }: IUpdateProductEvent): void => {
    try {
      const product = this.vendingMachine.updateProduct(id, name, price, count);
      this.productPageView.renderUpdatedProduct(id, product);
    } catch (err) {
      alert(err.message);
    }
  };

  deleteProduct = ({ id }: IDeleteProductEvent): void => {
    if (!confirm(CONFIRM_MESSAGE)) {
      return;
    }
    this.vendingMachine.deleteProduct(id);
    this.productPageView.renderDeleteProduct(id);
  };
}

export default ProductModerator;
