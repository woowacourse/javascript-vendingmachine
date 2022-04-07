import { CONFIRM_MESSAGE, EVENT_TYPE, SNACKBAR_TYPE } from "../constant";
import ProductPageView from "../ui/productPageView";
import { on } from "../util/event";
import {
  IDeleteProductEvent,
  IAddProductEvent,
  IUpdateProductEvent,
} from "../type";
import VendingMachine from "../domain/vendingMachine";
import Authorization from "../domain/authorization";
import snackbarUI from "../ui/snackbarUI";

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
    const userInfo = await this.authorization.isLoggedIn();
    if (userInfo.isError) {
      alert("권한이 없습니다.");
      location.href = "/";
      return;
    }
    this.productPageView.init();
    const products = this.vendingMachine.getProducts();
    this.productPageView.renderProductsStatus(products);
    this.productPageView.renderHeader(userInfo);
  }

  addProduct = ({ name, price, count }: IAddProductEvent) => {
    try {
      const product = this.vendingMachine.addProduct({ name, price, count });
      this.productPageView.renderNewProduct(product);
      snackbarUI.open(SNACKBAR_TYPE.ALERT, "상품이 성공적으로 추가되었습니다!");
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  };

  updateProduct = ({ id, name, price, count }: IUpdateProductEvent) => {
    try {
      const product = this.vendingMachine.updateProduct(id, name, price, count);
      this.productPageView.renderUpdatedProduct(id, product);
      snackbarUI.open(SNACKBAR_TYPE.ALERT, "상품이 성공적으로 수정되었습니다!");
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  };

  deleteProduct = ({ id }: IDeleteProductEvent) => {
    if (!confirm(CONFIRM_MESSAGE)) {
      return;
    }
    this.vendingMachine.deleteProduct(id);
    this.productPageView.renderDeleteProduct(id);
    snackbarUI.open(SNACKBAR_TYPE.ALERT, "상품이 성공적으로 삭제되었습니다!");
  };
}

export default ProductModerator;
