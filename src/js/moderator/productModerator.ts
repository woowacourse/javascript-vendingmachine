import {
  CONFIRM_MESSAGE,
  EVENT_TYPE,
  SNACKBAR_TYPE,
  ERROR_MESSAGE,
  ALERT_MESSAGE,
} from "../constant";
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
    const userInfo = await this.authorization.getLoggedInUser();
    if (userInfo.isError) {
      alert(ERROR_MESSAGE.NOT_AUTHORIZED);
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
      snackbarUI.open(SNACKBAR_TYPE.ALERT, ALERT_MESSAGE.ADD_PRODUCT);
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  };

  updateProduct = ({ id, name, price, count }: IUpdateProductEvent) => {
    try {
      const product = this.vendingMachine.updateProduct({
        id,
        name,
        price,
        count,
      });
      this.productPageView.renderUpdatedProduct(id, product);
      snackbarUI.open(SNACKBAR_TYPE.ALERT, ALERT_MESSAGE.UPDATE_PRODUCT);
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  };

  deleteProduct = ({ id }: IDeleteProductEvent) => {
    if (!confirm(CONFIRM_MESSAGE)) {
      return;
    }
    this.vendingMachine.deleteProduct(id);
    this.productPageView.deleteRenderedProduct(id);
    snackbarUI.open(SNACKBAR_TYPE.ALERT, ALERT_MESSAGE.DELETE_PRODUCT);
  };
}

export default ProductModerator;
