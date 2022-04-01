import { selectDom, selectDomAll } from "../../utils/dom";
import { ChangeEditProductInfoProps, ProductProps } from "../../utils/interface";
import { productTemplate, addProductTemplate, editProductTemplate } from "./productTemplate";

class ProductView {
  vendingmachineFunctionWrap: HTMLElement;
  productTable: HTMLElement;
  productInfoInputs: HTMLElement[];

  constructor() {
    this.vendingmachineFunctionWrap = selectDom(".main");
  }

  addProduct({ productName, productPrice, productQuantity }: ProductProps) {
      this.productTable.insertAdjacentHTML(
      "beforeend",
      addProductTemplate({
        productName: productName,
        productPrice: +productPrice,
        productQuantity: +productQuantity
      })
    );
  }

  removeProduct(target: HTMLElement) {
    target.closest("tr").remove();
  }

  prepareEditProduct(target: HTMLElement) {
    const [productNameTd, productPriceTd, productQuantityTd] = 
      Array.from(target.closest("tr").children);

    target.closest("tr").innerHTML = editProductTemplate({
      productName: productNameTd.textContent,
      productPrice: +productPriceTd.textContent,
      productQuantity: +productQuantityTd.textContent
    });
  }

  editProduct({target, productName, productPrice, productQuantity}: ChangeEditProductInfoProps) {
    target.closest("tr").innerHTML = addProductTemplate({
      productName: productName,
      productPrice: productPrice,
      productQuantity: productQuantity
    });
  }

  focusProductNameInput() {
    this.productInfoInputs = selectDomAll(".product-control-input");
    const [productNameInput] = this.productInfoInputs;
    productNameInput.focus();
  }

  focusProductEditInput() {
    const [productEditInput] = selectDomAll(".product-edit-input");
    productEditInput.focus();
  }
  
  changeProductInfoInputEmpty() {
    this.productInfoInputs.forEach((input: HTMLInputElement) => (input.value = ""));
  }

  showProductList(productList) {
    this.productTable.insertAdjacentHTML(
      "beforeend",
      productList.map((product: ProductProps) =>  addProductTemplate(product)).join(' ')
    );
  };

  renderProductView() {
    this.vendingmachineFunctionWrap.replaceChildren();
    this.vendingmachineFunctionWrap.insertAdjacentHTML("beforeend", productTemplate());
    this.productTable = selectDom("#product-control-table");
  }
}

export default ProductView;