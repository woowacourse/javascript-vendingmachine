import { ChangeEditProductInfoProps, ProductProps } from "../../utils/interface";
import { validateProductName, validateProductPrice, valudateProductQuantity, validateSameProductName } from "../../utils/validation";

class ProductInfo{
  private productList: ProductProps[] | null;

  constructor() {
    this.productList = this.getProductList();
  }

  validateProductInfo({ productName, productPrice, productQuantity }) {
    const productNameList = this.productList.map((product: ProductProps) => product.productName);

    validateProductName(productName);
    validateProductPrice(+productPrice);
    valudateProductQuantity(+productQuantity);
    validateSameProductName(productName, productNameList);
  }

  validateEditProductInfo({ productName, productPrice, productQuantity, beforeProductName }) {
    const productNameList = this.productList
      .map((product: ProductProps) => product.productName)
      .filter((productName) => productName !== beforeProductName);

    validateProductName(productName);
    validateProductPrice(+productPrice);
    valudateProductQuantity(+productQuantity);
    validateSameProductName(productName, productNameList);
  }

  addProductList({ productName, productPrice, productQuantity }: ProductProps) {
    this.productList = [...this.productList, { productName: productName, productPrice: +productPrice, productQuantity: +productQuantity }];
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  removeProduct(removeProductText: string) {
    this.productList = this.productList.filter((product) => product.productName !== removeProductText);
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  editProduct({ productName, productPrice, productQuantity, changeProductIndex }) {
    this.productList[changeProductIndex].productName = productName;
    this.productList[changeProductIndex].productPrice = productPrice;
    this.productList[changeProductIndex].productQuantity = productQuantity;
  }

  getProductList() {
    return JSON.parse(localStorage.getItem("PRODUCTS")) || [];
  }
}

export default ProductInfo;

