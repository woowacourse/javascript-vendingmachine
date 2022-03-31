import { selectDom, selectDomAll, addEvent } from "../../utils/dom";
import { changeEditProductInfoProps, productProps } from "../../utils/interface";
import { validateProductName, validateProductPrice, valudateProductQuantity, validateSameProductName } from "../../utils/validation";
import ProductView from "./ProductView";
class Product {
  productView: ProductView;
  productInfoInputs: HTMLElement[];
  productAddButton: HTMLElement;
  productTable: HTMLElement;
  productList: productProps[] | null;

  constructor() {
    this.productView = new ProductView();
    this.productView.renderProductView();
    this.productList = this.getProductList();
  }

  bindProductDom() {
    this.productInfoInputs = selectDomAll(".product-control-input");
    this.productAddButton = selectDom("#product-add-button");
    this.productTable = selectDom("#product-control-table");
    addEvent(this.productAddButton, "click", this.handleAddProduct);
    addEvent(this.productTable, "click", this.handleControlProduct);

    this.productView.focusProductNameInput();
  }

  handleAddProduct = (event: Event) => {
    event.preventDefault();
    const [productName, productPrice, productQuantity] = 
      this.productInfoInputs.map((input: HTMLInputElement ) => input.value);
    const productNameList = 
      this.productList.map((product: productProps) => product.productName);

      validateProductName(productName);
      validateProductPrice(+productPrice);
      valudateProductQuantity(+productQuantity);
      validateSameProductName(productName, productNameList);
      this.productList = [...this.productList, { productName: productName, productPrice: +productPrice, productQuantity: +productQuantity }];
      this.setProductList();
      this.productView.changeProductInfoInputEmpty();
      this.productView.focusProductNameInput();
      this.productView.addProduct({         
        productName: productName,
        productPrice: +productPrice,
        productQuantity: +productQuantity, 
      });
  };

  handleControlProduct = (event: { target: HTMLTableElement }) => {
    if (event.target.classList.contains("product-remove-button")) {
      this.handleRemoveProduct(event);
    } else if (event.target.classList.contains("product-edit-button")) {
      this.handleEditProduct(event);
    } else if (event.target.classList.contains("product-confirm-button")) {
      this.handleConfirmProduct(event);
    }
  }

  handleRemoveProduct = (event: { target: HTMLTableElement }) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    };
    
    const [productNameTd] = Array.from(event.target.closest("tr").children);
    this.productList = this.productList.filter((product) => product.productName !== productNameTd.textContent);
    this.setProductList();
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
    const beforeProductName = selectDom(".product-name", event.target.closest("tr")).dataset.name;
    const productNameList = this.productList
      .map((product: productProps) => product.productName)
      .filter((productName) => productName !== beforeProductName);

    validateProductName(productName);
    validateProductPrice(+productPrice);
    valudateProductQuantity(+productQuantity);
    validateSameProductName(productName, productNameList);
    this.changeEditProductInfo({
      target: event.target,
      productName: productName,
      productPrice: +productPrice,
      productQuantity: +productQuantity,
    });
  };

  changeEditProductInfo = ({ target, productName, productPrice, productQuantity }: changeEditProductInfoProps) => {
    this.productView.editProduct({target, productName, productPrice, productQuantity});

    const changeProductIndex = 
      selectDomAll(".product-name", this.productTable)
      .map((productTd: HTMLTableElement) => productTd.textContent)
      .indexOf(productName);

    this.productList[changeProductIndex].productName = productName;
    this.productList[changeProductIndex].productPrice = productPrice;
    this.productList[changeProductIndex].productQuantity = productQuantity;
    this.setProductList();
  };

  setProductList() {
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  getProductList() {
    return JSON.parse(localStorage.getItem("PRODUCTS")) || [];
  }

  render() {
    this.productView.renderProductView();
    this.productView.showProductList(this.productList);
    this.bindProductDom();
  }
}

export default Product;
