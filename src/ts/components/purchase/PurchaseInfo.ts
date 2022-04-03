import { ProductProps, PurchaseInfoProps } from "../../utils/interface";
import { validatePossiblePurchaseProduct } from "../../utils/validation";

class PurchaseInfo implements PurchaseInfoProps{
  productList: ProductProps[];
  insertMoney: number;

  constructor() {
    this.updateProductList();
    this.insertMoney = this.getInsertMoney();
  }

  returnCharge() {
  
  }

  updateProductList() {
    this.productList = this.getProductList();
  }

  purchaseProduct({ productName, productPrice }) {
    validatePossiblePurchaseProduct({ totalMoney: this.insertMoney, productPrice: productPrice });
    this.productList.find((product) => product.productName === productName).productQuantity -= 1;
    this.insertMoney -= productPrice;
    this.setProductList();
    this.setInsertMoney();
  }

  plusInsertMoney(money: number) {
    this.insertMoney += money;
    this.setInsertMoney();
  }

  setInsertMoney() {
    localStorage.setItem("INSERT_MONEY", JSON.stringify(this.insertMoney))
  }

  getInsertMoney() {
    return JSON.parse(localStorage.getItem("INSERT_MONEY")) || 0;
  }

  setProductList() {
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  getProductList() {
    return JSON.parse(localStorage.getItem("PRODUCTS")) || [];
  }
}

export default PurchaseInfo;
