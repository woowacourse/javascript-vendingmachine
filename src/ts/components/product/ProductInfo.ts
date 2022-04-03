import { ProductInfoProps, ProductProps, ValidateProductProps, ProductEditProps } from "../../utils/interface";
import { validateProductName, validateProductPrice, valudateProductQuantity, validateSameProductName } from "../../utils/validation";

class ProductInfo implements ProductInfoProps{
  private productList: ProductProps[] | null;

  constructor() {
    this.productList = this.getProductList();
  }

  validateProductInfo({ productName, productPrice, productQuantity }: ProductProps) {
    const productNameList = this.productList.map((product: ProductProps) => product.productName);

    validateProductName(productName);
    validateProductPrice(+productPrice);
    valudateProductQuantity(+productQuantity);
    validateSameProductName(productName, productNameList);
  }

  validateEditProductInfo({ productName, productPrice, productQuantity, beforeProductName }: ValidateProductProps) {
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
    this.setProductList();
  }

  removeProduct(removeProductText: string) {
    this.productList = this.productList.filter((product) => product.productName !== removeProductText);
    this.setProductList();
  }

  editProduct({ productName, productPrice, productQuantity, changeProductIndex }: ProductEditProps) {
    this.productList[changeProductIndex].productName = productName;
    this.productList[changeProductIndex].productPrice = productPrice;
    this.productList[changeProductIndex].productQuantity = productQuantity;
    this.setProductList();
  }

  setProductList() {
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  getProductList() {
    return JSON.parse(localStorage.getItem("PRODUCTS")) || [];
  }
}

export default ProductInfo;

