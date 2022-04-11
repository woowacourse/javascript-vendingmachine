import { selectDom, selectDomAll, addEvent } from "../../utils/dom";
import { showSnackbar } from "../snackbar/snackbar";
import { deleteProductText, editProductInfoText, registerProductText } from "../snackbar/snackbarTemplate";
import ProductInfo from "./ProductInfo";
import ProductView from "./ProductView";

class Product {
  productInfo: ProductInfo;
  productView: ProductView;
  productInfoInputs: HTMLElement[];
  productAddButton: HTMLElement;
  productTable: HTMLElement;

  constructor() {
    this.productInfo = new ProductInfo();
    this.productView = new ProductView();
    this.productView.renderProductView(this.productInfo.getUserName());
  }

  bindProductDom() {
    this.productInfoInputs = selectDomAll(".product-control-input");
    this.productAddButton = selectDom("#product-add-button");
    this.productTable = selectDom("#product-control-table");
    addEvent(this.productAddButton, "click", this.handleAddProduct);
    addEvent(this.productTable, "click", this.handleControlProduct);

    this.productView.focusProductNameInput();
  }

  handleControlProduct = (event: { target: HTMLTableElement }) => {
    if (event.target.classList.contains("product-remove-button")) {
      this.handleRemoveProduct(event);
    } else if (event.target.classList.contains("product-edit-button")) {
      this.handleEditProduct(event);
    } else if (event.target.classList.contains("product-confirm-button")) {
      this.handleConfirmProduct(event);
    }
  }


  handleAddProduct = (event: Event) => {
    event.preventDefault();
    const [productName, productPrice, productQuantity] = 
      this.productInfoInputs.map((input: HTMLInputElement ) => input.value);
    const product = {
      productName: productName,
      productPrice: +productPrice,
      productQuantity: +productQuantity,
    };

    this.productInfo.validateProductInfo({ ...product });
    showSnackbar(registerProductText({ ...product }));
    this.productInfo.addProductList({ ...product });
    this.productView.changeProductInfoInputEmpty();
    this.productView.focusProductNameInput();
    this.productView.addProduct({ ...product });
  };
    
  handleRemoveProduct = (event: { target: HTMLTableElement }) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    };
    
    const [productNameTd] = Array.from(event.target.closest("tr").children);

    showSnackbar(deleteProductText(productNameTd.textContent));
    this.productInfo.removeProduct(productNameTd.textContent);
    this.productView.removeProduct(event.target);
  };

  handleEditProduct = (event: { target: HTMLTableElement }) => {
    this.productView.prepareEditProduct(event.target);
    this.productView.focusProductEditInput();
  };

  handleConfirmProduct = (event: { target: HTMLTableElement }) => {
    const [productName, productPrice, productQuantity] = Array.from(
      selectDomAll(".product-edit-input", event.target.closest("tr")),
      (input: HTMLInputElement) => input.value
    );
    const product = {
      productName: productName,
      productPrice: +productPrice,
      productQuantity: +productQuantity,
    };
    const beforeProductName = selectDom(".product-name", event.target.closest("tr")).dataset.name;

    this.productInfo.validateEditProductInfo({ ...product, beforeProductName });
    showSnackbar(editProductInfoText({ ...product }));
    this.productView.editProduct({ target: event.target, ...product });
    const changeProductIndex = 
      selectDomAll(".product-name", this.productTable)
      .map((productTd: HTMLTableElement) => productTd.textContent)
      .indexOf(productName);

    this.productInfo.editProduct({ ...product, changeProductIndex: changeProductIndex });
  };

  render() {
    this.productView.renderProductView(this.productInfo.getUserName());
    if (this.productInfo.getUserName()) {
      this.productView.showProductList(this.productInfo.getProductList());
      this.bindProductDom();
    }
  }
}

export default Product;
